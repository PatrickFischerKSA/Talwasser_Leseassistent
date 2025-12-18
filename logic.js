/* Talwasser – Leseassistent: Logik (Sofortkorrektur, Synonyme, Freischaltung, Reset, Export)
   - Liest questions.json aus dem Root
   - Speichert Antworten in localStorage
*/
(function(){
  const KEY = (id, f) => `TW:${id}:f${f}`;
  const KEY_TRIES = (id, f) => `TW:${id}:tries:f${f}`;
  const KEY_UNLOCK = (id) => `TW:${id}:unlock_f2`;
  const KEY_NOTES = (id) => `TW:${id}:notes`;

  function norm(s){
    return (s||"")
      .toLowerCase()
      .replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss")
      .replace(/[^\p{L}\p{N}\s]/gu," ")
      .replace(/\s+/g," ")
      .trim();
  }

  function tokens(s){
    const t = norm(s).split(" ").filter(Boolean);
    // remove very short tokens
    return t.filter(w => w.length >= 3);
  }

  function jaccard(a, b){
    const A = new Set(tokens(a));
    const B = new Set(tokens(b));
    if (A.size === 0 || B.size === 0) return 0;
    let inter = 0;
    for (const x of A) if (B.has(x)) inter++;
    const union = A.size + B.size - inter;
    return union ? inter / union : 0;
  }

  function hasSynGroup(answer, group){
    const na = norm(answer);
    return group.some(term => na.includes(norm(term)));
  }

  function synonymScore(answer, groups){
    if (!groups || !groups.length) return 0;
    let hit = 0;
    for (const g of groups){
      if (hasSynGroup(answer, g)) hit++;
    }
    return hit / groups.length;
  }

  function loadJSON(){
    return fetch("questions.json", {cache:"no-store"}).then(r=>{
      if(!r.ok) throw new Error("questions.json konnte nicht geladen werden.");
      return r.json();
    });
  }

  let QUESTIONS = null;

  function qKey(id, f){
    return `${id}_f${f}`;
  }

  function setText(id, f, txt){
    const el = document.getElementById(`${id}_q${f}_text`);
    if (el) el.textContent = txt || "";
  }

  function getTA(id, f){
    return document.getElementById(`${id}_f${f}`);
  }

  function setStatus(id, f, msg){
    const el = document.getElementById(`${id}_f${f}_status`);
    if (el) el.textContent = msg || "";
  }

  function showSolution(id, f, txt){
    const el = document.getElementById(`${id}_f${f}_solution`);
    if (el){
      el.style.display = "block";
      el.textContent = `Lösungsvorschlag: ${txt}`;
    }
  }

  function lockF2(id, locked){
    const blk = document.getElementById(`${id}_block_f2`);
    if(!blk) return;
    if(locked) blk.classList.add("locked");
    else blk.classList.remove("locked");
  }

  function saveAnswer(id, f){
    const ta = getTA(id,f);
    if(!ta) return;
    localStorage.setItem(KEY(id,f), ta.value || "");
  }

  function loadAnswer(id, f){
    const ta = getTA(id,f);
    if(!ta) return;
    const v = localStorage.getItem(KEY(id,f));
    if (v !== null) ta.value = v;
  }

  function loadNotes(id){
    const el = document.getElementById(`${id}_notes`);
    if(!el) return;
    const v = localStorage.getItem(KEY_NOTES(id));
    if (v !== null) el.value = v;
    el.addEventListener("input", ()=> localStorage.setItem(KEY_NOTES(id), el.value || ""));
  }

  function tries(id, f){
    return parseInt(localStorage.getItem(KEY_TRIES(id,f)) || "0", 10);
  }
  function incTries(id, f){
    const t = tries(id,f) + 1;
    localStorage.setItem(KEY_TRIES(id,f), String(t));
    return t;
  }
  function resetTries(id, f){
    localStorage.removeItem(KEY_TRIES(id,f));
  }

  function isUnlocked(id){
    return localStorage.getItem(KEY_UNLOCK(id)) === "1";
  }
  function unlockF2(id){
    localStorage.setItem(KEY_UNLOCK(id), "1");
    lockF2(id, false);
  }

  function evaluate(answer, expectation, synGroups){
    const jac = jaccard(answer, expectation);
    const syn = synonymScore(answer, synGroups);
    // generous: accept if either decent token overlap OR synonym groups hit enough
    const pass = (jac >= 0.32) || (syn >= 0.5 && tokens(answer).length >= 3) || (syn >= 0.75);
    return {pass, jac, syn};
  }

  function check(id, f){
    if(!QUESTIONS){
      setStatus(id,f,"Fragen werden noch geladen…");
      return;
    }
    const k = qKey(id,f);
    const q = QUESTIONS[k];
    if(!q){
      setStatus(id,f,"Fehlende Frage in questions.json.");
      return;
    }

    const ta = getTA(id,f);
    const ans = ta ? (ta.value || "") : "";
    saveAnswer(id,f);

    const res = evaluate(ans, q.expectation || "", q.synonyms || []);
    if(res.pass){
      setStatus(id,f,`✓ korrekt (Synonyme: ${(res.syn*100|0)}%, Textnähe: ${(res.jac*100|0)}%)`);
      resetTries(id,f);
      // unlock next after f1
      if(f === 1) unlockF2(id);
      return;
    }

    const t = incTries(id,f);
    if(t >= 3){
      setStatus(id,f,"✗ noch nicht – Lösungsvorschlag eingeblendet. Du darfst weiter.");
      showSolution(id,f, q.expectation || "");
      // after 3 attempts, allow progress
      if(f === 1) unlockF2(id);
      return;
    }
    setStatus(id,f,`✗ noch nicht (Versuch ${t}/3). Versuche es nochmals.`);
  }

  function resetChapter(id){
    if(!confirm("Wirklich dieses Kapitel zurücksetzen? (Antworten + Notizen werden gelöscht)")) return;
    const prefixes = [`TW:${id}:`];
    const toDelete = [];
    for(let i=0;i<localStorage.length;i++){
      const k = localStorage.key(i);
      if(!k) continue;
      if(prefixes.some(p => k.startsWith(p))) toDelete.push(k);
    }
    toDelete.forEach(k => localStorage.removeItem(k));
    // also remove unlock
    localStorage.removeItem(KEY_UNLOCK(id));
    // clear UI
    [1,2].forEach(f=>{
      const ta = getTA(id,f); if(ta) ta.value="";
      setStatus(id,f,"");
      const sol = document.getElementById(`${id}_f${f}_solution`);
      if(sol){ sol.style.display="none"; sol.textContent=""; }
    });
    const notes = document.getElementById(`${id}_notes`);
    if(notes) notes.value="";
    lockF2(id, true);
  }

  function exportChapter(id){
    if(!QUESTIONS) return;
    const out = {
      chapter: id,
      exported_at: new Date().toISOString(),
      q1: {
        question: (QUESTIONS[`${id}_f1`]||{}).question || "",
        answer: localStorage.getItem(KEY(id,1)) || "",
        expectation: (QUESTIONS[`${id}_f1`]||{}).expectation || ""
      },
      q2: {
        question: (QUESTIONS[`${id}_f2`]||{}).question || "",
        answer: localStorage.getItem(KEY(id,2)) || "",
        expectation: (QUESTIONS[`${id}_f2`]||{}).expectation || ""
      },
      notes: localStorage.getItem(KEY_NOTES(id)) || ""
    };
    const blob = new Blob([JSON.stringify(out, null, 2)], {type:"application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${id}_export.json`;
    a.click();
    setTimeout(()=> URL.revokeObjectURL(a.href), 1500);
  }

  function initChapter(id){
    // load saved answers/notes
    [1,2].forEach(f => loadAnswer(id,f));
    loadNotes(id);
    // lock/unlock f2
    lockF2(id, !isUnlocked(id));
    // populate question text
    const q1 = QUESTIONS[`${id}_f1`];
    const q2 = QUESTIONS[`${id}_f2`];
    if(q1) setText(id,1,q1.question);
    if(q2) setText(id,2,q2.question);

    // persist answers on input
    [1,2].forEach(f=>{
      const ta = getTA(id,f);
      if(ta) ta.addEventListener("input", ()=> saveAnswer(id,f));
    });
  }

  function boot(){
    const id = window.TW_CHAPTER_ID;
    if(!id) return; // only runs on chapter pages
    loadJSON().then(j=>{
      QUESTIONS = j;
      initChapter(id);
    }).catch(e=>{
      console.error(e);
      setStatus(id,1, e.message || "questions.json konnte nicht geladen werden.");
    });
  }

  window.TW = { check, resetChapter, exportChapter };

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
