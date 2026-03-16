(function () {
  "use strict";

  // Evita execução duplicada
  if (window.__ORACULO_7_NOS_LOADED__) return;
  window.__ORACULO_7_NOS_LOADED__ = true;

  const WHATSAPP_NUMBER = "5521986563334";
  const TITULO = "Oráculo dos 7 Nós";
  const SUBTITULO = "Escolha a energia que deseja fortalecer hoje e receba sua mensagem especial.";
  const CTA_TEXT = "Leve essa intenção com você no WhatsApp";

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
    if (document.body) {
      callback();
      return;
    }
    const timer = setInterval(function () {
      if (document.body) {
        clearInterval(timer);
        callback();
      }
    }, 50);
  }

  function normalizarNome(nome) {
    const nomeLimpo = String(nome || "").trim();
    return nomeLimpo || "Você";
  }

  function sortearIndice(lista, ultimoIndice) {
    if (!Array.isArray(lista) || lista.length === 0) return -1;
    if (lista.length === 1) return 0;

    let novoIndice;
    do {
      novoIndice = Math.floor(Math.random() * lista.length);
    } while (novoIndice === ultimoIndice);

    return novoIndice;
  }

  function gerarMensagem(nome, categoria) {
    const nomeFinal = normalizarNome(nome);
    const lista = ORACULO_7_NOS[categoria];

    if (!lista) {
      return nomeFinal + ", não consegui encontrar essa energia no oráculo.";
    }

    const ultimoIndice = ultimoIndicePorCategoria[categoria];
    const indiceSorteado = sortearIndice(lista, ultimoIndice);

    if (indiceSorteado < 0) {
      return nomeFinal + ", hoje o oráculo está em silêncio. Tente novamente em instantes.";
    }

    ultimoIndicePorCategoria[categoria] = indiceSorteado;
    return lista[indiceSorteado].replace(/\{nome\}/g, nomeFinal);
  }

  function buildWhatsappLink(nome, categoriaLabel, mensagem) {
    const texto =
      "Olá! Vim do minisite da Pulseira dos 7 Nós.%0A%0A" +
      "Nome: " + encodeURIComponent(nome || "Não informado") + "%0A" +
      "Categoria escolhida: " + encodeURIComponent(categoriaLabel) + "%0A%0A" +
      "Minha mensagem do oráculo:%0A" +
      encodeURIComponent(mensagem) + "%0A%0A" +
      "Quero saber mais sobre a pulseira.";
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + texto;
  }

  function injectStyles() {
    if (document.getElementById("oraculo-7-nos-styles")) return;

    const style = document.createElement("style");
    style.id = "oraculo-7-nos-styles";
    style.textContent = `
      .oraculo-7nos-wrap {
        width: min(92vw, 720px);
        margin: 32px auto;
        padding: 0 12px;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
      }

      .oraculo-7nos-card {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 24px;
        padding: 22px;
        box-sizing: border-box;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22);
        color: #ffffff;
      }

      .oraculo-7nos-header {
        text-align: center;
        margin-bottom: 18px;
      }

      .oraculo-7nos-title {
        margin: 0 0 8px 0;
        font-size: clamp(24px, 4vw, 34px);
        line-height: 1.15;
        font-weight: 700;
        color: #ffffff;
      }

      .oraculo-7nos-subtitle {
        margin: 0;
        font-size: 15px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.88);
      }

      .oraculo-7nos-field {
        margin-bottom: 16px;
      }

      .oraculo-7nos-label {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.95);
      }

      .oraculo-7nos-input {
        width: 100%;
        padding: 14px 16px;
        border-radius: 14px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.10);
        color: #ffffff;
        font-size: 16px;
        box-sizing: border-box;
        outline: none;
      }

      .oraculo-7nos-input::placeholder {
        color: rgba(255, 255, 255, 0.60);
      }

      .oraculo-7nos-input:focus {
        border-color: rgba(255, 255, 255, 0.40);
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.10);
      }

      .oraculo-7nos-categories {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        margin-top: 6px;
      }

      @media (max-width: 560px) {
        .oraculo-7nos-categories {
          grid-template-columns: 1fr;
        }
      }

      .oraculo-7nos-cat-btn {
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
        border-radius: 14px;
        padding: 12px 14px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
      }

      .oraculo-7nos-cat-btn:hover {
        transform: translateY(-1px);
        background: rgba(255, 255, 255, 0.12);
      }

      .oraculo-7nos-cat-btn.active {
        background: linear-gradient(135deg, rgba(255, 99, 132, 0.80), rgba(255, 153, 102, 0.85));
        border-color: rgba(255, 255, 255, 0.28);
        box-shadow: 0 10px 24px rgba(255, 99, 132, 0.22);
      }

      .oraculo-7nos-main-btn {
        width: 100%;
        margin-top: 18px;
        border: 0;
        border-radius: 16px;
        padding: 15px 18px;
        font-size: 16px;
        font-weight: 700;
        color: #ffffff;
        cursor: pointer;
        background: linear-gradient(135deg, #ff5f7a, #ff8c5a);
        box-shadow: 0 14px 28px rgba(255, 99, 132, 0.28);
        transition: transform 0.15s ease, opacity 0.15s ease;
      }

      .oraculo-7nos-main-btn:hover {
        transform: translateY(-1px);
      }

      .oraculo-7nos-main-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .oraculo-7nos-error {
        display: none;
        margin-top: 12px;
        padding: 12px 14px;
        border-radius: 12px;
        background: rgba(255, 99, 99, 0.14);
        border: 1px solid rgba(255, 99, 99, 0.20);
        color: #ffe6e6;
        font-size: 14px;
        line-height: 1.45;
      }

      .oraculo-7nos-result {
        display: none;
        margin-top: 18px;
        padding: 18px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.10);
        border: 1px solid rgba(255, 255, 255, 0.14);
      }

      .oraculo-7nos-result-title {
        margin: 0 0 10px 0;
        font-size: 17px;
        font-weight: 700;
        color: #ffffff;
      }

      .oraculo-7nos-result-text {
        margin: 0;
        font-size: 16px;
        line-height: 1.7;
        color: rgba(255, 255, 255, 0.95);
      }

      .oraculo-7nos-actions {
        display: none;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 16px;
      }

      .oraculo-7nos-secondary-btn,
      .oraculo-7nos-whatsapp-btn {
        flex: 1 1 220px;
        text-align: center;
        text-decoration: none;
        border-radius: 14px;
        padding: 13px 14px;
        font-size: 15px;
        font-weight: 700;
        box-sizing: border-box;
        transition: transform 0.15s ease, opacity 0.15s ease;
      }

      .oraculo-7nos-secondary-btn:hover,
      .oraculo-7nos-whatsapp-btn:hover {
        transform: translateY(-1px);
      }

      .oraculo-7nos-secondary-btn {
        border: 1px solid rgba(255, 255, 255, 0.18);
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
      }

      .oraculo-7nos-whatsapp-btn {
        border: 0;
        background: linear-gradient(135deg, #25D366, #1ebe5d);
        color: #ffffff;
        box-shadow: 0 12px 24px rgba(37, 211, 102, 0.24);
      }

      .oraculo-7nos-note {
        margin-top: 12px;
        font-size: 12px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.62);
        text-align: center;
      }
    `;
    document.head.appendChild(style);
  }

  function createMarkup() {
    const wrapper = document.createElement("section");
    wrapper.className = "oraculo-7nos-wrap";
    wrapper.id = "oraculo-7nos";

    const categoryButtons = CATEGORIAS.map(function (cat) {
      return '<button type="button" class="oraculo-7nos-cat-btn" data-category="' + cat.key + '">' + cat.label + "</button>";
    }).join("");

    wrapper.innerHTML = `
      <div class="oraculo-7nos-card">
        <div class="oraculo-7nos-header">
          <h2 class="oraculo-7nos-title">${TITULO}</h2>
          <p class="oraculo-7nos-subtitle">${SUBTITULO}</p>
        </div>

        <div class="oraculo-7nos-field">
          <label class="oraculo-7nos-label" for="oraculo-7nos-nome">Seu nome</label>
          <input
            id="oraculo-7nos-nome"
            class="oraculo-7nos-input"
            type="text"
            maxlength="50"
            placeholder="Digite seu nome"
          />
        </div>

        <div class="oraculo-7nos-field">
          <span class="oraculo-7nos-label">Escolha uma energia</span>
          <div class="oraculo-7nos-categories">
            ${categoryButtons}
          </div>
        </div>

        <button type="button" class="oraculo-7nos-main-btn" id="oraculo-7nos-gerar">
          Receber minha mensagem
        </button>

        <div class="oraculo-7nos-error" id="oraculo-7nos-error"></div>

        <div class="oraculo-7nos-result" id="oraculo-7nos-result">
          <h3 class="oraculo-7nos-result-title" id="oraculo-7nos-result-title"></h3>
          <p class="oraculo-7nos-result-text" id="oraculo-7nos-result-text"></p>
        </div>

        <div class="oraculo-7nos-actions" id="oraculo-7nos-actions">
          <a href="#" target="_blank" rel="noopener noreferrer" class="oraculo-7nos-whatsapp-btn" id="oraculo-7nos-whatsapp">
            ${CTA_TEXT}
          </a>
          <a href="#" class="oraculo-7nos-secondary-btn" id="oraculo-7nos-nova">
            Receber outra mensagem
          </a>
        </div>

        <div class="oraculo-7nos-note">
          Cada mensagem é sorteada de forma aleatória dentro da energia escolhida.
        </div>
      </div>
    `;

    return wrapper;
  }

  function bindEvents(root) {
    const nomeInput = root.querySelector("#oraculo-7nos-nome");
    const botoesCategoria = root.querySelectorAll(".oraculo-7nos-cat-btn");
    const gerarBtn = root.querySelector("#oraculo-7nos-gerar");
    const errorBox = root.querySelector("#oraculo-7nos-error");
    const resultBox = root.querySelector("#oraculo-7nos-result");
    const resultTitle = root.querySelector("#oraculo-7nos-result-title");
    const resultText = root.querySelector("#oraculo-7nos-result-text");
    const actionsBox = root.querySelector("#oraculo-7nos-actions");
    const whatsappBtn = root.querySelector("#oraculo-7nos-whatsapp");
    const novaBtn = root.querySelector("#oraculo-7nos-nova");

    let categoriaSelecionada = "";

    function mostrarErro(msg) {
      errorBox.textContent = msg;
      errorBox.style.display = "block";
    }

    function esconderErro() {
      errorBox.style.display = "none";
      errorBox.textContent = "";
    }

    function selecionarCategoria(key) {
      categoriaSelecionada = key;
      botoesCategoria.forEach(function (btn) {
        btn.classList.toggle("active", btn.getAttribute("data-category") === key);
      });
      esconderErro();
    }

    botoesCategoria.forEach(function (btn) {
      btn.addEventListener("click", function () {
        selecionarCategoria(btn.getAttribute("data-category"));
      });
    });

    function gerar() {
      const nome = normalizarNome(nomeInput.value);

      if (!String(nomeInput.value || "").trim()) {
        mostrarErro("Digite seu nome para receber a mensagem do oráculo.");
        nomeInput.focus();
        return;
      }

      if (!categoriaSelecionada) {
        mostrarErro("Escolha uma energia antes de continuar.");
        return;
      }

      esconderErro();

      const categoriaInfo = CATEGORIAS.find(function (item) {
        return item.key === categoriaSelecionada;
      });

      const mensagem = gerarMensagem(nome, categoriaSelecionada);
      const categoriaLabel = categoriaInfo ? categoriaInfo.label : "Mensagem";

      resultTitle.textContent = "Mensagem de " + categoriaLabel;
      resultText.textContent = mensagem;
      resultBox.style.display = "block";
      actionsBox.style.display = "flex";

      whatsappBtn.href = buildWhatsappLink(nome, categoriaLabel, mensagem);

      resultBox.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }

    gerarBtn.addEventListener("click", gerar);

    nomeInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        gerar();
      }
    });

    novaBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if (!categoriaSelecionada) {
        mostrarErro("Escolha uma energia para receber outra mensagem.");
        return;
      }
      esconderErro();

      const nome = normalizarNome(nomeInput.value);
      const categoriaInfo = CATEGORIAS.find(function (item) {
        return item.key === categoriaSelecionada;
      });

      const mensagem = gerarMensagem(nome, categoriaSelecionada);
      const categoriaLabel = categoriaInfo ? categoriaInfo.label : "Mensagem";

      resultTitle.textContent = "Mensagem de " + categoriaLabel;
      resultText.textContent = mensagem;
      whatsappBtn.href = buildWhatsappLink(nome, categoriaLabel, mensagem);
    });
  }

  function mount() {
    injectStyles();

    if (document.getElementById("oraculo-7nos")) return;

    const block = createMarkup();

    // Tenta encontrar um alvo específico, senão adiciona no final do body
    const target =
      document.querySelector("#oraculo-root") ||
      document.querySelector("[data-oraculo-root]") ||
      document.body;

    target.appendChild(block);
    bindEvents(block);
  }

  waitForBody(mount);
})();
