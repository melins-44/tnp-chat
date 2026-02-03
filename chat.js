(function () {
  // =============================
  //  Tô na Praia - Chat Widget
  // =============================

  // Evita execução duplicada
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
  function el(t) { return document.createElement(t); }
  function css(e, r) { e.style.cssText = r; return e; }
  function txt(e, t) { e.textContent = t; return e; }
  function add(p, c) { if (p && c) p.appendChild(c); }

  // ===== START =====
  function start() {

    // ===== CSS animação pulsar =====
    var style = el("style");
    style.textContent = `
      @keyframes tnpPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.06); }
        100% { transform: scale(1); }
      }
      .tnp-pulse {
        animation: tnpPulse 2.4s ease-in-out infinite;
      }
      .tnp-pulse:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);

    // Evita recriar
    if (document.getElementById("tnp_chat_btn")) return;

    // ===== Floating CTA =====
    var wrap = el("div");
    css(wrap,
      "position:fixed;right:18px;bottom:18px;z-index:999999;" +
      "display:flex;flex-direction:column;align-items:flex-end;gap:8px;"
    );
    add(document.body, wrap);

    var tip = el("div");
    txt(tip, "Tire suas dúvidas aqui");
    css(tip,
      "background:rgba(17,24,39,.92);color:#fff;" +
      "padding:6px 10px;border-radius:12px;font:12px Arial;" +
      "box-shadow:0 10px 30px rgba(0,0,0,.18);" +
      "user-select:none;"
    );
    add(wrap, tip);

    var btn = el("button");
    btn.id = "tnp_chat_btn";
    btn.className = "tnp-pulse";
    css(btn,
      "width:56px;height:56px;border:none;background:transparent;" +
      "cursor:pointer;padding:0;"
    );

    btn.innerHTML =
      '<img src="https://melins-44.github.io/tnp-chat/chat-icon.png" ' +
      'style="width:40px;height:40px;display:block;' +
      'filter:drop-shadow(0 10px 24px rgba(0,0,0,.25));" />';

    add(wrap, btn);

    // ===== Chat Box =====
    var box = el("div");
    css(box,
      "position:fixed;right:18px;bottom:86px;z-index:999999;" +
      "width:340px;max-width:calc(100vw - 36px);" +
      "border-radius:18px;overflow:hidden;" +
      "box-shadow:0 14px 40px rgba(0,0,0,.25);" +
      "background:#fff;font-family:Arial;display:none;"
    );
    add(document.body, box);

    var header = el("div");
    css(header,
      "padding:12px 14px;background:#111827;color:#fff;" +
      "display:flex;justify-content:space-between;"
    );
    add(box, header);

    var h = el("div");
    txt(h, BRAND_NAME);
    css(h, "font-weight:bold;font-size:14px;");
    add(header, h);

    var close = el("button");
    txt(close, "✕");
    css(close, "background:none;border:none;color:#fff;font-size:18px;cursor:pointer;");
    add(header, close);

    var body = el("div");
    css(body, "padding:12px;background:#F3F4F6;overflow:auto;font-size:13px;");
    add(box, body);

    var opt = el("div");
    css(opt,
      "padding:10px;background:#fff;border-top:1px solid #E5E7EB;" +
      "display:flex;gap:8px;flex-wrap:wrap;"
    );
    add(box, opt);

    var footer = el("div");
    css(footer,
      "padding:10px;background:#fff;border-top:1px solid #E5E7EB;" +
      "display:flex;gap:8px;"
    );
    add(box, footer);

    var input = el("input");
    input.placeholder = "Escreva aqui…";
    css(input, "flex:1;padding:10px;border-radius:12px;border:1px solid #E5E7EB;");
    add(footer, input);

    var send = el("button");
    txt(send, "Enviar");
    css(send,
      "background:#111827;color:#fff;border:none;" +
      "padding:10px 14px;border-radius:12px;cursor:pointer;"
    );
    add(footer, send);

    var go = el("button");
    txt(go, "WhatsApp");
    css(go,
      "border:none;background:#111827;color:#fff;" +
      "padding:8px 12px;border-radius:999px;cursor:pointer;"
    );
    add(opt, go);

    // ===== Layout Responsivo =====
    function layoutChat() {
      var vh = window.innerHeight;
      var maxH = vh - 28;
      box.style.maxHeight = maxH + "px";
      body.style.height = (maxH - header.offsetHeight - footer.offsetHeight - opt.offsetHeight) + "px";
    }

    // ===== Chat Logic =====
    var log = [];

    function bubble(t, me) {
      var r = el("div");
      css(r, "margin:6px 0;display:flex;justify-content:" + (me ? "flex-end" : "flex-start"));
      var b = el("div");
      txt(b, t);
      css(b,
        "max-width:80%;padding:10px;border-radius:14px;" +
        (me ? "background:#2563EB;color:#fff;" : "background:#fff;color:#111;")
      );
      add(r, b); add(body, r); body.scrollTop = body.scrollHeight;
    }

    function bot(t) { bubble(t, false); log.push("Bot: " + t); }
    function user(t) { bubble(t, true); log.push("Cliente: " + t); }

    function openChat() {
      box.style.display = "block";
      btn.classList.remove("tnp-pulse");
      body.innerHTML = "";
      log = [];
      bot(WELCOME);
      layoutChat();
    }

    btn.onclick = function () {
      var v = box.style.display === "block";
      box.style.display = v ? "none" : "block";
      if (!v) openChat();
    };

    close.onclick = function () {
      box.style.display = "none";
      btn.classList.add("tnp-pulse");
    };

    send.onclick = function () {
      if (!input.value) return;
      user(input.value);
      input.value = "";
    };

    go.onclick = function () {
      window.open("https://wa.me/" + WHATSAPP_NUMBER, "_blank");
    };

    window.addEventListener("resize", layoutChat);
    window.addEventListener("orientationchange", function () {
      setTimeout(layoutChat, 300);
    });
  }

  function wait() {
    if (document.body) start();
    else setTimeout(wait, 50);
  }

  wait();
})();
