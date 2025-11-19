// CONFIGURAÇÕES GERAIS
const API_URL           = "http://localhost:3000/occurrences";
const API_BAIRROS       = "http://localhost:3000/bairros";
const API_REPORTES_URL  = "http://localhost:3000/ocorrencias_descricao";

// ELEMENTOS DO DOM
const btnSalvar         = document.getElementById("btnSalvarEvento");
const inputBairro       = document.getElementById("inputBairro");
const selectTipo        = document.getElementById("selectOcorrencia");
const textareaDescricao = document.getElementById("textareaDescricao");
const inputDate         = document.getElementById("inputDate");
const inputTime         = document.getElementById("inputTime");
const imgUpload         = document.getElementById("imgUpload");
const cardsContainer    = document.querySelector(".card-grid");
const datalistBairros   = document.getElementById("listaBairros");

// Busca e ordenação
const inputBusca        = document.querySelector(".input-pesquisa");
const btnBusca          = document.querySelector(".btn-pesquisa");
const ordenarAZ         = document.getElementById("ordenar-alfabetica");
const ordenarRecentes   = document.getElementById("ordenar-proximos");

// VARIÁVEIS GLOBAIS
let listaOcorrencias = [];
let ocorrenciaSelecionadaId = null;

// FUNÇÃO PRINCIPAL - CARREGAR OCORRÊNCIAS
async function carregarOcorrencias() {
  cardsContainer.innerHTML = "<p>Carregando...</p>";
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("Erro ao carregar dados");
    const dados = await resp.json();
    listaOcorrencias = dados;
    renderCards(listaOcorrencias);
  } catch (e) {
    cardsContainer.innerHTML = `<p style="color:red">Erro: ${e.message}</p>`;
  }
}

// MONTAR OS CARDS NA TELA
function renderCards(lista) {
  if (!lista || lista.length === 0) {
    cardsContainer.innerHTML = "<p>Nenhuma ocorrência registrada.</p>";
    return;
  }

  cardsContainer.innerHTML = lista.map((oc) => `
    <div class="card position-relative">
      <div class="status-icon">
        ${oc.status === "confirmada" ? '<i class="fa-solid fa-circle-check" title="Confirmada"></i>' : ""}
        ${oc.status === "reportada" ? '<i class="fa-solid fa-triangle-exclamation" title="Reportada"></i>' : ""}
      </div>

      <img src="${oc.image || "assets/images/ocorrências.jpg"}" alt="Imagem ocorrência">

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

// FORMATAR DATA
function formatarData(dataIso) {
  const dt = new Date(dataIso);
  return dt.toLocaleDateString("pt-BR") + " " + dt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute:"2-digit" });
}

// SALVAR NOVA OCORRÊNCIA
btnSalvar.addEventListener("click", async () => {
  const bairro         = inputBairro.value.trim();
  const tipoOcorrencia = selectTipo.value;
  const descricao      = textareaDescricao.value.trim();
  const data           = inputDate.value;
  const hora           = inputTime.value;

  if (!bairro || !tipoOcorrencia || !descricao || !data || !hora) {
    alert("Preencha todos os campos!");
    return;
  }

  const dataHora = `${data}T${hora}:00`;
  let imageBase64 = "";

  if (imgUpload.files.length > 0) {
    imageBase64 = await fileToBase64(imgUpload.files[0]);
  }

  const novaOcorrencia = { bairro, tipoOcorrencia, descricao, dataHora, image: imageBase64, userId: 1 };

  try {
    // grava o bairro automaticamente, se ainda não existir
    await registrarBairroSeNovo(bairro);

    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaOcorrencia)
    });

    if (!resp.ok) throw new Error("Erro ao salvar ocorrência");

    // Fecha modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();

    // Limpa formulário
    document.querySelector("#staticBackdrop form").reset();
    document.getElementById('preview').textContent = "Clique ou arraste a imagem aqui";

    // Atualiza lista de cards
    carregarOcorrencias();

  } catch (e) {
    alert("Erro ao salvar ocorrência: " + e.message);
  }
});

// CONVERTER ARQUIVO PARA BASE64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// BUSCA E ORDENAÇÃO
function filtrarPorBairro() {
  const termo = inputBusca.value.toLowerCase().trim();
  const filtradas = listaOcorrencias.filter(o => o.bairro.toLowerCase().includes(termo));
  renderCards(filtradas);
}

ordenarAZ.addEventListener("click", () => {
  const ordenadas = [...listaOcorrencias].sort((a,b) => a.bairro.localeCompare(b.bairro));
  renderCards(ordenadas);
});

ordenarRecentes.addEventListener("click", () => {
  const ordenadas = [...listaOcorrencias].sort((a,b) => new Date(b.dataHora) - new Date(a.dataHora));
  renderCards(ordenadas);
});

btnBusca.addEventListener("click", filtrarPorBairro);
inputBusca.addEventListener("keyup", e => { if (e.key === "Enter") filtrarPorBairro(); });

// MODAIS E STATUS

function abrirMenuOcorrencia(id) {
  ocorrenciaSelecionadaId = id;
  const modal = new bootstrap.Modal(document.getElementById("modalOpcao"));
  modal.show();
}

document.getElementById("btnConfirmar").addEventListener("click", () => atualizarStatus("confirmada"));
document.getElementById("btnReportar").addEventListener("click", () => {
  const modalOpcao = bootstrap.Modal.getInstance(document.getElementById("modalOpcao"));
  modalOpcao.hide();
  const modalReporte = new bootstrap.Modal(document.getElementById("modalReporte"));
  modalReporte.show();
});

const inputDescricaoReporte = document.getElementById("inputDescricaoReporte");
const btnSalvarReporte = document.getElementById("btnSalvarReporte");

async function atualizarStatus(novoStatus) {
  if (!ocorrenciaSelecionadaId) return;

  try {
    const resp = await fetch(`${API_URL}/${ocorrenciaSelecionadaId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus })
    });

    if (!resp.ok) throw new Error("Erro ao atualizar status");

    if (novoStatus === "confirmada") {
      const modal = bootstrap.Modal.getInstance(document.getElementById("modalOpcao"));
      modal.hide();
    }

    carregarOcorrencias();
  } catch (e) {
    alert("Erro: " + e.message);
  }
}

btnSalvarReporte.addEventListener("click", async () => {
  const descricaoReporte = inputDescricaoReporte.value.trim();

  if (!descricaoReporte) {
    alert("Por favor, insira o motivo da denúncia desta ocorrência.");
    return;
  }

  const novoReporte = {
    ocorrenciaId: ocorrenciaSelecionadaId,
    descricaoReporte,
    userId: 1,
    dataHoraReporte: new Date().toISOString()
  };

  try {
    const respReporte = await fetch(API_REPORTES_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoReporte)
    });

    if (!respReporte.ok) throw new Error("Erro ao salvar descrição do reporte");
    await atualizarStatus('reportada');

    inputDescricaoReporte.value = "";
    const modalReporte = bootstrap.Modal.getInstance(document.getElementById("modalReporte"));
    modalReporte.hide();
  } catch (e) {
    alert("Erro ao reportar ocorrência: " + e.message);
  }
});

// GERENCIAMENTO DE BAIRROS

// Carrega sugestões de bairros da cidade/UF do usuário
async function carregarBairrosSugeridos() {
  const cidade = localStorage.getItem("userCidade");
  const uf     = localStorage.getItem("userUF");

  if (!cidade || !uf) {
    datalistBairros.innerHTML = "";
    return;
  }

  try {
    const resp = await fetch(`${API_BAIRROS}?cidade=${encodeURIComponent(cidade)}&uf=${encodeURIComponent(uf)}`);
    if (!resp.ok) throw new Error("Erro ao buscar bairros");
    const dados = await resp.json();

    const nomes = Array.from(dados.reduce((set, item) => {
      if (item && item.bairro) set.add(item.bairro.trim());
      return set;
    }, new Set()));

    datalistBairros.innerHTML = "";
    nomes.sort((a,b) => a.localeCompare(b, 'pt-BR')).forEach(n => {
      const opt = document.createElement("option");
      opt.value = n;
      datalistBairros.appendChild(opt);
    });
  } catch (e) {
    console.error("Erro ao carregar bairros sugeridos:", e);
    datalistBairros.innerHTML = "";
  }
}

// Registra novo bairro se não existir
async function registrarBairroSeNovo(nomeBairro) {
  const cidade = localStorage.getItem("userCidade");
  const uf     = localStorage.getItem("userUF");
  const userId = localStorage.getItem("userId") || null;

  if (!nomeBairro || !cidade || !uf) return;

  const nomeTrim = nomeBairro.trim();

  try {
    const resp = await fetch(`${API_BAIRROS}?cidade=${encodeURIComponent(cidade)}&uf=${encodeURIComponent(uf)}&bairro=${encodeURIComponent(nomeTrim)}`);
    if (!resp.ok) throw new Error("Erro na verificação de bairro");

    const encontrados = await resp.json();
    const existe = encontrados.some(b => b.bairro && b.bairro.trim().toLowerCase() === nomeTrim.toLowerCase());

    if (!existe) {
      const novo = { bairro: nomeTrim, cidade, uf, userId };
      const postResp = await fetch(API_BAIRROS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo)
      });

      if (!postResp.ok) throw new Error("Erro ao salvar novo bairro");

      const opt = document.createElement("option");
      opt.value = nomeTrim;
      datalistBairros.appendChild(opt);
    }
  } catch (e) {
    console.error("Erro ao registrar bairro.", e);
  }
}

// INICIALIZAÇÃO
window.addEventListener("DOMContentLoaded", () => {
  carregarOcorrencias();
  carregarBairrosSugeridos();
});
