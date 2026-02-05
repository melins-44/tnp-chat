(function () {
  // =============================
  //  Tô na Praia - Chat Widget
  //  WhatsApp: 5521986563334
  // =============================

  // Não trava em SPA: se já carregou mas não existe botão, recria
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
  var TNP_BTN_BG = "#DFF5EA";
  var TNP_BTN_BG_HOVER = "#C7EBDD";
  var TNP_BTN_TEXT = "#065F46";

  // ===== MENUS =====
  // Menu principal
  var MENU_MAIN = [
    { label: "1 - Quem somos", action: "who" },
    { label: "2 - Como comprar", action: "how" },
    { label: "3 - Fale conosco ↗", action: "whatsapp" }
  ];

  // Menu de ações (aparece ao final do Quem somos / Como comprar)
  var MENU_ACTIONS = [
    { label: "1 - Voltar ao Menu", action: "back_menu" },
    { label: "2 - Falar no WhatsApp ↗", action: "whatsapp" }
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

  function textWhoWeAre() {
    return (
      "A Tô na Praia é uma marca criada pela Tati com um propósito simples: levar a energia do mar para o seu dia a dia 🌊\n\n" +
      "A gente trabalha com peças escolhidas com carinho (bijus e acessórios com vibe praiana), pensando em:\n" +
      "• leveza e estilo\n" +
      "• bom gosto para usar ou presentear\n" +
      "• atendimento humano e próximo\n\n" +
      "Se quiser, eu te levo para conversar no WhatsApp e te ajudar a escolher a peça ideal 🙂"
    );
  }

  function textHowToBuy() {
    return (
      "Você pode comprar de um jeito bem fácil 😊\n\n" +
      "1) Baixar o nosso catálogo para conhecer as peças e nos chamar no WhatsApp.\n\n" +
      "2) Ou, de forma mais prática, clicar nos produtos desejados, montar seu carrinho de compras e encerrar a compra diretamente com a gente, no WhatsApp.\n\n" +
      "Se quiser, eu já te levo para o WhatsApp com uma mensagem pronta ✅"
    );
  }

  function start() {
    try {
      // limpa instâncias antigas (se NextGo mexer no DOM)
      var oldBtn = document.getElementById("tnp_chat_btn");
      var oldBox = document.getElementById("tnp_chat_box");
      var oldWrap = document.getElementById("tnp_chat_wrap");
      if (oldBtn && oldBtn.parentNode) oldBtn.parentNode.removeChild(oldBtn);
      if (oldBox && oldBox.parentNode) oldBox.parentNode.removeChild(oldBox);
      if (oldWrap && oldWrap.parentNode) oldWrap.parentNode.removeChild(oldWrap);

      // CSS
      var style = el("style");
      style.textContent =
        "@keyframes tnpPulse{0%{transform:scale(1)}50%{transform:scale(1.06)}100%{transform:scale(1)}}" +
        ".tnp-pulse{animation:tnpPulse 2.4s ease-in-out infinite}" +
        ".tnp-pulse:hover{animation-play-state:paused}" +
        ".tnp-compact #tnp_chat_footer{padding:8px 10px!important;gap:6px!important}" +
        ".tnp-compact #tnp_chat_footer input{padding:8px!important;font-size:12px!important}" +
        ".tnp-compact #tnp_chat_footer button{padding:8px 10px!important;font-size:12px!important}";
      safeHeadAppend(style);

      // Wrap
      var wrap = el("div");
      wrap.id = "tnp_chat_wrap";
      css(wrap, "position:fixed;right:18px;bottom:18px;z-index:999999;display:flex;flex-direction:column;align-items:flex-end;gap:8px;");
      safeAppend(document.body, wrap);

      var tip = el("div");
      tip.id = "tnp_chat_tip";
      setText(tip, TIP_TEXT);
      css(tip, "background:rgba(17,24,39,.92);color:#fff;padding:6px 10px;border-radius:12px;font:12px Arial;box-shadow:0 10px 30px rgba(0,0,0,.18);user-select:none;");
      safeAppend(wrap, tip);

      var btn = el("button");
      btn.type = "button";
      btn.id = "tnp_chat_btn";
      btn.className = "tnp-pulse";
      btn.setAttribute("aria-label", "Abrir chat");
      css(btn, "width:56px;height:56px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;");
      btn.innerHTML = '<img src="' + ICON_URL + '" alt="Chat" style="width:60px;height:60px;object-fit:contain;display:block;filter:drop-shadow(0 10px 24px rgba(0,0,0,.25));" />';
      safeAppend(wrap, btn);

      // Box
      var box = el("div");
      box.id = "tnp_chat_box";
      css(box, "position:fixed;right:18px;z-index:999999;width:340px;max-width:calc(100vw - 36px);border-radius:18px;overflow:hidden;box-shadow:0 14px 40px rgba(0,0,0,.25);background:#fff;font-family:Arial,sans-serif;display:none;flex-direction:column;");
      safeAppend(document.body, box);

      // Header
      var header = el("div");
      css(header, "padding:12px 14px;background:#111827;color:#fff;display:flex;align-items:center;justify-content:space-between;flex:0 0 auto;");
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
      setText(close, "X");
      css(close, "background:transparent;border:none;color:#fff;font-size:18px;cursor:pointer;");
      safeAppend(header, close);

      // Body
      var body = el("div");
      body.id = "tnp_chat_body";
      css(body, "padding:12px;background:#F3F4F6;overflow:auto;font-size:13px;flex:1 1 auto;min-height:0;");
      safeAppend(box, body);

      // Footer
      var footer = el("div");
      footer.id = "tnp_chat_footer";
      css(footer, "padding:10px 12px;background:#fff;border-top:1px solid #E5E7EB;display:flex;gap:8px;align-items:center;flex:0 0 auto;");
      safeAppend(box, footer);

      var input = el("input");
      input.type = "text";
      input.placeholder = "Digite 1, 2, 3... ou 'menu' / 'whatsapp'";
      css(input, "flex:1;border:1px solid #E5E7EB;border-radius:12px;padding:10px;font-size:13px;outline:none;");
      safeAppend(footer, input);

      var send = el("button");
      send.type = "button";
      setText(send, "Enviar");
      css(send, "border:none;border-radius:12px;padding:10px 14px;background:#111827;color:#fff;font-size:13px;cursor:pointer;");
      safeAppend(footer, send);

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

      // ===== Estado do chat =====
      var journey = [];        // caminho escolhido
      var lastMenu = null;     // menu atual na tela (array de itens)
      var lastMenuName = "";   // nome do menu atual (ex: "main", "actions")

      function addBubble(msg, who) {
        var row = el("div");
        css(row, "margin:8px 0;display:flex;justify-content:" + (who === "user" ? "flex-end" : "flex-start") + ";");
        var b = el("div");
        css(b,
          "max-width:86%;padding:10px 12px;border-radius:14px;box-shadow:0 6px 16px rgba(0,0,0,.08);white-space:pre-line;" +
          (who === "user" ? "background:#2563EB;color:#fff;border-top-right-radius:6px;" : "background:#fff;color:#111827;border-top-left-radius:6px;")
        );
        setText(b, msg);
        safeAppend(row, b);
        safeAppend(body, row);
        body.scrollTop = body.scrollHeight;
      }

      function bot(m) { addBubble(m, "bot"); }
      function user(m) { addBubble(m, "user"); }

      function addButtons(items, menuName) {
        lastMenu = items;
        lastMenuName = menuName || "";

        var block = el("div");
        css(block, "margin:8px 0;display:flex;flex-direction:column;gap:10px;align-items:stretch;");

        for (var i = 0; i < items.length; i++) {
          (function (it) {
            var qb = el("button");
            qb.type = "button";
            setText(qb, it.label);
            css(qb,
              "width:100%;text-align:center;border:1px solid rgba(6,95,70,.15);" +
              "background:" + TNP_BTN_BG + ";color:" + TNP_BTN_TEXT + ";" +
              "border-radius:14px;padding:12px 14px;font-weight:700;font-size:13px;cursor:pointer;" +
              "box-shadow:0 6px 14px rgba(0,0,0,.06);transition:all .18s ease;"
            );
            qb.onmouseenter = function () { qb.style.background = TNP_BTN_BG_HOVER; };
            qb.onmouseleave = function () { qb.style.background = TNP_BTN_BG; };
            qb.onclick = function () {
              try { block.remove(); } catch (_) {}
              user(it.label);
              handleAction(it.action);
            };
            safeAppend(block, qb);
          })(items[i]);
        }

        safeAppend(body, block);
        body.scrollTop = body.scrollHeight;
      }

      function invalidOption() {
        bot("Desculpe, não consegui entender 😕\nEscolha uma opção abaixo.");
        if (lastMenu) setTimeout(function () { addButtons(lastMenu, lastMenuName); }, 180);
      }

      function openWpp(tag) {
        var path = journey.length ? journey.join(" > ") : "Menu inicial";
        var text =
          "Oi! Passei pelo chatbot da Tô na Praia 😊\n" +
          "Eu naveguei por: " + path + ".\n";

        if (tag) text += "Quero conversar mais sobre: " + tag + ".\n";

        text += "\nPodem me ajudar?";

        window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
      }

      // ===== Interpretação de texto (o pulo do gato) =====
      function cleanText(raw) {
        return (raw || "").toLowerCase()
          .replace(/\s+/g, " ")
          .trim();
      }

      function extractLeadingNumber(raw) {
        // pega "1", "1 - algo", "1." etc
        var m = (raw || "").match(/^\s*([0-9]+)\b/);
        return m ? parseInt(m[1], 10) : null;
      }

      function isMenuKeyword(t) {
        // menu / voltar / inicio / início
        return (
          t === "menu" ||
          t === "voltar" ||
          t === "inicio" ||
          t === "início" ||
          t === "começo" ||
          t === "comeco" ||
          t === "start"
        );
      }

      function isWhatsappKeyword(t) {
        // whatsapp / wpp / zap / falar / contato
        return (
          t.indexOf("whats") >= 0 ||
          t.indexOf("wpp") >= 0 ||
          t.indexOf("zap") >= 0 ||
          t.indexOf("falar") >= 0 ||
          t.indexOf("contat") >= 0
        );
      }

      function pickActionFromCurrentMenuByNumber(n) {
        if (!lastMenu || !lastMenu.length) return null;
        if (typeof n !== "number" || isNaN(n)) return null;
        if (n < 1 || n > lastMenu.length) return null;
        return lastMenu[n - 1].action || null;
      }

      function interpretUserInput(raw) {
        var t = cleanText(raw);
        if (!t) return null;

        // atalhos globais
        if (isMenuKeyword(t)) return "back_menu";
        if (isWhatsappKeyword(t)) return "whatsapp";

        // número (1..N) de acordo com o menu atual
        var n = extractLeadingNumber(raw);
        if (n !== null) {
          var act = pickActionFromCurrentMenuByNumber(n);
          if (act) return act;
          return null;
        }

        // reconhecimento por palavras, dependendo do menu atual:
        // no menu principal, aceita "quem somos" / "comprar"
        if (lastMenuName === "main") {
          if (t.indexOf("quem") >= 0) return "who";
          if (t.indexOf("compr") >= 0) return "how";
          if (t.indexOf("fale") >= 0) return "whatsapp";
        }

        // no menu actions, aceita "voltar" e "whatsapp" já tratamos acima
        return null;
      }

      // ===== Ações =====
      function handleAction(action) {
        if (action === "who") {
          journey.push("Quem somos");
          bot(textWhoWeAre());
          addButtons(MENU_ACTIONS, "actions");
          return;
        }

        if (action === "how") {
          journey.push("Como comprar");
          bot(textHowToBuy());
          addButtons(MENU_ACTIONS, "actions");
          return;
        }

        if (action === "back_menu") {
          bot("Beleza! Escolha uma opção:");
          addButtons(MENU_MAIN, "main");
          return;
        }

        if (action === "whatsapp") {
          // se ainda não tem um caminho, registra que veio falar com a gente
          if (!journey.length) journey.push("Fale conosco");
          openWpp(journey[journey.length - 1] || "atendimento");
          return;
        }

        invalidOption();
      }

      // ===== Ciclo de envio =====
      function processText(raw) {
        var act = interpretUserInput(raw);
        if (!act) return invalidOption();
        handleAction(act);
      }

      function openChat() {
        box.style.display = "flex";
        body.innerHTML = "";
        journey = [];
        lastMenu = null;
        lastMenuName = "";

        bot(WELCOME_1);
        bot(WELCOME_2);
        addButtons(MENU_MAIN, "main");
        layoutChat();
      }

      function closeChat() { box.style.display = "none"; }

      btn.onclick = function () {
        var visible = box.style.display === "flex";
        if (visible) closeChat();
        else openChat();
      };

      close.onclick = closeChat;

      send.onclick = function () {
        var raw = (input.value || "").trim();
        if (!raw) return;
        input.value = "";
        user(raw);
        processText(raw);
      };

      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") send.click();
      });

      // Debug (pode remover depois)
      // console.log("[TNP Chat] OK - menus dinâmicos por texto");

    } catch (e) {
      try { console.error("TNP chat error:", e); } catch (_) {}
    }
  }

  function waitForBody() {
    if (document.body) return start();
    setTimeout(waitForBody, 50);
  }

  waitForBody();
})();





