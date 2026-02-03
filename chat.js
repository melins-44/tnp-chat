(function () {
  // =============================
  //  Tô na Praia - Chat Widget (SendPulse-like)
  //  WhatsApp: 5521986563334
  // =============================

  if (window.__TNP_CHAT_LOADED__) return;
  window.__TNP_CHAT_LOADED__ = true;

  // ===== CONFIG =====
  var WHATSAPP_NUMBER = "5521986563334";
  var BRAND_NAME = "Tô na Praia";
  var SUBTITLE = "Atendimento rápido";

  var WELCOME_1 = "Olá, seja bem-vindo(a) a Tô na Praia";
  var WELCOME_2 = "Sobre o que você quer falar?";

  var ICON_URL = "https://melins-44.github.io/tnp-chat/icorobo.png";
  var TIP_TEXT = "Tire suas dúvidas aqui";

  // ===== CORES (Tô na Praia - verde clarinho) =====
  var TNP_BTN_BG = "#DFF5EA";       // verde claro
  var TNP_BTN_BG_HOVER = "#C7EBDD"; // hover
  var TNP_BTN_TEXT = "#065F46";     // verde escuro
  var TNP_LINK = "#0F766E";         // detalhe (se precisar)

  // Botões principais (estilo SendPulse: dentro da conversa)
  var QUICK = [
    { n: "1", label: "1 - Como eu compro?", text: "Como eu compro?" },
    { n: "2", label: "2 - Política Troca", text: "Quero saber sobre política de troca." },
    { n: "3", label: "3 - Conversar ↗", text: "Quero falar com alguém no WhatsApp.", action: "whatsapp" }
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
      input.placeholder = "Enviar uma mensagem… (ou digite 1, 2, 3)";
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
      var lastMenu = null;

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

              if (it.action === "whatsapp") {
                addBubble("Quero conversar no WhatsApp.", "user");
                openWpp("Quero conversar no WhatsApp.");
                return;
              }

              addBubble(it.text, "user");
              botReply(it.text);
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
        bot("Desculpe, não consegui entender 😕\nPor favor, tente novamente.");
        if (lastMenu) {
          setTimeout(function () { addQuickButtons(lastMenu); }, 220);
        }
      }

      function openWpp(extra) {
        var last = log.slice(-14).join("\n");
        var base = "Oi! Vim do microsite.\n\n" + last;
        if (extra) base += "\nCliente: " + extra;
        base += "\n\nQuero continuar por aqui no WhatsApp 🙂";

        var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(base);
        window.open(url, "_blank");
      }

      function normalizeUserText(raw) {
        var t = (raw || "").trim();
        if (!t) return "";

        // aceita digitar 1/2/3 para o menu atual (quando for o menu principal)
        if (t === "1") return "Como eu compro?";
        if (t === "2") return "Quero saber sobre política de troca.";
        if (t === "3") return "Quero falar com alguém no WhatsApp.";

        var m = t.match(/^\s*([1-3])\b/);
        if (m && m[1]) return normalizeUserText(m[1]);

        return t;
      }

      function botReply(userText) {
        var t = (userText || "").toLowerCase();

        setTimeout(function () {
          if (t.indexOf("compr") >= 0) {
            bot("Perfeito 😊\nVocê quer comprar para você ou para presente?");
            addQuickButtons([
              { label: "Para mim", text: "Quero comprar para mim." },
              { label: "Para presente", text: "Quero comprar para presentear." }
            ]);
          } else if (t.indexOf("troca") >= 0 || t.indexOf("política") >= 0) {
            bot("A troca é avaliada caso a caso.\nMe diz o que aconteceu e em quanto tempo foi a compra?");
          } else if (t.indexOf("presente") >= 0) {
            bot("Boa! 😄\nPra quem é o presente e qual faixa de valor você quer gastar?");
          } else if (t.indexOf("whats") >= 0 || t.indexOf("convers") >= 0) {
            openWpp("Quero falar com alguém no WhatsApp.");
          } else {
            bot("Entendi!\nSe quiser, eu te levo pro WhatsApp com essa mensagem pronta ✅");
            addQuickButtons([{ label: "Conversar no WhatsApp ↗", text: "Quero falar no WhatsApp.", action: "whatsapp" }]);
          }
        }, 280);
      }

      // ===== Events =====
      function openChat() {
        box.style.display = "flex";
        btn.classList.remove("tnp-pulse");
        body.innerHTML = "";
        log = [];
        lastMenu = null;

        bot(WELCOME_1);
        bot(WELCOME_2);
        addQuickButtons(QUICK);

        layoutChat();
      }

      function closeChat() {
        box.style.display = "none";
        btn.classList.add("tnp-pulse");
      }

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

        var normalized = normalizeUserText(raw);

        // se o menu está ativo e o texto não bateu com número/intenções básicas, mostra erro + volta menu
        var looksLikeMenuPick = /^[1-3]\b/.test(raw.trim());
        if (!looksLikeMenuPick && lastMenu) {
          // tenta reconhecer palavras simples do menu principal também
          var low = raw.toLowerCase();
          var ok =
            low.indexOf("compr") >= 0 ||
            low.indexOf("troca") >= 0 ||
            low.indexOf("polit") >= 0 ||
            low.indexOf("convers") >= 0 ||
            low.indexOf("whats") >= 0;

          if (!ok) {
            invalidOption();
            return;
          }
        }

        // se digitou 3 -> whatsapp
        if (normalized.toLowerCase().indexOf("whatsapp") >= 0) {
          openWpp("Quero falar com alguém no WhatsApp.");
          return;
        }

        botReply(normalized);
      };

      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") send.click();
      });

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



