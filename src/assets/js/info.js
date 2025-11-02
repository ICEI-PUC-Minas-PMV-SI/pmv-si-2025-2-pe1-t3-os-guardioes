const API_URL = "http://localhost:3000/informacoes_criticas";

const cardsContainer = document.getElementById("card-grid");
const btnSalvarInfo = document.getElementById("btnSalvarInfo");
const selectTipo = document.getElementById("selectTipo");
const textareaDescricao = document.getElementById("textareaDescricao");
const inputBairro = document.getElementById("inputBairro");
const inputDate = document.getElementById("inputDate");
const inputTime = document.getElementById("inputTime");
const imgUploadInfo = document.getElementById('imgUploadInfo');
const previewInfo = document.getElementById('previewInfo');

let listaInfosCriticas = [];

// Converter arquivo para base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Carregar infos críticas
async function carregarInfosCriticas() {
  cardsContainer.innerHTML = "<p>Carregando...</p>";
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("Erro ao carregar dados");
    listaInfosCriticas = await resp.json();
    renderCards(listaInfosCriticas);
  } catch (e) {
    cardsContainer.innerHTML = `<p style="color:red">${e.message}</p>`;
  }
}

function renderCards(lista) {
  if (!lista || lista.length === 0) {
    cardsContainer.innerHTML = "<p>Nenhuma informação crítica registrada.</p>";
    return;
  }

  cardsContainer.innerHTML = lista.map(info => `
    <div class="card position-relative">
      ${info.image ? `<img src="${info.image}" alt="Imagem da suspeita">` : ''}
      <div class="card-content">
        <div class="card-top">
          <span class="bairro">Bairro: ${info.bairro}</span>
        </div>
        <p class="tipo">Tipo: ${info.tipo}</p>
        <p class="data">Data: ${formatarData(info.dataHora)}</p>
        <p class="descricao">${info.descricao}</p>
      </div>
    </div>
  `).join("");
}

function formatarData(dataIso) {
  const dt = new Date(dataIso);
  return dt.toLocaleDateString("pt-BR") + " " + dt.toLocaleTimeString("pt-BR", {hour:"2-digit", minute:"2-digit"});
}

// Upload de imagem
previewInfo.addEventListener('click', () => imgUploadInfo.click());
imgUploadInfo.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      previewInfo.innerHTML = `<img src="${ev.target.result}" alt="Pré-visualização">`;
    }
    reader.readAsDataURL(file);
  } else {
    previewInfo.textContent = "Clique ou arraste a imagem aqui";
  }
});

// Salvar nova info crítica
btnSalvarInfo.addEventListener("click", async (e) => {
  e.preventDefault();

  const tipo = selectTipo.value;
  const descricao = textareaDescricao.value.trim();
  const bairro = inputBairro.value.trim();
  const data = inputDate.value;
  const hora = inputTime.value;

  if (!tipo || !descricao || !bairro || !data || !hora) {
    alert("Preencha todos os campos!");
    return;
  }

  const dataHora = `${data}T${hora}:00`;

  let imageBase64 = "";
  if (imgUploadInfo.files.length > 0) {
    imageBase64 = await fileToBase64(imgUploadInfo.files[0]);
  }

  const novaInfo = { tipo, descricao, bairro, dataHora, image: imageBase64, userId: 1 };

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaInfo)
    });
    if (!resp.ok) throw new Error("Erro ao salvar informação crítica");

    // Fecha modal e limpa campos
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalNovaInfo"));
    modal.hide();
    document.getElementById("formNovaInfo").reset();
    previewInfo.textContent = "Clique ou arraste a imagem aqui";

    carregarInfosCriticas();
  } catch (e) {
    alert(e.message);
  }
});

// Inicialização
carregarInfosCriticas();
