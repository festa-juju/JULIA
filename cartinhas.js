/*
  Página de ESCREVER cartinha.

  - A pessoa escreve um recado (nome + mensagem) e envia.
  - A cartinha é salva no Firebase (coleção "cartinhas").
  - Aqui ela NÃO vê as cartinhas das outras pessoas (isso fica no mural, que a
    Julia abre no dia). Você controla/remove tudo pelo painel (admin.html).

  Se o Firebase não estiver configurado, a cartinha fica salva só neste navegador.
*/

(function () {
  "use strict";

  function criarCoracoes() {
    var container = document.getElementById("particulas");
    if (!container) return;
    var emojis = ["💗", "💕", "🎀", "💖", "🌸", "💌"];
    for (var i = 0; i < 18; i++) {
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

  function pegarParametros() {
    var params = new URLSearchParams(window.location.search);
    return { codigo: params.get("c"), nome: params.get("n") };
  }

  // ---- fallback local (quando não há Firebase) ----
  var LOCAL_KEY = "cartinhas_local";
  function salvarLocal(cartinha) {
    var arr = [];
    try { arr = JSON.parse(localStorage.getItem(LOCAL_KEY)) || []; } catch (e) {}
    arr.push(cartinha);
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(arr)); } catch (e) {}
  }

  function getDb() {
    return (typeof getFirestore === "function") ? getFirestore() : null;
  }

  function enviarCartinha(nome, texto, codigo) {
    var db = getDb();
    var cartinha = {
      nome: nome,
      texto: texto,
      codigo: codigo || "",
      criadoEm: new Date().toISOString()
    };
    if (db) {
      return db.collection("cartinhas").add(cartinha);
    }
    salvarLocal(cartinha);
    return Promise.resolve();
  }

  function init() {
    criarCoracoes();

    var p = pegarParametros();

    var inpDe = document.getElementById("de");
    if (p.nome) inpDe.value = p.nome;

    // Botão "voltar ao convite" mantém o link da pessoa
    var btnVoltar = document.getElementById("btn-voltar");
    var voltarUrl = "index.html";
    if (p.codigo) {
      voltarUrl += "?c=" + encodeURIComponent(p.codigo);
      if (p.nome) voltarUrl += "&n=" + encodeURIComponent(p.nome);
    }
    btnVoltar.href = voltarUrl;

    var form = document.getElementById("form-cartinha");
    var msg = document.getElementById("form-msg");
    var btn = document.getElementById("btn-enviar");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = inpDe.value.trim();
      var texto = document.getElementById("texto").value.trim();
      if (!nome || !texto) {
        msg.textContent = "Preencha seu nome e a mensagem 💗";
        return;
      }
      btn.disabled = true;
      msg.textContent = "Enviando sua cartinha...";

      enviarCartinha(nome, texto, p.codigo).then(function () {
        msg.textContent = "Cartinha enviada com carinho! Obrigado 💗";
        document.getElementById("texto").value = "";
        btn.disabled = true;
        btn.textContent = "Cartinha enviada ✓";
      }).catch(function () {
        msg.textContent = "Ops, não deu pra enviar agora. Tente de novo.";
        btn.disabled = false;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
