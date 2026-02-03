(function () {
  // =============================
  //  Tô na Praia - Chat Widget
  //  WhatsApp: 5521986563334
  // =============================

  // Evita rodar duas vezes (muito comum em construtores)
  if (window.__TNP_CHAT_LOADED__) return;
  window.__TNP_CHAT_LOADED__ = true;

  // ===== CONFIG =====
  var WHATSAPP_NUMBER = "5521986563334";
  var BRAND_NAME = "Tô na Praia";
  var SUBTITLE = "Atendimento rápido";
  var WELCOME = "Oi! 😊 Posso te ajudar?";

  var QUICK = [
    { label: "🛍️ Ver catálogo", text: "Quero ver o catálogo." },
    { label: "🎁 Comprar presente", text: "Quero comprar para presentear." },
    { label: "🚚 Frete / Entrega", text: "Queria saber sobre frete e entrega." },
    { label: "💳 Pagamento", text: "Quais formas de pagamento vocês aceitam?" }
  ];

  // ===== HELPERS =====
  function css(el, rules) { el.style.cssText = rules; return el; }
  function setText(el, t) { el.textContent = t; return el; }

  function el(tag) { return document.createElement(tag); }

  function safeAppend(parent, child) {
    if (!parent || !child) return;
    parent.appendChild(child);
  }

  // ===== MAIN START (espera body existir) =====
  function start() {
    try {
      // Não cria novamente se já existir botão na página
      if (document.getElementById("tnp_chat_btn")) return;

     // -------- Floating CTA (label + button) --------

// Wrapper pra juntar label + botão e flutuar como um conjunto
var wrap = el("div");
wrap.id = "tnp_chat_wrap";
css(wrap,
  "position:fixed;right:18px;bottom:18px;z-index:999999;" +
  "display:flex;flex-direction:column;align-items:flex-end;gap:8px;"
);
safeAppend(document.body, wrap);

// Label acima do botão
var tip = el("div");
tip.id = "tnp_chat_tip";
setText(tip, "Tire suas dúvidas aqui");
css(tip,
  "background:rgba(17,24,39,.92);color:#fff;" +
  "padding:6px 10px;border-radius:12px;" +
  "font:12px Arial;letter-spacing:.2px;" +
  "box-shadow:0 10px 30px rgba(0,0,0,.18);" +
  "backdrop-filter:saturate(140%) blur(6px);" +
  "user-select:none;"
);
safeAppend(wrap, tip);

// Botão azul com ícone SVG (mais bonito que emoji)
var btn = el("button");
btn.type = "button";
btn.id = "tnp_chat_btn";
btn.setAttribute("aria-label", "Abrir chat");
css(btn,
  "width:56px;height:56px;border-radius:16px;border:none;" +
  "background:#2563EB;color:#fff;cursor:pointer;" +
  "display:flex;align-items:center;justify-content:center;" +
  "box-shadow:0 14px 40px rgba(37,99,235,.35);" +
  "transition:transform .12s ease, box-shadow .12s ease;"
);

// Ícone em SVG (balão)
btn.innerHTML =
  '<img src="https://melins-44.github.io/tnp-chat/chat-icon.png" ' +
  'alt="Chat" ' +
  'style="width:30px;height:30px;object-fit:contain;display:block;" />';


btn.onmouseenter = function () {
  btn.style.transform = "translateY(-1px)";
  btn.style.boxShadow = "0 18px 50px rgba(37,99,235,.42)";
};
btn.onmouseleave = function () {
  btn.style.transform = "translateY(0)";
  btn.style.boxShadow = "0 14px 40px rgba(37,99,235,.35)";
};

safeAppend(wrap, btn);


      // -------- Box --------
      var box = el("div");
      box.id = "tnp_chat_box";
      css(box,
        "position:fixed;right:18px;bottom:86px;z-index:999999;" +
        "width:340px;max-width:calc(100vw - 36px);" +
        "border-radius:18px;overflow:hidden;" +
        "box-shadow:0 14px 40px rgba(0,0,0,.25);" +
        "background:#fff;font-family:Arial,sans-serif;display:none;"
      );
      safeAppend(document.body, box);

      // -------- Header --------
      var header = el("div");
      css(header,
        "padding:12px 14px;background:#111827;color:#fff;" +
        "display:flex;align-items:center;justify-content:space-between;"
      );
      safeAppend(box, header);

      var hLeft = el("div");
      safeAppend(header, hLeft);

      var h1 = el("div");
      css(h1, "font-weight:bold;font-size:14px;line-height:1.1;");
      setText(h1, BRAND_NAME);
      safeAppend(hLeft, h1);

      var h2 = el("div");
      css(h2, "font-size:11px;opacity:.85;margin-top:2px;");
      setText(h2, SUBTITLE);
      safeAppend(hLeft, h2);

      var close = el("button");
      close.type = "button";
      setText(close, "✕");
      css(close, "background:transparent;border:none;color:#fff;font-size:18px;cursor:pointer;");
      safeAppend(header, close);

      // -------- Body --------
      var body = el("div");
      body.id = "tnp_chat_body";
      css(body,
        "padding:12px;background:#F3F4F6;height:260px;" +
        "overflow:auto;font-size:13px;"
      );
      safeAppend(box, body);

      // -------- Options --------
      var opt = el("div");
      css(opt,
        "padding:10px 12px;background:#fff;border-top:1px solid #E5E7EB;" +
        "display:flex;gap:8px;flex-wrap:wrap;"
      );
      safeAppend(box, opt);

      // -------- Footer --------
      var footer = el("div");
      css(footer,
        "padding:10px 12px;background:#fff;border-top:1px solid #E5E7EB;" +
        "display:flex;gap:8px;align-items:center;"
      );
      safeAppend(box, footer);

      var input = el("input");
      input.type = "text";
      input.placeholder = "Escreva aqui…";
      css(input,
        "flex:1;border:1px solid #E5E7EB;border-radius:12px;" +
        "padding:10px;font-size:13px;outline:none;"
      );
      safeAppend(footer, input);

      var send = el("button");
      send.type = "button";
      setText(send, "Enviar");
      css(send,
        "border:none;border-radius:12px;padding:10px 14px;" +
        "background:#111827;color:#fff;font-size:13px;cursor:pointer;"
      );
      safeAppend(footer, send);

      // WhatsApp button
      var go = el("button");
      go.type = "button";
      setText(go, "✅ WhatsApp");
      css(go,
        "border:none;border-radius:999px;padding:8px 10px;" +
        "background:#111827;color:#fff;font-size:12px;cursor:pointer;"
      );
      safeAppend(opt, go);

      // -------- Chat logic --------
      var log = [];

      function addBubble(msg, who) {
        var row = el("div");
        css(row,
          "margin:8px 0;display:flex;justify-content:" +
          (who === "user" ? "flex-end" : "flex-start") + ";"
        );

        var b = el("div");
        css(b,
          "max-width:82%;padding:10px 12px;border-radius:14px;" +
          "box-shadow:0 6px 16px rgba(0,0,0,.08);" +
          (who === "user"
            ? "background:#2563EB;color:#fff;border-top-right-radius:6px;"
            : "background:#fff;color:#111827;border-top-left-radius:6px;")
        );
        setText(b, msg);

        safeAppend(row, b);
        safeAppend(body, row);
        body.scrollTop = body.scrollHeight;
      }

      function bot(m) { addBubble(m, "bot"); log.push("Bot: " + m); }
      function user(m) { addBubble(m, "user"); log.push("Cliente: " + m); }

      function botReply(userText) {
        var t = (userText || "").toLowerCase();

        setTimeout(function () {
          if (t.indexOf("cat") >= 0 || t.indexOf("catá") >= 0 || t.indexOf("catalog") >= 0) {
            bot("Você procura mais: brinco, colar, pulseira ou choker?");
          } else if (t.indexOf("frete") >= 0 || t.indexOf("entrega") >= 0 || t.indexOf("bairro") >= 0) {
            bot("Me diz seu bairro/cidade que eu confirmo a entrega 😊");
          } else if (t.indexOf("pag") >= 0 || t.indexOf("pix") >= 0 || t.indexOf("cart") >= 0) {
            bot("Aceitamos Pix e cartão. Você prefere Pix ou cartão?");
          } else if (t.indexOf("presente") >= 0) {
            bot("Boa! Pra quem é o presente e qual faixa de valor você quer gastar?");
          } else {
            bot("Entendi! Se quiser, eu já te levo pro WhatsApp com essa mensagem pronta ✅");
          }
        }, 300);
      }

      function openWpp() {
        var last = log.slice(-14).join("\n");
        var msg = "Oi! Vim do microsite.\n\n" + last + "\n\nQuero continuar por aqui no WhatsApp 🙂";
        var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
        window.open(url, "_blank");
      }

      function mkQuick(label, message) {
        var b = el("button");
        b.type = "button";
        setText(b, label);
        css(b,
          "border:1px solid #E5E7EB;background:#fff;border-radius:999px;" +
          "padding:7px 10px;font-size:12px;cursor:pointer;"
        );
        b.onclick = function () {
          user(message);
          botReply(message);
        };
        // insere antes do botão WhatsApp
        opt.insertBefore(b, go);
      }

      for (var i = 0; i < QUICK.length; i++) {
        mkQuick(QUICK[i].label, QUICK[i].text);
      }

      // -------- Events --------
      function openChat() {
        box.style.display = "block";
        body.innerHTML = "";
        log = [];
        bot(WELCOME);
      }

      btn.onclick = function () {
        var visible = box.style.display === "block";
        box.style.display = visible ? "none" : "block";
        if (!visible) openChat();
      };

      close.onclick = function () { box.style.display = "none"; };

      send.onclick = function () {
        var t = (input.value || "").trim();
        if (!t) return;
        input.value = "";
        user(t);
        botReply(t);
      };

      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") send.click();
      });

      go.onclick = openWpp;

    } catch (e) {
      // Se der erro, ao menos loga para debugging no console
      try { console.error("TNP chat error:", e); } catch (_) {}
    }
  }

  function waitForBody() {
    if (document.body) return start();
    setTimeout(waitForBody, 50);
  }

  // Garante que só executa quando DOM estiver pronto
  if (document.readyState === "complete" || document.readyState === "interactive") {
    waitForBody();
  } else {
    document.addEventListener("DOMContentLoaded", waitForBody);
  }

})();

