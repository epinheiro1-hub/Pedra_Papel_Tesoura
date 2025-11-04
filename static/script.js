let turno = 1; // 1 = jogador1, 2 = jogador2
let vitorias1 = 0;
let vitorias2 = 0;

function jogar(escolha) {
  fetch("/jogar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ escolha: escolha })
  })
  .then(res => res.json())
  .then(data => {
    const mensagem = data.mensagem;
    document.getElementById("resultado").innerText = mensagem;

    // Atualiza turno com base na mensagem
    if (mensagem.includes("Jogador 2, sua vez")) {
      turno = 2;
      atualizarMensagemTurno();
      return;
    }

    // Se chegou aqui, é porque foi a vez do jogador 2 e temos resultado
    turno = 1;
    atualizarMensagemTurno();
    atualizarPlacar(mensagem);
  })
  .catch(error => {
    console.error("Erro ao jogar:", error);
    document.getElementById("resultado").innerText = "Erro ao processar jogada.";
  });
}

function atualizarMensagemTurno() {
  const texto = turno === 1 ? "Jogador 1, faça sua escolha:" : "Jogador 2, faça sua escolha:";
  document.getElementById("mensagem").innerText = texto;
}

function atualizarPlacar(mensagem) {
  if (mensagem.includes("Jogador 1 venceu")) {
    vitorias1++;
    document.getElementById("vitorias1").innerText = vitorias1;
  } else if (mensagem.includes("Jogador 2 venceu")) {
    vitorias2++;
    document.getElementById("vitorias2").innerText = vitorias2;
  }
}
