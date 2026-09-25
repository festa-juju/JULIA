/*
  Lógica do convite.

  1. Lê o código do convidado da URL (?c=CODIGO).
  2. Procura esse código na lista CONVIDADOS (definida em convidados.js).
  3. Se encontrar, personaliza o convite com o nome da pessoa.
  4. Se não encontrar, mostra a tela de "convite não encontrado".
  5. Guarda a resposta de presença (RSVP) no próprio navegador do convidado.
*/

(function () {
  "use strict";

  // ---- utilidades de tela ----
  function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(function (el) {
      el.hidden = el.id !== id;
    });
  }

  // ---- corações animados no fundo ----
  function criarCoracoes() {
    var container = document.getElementById("particulas");
    if (!container) return;
    var emojis = ["💗", "💕", "🎀", "💖", "🌸"];
    for (var i = 0; i < 22; i++) {
      var c = document.createElement("span");
      c.className = "coracao";
      c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      c.style.left = Math.random() * 100 + "vw";
      c.style.animationDuration = 6 + Math.random() * 8 + "s";
      c.style.animationDelay = Math.random() * 8 + "s";
      c.style.fontSize = 16 + Math.random() * 18 + "px";
      container.appendChild(c);
    }
  }

  // ---- lê o código da URL ----
  function pegarParametros() {
    var params = new URLSearchParams(window.location.search);
    return { codigo: params.get("c"), nome: params.get("n") };
  }

  // Descobre o convidado a partir da URL.
  // 1) Se o código existir na lista CONVIDADOS, usa o nome de lá.
  // 2) Senão, se o link trouxer o nome embutido (?n=), usa esse nome.
  // Isso faz os links gerados no painel funcionarem sem precisar editar convidados.js.
  function acharConvidado(codigo, nomeUrl) {
    if (typeof CONVIDADOS !== "undefined" && codigo) {
      var achado = CONVIDADOS.find(function (c) { return c.codigo === codigo; });
      if (achado) return achado;
    }
    if (codigo && nomeUrl) {
      return { codigo: codigo, nome: nomeUrl };
    }
    return null;
  }

  // ---- preenche os dados da festa no convite ----
  function preencherFesta() {
    document.getElementById("nome-aniversariante").textContent = FESTA.aniversariante;
    document.getElementById("idade").textContent = FESTA.idade + " anos";
    document.getElementById("data").textContent =
      FESTA.data + (FESTA.diaSemana ? " (" + FESTA.diaSemana + ")" : "");
    document.getElementById("horario").textContent = FESTA.horario;
    document.getElementById("local").textContent = FESTA.local;
    document.getElementById("aviso-segredo").textContent = FESTA.observacao;
    document.title = "Convite para você 💌";
  }

  // ---- RSVP: salva/lê a resposta no navegador do convidado ----
  function chaveRsvp(codigo) { return "rsvp_" + codigo; }

  function carregarRsvp(codigo) {
    try { return localStorage.getItem(chaveRsvp(codigo)); }
    catch (e) { return null; }
  }

  function salvarRsvp(codigo, resposta) {
    try { localStorage.setItem(chaveRsvp(codigo), resposta); }
    catch (e) { /* modo privado pode bloquear; segue sem quebrar */ }
  }

  function mostrarInstrucoes(mostrar) {
    var bloco = document.getElementById("instrucoes");
    if (!bloco) return;
    bloco.hidden = !mostrar;
    if (!mostrar) return;

    // Preenche a lista "o que levar"
    var ul = document.getElementById("lista-instrucoes");
    ul.innerHTML = "";
    (FESTA.instrucoesPresenca || []).forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });

    // Link da localização
    var mapa = document.getElementById("btn-mapa");
    if (FESTA.linkLocalizacao) {
      mapa.href = FESTA.linkLocalizacao;
      mapa.hidden = false;
    } else {
      mapa.hidden = true;
    }
  }

  function atualizarStatusRsvp(resposta) {
    var status = document.getElementById("rsvp-status");
    if (resposta === "sim") {
      status.textContent = "🎉 Presença confirmada! Que bom que você vem!";
      mostrarInstrucoes(true);
    } else if (resposta === "nao") {
      status.textContent = "😢 Tudo bem, você vai fazer falta!";
      mostrarInstrucoes(false);
    } else {
      status.textContent = "";
      mostrarInstrucoes(false);
    }
  }

  // Envia a resposta para o Firebase (se estiver configurado).
  // Assim a confirmação chega ao painel do organizador em qualquer aparelho.
  function enviarRsvpNuvem(convidado, resposta) {
    try {
      var db = (typeof getFirestore === "function") ? getFirestore() : null;
      if (!db) return; // sem Firebase: segue só com o localStorage
      db.collection("presencas").doc(convidado.codigo).set({
        codigo: convidado.codigo,
        nome: convidado.nome,
        resposta: resposta,
        atualizadoEm: new Date().toISOString()
      });
    } catch (e) {
      // Se falhar (sem internet, config errada), não quebra o convite.
    }
  }

  function configurarRsvp(convidado) {
    document.getElementById("ola-rsvp").textContent =
      "Confirmando para: " + convidado.nome;

    var respostaSalva = carregarRsvp(convidado.codigo);
    atualizarStatusRsvp(respostaSalva);

    document.querySelectorAll(".rsvp-botoes .botao").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var resp = btn.getAttribute("data-resp");
        salvarRsvp(convidado.codigo, resp);
        atualizarStatusRsvp(resp);
        enviarRsvpNuvem(convidado, resp);
      });
    });
  }

  // ---- início ----
  function init() {
    criarCoracoes();

    var p = pegarParametros();
    var convidado = acharConvidado(p.codigo, p.nome);

    if (!convidado) {
      mostrarTela("tela-invalido");
      return;
    }

    // Personaliza a saudação da tela de abertura
    document.getElementById("ola-convidado").textContent =
      "Olá, " + convidado.nome + "!";

    preencherFesta();
    configurarRsvp(convidado);

    mostrarTela("tela-abertura");

    document.getElementById("btn-abrir").addEventListener("click", function () {
      mostrarTela("tela-convite");
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
