function verificarStatus() {
  const agora = new Date();
  const dia = agora.getDay(); 
  const hora = agora.getHours();
  const minutos = agora.getMinutes();
  const horaAtualEmMinutos = (hora * 60) + minutos;

  let estaAberto = false;

  if (dia >= 1 && dia <= 5) {
    if (horaAtualEmMinutos >= 870 && horaAtualEmMinutos < 1440) estaAberto = true;
  } else if (dia === 6) {
    if (horaAtualEmMinutos >= 630 || horaAtualEmMinutos < 60) estaAberto = true;
  } else if (dia === 0) {
    if (horaAtualEmMinutos < 60) estaAberto = true;
  }

  const texto = document.getElementById("texto-status");
  const ponto = document.getElementById("ponto-status");

  if (!texto || !ponto) return;

  if (estaAberto) {
    texto.innerText = "ABERTO AGORA";
    texto.style.color = "#00FF00";
    ponto.style.color = "#00FF00";
  } else {
    texto.innerText = "FECHADO NO MOMENTO";
    texto.style.color = "#FF0000";
    ponto.style.color = "#FF0000";
  }
}

function toggleChat() {
  document.getElementById("chat-container").classList.toggle("hidden");
}

async function perguntarIA() {
  const input = document.getElementById("pergunta-ia");
  const area = document.getElementById("chat-mensagens");
  const pergunta = input.value.trim();

  if (!pergunta) return;

  area.innerHTML += `<div class="msg-user">${pergunta}</div>`;
  input.value = "";

  const loading = document.createElement("div");
  loading.className = "msg-ia";
  loading.innerText = "Pensando aqui no balcão... 🍺";
  area.appendChild(loading);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta })
    });

    const data = await res.json();
    loading.remove();

    area.innerHTML += `<div class="msg-ia">${data.resposta}</div>`;
  } catch {
    loading.innerText = "Deu ruim aqui 😅 tenta de novo!";
  }
}

window.onload = () => {
  verificarStatus();
  setInterval(verificarStatus, 60000);
};

console.log("OI")
