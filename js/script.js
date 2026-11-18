// ===== ELENCO ATUAL DO ATLÉTICO-MG — 2026 =====
const jogadores = [
  { nome: "Everson", posicao: "Goleiro", numero: 22 },
  { nome: "Robert Alves", posicao: "Goleiro", numero: 31 },
  { nome: "Gabriel Delfim", posicao: "Goleiro", numero: 1 },
  { nome: "Pedro Cobra", posicao: "Goleiro", numero: 46 },

  { nome: "Lyanco", posicao: "Zagueiro", numero: 13 },
  { nome: "Léo Duarte", posicao: "Zagueiro", numero: 3 },
  { nome: "Ruan", posicao: "Zagueiro", numero: 4 },
  { nome: "Vitor Hugo", posicao: "Zagueiro", numero: 14 },
  { nome: "Vitão", posicao: "Zagueiro", numero: 40 },

  { nome: "Natanael", posicao: "Lateral", numero: 2 },
  { nome: "Álvaro Preciado", posicao: "Lateral", numero: 23 },
  { nome: "Renan Lodi", posicao: "Lateral", numero: 6 },
  { nome: "Luis Gustavo", posicao: "Lateral", numero: 32 },
  { nome: "Kauã Pascini", posicao: "Lateral", numero: 36 },

  { nome: "Alexsander", posicao: "Meia", numero: 5 },
  { nome: "Alan Franco", posicao: "Meia", numero: 21 },
  { nome: "Tomás Pérez", posicao: "Meia", numero: 25 },
  { nome: "Fred", posicao: "Meia", numero: 7 },
  { nome: "Índio", posicao: "Meia", numero: 38 },
  { nome: "Mamady Cissé", posicao: "Meia", numero: 39 },
  { nome: "Maycon", posicao: "Meia", numero: 8 },
  { nome: "Victor Hugo", posicao: "Meia", numero: 30 },
  { nome: "Igor Gomes", posicao: "Meia", numero: 17 },
  { nome: "Gustavo Scarpa", posicao: "Meia", numero: 10 },
  { nome: "Bernard", posicao: "Meia", numero: 11 },
  { nome: "Kevin Castaño", posicao: "Meia", numero: 15 },

  { nome: "Reinier", posicao: "Atacante", numero: 19 },
  { nome: "Dudu", posicao: "Atacante", numero: 92 },
  { nome: "Tomás Cuello", posicao: "Atacante", numero: 28 },
  { nome: "Cauã Soares", posicao: "Atacante", numero: 29 },
  { nome: "Cassierra", posicao: "Atacante", numero: 9 },
  { nome: "Alan Minda", posicao: "Atacante", numero: 27 },
  { nome: "Thiago Borbas", posicao: "Atacante", numero: 18 }
];

const mensagens = JSON.parse(localStorage.getItem("muralGalo")) || [];
let escalação = [];

function renderJogadores(posicao = "Todos") {
  const container = document.getElementById("jogadores");
  const lista = posicao === "Todos" ? jogadores : jogadores.filter(j => j.posicao === posicao);

  container.innerHTML = lista.map(jogador => `
    <div class="col-sm-6 col-lg-3">
      <article class="player-card">
        <div class="player-img">${jogador.numero}</div>
        <div class="player-body">
          <h3>${jogador.nome}</h3>
          <p>${jogador.posicao} • Camisa ${jogador.numero}</p>
        </div>
      </article>
    </div>
  `).join("");
}

function renderOpcoesEscalacao() {
  const container = document.getElementById("opcoesJogadores");
  container.innerHTML = jogadores.map(jogador => {
    const selecionado = escalação.some(item => item.numero === jogador.numero);
    return `
      <div class="player-option">
        <div>
          <span class="player-name">${jogador.nome}</span>
          <small>${jogador.posicao} • camisa ${jogador.numero}</small>
        </div>
        <button class="btn btn-sm ${selecionado ? "btn-secondary" : "btn-dark"}"
          onclick="alternarJogador(${jogador.numero})">
          ${selecionado ? "Adicionado" : "Adicionar"}
        </button>
      </div>
    `;
  }).join("");
}

function renderEscalacao() {
  const lista = document.getElementById("escalacaoLista");
  const contador = document.getElementById("contadorEscalacao");
  contador.textContent = `${escalação.length} jogador${escalação.length === 1 ? "" : "es"}`;

  if (escalação.length === 0) {
    lista.innerHTML = '<div class="empty-lineup">Nenhum jogador escolhido ainda.<br>Use os botões ao lado para montar seu time.</div>';
  } else {
    lista.innerHTML = escalação.map(jogador => `
      <div class="col-sm-6">
        <div class="lineup-player">
          <strong>${jogador.nome}</strong>
          <small>${jogador.posicao} • #${jogador.numero}</small>
          <button class="btn btn-sm btn-outline-light remove-player"
                  onclick="removerJogador(${jogador.numero})">Remover</button>
        </div>
      </div>
    `).join("");
  }
  renderOpcoesEscalacao();
}

function alternarJogador(numero) {
  const jogador = jogadores.find(item => item.numero === numero);
  if (escalação.some(item => item.numero === numero)) {
    removerJogador(numero);
    return;
  }
  if (escalação.length >= 11) {
    mostrarFeedbackEscalacao("Sua escalação já possui 11 jogadores.", "danger");
    return;
  }
  escalação.push(jogador);
  mostrarFeedbackEscalacao(`${jogador.nome} foi adicionado à escalação.`, "success");
  renderEscalacao();
}

function removerJogador(numero) {
  const jogador = jogadores.find(item => item.numero === numero);
  escalação = escalação.filter(item => item.numero !== numero);
  mostrarFeedbackEscalacao(`${jogador.nome} foi removido da escalação.`, "secondary");
  renderEscalacao();
}

function mostrarFeedbackEscalacao(texto, tipo) {
  const feedback = document.getElementById("feedbackEscalacao");
  feedback.innerHTML = `<div class="alert alert-${tipo} py-2 mb-0">${texto}</div>`;
  setTimeout(() => feedback.innerHTML = "", 2500);
}

function renderMural() {
  const mural = document.getElementById("mural");
  if (mensagens.length === 0) {
    mural.innerHTML = '<p class="text-muted text-center mb-0">Ainda não há mensagens. Seja o primeiro a publicar!</p>';
    return;
  }
  mural.innerHTML = mensagens.map((item, index) => `
    <div class="message">
      <strong>${escapeHTML(item.nome)} <span class="badge text-bg-dark">${item.idade} anos</span></strong>
      <p class="mb-1 mt-2">${escapeHTML(item.mensagem)}</p>
      <small>Mensagem #${index + 1}</small>
    </div>
  `).join("");
}

function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}

document.getElementById("btnHistoria").addEventListener("click", () => {
  const caixa = document.getElementById("curiosidade");
  caixa.classList.remove("d-none");
  caixa.innerHTML = "<strong>Curiosidade:</strong> o Atlético Mineiro é conhecido popularmente como Galo, apelido que se tornou parte central da identidade do clube.";
});

document.querySelectorAll(".filtro-posicao").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".filtro-posicao").forEach(b => {
      b.classList.remove("active", "btn-dark");
      b.classList.add("btn-outline-dark");
    });
    botao.classList.add("active", "btn-dark");
    botao.classList.remove("btn-outline-dark");
    renderJogadores(botao.dataset.posicao);
  });
});

document.getElementById("torcedorForm").addEventListener("submit", event => {
  event.preventDefault();
  const nome = document.getElementById("nome");
  const idade = document.getElementById("idade");
  const mensagem = document.getElementById("mensagem");
  const feedback = document.getElementById("feedback");
  [nome, idade, mensagem].forEach(campo => campo.classList.remove("is-invalid"));
  let valido = true;

  if (nome.value.trim().length < 2) { nome.classList.add("is-invalid"); valido = false; }
  if (!idade.value || Number(idade.value) < 1 || Number(idade.value) > 120) { idade.classList.add("is-invalid"); valido = false; }
  if (mensagem.value.trim().length < 3) { mensagem.classList.add("is-invalid"); valido = false; }

  if (!valido) {
    feedback.innerHTML = '<div class="alert alert-danger">Confira os campos destacados antes de publicar.</div>';
    return;
  }

  mensagens.unshift({nome: nome.value.trim(), idade: Number(idade.value), mensagem: mensagem.value.trim()});
  localStorage.setItem("muralGalo", JSON.stringify(mensagens));
  renderMural();
  event.target.reset();
  feedback.innerHTML = '<div class="alert alert-success">Mensagem publicada com sucesso! ⚫⚪</div>';
});

document.getElementById("limparMural").addEventListener("click", () => {
  if (mensagens.length === 0) return;
  if (confirm("Tem certeza que deseja apagar todas as mensagens?")) {
    mensagens.length = 0;
    localStorage.removeItem("muralGalo");
    renderMural();
  }
});

renderJogadores();
renderEscalacao();
renderMural();
