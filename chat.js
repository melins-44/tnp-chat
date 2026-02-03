(function () {
  // =============================
  //  Tô na Praia - Chat Widget
  //  WhatsApp: 5521986563334
  // =============================

  // Evita rodar duas vezes (NextGo/Smallpage às vezes injeta duplicado)
  if (window.__TNP_CHAT_LOADED__) return;
  window.__TNP_CHAT_LOADED__ = true;

  // ===== CONFIG =====
  var WHATSAPP_NUMBER = "5521986563334";
  var BRAND_NAME = "Tô na Praia";
  var SUBTITLE = "Atendimento rápido";
  var WELCOME = "Oi! 😊 Posso te ajudar aa?";

  var ICON_URL = "https://melins-44.github.io/tnp-chat/chat-icon.png";
  var TIP_TEXT = "Tire suas dúvidas aqui";

  // Ordem: 1 catálogo | 2 presente | 3 frete | 4 pagamento
  var QUICK = [
    { n: "1", label: "🛍️ 1 - Ver catálogo", text: "Quero ver o catálogo." },
    { n: "2", label: "🎁 2 - Comprar presente", text: "Quero comprar para presentear." },
    { n: "3", label: "🚚 3 - Frete / Entrega", text: "Queria saber sobre frete e entrega." },
    { n: "4", label: "💳 4 - Pagamento", text: "Quais formas de pagamento vocês aceitam?" }
  ];

  // ===== HELPERS =====
  function el(tag) { return document.createElement(tag); }
  function css(node, rules) { node.style.cssText = rules; return node; }
  function setText(node, t) { node.textContent = t; return node; }
  function safeAppend(parent, child) { if (parent && child) parent.appendChild(child); }

  function safeHeadAppend(styleEl) {
    try { document.head.appendChild(styleEl); } catch (_) {}
  }

  // ===== MAIN START (espera body existir) =====
  function start() {
    try {
      if (document.getElementById("tnp_chat_btn")) return;

      // ---- CSS (pulse) ----
      var style = el("style");
      style.textContent = `
        @keyframes tnpPulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .tnp-pulse { animation: tnpPulse 2.4s ease-in-out infinite; }
        .tnp-pulse:hover { animation-play-state: paused; }
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

      // Botão (somente ícone, fundo transparente)
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
        'style="width:40px;height:40px;object-fit:contain;display:block;' +
        'filter:drop-shadow(0 10px 24px rgba(0,0,0,.25));" />';

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
        "padding:12px;background:#F3F4F6;" +
        "overflow:auto;font-size:13px;"
      );
      safeAppend(box, body);

      // -------- Options (quick + whatsapp) --------
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
      input.placeholder = "Escreva aqui… (ou digite 1, 2, 3, 4)";
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

      // Botão WhatsApp (fica depois dos quick buttons)
      var go = el("button");
      go.type = "button";
      setText(go, "✅ WhatsApp");
      css(go,
        "border:none;border-radius:999px;padding:8px 10px;" +
        "background:#111827;color:#fff;font-size:12px;cursor:pointer;"
      );
      safeAppend(opt, go);

      // ===== Layout responsivo (corrige paisagem mobile: não corta em cima nem embaixo) =====
      function layoutChat() {
        var vh = window.innerHeight || document.documentElement.clientHeight || 700;

        var safeTop = 12;
        var safeBottom = 12;

        var wrapH = (wrap && wrap.offsetHeight) ? wrap.offsetHeight : 80;
        var bottomGap = 12;

        // wrap está em bottom:18px, então o chat deve ficar acima disso
        var bottomOffset = 18 + wrapH + bottomGap;

        // Ajusta bottom do chat dinamicamente (para não cortar embaixo)
        box.style.bottom = bottomOffset + "px";

        // Alturas internas
        var headerH = header.offsetHeight || 56;
        var footerH = footer.offsetHeight || 56;
        var optH = opt.offsetHeight || 48;

        // Altura máxima do box considerando o bottomOffset
        var maxBoxH = vh - safeTop - bottomOffset - safeBottom;

        // Se a tela for muito baixa, garante que ainda caiba algo útil
        if (maxBoxH < 240) maxBoxH = 240;

        box.style.maxHeight = maxBoxH + "px";
        box.style.overflow = "hidden";

        var bodyShowH = maxBoxH - headerH - footerH - optH;
        if (bodyShowH < 110) bodyShowH = 110;

        body.style.height = bodyShowH + "px";
      }

      window.addEventListener("resize", layoutChat);
      window.addEventListener("orientationchange", function () {
        setTimeout(layoutChat, 250);
      });

      // ===== Chat logic =====
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
          "white-space:pre-line;" + // <<< IMPORTANTE: respeita \n no texto
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
            bot("Você procura mais:\n• brinco\n• colar\n• pulseira\n• choker");
          } else if (t.indexOf("frete") >= 0 || t.indexOf("entrega") >= 0 || t.indexOf("bairro") >= 0) {
            bot("Me diz seu bairro/cidade que eu confirmo a entrega 😊");
          } else if (t.indexOf("pag") >= 0 || t.indexOf("pix") >= 0 || t.indexOf("cart") >= 0) {
            bot("Aceitamos Pix e cartão.\nVocê prefere Pix ou cartão?");
          } else if (t.indexOf("presente") >= 0) {
            bot("Boa! 😄\nPra quem é o presente e qual faixa de valor você quer gastar?");
          } else {
            bot("Entendi!\nSe quiser, eu já te levo pro WhatsApp com essa mensagem pronta ✅");
          }
        }, 280);
      }

      function openWpp() {
        var last = log.slice(-14).join("\n");
        var msg = "Oi! Vim do microsite.\n\n" + last + "\n\nQuero continuar por aqui no WhatsApp 🙂";
        var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
        window.open(url, "_blank");
      }

      function mkQuick(item) {
        var b = el("button");
        b.type = "button";
        setText(b, item.label);
        css(b,
          "border:1px solid #E5E7EB;background:#fff;border-radius:999px;" +
          "padding:7px 10px;font-size:12px;cursor:pointer;"
        );
        b.onclick = function () {
          user(item.text);
          botReply(item.text);
        };
        opt.insertBefore(b, go);
      }

      for (var i = 0; i < QUICK.length; i++) mkQuick(QUICK[i]);

      function normalizeUserText(raw) {
        var t = (raw || "").trim();
        if (!t) return "";

        if (t === "1") return QUICK[0].text;
        if (t === "2") return QUICK[1].text;
        if (t === "3") return QUICK[2].text;
        if (t === "4") return QUICK[3].text;

        var m = t.match(/^\s*([1-4])\b/);
        if (m && m[1]) return normalizeUserText(m[1]);

        return t;
      }

      // ===== Events =====
      function openChat() {
        box.style.display = "block";
        btn.classList.remove("tnp-pulse");
        body.innerHTML = "";
        log = [];
        bot(WELCOME);

        // MENU COM QUEBRA DE LINHA (o que você pediu)
        bot(
          "Se preferir, digite:\n" +
          "1 - Ver catálogo\n" +
          "2 - Comprar presente\n" +
          "3 - Frete / Entrega\n" +
          "4 - Pagamento"
        );

        layoutChat();
      }

      function closeChat() {
        box.style.display = "none";
        btn.classList.add("tnp-pulse");
      }

      btn.onclick = function () {
        var visible = box.style.display === "block";
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
        botReply(normalized);
      };

      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") send.click();
      });

      go.onclick = openWpp;

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
