(function () {

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

  function css(e,t){e.style.cssText=t;return e;}
  function txt(e,t){e.textContent=t;return e;}

  var btn=document.createElement("button");
  txt(btn,"💬");
  css(btn,"position:fixed;right:18px;bottom:18px;z-index:999999;width:56px;height:56px;border-radius:999px;border:none;background:#25D366;color:#fff;font-size:26px;cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.2);");
  document.body.appendChild(btn);

  var box=document.createElement("div");
  css(box,"position:fixed;right:18px;bottom:86px;z-index:999999;width:340px;max-width:calc(100vw - 36px);border-radius:18px;overflow:hidden;box-shadow:0 14px 40px rgba(0,0,0,.25);background:#fff;font-family:Arial,sans-serif;display:none;");
  document.body.appendChild(box);

  var header=document.createElement("div");
  css(header,"padding:12px 14px;background:#111827;color:#fff;display:flex;justify-content:space-between;align-items:center;");
  box.appendChild(header);

  var hL=document.createElement("div");
  header.appendChild(hL);

  var h1=document.createElement("div");
  css(h1,"font-weight:bold;font-size:14px;");
  txt(h1,BRAND_NAME);
  hL.appendChild(h1);

  var h2=document.createElement("div");
  css(h2,"font-size:11px;opacity:.85;");
  txt(h2,SUBTITLE);
  hL.appendChild(h2);

  var close=document.createElement("button");
  txt(close,"✕");
  css(close,"background:transparent;border:none;color:#fff;font-size:18px;cursor:pointer;");
  header.appendChild(close);

  var body=document.createElement("div");
  css(body,"padding:12px;background:#F3F4F6;height:260px;overflow:auto;font-size:13px;");
  box.appendChild(body);

  var opt=document.createElement("div");
  css(opt,"padding:10px 12px;background:#fff;border-top:1px solid #E5E7EB;display:flex;gap:8px;flex-wrap:wrap;");
  box.appendChild(opt);

  var footer=document.createElement("div");
  css(footer,"padding:10px 12px;background:#fff;border-top:1px solid #E5E7EB;display:flex;gap:8px;");
  box.appendChild(footer);

  var input=document.createElement("input");
  input.placeholder="Escreva aqui…";
  css(input,"flex:1;border:1px solid #E5E7EB;border-radius:12px;padding:10px;font-size:13px;outline:none;");
  footer.appendChild(input);

  var send=document.createElement("button");
  txt(send,"Enviar");
  css(send,"border:none;border-radius:12px;padding:0 14px;background:#111827;color:#fff;font-size:13px;cursor:pointer;");
  footer.appendChild(send);

  var go=document.createElement("button");
  txt(go,"✅ WhatsApp");
  css(go,"border:none;border-radius:999px;padding:8px 10px;background:#111827;color:#fff;font-size:12px;cursor:pointer;");
  opt.appendChild(go);

  var log=[];

  function bubble(msg,me){
    var r=document.createElement("div");
    css(r,"margin:8px 0;display:flex;justify-content:"+(me?"flex-end":"flex-start")+";");
    var b=document.createElement("div");
    css(b,"max-width:82%;padding:10px 12px;border-radius:14px;box-shadow:0 6px 16px rgba(0,0,0,.08);"+(me?"background:#2563EB;color:#fff;border-top-right-radius:6px;":"background:#fff;color:#111827;border-top-left-radius:6px;"));
    txt(b,msg);
    r.append
