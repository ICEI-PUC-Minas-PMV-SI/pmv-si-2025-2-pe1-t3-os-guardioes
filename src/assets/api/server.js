const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const jsonServer = require('json-server');

const app = express();

// ---- middlewares base ----
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ---- caminhos ----
const DB_FILE = path.join(__dirname, 'db.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// garante db.json e coleção
function ensureDb() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ informacoes_criticas: [] }, null, 2));
    } else {
        try {
            const raw = fs.readFileSync(DB_FILE, 'utf8') || '{}';
            const data = JSON.parse(raw);
            if (!Array.isArray(data.informacoes_criticas)) {
                data.informacoes_criticas = [];
                fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
            }
        } catch (e) {
            console.error('db.json inválido. Recriando com estrutura mínima.', e);
            fs.writeFileSync(DB_FILE, JSON.stringify({ informacoes_criticas: [] }, null, 2));
        }
    }
}
ensureDb();

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ---- multer: nome do arquivo = fotoN.ext (incremental) ----
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
    filename: (_req, file, cb) => {
        const ext = (path.extname(file.originalname) || '.jpg').toLowerCase();
        let n = 1;
        while (true) {
            const candidate = `foto${n}${ext}`;
            if (!fs.existsSync(path.join(UPLOAD_DIR, candidate))) return cb(null, candidate);
            n++;
        }
    }
});
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => (/^image\//.test(file.mimetype) ? cb(null, true) : cb(new Error('Apenas imagens')))
});

// ---- estáticos de upload ----
app.use('/uploads', express.static(UPLOAD_DIR));

// ---- /upload: retorna URL absoluta ----
app.post('/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'Arquivo não enviado' });
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const url = `${baseUrl}/uploads/${req.file.filename}`;
        return res.status(201).json({ url, filename: req.file.filename });
    } catch (e) {
        console.error('Erro no /upload:', e);
        return res.status(500).json({ error: 'Falha no upload' });
    }
});

// ---- json-server router (para GET/PUT/PATCH/DELETE) ----
const router = jsonServer.router(DB_FILE);
const middlewares = jsonServer.defaults({ logger: true });

// ---- POST custom: grava direto no LowDB e evita 500 ----
app.post('/informacoes_criticas', (req, res) => {
    try {
        const db = router.db; // LowDB

        if (!db.has('informacoes_criticas').value()) {
            db.set('informacoes_criticas', []).write();
        }

        const { tipo, descricao, bairro, dataHora, image, userId, geo } = req.body || {};
        if (!tipo || !descricao || !bairro || !dataHora) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
        }

        // --- ID sequencial ---
        const ids = db.get('informacoes_criticas').map('id').value() || [];
        const nums = ids.map(n => Number(n)).filter(n => Number.isFinite(n) && n > 0);
        const nextId = (nums.length ? Math.max(...nums) : 0) + 1;

        // --- createdAt (server time) ---
        const now = new Date();
        const pad2 = (n) => String(n).padStart(2, '0');
        const createdAt =
            `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())} ` +
            `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
        const createdAtMs = now.getTime();

        // --- geo sanitizada (se vier) ---
        let geoClean = null;
        if (geo && typeof geo === 'object') {
            const lat = Number(geo.lat), lng = Number(geo.lng), accuracy = Number(geo.accuracy);
            if (Number.isFinite(lat) && Number.isFinite(lng)) {
                geoClean = {
                    lat, lng,
                    accuracy: Number.isFinite(accuracy) ? accuracy : undefined
                };
            }
        }

        const item = {
            id: nextId,
            tipo,
            descricao,
            bairro,
            dataHora,       // "YYYY-MM-DD HH:MM:00" (vem do cliente)
            image: image || '',
            userId: userId ?? 1,
            createdAt,      // "YYYY-MM-DD HH:MM:SS" (servidor)
            createdAtMs,    // epoch ms (pra rate-limit/spam)
            savedFromGeo: geoClean   // {lat,lng,accuracy} | null
        };

        db.get('informacoes_criticas').push(item).write();
        return res.status(201).json(item);
    } catch (e) {
        console.error('Erro ao gravar informacoes_criticas:', e);
        return res.status(500).json({ error: 'Falha ao gravar no banco.' });
    }
});

// ---- monta json-server por último ----
app.use(middlewares);
app.use('/', router);

// ---- start ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API on http://localhost:${PORT} (upload + json-server + POST custom)`);
});
