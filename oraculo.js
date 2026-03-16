(function () {
  "use strict";

  if (window.__ORACULO_7_NOS_WIDGET__) return;
  window.__ORACULO_7_NOS_WIDGET__ = true;

  const WHATSAPP_NUMBER = "5521986563334";
  const VERSION = "2.0.0";

  const ORACULO_7_NOS = {
    protecao: [
      "{nome}, a energia da proteção está ao seu redor. Nem tudo precisa ser enfrentado com força. Algumas batalhas se vencem com calma e sabedoria.",
      "{nome}, o primeiro nó lembra que a proteção também vem da sua própria consciência. Confie mais na sua intuição.",
      "{nome}, hoje o caminho pede atenção e serenidade. A proteção se fortalece quando você escolhe agir com clareza.",
      "{nome}, o universo protege quem caminha com verdade. Permaneça fiel ao que o seu coração reconhece como certo.",
      "{nome}, proteção também é saber se afastar do que não te faz bem. Preserve sua energia.",
      "{nome}, o nó da proteção lembra que você não está sozinho. Há forças trabalhando silenciosamente ao seu favor.",
      "{nome}, quando a mente se acalma, a proteção se revela. Confie no tempo e siga com tranquilidade.",
      "{nome}, hoje a proteção se manifesta através da prudência. Observe antes de agir.",
      "{nome}, sua energia se fortalece quando você mantém pensamentos de paz. Isso cria um campo de proteção natural.",
      "{nome}, o nó da proteção fala de cuidado e consciência. Caminhe com calma e tudo se alinhará."
    ],
    fe: [
      "{nome}, a fé não significa ter todas as respostas, mas continuar caminhando mesmo sem enxergar todo o caminho.",
      "{nome}, a fé cresce quando você aprende a confiar no processo da vida.",
      "{nome}, mesmo quando o caminho parece incerto, a fé mantém a luz acesa.",
      "{nome}, o nó da fé lembra que cada desafio também traz aprendizado.",
      "{nome}, acreditar no bem que ainda está por vir é um dos maiores sinais de fé.",
      "{nome}, a fé transforma preocupação em confiança. Respire e siga com serenidade.",
      "{nome}, quando você acredita em dias melhores, já está criando um novo caminho.",
      "{nome}, a fé é silenciosa, mas poderosa. Ela sustenta quem continua tentando.",
      "{nome}, confiar no tempo da vida é uma das formas mais profundas de fé.",
      "{nome}, o nó da fé lembra que a esperança nunca caminha sozinha."
    ],
    amor: [
      "{nome}, o amor cresce quando você se permite sentir com verdade.",
      "{nome}, o nó do amor lembra que cuidar de si também é uma forma de amar.",
      "{nome}, o amor mais forte nasce da simplicidade e da presença.",
      "{nome}, quando o coração está em paz, o amor encontra caminho.",
      "{nome}, o amor verdadeiro não precisa ser perfeito, apenas sincero.",
      "{nome}, amar também é aprender a compreender as imperfeições.",
      "{nome}, o nó do amor fala de conexão e gentileza.",
      "{nome}, pequenas atitudes carregam grandes demonstrações de amor.",
      "{nome}, o amor floresce quando existe respeito e cuidado.",
      "{nome}, onde existe amor, sempre existe possibilidade de recomeço."
    ],
    saude: [
      "{nome}, cuidar do corpo é também cuidar da energia da vida.",
      "{nome}, a saúde se fortalece quando você respeita seus próprios limites.",
      "{nome}, o nó da saúde lembra que equilíbrio entre corpo e mente traz vitalidade.",
      "{nome}, pequenas escolhas diárias constroem uma vida mais saudável.",
      "{nome}, descansar também faz parte do caminho da saúde.",
      "{nome}, quando você se escuta com atenção, o corpo encontra equilíbrio.",
      "{nome}, o nó da saúde fala de cuidado, paciência e constância.",
      "{nome}, bem-estar nasce de hábitos simples e conscientes.",
      "{nome}, a saúde floresce quando você se trata com gentileza.",
      "{nome}, cada passo em direção ao cuidado consigo mesmo fortalece sua energia."
    ],
    prosperidade: [
      "{nome}, prosperidade nasce da união entre esforço e confiança.",
      "{nome}, o nó da prosperidade lembra que oportunidades surgem para quem se prepara.",
      "{nome}, crescer exige paciência e dedicação.",
      "{nome}, a prosperidade também está nas pequenas conquistas do dia a dia.",
      "{nome}, valorize cada avanço no seu caminho.",
      "{nome}, a prosperidade floresce onde existe propósito.",
      "{nome}, quando você acredita no seu valor, novas portas se abrem.",
      "{nome}, prosperar é caminhar com coragem e constância.",
      "{nome}, o nó da prosperidade fala de movimento e construção.",
      "{nome}, cada passo firme aproxima você de novas conquistas."
    ],
    equilibrio: [
      "{nome}, o equilíbrio nasce quando você aprende a ouvir a si mesmo.",
      "{nome}, o nó do equilíbrio lembra que tudo encontra seu lugar com o tempo.",
      "{nome}, serenidade é um sinal de força interior.",
      "{nome}, manter a calma em meio ao movimento é um grande aprendizado.",
      "{nome}, equilíbrio também é saber parar quando necessário.",
      "{nome}, quando mente e coração caminham juntos, surge harmonia.",
      "{nome}, o equilíbrio cresce com consciência e presença.",
      "{nome}, cada momento traz a oportunidade de se alinhar novamente.",
      "{nome}, o nó do equilíbrio fala de paz interior.",
      "{nome}, respirar fundo às vezes é o primeiro passo para reencontrar o equilíbrio."
    ],
    gratidao: [
      "{nome}, a gratidão transforma o que temos em suficiente.",
      "{nome}, quando você agradece, abre espaço para novas bênçãos.",
      "{nome}, o nó da gratidão lembra que cada momento tem seu valor.",
      "{nome}, reconhecer as pequenas alegrias fortalece o espírito.",
      "{nome}, gratidão é enxergar beleza no cotidiano.",
      "{nome}, quando você agradece, sua energia se torna mais leve.",
      "{nome}, o nó da gratidão fala de reconhecimento e presença.",
      "{nome}, cada experiência traz um aprendizado pelo qual podemos agradecer.",
      "{nome}, gratidão ilumina até os dias mais simples.",
      "{nome}, agradecer é lembrar que a vida sempre oferece algo de bom."
    ]
  };

  const CATEGORIAS = [
    { key: "protecao", label: "Proteção" },
    { key: "fe", label: "Fé" },
    { key: "amor", label: "Amor" },
    { key: "saude", label: "Saúde" },
    { key: "prosperidade", label: "Prosperidade" },
    { key: "equilibrio", label: "Equilíbrio" },
    { key: "gratidao", label: "Gratidão" }
  ];

  const ultimoIndicePorCategoria = {};

  function waitForBody(callback) {
    if (document.body) return callback();
    const timer = setInterval(function () {
      if (document.body) {
        clearInterval(timer);
        callback();
      }
    }, 50);
  }

  function normalizarNome(nome) {
    const valor = String(nome || "").trim();
    return valor || "Você";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function sortearIndice(lista, ultimoIndice) {
    if (!Array.isArray(lista) || lista.length === 0) return -1;
    if (lista.length === 1) return 0;

    let novoIndice;
    let tentativas = 0;

    do {
      novoIndice = Math.floor(Math.random() * lista.length);
      tentativas++;
    } while (novoIndice === ultimoIndice && tentativas < 20);

    return novoIndice;
  }

  function gerarMensagem(nome, categoria) {
    const nomeFinal = normalizarNome(nome);
    const lista = ORACULO_7_NOS[categoria];

    if (!lista) {
      return nomeFinal + ", não consegui encontrar essa energia no oráculo.";
    }

    const ultimoIndice = ultimoIndicePorCategoria[categoria];
    const indice = sortearIndice(lista, ultimoIndice);

    if (indice < 0) {
      return nomeFinal + ", hoje o oráculo está em silêncio. Tente novamente em instantes.";
    }

    ultimoIndicePorCategoria[categoria] = indice;
    return lista[indice].replace(/\{nome\}/g, nomeFinal);
  }

  function buildWhatsappLink(nome, categoriaLabel, mensagem) {
    const texto =
      "Olá! Vim do minisite da Pulseira dos 7 Nós.\n\n" +
      "Nome: " + (nome || "Não informado") + "\n" +
      "Categoria escolhida: " + categoriaLabel + "\n\n" +
      "Minha mensagem do oráculo:\n" +
      mensagem + "\n\n" +
      "Quero saber mais sobre a pulseira.";

    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(texto);
  }

  function injectStyles() {
    if (document.getElementById("oraculo-7nos-widget-style")) return;

    const style = document.createElement("style");
    style.id = "oraculo-7nos-widget-style";
    style.textContent = `
      #oraculo-7nos-root {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 999999;
        font-family: Arial, Helvetica, sans-serif;
      }

      .oraculo-7nos-bubble {
        position: absolute;
        right: 0;
        bottom: 76px;
        background: #2a2f45;
        color: #fff;
        padding: 10px 12px;
        border-radius: 14px;
        font-size: 13px;
        line-height: 1.3;
        box-shadow: 0 10px 24px rgba(0,0,0,0.20);
        white-space: nowrap;
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.25s ease, transform 0.25s ease;
      }

      .oraculo-7nos-bubble.hidden {
        opacity: 0;
        transform: translateY(6px);
        pointer-events: none;
      }

      .oraculo-7nos-bubble::after {
        content: "";
        position: absolute;
        right: 18px;
        bottom: -6px;
        width: 12px;
        height: 12px;
        background: #2a2f45;
        transform: rotate(45deg);
      }

      .oraculo-7nos-toggle {
        width: 58px;
        height: 58px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        background: linear-gradient(135deg, #7b1fa2, #ba68c8);
        box-shadow: 0 14px 28px rgba(91, 42, 134, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
      }

      .oraculo-7nos-toggle:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 18px 30px rgba(91, 42, 134, 0.42);
      }

      .oraculo-7nos-toggle svg {
        width: 30px;
        height: 30px;
        display: block;
      }

      .oraculo-7nos-panel {
        position: absolute;
        right: 0;
        bottom: 76px;
        width: min(92vw, 360px);
        max-height: min(78vh, 620px);
        display: flex;
        flex-direction: column;
        border-radius: 22px;
        overflow: hidden;
        background: rgba(25, 18, 42, 0.96);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow: 0 22px 60px rgba(0,0,0,0.38);
        opacity: 0;
        transform: translateY(14px) scale(0.98);
        pointer-events: none;
        transition: opacity 0.25s ease, transform 0.25s ease;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }

      .oraculo-7nos-panel.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .oraculo-7nos-header {
        padding: 16px 16px 12px;
        background: linear-gradient(135deg, rgba(123,31,162,0.98), rgba(186,104,200,0.95));
        color: #fff;
      }

      .oraculo-7nos-topline {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }

      .oraculo-7nos-title-wrap {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }

      .oraculo-7nos-title-icon {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgba(255,255,255,0.16);
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
      }

      .oraculo-7nos-title-icon svg {
        width: 18px;
        height: 18px;
      }

      .oraculo-7nos-title {
        margin: 0;
        font-size: 17px;
        font-weight: 700;
        line-height: 1.2;
      }

      .oraculo-7nos-subtitle {
        margin: 4px 0 0;
        font-size: 12px;
        line-height: 1.45;
        color: rgba(255,255,255,0.90);
      }

      .oraculo-7nos-close {
        width: 34px;
        height: 34px;
        border: none;
        border-radius: 50%;
        background: rgba(255,255,255,0.14);
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        flex: 0 0 auto;
      }

      .oraculo-7nos-body {
        padding: 14px;
        overflow-y: auto;
      }

      .oraculo-7nos-label {
        display: block;
        margin-bottom: 8px;
        color: rgba(255,255,255,0.94);
        font-size: 13px;
        font-weight: 700;
      }

      .oraculo-7nos-input {
        width: 100%;
        box-sizing: border-box;
        padding: 13px 14px;
        border-radius: 14px;
        border: 1px solid rgba(255,255,255,0.14);
        background: rgba(255,255,255,0.08);
        color: #fff;
        font-size: 15px;
        outline: none;
        margin-bottom: 14px;
      }

      .oraculo-7nos-input::placeholder {
        color: rgba(255,255,255,0.58);
      }

      .oraculo-7nos-input:focus {
        border-color: rgba(255,255,255,0.30);
        box-shadow: 0 0 0 3px rgba(255,255,255,0.07);
      }

      .oraculo-7nos-cats {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
        margin-bottom: 14px;
      }

      .oraculo-7nos-cat {
        border: 1px solid rgba(255,255,255,0.12);
        background: rgba(255,255,255,0.06);
        color: #fff;
        border-radius: 14px;
        padding: 11px 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.16s ease;
      }

      .oraculo-7nos-cat:hover {
        transform: translateY(-1px);
        background: rgba(255,255,255,0.10);
      }

      .oraculo-7nos-cat.active {
        background: linear-gradient(135deg, #a855f7, #d946ef);
        border-color: rgba(255,255,255,0.18);
        box-shadow: 0 12px 24px rgba(168,85,247,0.24);
      }

      .oraculo-7nos-primary {
        width: 100%;
        border: none;
        border-radius: 15px;
        padding: 14px 16px;
        background: linear-gradient(135deg, #8b5cf6, #d946ef);
        color: #fff;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 14px 24px rgba(168,85,247,0.24);
        transition: transform 0.16s ease;
      }

      .oraculo-7nos-primary:hover {
        transform: translateY(-1px);
      }

      .oraculo-7nos-error {
        display: none;
        margin-top: 12px;
        background: rgba(255, 90, 90, 0.14);
        border: 1px solid rgba(255, 90, 90, 0.20);
        color: #ffd6d6;
        border-radius: 12px;
        padding: 11px 12px;
        font-size: 13px;
        line-height: 1.45;
      }

      .oraculo-7nos-result {
        display: none;
        margin-top: 14px;
        padding: 14px;
        border-radius: 16px;
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.10);
      }

      .oraculo-7nos-result h4 {
        margin: 0 0 8px;
        color: #fff;
        font-size: 15px;
      }

      .oraculo-7nos-result p {
        margin: 0;
        color: rgba(255,255,255,0.94);
        font-size: 14px;
        line-height: 1.6;
      }

      .oraculo-7nos-actions {
        display: none;
        margin-top: 12px;
        gap: 8px;
        flex-wrap: wrap;
      }

      .oraculo-7nos-secondary,
      .oraculo-7nos-wa {
        flex: 1 1 140px;
        text-align: center;
        text-decoration: none;
        border-radius: 14px;
        padding: 12px 12px;
        font-size: 14px;
        font-weight: 700;
        transition: transform 0.16s ease;
        box-sizing: border-box;
      }

      .oraculo-7nos-secondary:hover,
      .oraculo-7nos-wa:hover {
        transform: translateY(-1px);
      }

      .oraculo-7nos-secondary {
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.12);
        color: #fff;
      }

      .oraculo-7nos-wa {
        background: linear-gradient(135deg, #25D366, #1ebe5d);
        color: #fff;
        border: none;
      }

      .oraculo-7nos-footer {
        margin-top: 10px;
        text-align: center;
        color: rgba(255,255,255,0.55);
        font-size: 11px;
        line-height: 1.4;
      }

      @media (max-width: 480px) {
        #oraculo-7nos-root {
          right: 12px;
          bottom: 12px;
        }

        .oraculo-7nos-panel {
          width: min(94vw, 350px);
          bottom: 70px;
        }

        .oraculo-7nos-bubble {
          font-size: 12px;
          bottom: 70px;
          max-width: 220px;
          white-space: normal;
        }

        .oraculo-7nos-cats {
          grid-template-columns: 1fr 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createIconSVG() {
    return `
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="oraculoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#f3e8ff"/>
          </linearGradient>
        </defs>
        <path fill="url(#oraculoGrad)" d="M32 8c-8.2 0-14.8 6.6-14.8 14.8 0 3.8 1.4 7.3 3.8 10L18 46l13.4-3c.2 0 .4-.1.6-.1 8.2 0 14.8-6.6 14.8-14.8S40.2 8 32 8zm0 5.4c5.2 0 9.4 4.2 9.4 9.4 0 4.3-2.9 7.9-6.9 9l-.8.2-.8.2-.2.8-.6 2.7-2.8-.6-.8-.2-.8.2c-.5.1-1 .2-1.5.2-5.2 0-9.4-4.2-9.4-9.4s4.2-9.5 9.4-9.5z"/>
        <circle cx="26" cy="23" r="2.2" fill="#8b5cf6"/>
        <circle cx="32" cy="23" r="2.2" fill="#8b5cf6"/>
        <circle cx="38" cy="23" r="2.2" fill="#8b5cf6"/>
      </svg>
    `;
  }

  function createMarkup() {
    const catsMarkup = CATEGORIAS.map(function (cat) {
      return `<button type="button" class="oraculo-7nos-cat" data-cat="${cat.key}">${cat.label}</button>`;
    }).join("");

    return `
      <div id="oraculo-7nos-root" data-version="${VERSION}">
        <div class="oraculo-7nos-bubble" id="oraculo-7nos-bubble">Receba sua mensagem do oráculo</div>

        <div class="oraculo-7nos-panel" id="oraculo-7nos-panel" aria-hidden="true">
          <div class="oraculo-7nos-header">
            <div class="oraculo-7nos-topline">
              <div class="oraculo-7nos-title-wrap">
                <div class="oraculo-7nos-title-icon">
                  ${createIconSVG()}
                </div>
                <div>
                  <h3 class="oraculo-7nos-title">Oráculo dos 7 Nós</h3>
                  <p class="oraculo-7nos-subtitle">Escolha a energia que deseja fortalecer hoje.</p>
                </div>
              </div>
              <button type="button" class="oraculo-7nos-close" id="oraculo-7nos-close" aria-label="Fechar">×</button>
            </div>
          </div>

          <div class="oraculo-7nos-body">
            <label class="oraculo-7nos-label" for="oraculo-7nos-name">Seu nome</label>
            <input id="oraculo-7nos-name" class="oraculo-7nos-input" type="text" maxlength="50" placeholder="Digite seu nome" />

            <div class="oraculo-7nos-label">Escolha uma energia</div>
            <div class="oraculo-7nos-cats">
              ${catsMarkup}
            </div>

            <button type="button" class="oraculo-7nos-primary" id="oraculo-7nos-generate">Receber minha mensagem</button>

            <div class="oraculo-7nos-error" id="oraculo-7nos-error"></div>

            <div class="oraculo-7nos-result" id="oraculo-7nos-result">
              <h4 id="oraculo-7nos-result-title"></h4>
              <p id="oraculo-7nos-result-text"></p>
            </div>

            <div class="oraculo-7nos-actions" id="oraculo-7nos-actions">
              <a href="#" target="_blank" rel="noopener noreferrer" class="oraculo-7nos-wa" id="oraculo-7nos-wa">Falar no WhatsApp</a>
              <a href="#" class="oraculo-7nos-secondary" id="oraculo-7nos-again">Outra mensagem</a>
            </div>

            <div class="oraculo-7nos-footer">
              Cada mensagem é sorteada aleatoriamente dentro da energia escolhida.
            </div>
          </div>
        </div>

        <button type="button" class="oraculo-7nos-toggle" id="oraculo-7nos-toggle" aria-label="Abrir Oráculo dos 7 Nós">
          ${createIconSVG()}
        </button>
      </div>
    `;
  }

  function mount() {
    if (document.getElementById("oraculo-7nos-root")) return;

    injectStyles();

    const host = document.createElement("div");
    host.innerHTML = createMarkup();
    document.body.appendChild(host.firstElementChild);

    bindEvents();
  }

  function bindEvents() {
    const root = document.getElementById("oraculo-7nos-root");
    const bubble = document.getElementById("oraculo-7nos-bubble");
    const panel = document.getElementById("oraculo-7nos-panel");
    const toggle = document.getElementById("oraculo-7nos-toggle");
    const closeBtn = document.getElementById("oraculo-7nos-close");
    const nameInput = document.getElementById("oraculo-7nos-name");
    const generateBtn = document.getElementById("oraculo-7nos-generate");
    const errorBox = document.getElementById("oraculo-7nos-error");
    const resultBox = document.getElementById("oraculo-7nos-result");
    const resultTitle = document.getElementById("oraculo-7nos-result-title");
    const resultText = document.getElementById("oraculo-7nos-result-text");
    const actionsBox = document.getElementById("oraculo-7nos-actions");
    const waBtn = document.getElementById("oraculo-7nos-wa");
    const againBtn = document.getElementById("oraculo-7nos-again");
    const catButtons = root.querySelectorAll(".oraculo-7nos-cat");

    let categoriaSelecionada = "";
    let bubbleTimer = null;

    function hideBubbleSoon() {
      if (bubbleTimer) clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(function () {
        bubble.classList.add("hidden");
      }, 5000);
    }

    function openPanel() {
      panel.classList.add("open");
      panel.setAttribute("aria-hidden", "false");
      bubble.classList.add("hidden");
      setTimeout(function () {
        nameInput.focus();
      }, 120);
    }

    function closePanel() {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
    }

    function showError(msg) {
      errorBox.textContent = msg;
      errorBox.style.display = "block";
    }

    function clearError() {
      errorBox.textContent = "";
      errorBox.style.display = "none";
    }

    function setCategory(key) {
      categoriaSelecionada = key;
      catButtons.forEach(function (btn) {
        btn.classList.toggle("active", btn.getAttribute("data-cat") === key);
      });
      clearError();
    }

    function renderMessage() {
      const nomeDigitado = String(nameInput.value || "").trim();
      if (!nomeDigitado) {
        showError("Digite seu nome para receber a mensagem do oráculo.");
        nameInput.focus();
        return;
      }

      if (!categoriaSelecionada) {
        showError("Escolha uma energia antes de continuar.");
        return;
      }

      clearError();

      const categoria = CATEGORIAS.find(function (item) {
        return item.key === categoriaSelecionada;
      });

      const nome = normalizarNome(nomeDigitado);
      const mensagem = gerarMensagem(nome, categoriaSelecionada);

      resultTitle.textContent = "Mensagem de " + categoria.label;
      resultText.textContent = mensagem;
      resultBox.style.display = "block";
      actionsBox.style.display = "flex";
      waBtn.href = buildWhatsappLink(nome, categoria.label, mensagem);
    }

    toggle.addEventListener("click", function () {
      if (panel.classList.contains("open")) {
        closePanel();
      } else {
        openPanel();
      }
    });

    closeBtn.addEventListener("click", closePanel);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && panel.classList.contains("open")) {
        closePanel();
      }
    });

    catButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setCategory(btn.getAttribute("data-cat"));
      });
    });

    generateBtn.addEventListener("click", renderMessage);

    nameInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        renderMessage();
      }
    });

    againBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if (!categoriaSelecionada) {
        showError("Escolha uma energia para receber outra mensagem.");
        return;
      }
      clearError();
      renderMessage();
    });

    document.addEventListener("click", function (event) {
      if (!root.contains(event.target) && panel.classList.contains("open")) {
        closePanel();
      }
    });

    hideBubbleSoon();
  }

  waitForBody(mount);
})();
