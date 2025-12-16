/* Talwasser Leseassistent – Logic (Root-only) */
function norm(s){
  if(!s) return "";
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^\p{L}\p{N}]+/gu," ")
    .replace(/\s+/g," ")
    .trim();
}
function tokenSet(s){
  const t = norm(s).split(" ").filter(Boolean);
  return new Set(t);
}
function similarity(a,b){
  // simple token Jaccard
  const A = tokenSet(a), B = tokenSet(b);
  if(A.size===0 || B.size===0) return 0;
  let inter=0;
  for(const x of A) if(B.has(x)) inter++;
  const uni = A.size + B.size - inter;
  return inter/uni;
}
function isCorrect(input, keywords){
  const v = norm(input);
  if(!v) return false;
  const ks = (keywords||[]).map(k=>norm(k)).filter(Boolean);
  if(ks.length===0){
    // no keyword list: accept any non-empty after 3 tries (handled elsewhere)
    return false;
  }
  // generous: accept if any keyword appears as substring OR Jaccard similarity with any keyword >= 0.34
  for(const k of ks){
    if(!k) continue;
    if(v.includes(k)) return true;
    if(similarity(v,k) >= 0.34) return true;
  }
  return false;
}

function lsKey(part, chap, qnum){ return `talwasser:${part}:${chap}:q${qnum}`; }
function lsCommentKey(part, chap){ return `talwasser:${part}:${chap}:comment`; }
function lsTryKey(part, chap, qnum){ return `talwasser:${part}:${chap}:q${qnum}:tries`; }
function setLS(k,v){ localStorage.setItem(k, v); }
function getLS(k, d=""){ const v = localStorage.getItem(k); return (v===null? d : v); }
function delLS(k){ localStorage.removeItem(k); }

async function loadQuestions(){
  const res = await fetch("questions.json", {cache:"no-store"});
  if(!res.ok) throw new Error("questions.json konnte nicht geladen werden.");
  return await res.json();
}

function initChapter(part, chap){
  loadQuestions().then(data=>{
    const list = (data?.[part]?.[String(chap)]) || [];
    const qWrap = document.getElementById("questions");
    qWrap.innerHTML = "";
    list.forEach((q, idx)=>{
      const qnum = q.num;
      const card = document.createElement("div");
      card.className = "qcard";
      card.id = `qcard-${qnum}`;

      const title = document.createElement("div");
      title.className = "qtitle";
      title.textContent = `${qnum}. ${q.question}`;
      card.appendChild(title);

      const input = document.createElement("textarea");
      input.rows = 3;
      input.placeholder = "Antwort eingeben…";
      input.value = getLS(lsKey(part, chap, qnum), "");
      card.appendChild(input);

      const btn = document.createElement("button");
      btn.className = "btn";
      btn.textContent = "Antwort prüfen";
      card.appendChild(btn);

      const msg = document.createElement("div");
      msg.className = "msg";
      card.appendChild(msg);

      const sol = document.createElement("div");
      sol.className = "solution hidden";
      sol.innerHTML = `<div><b>Lösungsvorschlag:</b> ${q.expectation ? q.expectation : "—"}</div>`;
      card.appendChild(sol);

      // gating: only show first question initially
      if(idx>0){
        card.classList.add("hidden");
      }

      // restore tries and show solution if already 3+
      const tries = parseInt(getLS(lsTryKey(part, chap, qnum), "0"), 10) || 0;
      if(tries>=3){
        sol.classList.remove("hidden");
        msg.textContent = "Max. Fehlversuche erreicht – Lösungsvorschlag eingeblendet.";
        msg.classList.add("bad");
      }

      function revealNext(){
        const next = list[idx+1];
        if(!next) return;
        const nextCard = document.getElementById(`qcard-${next.num}`);
        if(nextCard) nextCard.classList.remove("hidden");
      }

      // if already answered correctly earlier, unlock next
      const stored = getLS(lsKey(part, chap, qnum), "");
      const okFlag = getLS(`talwasser:${part}:${chap}:q${qnum}:ok`, "0")==="1";
      if(okFlag){
        msg.textContent = "✓ gespeichert (bereits korrekt).";
        msg.classList.add("ok");
        revealNext();
      }

      btn.addEventListener("click", ()=>{
        const ans = input.value || "";
        setLS(lsKey(part, chap, qnum), ans);

        let triesNow = parseInt(getLS(lsTryKey(part, chap, qnum), "0"), 10) || 0;

        const keywords = q.synonyms || [];
        const correct = isCorrect(ans, keywords);

        // generous: if empty keyword list, never auto-correct; but our doc always has synonyms
        if(correct){
          msg.textContent = "✓ korrekt (grosszügig erkannt).";
          msg.className = "msg ok";
          setLS(`talwasser:${part}:${chap}:q${qnum}:ok`, "1");
          revealNext();
          return;
        }

        triesNow += 1;
        setLS(lsTryKey(part, chap, qnum), String(triesNow));
        setLS(`talwasser:${part}:${chap}:q${qnum}:ok`, "0");

        if(triesNow>=3){
          sol.classList.remove("hidden");
          msg.textContent = "Nicht korrekt – Lösungsvorschlag eingeblendet. Du kannst weiter.";
          msg.className = "msg bad";
          revealNext();
        }else{
          msg.textContent = `Noch nicht korrekt. Versuch ${triesNow}/3.`;
          msg.className = "msg bad";
        }
      });

      qWrap.appendChild(card);
    });

    // comment
    const c = document.getElementById("comment");
    if(c){
      c.value = getLS(lsCommentKey(part, chap), "");
      c.addEventListener("input", ()=> setLS(lsCommentKey(part, chap), c.value||""));
    }
  }).catch(err=>{
    const qWrap = document.getElementById("questions");
    qWrap.innerHTML = `<p style="color:#b00020"><b>Fehler:</b> ${err.message}</p>`;
  });
}
