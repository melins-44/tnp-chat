(function () {
  // =============================
  //  Tô na Praia - Chat Widget (SendPulse-like)
  //  WhatsApp: 5521986563334
  // =============================

  if (window.__TNP_CHAT_LOADED__ && document.getElementById("tnp_chat_btn")) return;
window.__TNP_CHAT_LOADED__ = true;


  // ===== CONFIG =====
  var WHATSAPP_NUMBER = "5521986563334";
  var BRAND_NAME = "Tô na Praia";
  var SUBTITLE = "Atendimento rápido";

  var WELCOME_1 = "Olá, seja bem-vindo(a) a Tô na Praia";
  var WELCOME_2 = "Escolha uma opção para eu te ajudar:";

  var ICON_URL = "https://melins-44.github.io/tnp-chat/icorobo.png";
  var TIP_TEXT = "Tire suas dúvidas aqui";

  // ===== CORES (Tô na Praia - verde clarinho) =====
  var TNP_BTN_BG = "#DFF5EA";       // verde claro
  var TNP_BTN_BG_HOVER = "#C7EBDD"; // hover
  var TNP_BTN_TEXT = "#065F46";     // verde escuro
  var TNP_LINK = "#0F766E";         // detalhe (se precisar)

  // ===== MENUS =====
  // Menu principal
  var MENU_MAIN = [
    { n: "1", label: "1 - Quem somos", text: "Quem somos", action: "who" },
    { n: "2", label: "2 - Como comprar", text: "Como comprar", action: "how" },
    { n: "3", label: "3 - Fale conosco ↗", text: "Fale conosco", action: "whatsapp" }
  ];

  // Botões finais nas opções 1 e 2
  var ACTION_FOOTER = [
    { label: "Voltar ao Menu", text: "Voltar ao Menu", action: "back_menu" },
    { label: "Falar no WhatsApp ↗", text: "Falar no WhatsApp", action: "whatsapp" }
  ];

  // ===== HELPERS =====
  function el(tag) { return document.createElement(tag); }
  function css(node, rules) { node.style.cssText = rules; return node; }
  function setText(node, t) { node.textContent = t; return node; }
  function safeAppend(parent, child) { if (parent && child) parent.appendChild(child); }
  function safeHeadAppend(styleEl) { try { document.head.appendChild(styleEl); } catch (_) {} }

  function getVH() {
    if (window.visualViewport && window.visualViewport.height) return Math.round(window.visualViewport.height);
    return Math.round(window.innerHeight || document.documentElement.clientHeight || 700);
  }
  function getVW() {
    if (window.visualViewport && window.visualViewport.width) return Math.round(window.visualViewport.width);
    return Math.round(window.innerWidth || document.documentElement.clientWidth || 400);
  }

  function start() {
    try {
      if (document.getElementById("tnp_chat_btn")) return;

      // ---- CSS base ----
      var style = el("style");
      style.textContent = `
        @keyframes tnpPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .tnp-pulse { animation: tnpPulse 2.4s ease-in-out infinite; }
        .tnp-pulse:hover { animation-play-state: paused; }

        /* compacta em telas baixas (paisagem) */
        .tnp-compact #tnp_chat_footer { padding: 8px 10px !important; gap: 6px !important; }
        .tnp-compact #tnp_chat_footer input { padding: 8px !important; font-size: 12px !important; }
        .tnp-compact #tnp_chat_footer button { padding: 8px 10px !important; font-size: 12px !important; }
      `;
      safeHeadAppend(style);

      // -------- Floating CTA (label + button) --------
      var wrap = el("div");
      wrap.id = "tnp_chat_wrap";
      css(wrap,
        "position:fixed;right:18px;bottom:18px;z-index:999999;" +
        "display:flex;flex-direction:column;align-items:flex-end;gap:8px;"
      );
      safeAppend(document.body, wrap);

      var tip = el("div");
      tip.id = "tnp_chat_tip";
      setText(tip, TIP_TEXT);
      css(tip,
        "background:rgba(17,24,39,.92);color:#fff;" +
        "padding:6px 10px;border-radius:12px;" +
        "font:12px Arial;letter-spacing:.2px;" +
        "box-shadow:0 10px 30px rgba(0,0,0,.18);" +
        "backdrop-filter:saturate(140%) blur(6px);" +
        "user-select:none;"
      );
      safeAppend(wrap, tip);

      var btn = el("button");
      btn.type = "button";
      btn.id = "tnp_chat_btn";
      btn.className = "tnp-pulse";
      btn.setAttribute("aria-label", "Abrir chat");
      css(btn,
        "width:56px;height:56px;border:none;background:transparent;" +
        "cursor:pointer;display:flex;align-items:center;justify-content:center;" +
        "padding:0;"
      );
      btn.innerHTML =
        '<img src="' + ICON_URL + '" alt="Chat" ' +
        'style="width:60px;height:60px;object-fit:contain;display:block;' +
        'filter:drop-shadow(0 10px 24px rgba(0,0,0,.25));" />';

      safeAppend(wrap, btn);

      // -------- Box (flex container) --------
      var box = el("div");
      box.id = "tnp_chat_box";
      css(box,
        "position:fixed;right:18px;z-index:999999;" +
        "width:340px;max-width:calc(100vw - 36px);" +
        "border-radius:18px;overflow:hidden;" +
        "box-shadow:0 14px 40px rgba(0,0,0,.25);" +
        "background:#fff;font-family:Arial,sans-serif;" +
        "display:none;flex-direction:column;"
      );
      safeAppend(document.body, box);

      // -------- Header --------
      var header = el("div");
      css(header,
        "padding:12px 14px;background:#111827;color:#fff;" +
        "display:flex;align-items:center;justify-content:space-between;" +
        "flex:0 0 auto;"
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
        "padding:12px;background:#F3F4F6;" +
        "overflow:auto;font-size:13px;" +
        "flex:1 1 auto;min-height:0;"
      );
      safeAppend(box, body);

      // -------- Footer (input fixo) --------
      var footer = el("div");
      footer.id = "tnp_chat_footer";
      css(footer,
        "padding:10px 12px;background:#fff;border-top:1px solid #E5E7EB;" +
        "display:flex;gap:8px;align-items:center;" +
        "flex:0 0 auto;"
      );
      safeAppend(box, footer);

      var input = el("input");
      input.type = "text";
      input.placeholder = "Digite 1, 2 ou 3…";
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

      // ===== Layout (sem cortar em paisagem) =====
      function layoutChat() {
        var vh = getVH();
        var vw = getVW();

        if (vh < 420 || vw > vh) box.classList.add("tnp-compact");
        else box.classList.remove("tnp-compact");

        var wrapH = (wrap && wrap.offsetHeight) ? wrap.offsetHeight : 80;
        var bottomOffset = 18 + wrapH + 10;

        box.style.top = "10px";
        box.style.bottom = bottomOffset + "px";
      }

      window.addEventListener("resize", layoutChat);
      window.addEventListener("orientationchange", function () { setTimeout(layoutChat, 280); });
      if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", layoutChat);
        window.visualViewport.addEventListener("scroll", layoutChat);
      }

      // ===== Chat UI helpers =====
      var log = [];
      var journey = [];      // guarda o caminho (opções escolhidas)
      var lastMenu = null;   // para voltar ao menu atual quando der erro

      function addBubble(msg, who) {
        var row = el("div");
        css(row,
          "margin:8px 0;display:flex;justify-content:" +
          (who === "user" ? "flex-end" : "flex-start") + ";"
        );

        var b = el("div");
        css(b,
          "max-width:86%;padding:10px 12px;border-radius:14px;" +
          "box-shadow:0 6px 16px rgba(0,0,0,.08);" +
          "white-space:pre-line;" +
          (who === "user"
            ? "background:#2563EB;color:#fff;border-top-right-radius:6px;"
            : "background:#fff;color:#111827;border-top-left-radius:6px;")
        );
        setText(b, msg);

        safeAppend(row, b);
        safeAppend(body, row);
        body.scrollTop = body.scrollHeight;
      }

      function addQuickButtons(items) {
        lastMenu = items;

        var block = el("div");
        css(block,
          "margin:8px 0;display:flex;flex-direction:column;gap:10px;" +
          "align-items:stretch;"
        );

        for (var i = 0; i < items.length; i++) {
          (function (it) {
            var qb = el("button");
            qb.type = "button";
            setText(qb, it.label);

            css(qb,
              "width:100%;text-align:center;" +
              "border:1px solid rgba(6,95,70,.15);" +
              "background:" + TNP_BTN_BG + ";" +
              "color:" + TNP_BTN_TEXT + ";" +
              "border-radius:14px;" +
              "padding:12px 14px;" +
              "font-weight:700;font-size:13px;cursor:pointer;" +
              "box-shadow:0 6px 14px rgba(0,0,0,.06);" +
              "transition:all .18s ease;"
            );

            qb.onmouseenter = function () { qb.style.background = TNP_BTN_BG_HOVER; };
            qb.onmouseleave = function () { qb.style.background = TNP_BTN_BG; };

            qb.onclick = function () {
              try { block.remove(); } catch (_) {}

              // Registra o que o cliente clicou
              user(it.text);

              // Ação do botão
              handleAction(it.action, it.text);
            };

            safeAppend(block, qb);
          })(items[i]);
        }

        safeAppend(body, block);
        body.scrollTop = body.scrollHeight;
      }

      function bot(m) { addBubble(m, "bot"); log.push("Bot: " + m); }
      function user(m) { addBubble(m, "user"); log.push("Cliente: " + m); }

      function invalidOption() {
        bot("Desculpe, não consegui entender 😕\nPor favor, escolha uma das opções abaixo.");
        if (lastMenu) setTimeout(function () { addQuickButtons(lastMenu); }, 220);
      }

      function buildWppSummary(extraTag) {
        // Resumo amigável do caminho
        var path = journey.length ? journey.join(" > ") : "Menu inicial";
        var msg =
          "Oi! Passei pelo chatbot da Tô na Praia 😊\n" +
          "Eu naveguei por: " + path + ".\n";

        if (extraTag) msg += "Quero conversar mais com vocês sobre: " + extraTag + ".\n";

        msg += "\nPodem me ajudar?";

        return msg;
      }

      function openWpp(extraTag) {
        var text = buildWppSummary(extraTag);
        var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
        window.open(url, "_blank");
      }

      function normalizeUserText(raw) {
        var t = (raw || "").trim();
        if (!t) return "";

        // captura "1", "2", "3" ou "1 - bla"
        var m = t.match(/^\s*([1-3])\b/);
        if (m && m[1]) return m[1];

        // se o cara digitar por extenso
        var low = t.toLowerCase();
        if (low.indexOf("quem") >= 0) return "1";
        if (low.indexOf("compr") >= 0) return "2";
        if (low.indexOf("fale") >= 0 || low.indexOf("contato




