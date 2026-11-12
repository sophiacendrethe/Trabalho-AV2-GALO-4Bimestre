// Dados iniciais: array utilizado pela aplicação.
const jogadores = [
    { nome: "Hulk", posicao: "Atacante", numero: 7 },
    { nome: "Guilherme Arana", posicao: "Lateral", numero: 13 },
    { nome: "Everson", posicao: "Goleiro", numero: 22 },
    { nome: "Bernard", posicao: "Meia", numero: 20 }
];

const mensagens = JSON.parse(localStorage.getItem("muralGalo")) || [];

function renderJogadores() {
    const container = document.getElementById("jogadores");
    container.innerHTML = jogadores.map(jogador => `
    <div class="col-sm-6 col-lg-3">
      <article class="player-card">
        <div class="player-img">${jogador.numero}</div>
        <div class="player-body">
          <h3>${jogador.nome}</h3>
          <p>${jogador.posicao}</p>
        </div>
      </article>
    </div>
  `).join("");
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
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[char]));
}

document.getElementById("btnHistoria").addEventListener("click", () => {
    const caixa = document.getElementById("curiosidade");
    caixa.classList.remove("d-none");
    caixa.innerHTML = "<strong>Curiosidade:</strong> o Atlético Mineiro é conhecido popularmente como Galo, apelido que se tornou parte central da identidade do clube.";
});

document.getElementById("torcedorForm").addEventListener("submit", event => {
    event.preventDefault();

    const nome = document.getElementById("nome");
    const idade = document.getElementById("idade");
    const mensagem = document.getElementById("mensagem");
    const feedback = document.getElementById("feedback");

    [nome, idade, mensagem].forEach(campo => campo.classList.remove("is-invalid"));

    let valido = true;
    if (nome.value.trim().length < 2) { nome.classList.add("is-invalid");
        valido = false; }
    if (!idade.value || Number(idade.value) < 1 || Number(idade.value) > 120) { idade.classList.add("is-invalid");
        valido = false; }
    if (mensagem.value.trim().length < 3) { mensagem.classList.add("is-invalid");
        valido = false; }

    if (!valido) {
        feedback.innerHTML = '<div class="alert alert-danger">Confira os campos destacados antes de publicar.</div>';
        return;
    }

    mensagens.unshift({
        nome: nome.value.trim(),
        idade: Number(idade.value),
        mensagem: mensagem.value.trim()
    });

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
renderMural();