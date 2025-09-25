// URL base do json-server
const API_URL = "http://localhost:3000/occurrences";

// Elementos do DOM
const btnSalvar = document.getElementById("btnSalvarEvento");
const inputBairro = document.getElementById("inputTitle");
const selectTipo = document.getElementById("selectOcorrencia");
const textareaDescricao = document.getElementById("textareaDescricao");
const inputDate = document.getElementById("inputDate");
const inputTime = document.getElementById("inputTime");
const imgUpload = document.getElementById("imgUpload");
const cardsContainer = document.querySelector(".card-grid");

// NOVO: elementos de busca/ordenação
const inputBusca = document.querySelector(".input-pesquisa");
const btnBusca = document.querySelector(".btn-pesquisa");
const ordenarAZ = document.getElementById("ordenar-alfabetica");
const ordenarRecentes = document.getElementById("ordenar-proximos");

// NOVO: armazena todas as ocorrências carregadas
let listaOcorrencias = [];

// Carregar cards ao abrir
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
  if (lista.length === 0) {
    cardsContainer.innerHTML = "<p>Nenhuma ocorrência registrada.</p>";
    return;
  }

  cardsContainer.innerHTML = lista
    .map(
      (oc) => `
      <div class="card">
        <img src="${oc.image || "assets/images/ocorrências.jpg"}" alt="Imagem ocorrência">
        <div class="card-content">
          <h1>Bairro: ${oc.bairro}</h1>
          <h1>Ocorrência: ${oc.tipoOcorrencia}</h1>
          <h1>Data: ${formatarData(oc.dataHora)}</h1>
          <p>${oc.descricao}</p>
        </div>
      </div>`
    )
    .join("");
}

function formatarData(dataIso) {
  const dt = new Date(dataIso);
  return dt.toLocaleDateString("pt-BR") + " " + dt.toLocaleTimeString("pt-BR", {hour: "2-digit", minute:"2-digit"});
}

// Salvar nova ocorrência
btnSalvar.addEventListener("click", async (e) => {
  e.preventDefault();

  const bairro = inputBairro.value.trim();
  const tipoOcorrencia = selectTipo.value;
  const descricao = textareaDescricao.value.trim();
  const data = inputDate.value;
  const hora = inputTime.value;

  if (!bairro || !tipoOcorrencia || !descricao || !data || !hora) {
    alert("Preencha todos os campos!");
    return;
  }

  const dataHora = `${data}T${hora}:00`;

  let imageBase64 = "";
  if (imgUpload.files.length > 0) {
    imageBase64 = await fileToBase64(imgUpload.files[0]);
  }

  const novaOcorrencia = {bairro, tipoOcorrencia, descricao, dataHora, image: imageBase64, userId: 1};

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaOcorrencia),
    });

    if (!resp.ok) throw new Error("Erro ao salvar");

    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();

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
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ---------- NOVO: BUSCA E ORDENAÇÃO ---------- */

// Busca por bairro
function filtrarPorBairro() {
  const termo = inputBusca.value.toLowerCase().trim();
  const filtradas = listaOcorrencias.filter(o =>
    o.bairro.toLowerCase().includes(termo)
  );
  renderCards(filtradas);
}

// Ordenar A–Z por bairro
ordenarAZ.addEventListener("click", () => {
  const ordenadas = [...listaOcorrencias].sort((a,b) =>
    a.bairro.localeCompare(b.bairro)
  );
  renderCards(ordenadas);
});

// Ordenar por data/hora mais recente
ordenarRecentes.addEventListener("click", () => {
  const ordenadas = [...listaOcorrencias].sort((a,b) =>
    new Date(b.dataHora) - new Date(a.dataHora)
  );
  renderCards(ordenadas);
});

// Dispara busca ao clicar na lupa ou apertar Enter
btnBusca.addEventListener("click", filtrarPorBairro);
inputBusca.addEventListener("keyup", e => { if (e.key === "Enter") filtrarPorBairro(); });

/* -------------------------------------------- */

// Inicialização
carregarOcorrencias();
