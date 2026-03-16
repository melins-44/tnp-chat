(function () {
  "use strict";

  if (window.__ORACULO_7_NOS_WIDGET__) return;
  window.__ORACULO_7_NOS_WIDGET__ = true;

  const WHATSAPP_NUMBER = "5521986563334";
  const VERSION = "8.0.0";
  const ORACULO_ICON_URL = "https://melins-44.github.io/tnp-chat/oraculo-mascote.png?v=1";

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
    const valor = String(nome || "").trim();
    return valor || "Você";
  }

  function sortearIndice(lista, ultimoIndice) {
    if (!Array.isArray(lista) || lista.length === 0) return -1;
    if (lista.length === 1) return 0;

    let novoIndice = 0;
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

  function isCompactMobileView() {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isSmallWidth = window.innerWidth <= 820;
    const isSmallHeight = window.innerHeight <= 500;
    return isTouch && (isSmallWidth || isSmallHeight);
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

      #oraculo-7nos-root.oraculo-mobile-open {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
      }

      #oraculo-7nos-root.oraculo-mobile-open .oraculo-7nos-panel,
      #oraculo-7nos-root.oraculo-mobile-open .oraculo-7nos-toggle,
      #oraculo-7nos-root.oraculo-mobile-open .oraculo-7nos-bubble {
        pointer-events: auto;
      }

      .oraculo-7nos-bubble {
        position: absolute;
        right: 0;
        bottom: 92px;
        background: #7b2cbf;
        color: #fff;
        padding: 12px 14px;
        border-radius: 16px;
        font-size: 13px;
        line-height: 1.35;
        box-shadow: 0 12px 28px rgba(0,0,0,0.22);
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
        right: 24px;
        bottom: -6px;
        width: 12px;
        height: 12px;
        background: #7b2cbf;
        transform: rotate(45deg);
      }

      .oraculo-7nos-toggle {
        width: 74px;
        height: 74px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        background: linear-gradient(135deg, #7b1fa2, #c77dff);
        box-shadow: 0 16px 32px rgba(91, 42, 134, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        overflow: hidden;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
      }

      .oraculo-7nos-toggle:hover {
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 18px 34px rgba(91, 42, 134, 0.42);
      }

      .oraculo-7nos-toggle img,
      .oraculo-7nos-title-icon img {
        display: block;
      }

      .oraculo-7nos-toggle img {
        width: 88%;
        height: 88%;
        object-fit: contain;
        border-radius: 50%;
      }

      .oraculo-7nos-title-icon img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .oraculo-fallback-face {
        width: 100%;
        height: 100%;
        display: none;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 28px;
        line-height: 1;
        background: radial-gradient(circle at center, #d9a7ff 0%, #a855f7 58%, #7b1fa2 100%);
      }

      .oraculo-7nos-panel {
        position: absolute;
        right: 0;
        bottom: 90px;
        width: 360px;
        max-height: min(78vh, 680px);
        display: flex;
        flex-direction: column;
        border-radius: 24px;
        overflow: hidden;
        background: rgba(34, 18, 56, 0.97);
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
        background: linear-gradient(135deg, rgba(123,31,162,0.98), rgba(199,125,255,0.95));
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
        gap: 12px;
        min-width: 0;
      }

      .oraculo-7nos-title-icon {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: rgba(255,255,255,0.16);
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        overflow: hidden;
      }

      .oraculo-7nos-title {
        margin: 0;
        font-size: 18px;
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
        width: 36px;
        height: 36px;
        border: none;
        border-radius: 50%;
        background: rgba(255,255,255,0.14);
        color: #fff;
        font-size: 18px;
        cursor: pointer;
        flex: 0 0 auto;
      }

      .oraculo-7nos-body {
        padding: 15px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
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
        padding: 14px 14px;
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
        padding: 12px 10px;
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
        padding: 15px 16px;
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
        padding: 15px;
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
        line-height: 1.65;
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

      @media (max-width: 640px) {
        #oraculo-7nos-root {
          right: 12px;
          bottom: 12px;
        }

        .oraculo-7nos-toggle {
          width: 88px;
          height: 88px;
          position: relative;
          z-index: 1000001;
        }

        .oraculo-7nos-toggle img {
          width: 90%;
          height: 90%;
        }

        .oraculo-7nos-bubble {
          right: 0;
          bottom: 108px;
          max-width: 240px;
          white-space: normal;
          font-size: 13px;
          line-height: 1.4;
          padding: 12px 14px;
          z-index: 1000001;
        }

        .oraculo-7nos-panel {
          position: fixed !important;
          left: 12px !important;
          right: 12px !important;
          top: 20px !important;
          bottom: 110px !important;
          width: auto !important;
          max-width: none !important;
          max-height: none !important;
          border-radius: 24px;
          z-index: 1000000;
          transform: translateY(18px) scale(0.98);
        }

        .oraculo-7nos-panel.open {
          transform: translateY(0) scale(1);
        }

        .oraculo-7nos-header {
          padding: 18px 16px 14px;
        }

        .oraculo-7nos-title-wrap {
          gap: 12px;
        }

        .oraculo-7nos-title-icon {
          width: 50px;
          height: 50px;
        }

        .oraculo-7nos-title {
          font-size: 20px;
          line-height: 1.2;
        }

        .oraculo-7nos-subtitle {
          font-size: 13px;
          line-height: 1.45;
        }

        .oraculo-7nos-close {
          width: 38px;
          height: 38px;
          font-size: 20px;
        }

        .oraculo-7nos-body {
          padding: 16px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .oraculo-7nos-label {
          font-size: 14px;
          margin-bottom: 9px;
        }

        .oraculo-7nos-input {
          font-size: 16px;
          padding: 16px 15px;
          border-radius: 16px;
          margin-bottom: 16px;
        }

        .oraculo-7nos-cats {
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 16px;
        }

        .oraculo-7nos-cat {
          min-height: 50px;
          padding: 14px 10px;
          font-size: 15px;
          border-radius: 16px;
        }

        .oraculo-7nos-primary {
          padding: 17px 16px;
          font-size: 17px;
          border-radius: 16px;
        }

        .oraculo-7nos-result {
          padding: 16px;
          border-radius: 18px;
        }

        .oraculo-7nos-result h4 {
          font-size: 17px;
          margin-bottom: 10px;
        }

        .oraculo-7nos-result p {
          font-size: 15px;
          line-height: 1.75;
        }

        .oraculo-7nos-actions {
          gap: 10px;
        }

        .oraculo-7nos-secondary,
        .oraculo-7nos-wa {
          font-size: 15px;
          padding: 14px 12px;
          border-radius: 15px;
        }

        .oraculo-7nos-footer {
          font-size: 12px;
          margin-top: 12px;
        }
      }

      @media (max-width: 420px) {
        .oraculo-7nos-panel {
          left: 10px !important;
          right: 10px !important;
          top: 16px !important;
          bottom: 104px !important;
          border-radius: 22px;
        }

        .oraculo-7nos-bubble {
          max-width: 220px;
          bottom: 104px;
        }

        .oraculo-7nos-title {
          font-size: 19px;
        }

        .oraculo-7nos-subtitle {
          font-size: 12px;
        }

        .oraculo-7nos-cat {
          font-size: 14px;
        }

        .oraculo-7nos-primary {
          font-size: 16px;
        }
      }

      @media (pointer: coarse) and (max-height: 500px) {
        #oraculo-7nos-root {
          right: 10px;
          bottom: 10px;
        }

        .oraculo-7nos-toggle {
          width: 64px;
          height: 64px;
        }

        .oraculo-7nos-bubble {
          bottom: 76px;
          max-width: 200px;
          font-size: 11px;
          line-height: 1.3;
          padding: 9px 11px;
        }

        .oraculo-7nos-panel {
          position: fixed !important;
          left: 8px !important;
          right: 8px !important;
          top: 8px !important;
          bottom: 78px !important;
          width: auto !important;
          max-width: none !important;
          max-height: none !important;
          border-radius: 16px !important;
        }

        .oraculo-7nos-header {
          padding: 10px 12px 8px;
        }

        .oraculo-7nos-title-wrap {
          gap: 10px;
        }

        .oraculo-7nos-title-icon {
          width: 34px;
          height: 34px;
        }

        .oraculo-7nos-title {
          font-size: 15px;
          line-height: 1.15;
        }

        .oraculo-7nos-subtitle {
          font-size: 10px;
          line-height: 1.25;
          margin-top: 2px;
        }

        .oraculo-7nos-close {
          width: 30px;
          height: 30px;
          font-size: 16px;
        }

        .oraculo-7nos-body {
          padding: 10px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .oraculo-7nos-label {
          font-size: 11px;
          margin-bottom: 5px;
        }

        .oraculo-7nos-input {
          padding: 10px 12px;
          font-size: 13px;
          margin-bottom: 10px;
          border-radius: 10px;
        }

        .oraculo-7nos-cats {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
          margin-bottom: 10px;
        }

        .oraculo-7nos-cat {
          min-height: 36px;
          padding: 8px 6px;
          font-size: 12px;
          border-radius: 10px;
        }

        .oraculo-7nos-primary {
          padding: 11px 12px;
          font-size: 13px;
          border-radius: 11px;
        }

        .oraculo-7nos-error {
          margin-top: 8px;
          padding: 8px 10px;
          font-size: 11px;
        }

        .oraculo-7nos-result {
          margin-top: 10px;
          padding: 10px;
          border-radius: 12px;
        }

        .oraculo-7nos-result h4 {
          font-size: 13px;
          margin-bottom: 6px;
        }

        .oraculo-7nos-result p {
          font-size: 12px;
          line-height: 1.45;
        }

        .oraculo-7nos-actions {
          gap: 6px;
          margin-top: 8px;
        }

        .oraculo-7nos-secondary,
        .oraculo-7nos-wa {
          font-size: 12px;
          padding: 9px 8px;
          border-radius: 10px;
        }

        .oraculo-7nos-footer {
          font-size: 9px;
          margin-top: 6px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createMarkup() {
    const catsMarkup = CATEGORIAS.map(function (cat) {
      return '<button type="button" class="oraculo-7nos-cat" data-cat="' + cat.key + '">' + cat.label + "</button>";
    }).join("");

    return `
      <div id="oraculo-7nos-root" data-version="${VERSION}">
        <div class="oraculo-7nos-bubble" id="oraculo-7nos-bubble">Receba sua mensagem do oráculo</div>

        <div class="oraculo-7nos-panel" id="oraculo-7nos-panel" aria-hidden="true">
          <div class="oraculo-7nos-header">
            <div class="oraculo-7nos-topline">
              <div class="oraculo-7nos-title-wrap">
                <div class="oraculo-7nos-title-icon" id="oraculo-7nos-title-icon">
                  <img src="${ORACULO_ICON_URL}" alt="Oráculo" class="oraculo-remote-icon" />
                  <div class="oraculo-fallback-face" aria-hidden="true">🔮</div>
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
          <img src="${ORACULO_ICON_URL}" alt="Abrir oráculo" class="oraculo-remote-icon" />
          <div class="oraculo-fallback-face" aria-hidden="true">🔮</div>
        </button>
      </div>
    `;
  }

  function ativarFallbackDeImagem(root) {
    const imagens = root.querySelectorAll(".oraculo-remote-icon");

    imagens.forEach(function (img) {
      img.addEventListener("error", function () {
        img.style.display = "none";
        const fallback = img.parentElement.querySelector(".oraculo-fallback-face");
        if (fallback) fallback.style.display = "flex";
      });

      img.addEventListener("load", function () {
        img.style.display = "block";
        const fallback = img.parentElement.querySelector(".oraculo-fallback-face");
        if (fallback) fallback.style.display = "none";
      });
    });
  }

  function mount() {
    if (document.getElementById("oraculo-7nos-root")) return;

    injectStyles();

    const host = document.createElement("div");
    host.innerHTML = createMarkup();
    const root = host.firstElementChild;
    document.body.appendChild(root);

    ativarFallbackDeImagem(root);
    bindEvents(root);
  }

  function bindEvents(root) {
    const bubble = root.querySelector("#oraculo-7nos-bubble");
    const panel = root.querySelector("#oraculo-7nos-panel");
    const toggle = root.querySelector("#oraculo-7nos-toggle");
    const closeBtn = root.querySelector("#oraculo-7nos-close");
    const nameInput = root.querySelector("#oraculo-7nos-name");
    const generateBtn = root.querySelector("#oraculo-7nos-generate");
    const errorBox = root.querySelector("#oraculo-7nos-error");
    const resultBox = root.querySelector("#oraculo-7nos-result");
    const resultTitle = root.querySelector("#oraculo-7nos-result-title");
    const resultText = root.querySelector("#oraculo-7nos-result-text");
    const actionsBox = root.querySelector("#oraculo-7nos-actions");
    const waBtn = root.querySelector("#oraculo-7nos-wa");
    const againBtn = root.querySelector("#oraculo-7nos-again");
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

      if (isCompactMobileView()) {
        root.classList.add("oraculo-mobile-open");
      } else {
        root.classList.remove("oraculo-mobile-open");
      }

      setTimeout(function () {
        nameInput.focus();
      }, 120);
    }

    function closePanel() {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
      root.classList.remove("oraculo-mobile-open");
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

    closeBtn.addEventListener("click", function () {
      closePanel();
    });

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

    generateBtn.addEventListener("click", function () {
      renderMessage();
    });

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

    window.addEventListener("resize", function () {
      if (!panel.classList.contains("open")) {
        root.classList.remove("oraculo-mobile-open");
        return;
      }

      if (isCompactMobileView()) {
        root.classList.add("oraculo-mobile-open");
      } else {
        root.classList.remove("oraculo-mobile-open");
      }
    });

    hideBubbleSoon();
  }

  waitForBody(mount);
})();
