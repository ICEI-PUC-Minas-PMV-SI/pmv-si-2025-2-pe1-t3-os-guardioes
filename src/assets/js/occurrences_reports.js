const API_URL = "http://localhost:3000/occurrences";

// Elementos do DOM
const cardsContainer = document.getElementById("card-grid");

// Para guardar todas as ocorrências carregadas
let listaOcorrencias = [];

// ID da ocorrência selecionada
let ocorrenciaSelecionadaId = null;

// Carregar apenas ocorrências reportadas
async function carregarOcorrenciasReportadas() {
  cardsContainer.innerHTML = "<p>Carregando...</p>";
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("Erro ao carregar dados");
    const dados = await resp.json();

    // Filtra apenas as reportadas
    listaOcorrencias = dados.filter(o => o.status === "reportada");

    renderCards(listaOcorrencias);
  } catch (e) {
    cardsContainer.innerHTML = `<p style="color:red">Erro: ${e.message}</p>`;
  }
}

// Renderiza os cards
function renderCards(lista) {
  if (!lista || lista.length === 0) {
    cardsContainer.innerHTML = "<p>Nenhuma ocorrência reportada.</p>";
    return;
  }

  cardsContainer.innerHTML = lista.map(oc => `
    <div class="card position-relative">
      <div class="status-icon">
        <i class="fa-solid fa-triangle-exclamation" title="Reportada"></i>
      </div>
      <img src="${oc.image || 'assets/images/ocorrências.jpg'}" alt="Imagem ocorrência">
      <div class="card-content">
        <div class="card-top">
          <span class="bairro">Bairro: ${oc.bairro}</span>
          <i class="fa-solid fa-ellipsis-vertical card-options" data-id="${oc.id}" aria-label="Mais opções"></i>
        </div>
        <p class="tipo">Ocorrência: ${oc.tipoOcorrencia}</p>
        <p class="data">Data: ${formatarData(oc.dataHora)}</p>
        <p class="descricao">${oc.descricao}</p>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".card-options").forEach(btn => {
    btn.addEventListener("click", () => abrirMenuOcorrencia(btn.dataset.id));
  });
}

function formatarData(dataIso) {
  const dt = new Date(dataIso);
  return dt.toLocaleDateString("pt-BR") + " " + dt.toLocaleTimeString("pt-BR", {hour: "2-digit", minute:"2-digit"});
}

// Abre o modal de opções
function abrirMenuOcorrencia(id) {
  ocorrenciaSelecionadaId = id;
  const modal = new bootstrap.Modal(document.getElementById("modalOpcaoReportada"));
  modal.show();
}

// Excluir ocorrência
document.getElementById("btnExcluir").addEventListener("click", async () => {
  if (!ocorrenciaSelecionadaId) return;
  if (!confirm("Deseja realmente excluir esta ocorrência?")) return;

  try {
    const resp = await fetch(`${API_URL}/${ocorrenciaSelecionadaId}`, {method: "DELETE"});
    if (!resp.ok) throw new Error("Erro ao excluir ocorrência");

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalOpcaoReportada"));
    modal.hide();

    carregarOcorrenciasReportadas();
  } catch (e) {
    alert("Erro: " + e.message);
  }
});

// Inicialização
carregarOcorrenciasReportadas();
