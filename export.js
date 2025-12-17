/* Export all answers (incl. comments) to a printable page -> PDF via browser print */
async function exportAll(){
  let data;
  try{
    const res = await fetch("questions.json", {cache:"no-store"});
    data = await res.json();
  }catch(e){
    alert("questions.json konnte nicht geladen werden.");
    return;
  }

  const rows = [];
  function pushPart(part){
    const chapters = data?.[part] || {};
    const chapNums = Object.keys(chapters).map(x=>parseInt(x,10)).sort((a,b)=>a-b);
    chapNums.forEach(ch=>{
      const qs = chapters[String(ch)] || [];
      qs.forEach(q=>{
        const ans = localStorage.getItem(`talwasser:${part}:${ch}:q${q.num}`) || "";
        rows.push({part, chapter: ch, qnum: q.num, question: q.question, answer: ans});
      });
      const com = localStorage.getItem(`talwasser:${part}:${ch}:comment`) || "";
      rows.push({part, chapter: ch, qnum: "", question: "Eigene Beobachtungen", answer: com});
    });
  }
  pushPart("I"); pushPart("II");

  const w = window.open("", "_blank");
  if(!w){ alert("Popup blockiert. Bitte Popups erlauben."); return; }
  const esc = (s)=> (s||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
  const now = new Date().toLocaleString();
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Talwasser – Export</title>
  <style>
    body{font-family:Georgia,serif; margin:24px;}
    h1{margin:0 0 8px;}
    .meta{color:#444; margin-bottom:18px;}
    .item{margin:10px 0; padding:10px; border:1px solid #ddd; border-radius:8px;}
    .q{font-weight:bold;}
    pre{white-space:pre-wrap; font-family:inherit; margin:6px 0 0;}
  </style></head><body>
  <h1>Talwasser – Antwortenexport</h1>
  <div class="meta">Erstellt: ${esc(now)}</div>
  `);

  rows.forEach(r=>{
    const head = r.qnum!=="" ? `Teil ${r.part} – Kapitel ${r.chapter} – Frage ${r.qnum}` : `Teil ${r.part} – Kapitel ${r.chapter} – ${r.question}`;
    w.document.write(`<div class="item"><div class="q">${esc(head)}</div><div>${esc(r.question)}</div><pre>${esc(r.answer)}</pre></div>`);
  });

  w.document.write(`<script>window.onload=()=>{window.print();}</script></body></html>`);
  w.document.close();
}

document.addEventListener("DOMContentLoaded", ()=>{
  const b = document.getElementById("exportBtn");
  if(b) b.addEventListener("click", exportAll);
});
