// URL base do json-server
const API_URL = "http://localhost:3000/occurrences";

// Elementos do DOM
const btnSalvar         = document.getElementById("btnSalvarEvento");
const inputBairro       = document.getElementById("inputBairro");
const selectTipo        = document.getElementById("selectOcorrencia");
const textareaDescricao = document.getElementById("textareaDescricao");
const inputDate         = document.getElementById("inputDate");
const inputTime         = document.getElementById("inputTime");
const imgUpload         = document.getElementById("imgUpload");
const cardsContainer    = document.querySelector(".card-grid");

// Elementos de busca/ordenação
const inputBusca        = document.querySelector(".input-pesquisa");
const btnBusca          = document.querySelector(".btn-pesquisa");
const ordenarAZ         = document.getElementById("ordenar-alfabetica");
const ordenarRecentes   = document.getElementById("ordenar-proximos");

// NOVO: armazena todas as ocorrências carregadas
let listaOcorrencias    = [];

// Carregar cards ao abrir tela de ocorrências
async function carregarOcorrencias() {
  cardsContainer.innerHTML = "<p>Carregando...</p>";
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("Erro ao carregar dados");
    const dados = await resp.json();

    // NOVO: guarda em memória para filtragem/ordenação
    listaOcorrencias = dados;

    renderCards(listaOcorrencias);
  } catch (e) {
    cardsContainer.innerHTML = `<p style="color:red">Erro: ${e.message}</p>`;
  }
}

// Monta os cards na tela
function renderCards(lista) {
  if (!lista || lista.length === 0) {
    cardsContainer.innerHTML = "<p>Nenhuma ocorrência registrada.</p>";
    return;
  }

  cardsContainer.innerHTML = lista
    .map((oc) => `
      <div class="card position-relative">
        <!-- Ícone de status no canto superior direito -->
        <div class="status-icon">
          ${oc.status === "confirmada" ? '<i class="fa-solid fa-circle-check" title="Confirmada"></i>' : ""}
          ${oc.status === "reportada" ? '<i class="fa-solid fa-triangle-exclamation" title="Reportada"></i>' : ""}
        </div>

        <img src="${oc.image || "assets/images/ocorrências.jpg"}" alt="Imagem ocorrência">

        <div class="card-content">
          <!-- Linha superior: bairro (esquerda) + 3 pontinhos (direita) -->
          <div class="card-top">
            <span class="bairro">Bairro: ${oc.bairro}</span>
            <i class="fa-solid fa-ellipsis-vertical card-options" data-id="${oc.id}" aria-label="Mais opções"></i>
          </div>

          <p class="tipo">Ocorrência: ${oc.tipoOcorrencia}</p>
          <p class="data">Data: ${formatarData(oc.dataHora)}</p>
          <p class="descricao">${oc.descricao}</p>
        </div>
      </div>
    `)
    .join("");

  // adiciona evento para abrir o menu de opções
  document.querySelectorAll(".card-options").forEach(btn => {
    btn.addEventListener("click", () => abrirMenuOcorrencia(btn.dataset.id));
  });
}



function formatarData(dataIso) {
  const dt = new Date(dataIso);
  return dt.toLocaleDateString("pt-BR") + " " + dt.toLocaleTimeString("pt-BR", {hour: "2-digit", minute:"2-digit"});
}

// Salvar nova ocorrência
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
        const resp = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaOcorrencia)
        });

        if (!resp.ok) throw new Error("Erro ao salvar");

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

// Converte arquivo para Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader   = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/*  Busca e Ordenação */

// Busca por bairro
function filtrarPorBairro() {
  const termo     = inputBusca.value.toLowerCase().trim();
  const filtradas = listaOcorrencias.filter(o =>
    o.bairro.toLowerCase().includes(termo)
  );
  renderCards(filtradas);
}

// Ordenar A–Z por bairro
ordenarAZ.addEventListener("click", () => {
  const ordenadas = [...listaOcorrencias].sort((a,b) => a.bairro.localeCompare(b.bairro));
  renderCards(ordenadas);
});

// Ordenar por data/hora mais recente
ordenarRecentes.addEventListener("click", () => {
  const ordenadas = [...listaOcorrencias].sort((a,b) =>new Date(b.dataHora) - new Date(a.dataHora));
  renderCards(ordenadas);
});

// Dispara busca ao clicar na lupa ou apertar Enter
btnBusca.addEventListener("click", filtrarPorBairro);
inputBusca.addEventListener("keyup", e => { if (e.key === "Enter") filtrarPorBairro(); });


// Inicialização
carregarOcorrencias();

let ocorrenciaSelecionadaId = null;

// Abre o modal de opções
function abrirMenuOcorrencia(id) {
  ocorrenciaSelecionadaId = id;
  const modal = new bootstrap.Modal(document.getElementById("modalOpcao"));
  modal.show();
}

// Ações dos botões
// Ações dos botões no modal de Opções (modalOpcao)
document.getElementById("btnConfirmar").addEventListener("click", () => atualizarStatus("confirmada"));

document.getElementById("btnReportar").addEventListener("click", () => {
    const modalOpcao = bootstrap.Modal.getInstance(document.getElementById("modalOpcao"));
    modalOpcao.hide();

    // 2. Abrir o novo modal de Reporte
    const modalReporte = new bootstrap.Modal(document.getElementById("modalReporte"));
    modalReporte.show();
});

// Adicione a nova URL da API (assumindo que você configurou o json-server)
const API_REPORTES_URL = "http://localhost:3000/ocorrencias_descricao";

// Elementos do novo modal de Reporte (Você precisará adicioná-los ao HTML)
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
        
        // Se for uma confirmação, fechar o modal de Opções (o de reporte já foi fechado)
        if (novoStatus === "confirmada") {
             const modal = bootstrap.Modal.getInstance(document.getElementById("modalOpcao"));
             modal.hide();
        }

        // Recarrega os cards
        carregarOcorrencias();
    } catch (e) {
        alert("Erro: " + e.message);
        throw e; // Lança o erro para ser capturado pela função de reporte
    }
}

btnSalvarReporte.addEventListener("click", async () => {
    const descricaoReporte = inputDescricaoReporte.value.trim();

    if (!descricaoReporte) {
        alert("Por favor, insira o motivo da denúncia desta ocorrência.");
        return;
    }
    
    // Objeto para salvar no subconjunto 'ocorrencias_descricao'
    const novoReporte = {
        ocorrenciaId: ocorrenciaSelecionadaId,
        descricaoReporte: descricaoReporte,
        userId: 1, // Assumindo que você tem o userId logado
        dataHoraReporte: new Date().toISOString()
    };
    
    try {
        // 1. POST para salvar a descrição do reporte
        const respReporte = await fetch(API_REPORTES_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoReporte)
        });

        if (!respReporte.ok) throw new Error("Erro ao salvar descrição do reporte");

        // 2. Se salvou o reporte, PATCH para atualizar o status da ocorrência para 'reportada'
        await atualizarStatus('reportada'); 
        
        // Limpar o campo e fechar o modal
        inputDescricaoReporte.value = "";
        const modalReporte = bootstrap.Modal.getInstance(document.getElementById("modalReporte"));
        modalReporte.hide();

    } catch (e) {
        alert("Erro ao reportar ocorrência: " + e.message);
    }
});




