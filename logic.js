function keyFor(chapterId, field){ return `talwasser:${chapterId}:${field}`; }

function loadInto(id, chapterId, field){
  const el = document.getElementById(id);
  if(!el) return;
  el.value = localStorage.getItem(keyFor(chapterId, field)) || "";
}

function saveFrom(id, chapterId, field){
  const el = document.getElementById(id);
  if(!el) return;
  localStorage.setItem(keyFor(chapterId, field), el.value);
}

function initChapter(chapterId){
  loadInto("answer1", chapterId, "a1");
  loadInto("answer2", chapterId, "a2");
  loadInto("observations", chapterId, "obs");

  ["answer1","answer2","observations"].forEach((id, idx)=>{
    const field = idx===0 ? "a1" : (idx===1 ? "a2" : "obs");
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener("input", ()=>saveFrom(id, chapterId, field));
  });
}

function resetChapter(chapterId){
  if(!confirm("Alle Antworten in diesem Kapitel löschen?")) return;
  ["a1","a2","obs"].forEach(f=>localStorage.removeItem(keyFor(chapterId,f)));
  // clear UI too
  ["answer1","answer2","observations"].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.value="";
  });
}
