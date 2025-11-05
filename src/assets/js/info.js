// src/assets/js/info.js

const API_BASE = 'http://localhost:3000';
const API_INFO = `${API_BASE}/informacoes_criticas`;
const API_UPLOAD = `${API_BASE}/upload`;

function getSessionUserId() {
    const raw = localStorage.getItem('usuarioLogado'); // ex.: "4"
    const id = raw != null ? Number(raw) : NaN;
    return Number.isFinite(id) ? id : null;
}

// ---------- helpers ----------
const $ = (id) => document.getElementById(id);

// --- Data/hora ---
function pad2(n) { return String(n).padStart(2, '0'); }
function to24hHHMM(s) {
    // Aceita "08:05" ou "8:5", normaliza para "08:05"
    const m = String(s || '').trim().match(/^(\d{1,2}):(\d{1,2})$/);
    if (!m) return null;
    let hh = Number(m[1]), mm = Number(m[2]);
    if (!(hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59)) return null;
    return `${pad2(hh)}:${pad2(mm)}`;
}
// Monta "YYYY-MM-DD HH:MM:SS" a partir de (dateStr, timeHHMM)
function toDbDateTime(dateStr, timeHHMM) {
    const hhmm = to24hHHMM(timeHHMM);
    if (!dateStr || !hhmm) return null;
    return `${dateStr} ${hhmm}:00`;
}

// --- Geolocalização ---
async function getGeo(timeout = 8000) {
    if (!('geolocation' in navigator)) return null;
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                accuracy: pos.coords.accuracy
            }),
            () => resolve(null),
            { enableHighAccuracy: true, timeout, maximumAge: 0 }
        );
    });
}

function formatCardDate(s) {
    if (!s) return '';
    const str = String(s).replace('T', ' '); // aceita "YYYY-MM-DD HH:MM:SS" ou "YYYY-MM-DDTHH:MM:SS"
    const m = str.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::\d{2})?$/);
    if (!m) return str; // fallback se vier em outro formato
    const [, yyyy, MM, dd, HH, mm] = m;
    return `${dd}/${MM}/${yyyy.slice(2)} ${HH}:${mm}`; // DD/MM/AA HH:MM
}

async function uploadImageIfAny(file) {
    if (!file) return '';
    const fd = new FormData();
    fd.append('image', file);
    const r = await fetch(API_UPLOAD, { method: 'POST', body: fd });
    if (!r.ok) throw new Error(`Falha no upload: ${r.status}`);
    const { url } = await r.json();
    return url; // ex.: http://localhost:3000/uploads/foto7.jpg
}

async function salvarInfo(payload) {
    const r = await fetch(API_INFO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!r.ok) throw new Error(`Erro ao salvar: ${r.status}`);
    return r.json();
}

async function carregarInfos() {
    try {
        const url = `${API_INFO}`; // sem _sort/_order para isolar
        const r = await fetch(url, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' }
        });
        if (!r.ok) throw new Error(`GET ${url} -> ${r.status}`);

        // lê como texto para diagnosticar e depois parseia
        const raw = await r.text();
        console.log('RAW /informacoes_criticas ->', raw);

        let data;
        try { data = JSON.parse(raw); }
        catch (e) {
            console.error('Falha ao parsear JSON:', e);
            data = [];
        }

        // normaliza qualquer formato (array direto ou objeto com a coleção)
        const lista = Array.isArray(data)
            ? data
            : (data && Array.isArray(data.informacoes_criticas) ? data.informacoes_criticas : []);

        console.log('NORMALIZED count:', lista.length, lista);
        renderCards(lista);
    } catch (e) {
        console.error('Erro ao carregar infos:', e);
        const grid = document.getElementById('card-grid');
        if (grid) grid.innerHTML = `<div class="text-danger">Falha ao carregar dados. Veja o console (F12).</div>`;
    }
}

function renderCards(lista) {
    const grid = $('card-grid');
    if (!grid) {
        console.error('Elemento #card-grid não encontrado no HTML.');
        return;
    }

    if (!Array.isArray(lista) || lista.length === 0) {
        grid.innerHTML = `<div class="text-muted">Nenhum registro ainda.</div>`;
        return;
    }

    const html = lista.map((item) => {
        const imgSrc = item?.image ? String(item.image) : '';
        const img = imgSrc ? `<img src="${imgSrc}" class="card-img-top" alt="foto" />` : '';
        // exibe como veio (24h), compatível com "YYYY-MM-DD HH:MM:SS" e com "YYYY-MM-DDTHH:MM:SS"
        const when = formatCardDate(item.dataHora || item.createdAt);
        const tipo = item?.tipo ?? '';
        const desc = item?.descricao ?? '';
        const bairro = item?.bairro ?? '';
        return `
      <div class="card">
        ${img}
        <div class="card-body">
          <h5 class="card-title">${tipo}</h5>
          <p class="card-text">${desc}</p>
          <small>${bairro} • ${when}</small>
        </div>
      </div>`;
    }).join('');

    grid.innerHTML = html;
}

// ---------- preview ----------
function initPreview() {
    const input = $('imgUploadInfo');
    const preview = $('previewInfo');

    preview.addEventListener('click', () => input.click());

    ['dragenter', 'dragover'].forEach(evt => {
        preview.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); preview.classList.add('drag-over'); });
    });
    ['dragleave', 'drop'].forEach(evt => {
        preview.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); preview.classList.remove('drag-over'); });
    });
    preview.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files?.[0];
        if (file) { input.files = e.dataTransfer.files; showLocalPreview(file, preview); }
    });

    input.addEventListener('change', () => {
        const file = input.files?.[0];
        if (file) showLocalPreview(file, preview);
    });
}

function showLocalPreview(file, previewEl) {
    if (!file || !file.type.startsWith('image/')) {
        previewEl.textContent = 'Arquivo inválido. Selecione uma imagem.'; return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        previewEl.innerHTML = `<img src="${reader.result}" alt="preview" style="max-width:100%; max-height:180px; display:block; margin:auto;" />`;
    };
    reader.readAsDataURL(file); // apenas PREVIEW, não vai ao servidor
}

// ---------- salvar ----------
function initSalvar() {
    $('btnSalvarInfo').addEventListener('click', async () => {
        try {
            const tipo = $('selectTipo').value;
            const descricao = $('textareaDescricao').value.trim();
            const bairro = $('inputBairro').value.trim();
            const date = $('inputDate').value;
            const time = $('inputTime').value;
            const file = $('imgUploadInfo').files?.[0];

            if (!tipo || !descricao || !bairro || !date || !time) {
                alert('Preencha todos os campos obrigatórios.');
                return;
            }

            // 1) upload primeiro (se houver arquivo)
            const imageUrl = await uploadImageIfAny(file);

            // 2) pega o userId da sessão (obrigatório)
            const userId = getSessionUserId();
            if (userId == null) {
                alert('Usuário não identificado. Faça login novamente.');
                return;
            }

            // 3) geolocalização (opcional – se negar permissão, vai null)
            const geo = await getGeo();

            // 4) data/hora (HH:MM) -> "YYYY-MM-DD HH:MM:00"
            const dh = toDbDateTime(date, time);
            if (!dh) {
                alert('Data ou hora inválidas (use HH:MM).');
                return;
            }

            // 5) payload (sem createdAt – quem grava é o servidor)
            const novaInfo = {
                tipo,
                descricao,
                bairro,
                dataHora: dh,
                image: imageUrl,
                userId,
                geo  // {lat, lng, accuracy} | null
            };

            await salvarInfo(novaInfo);

            alert('Informação salva com sucesso!');
            $('formNovaInfo').reset();
            $('previewInfo').textContent = 'Clique ou arraste a imagem aqui';
            bootstrap?.Modal?.getOrCreateInstance($('modalNovaInfo'))?.hide();
            await carregarInfos();
        } catch (err) {
            console.error(err);
            alert(err.message || 'Erro inesperado ao salvar.');
        }
    });
}

// ---------- boot ----------
document.addEventListener('DOMContentLoaded', async () => {
    initPreview();
    initSalvar();
    await carregarInfos(); // chamada única aqui
});
