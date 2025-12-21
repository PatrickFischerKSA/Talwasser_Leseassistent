const IMAGE_MAP = {
  landscape: [
    "Waegitalersee.jpg",
    "WaegitalimWinter.jpg",
    "BildWaegitalerseeheute.jpg",
    "Alt_Innertal.jpg"
  ],
  construction: [
    "StaumauerBauarbeiten.jpg",
    "Bauarbeiten.jpg",
    "Bauarbeiten_2.jpg",
    "Bauarbeiten_3.jpg",
    "Stollenbau.jpg",
    "BlickaufStaumauer.jpg",
    "BlickaufStaumauer_2.jpg"
  ]
};

function chapterKey(chapterId, field) {
  return `talwasser:${chapterId}:${field}`;
}

function saveText(chapterId, field, value) {
  localStorage.setItem(chapterKey(chapterId, field), value);
  updateProgressBadges();
}

function loadText(chapterId, field) {
  return localStorage.getItem(chapterKey(chapterId, field)) || "";
}

function resetChapter(chapterId) {
  const prefix = `talwasser:${chapterId}:`;
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) localStorage.removeItem(k);
  }
  location.reload();
}

function resetAll() {
  const prefix = "talwasser:";
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) localStorage.removeItem(k);
  }
  location.href = "index.html";
}

function pickImage(chapterId) {
  const m = chapterId.match(/^(I|II)_(\d{2})$/);
  if (!m) return IMAGE_MAP.landscape[0];
  const part = m[1];
  const num = parseInt(m[2], 10);

  if (part === "I") {
    if (num <= 8) return IMAGE_MAP.landscape[(num - 1) % IMAGE_MAP.landscape.length];
    if (num <= 15) return IMAGE_MAP.construction[(num - 9) % IMAGE_MAP.construction.length];
    return IMAGE_MAP.construction[(num - 1) % IMAGE_MAP.construction.length];
  } else {
    if (num <= 10) return IMAGE_MAP.construction[(num - 1) % IMAGE_MAP.construction.length];
    return IMAGE_MAP.landscape[(num - 11) % IMAGE_MAP.landscape.length];
  }
}

function setHeroImage(chapterId) {
  const img = document.getElementById("heroImage");
  if (!img) return;
  img.src = pickImage(chapterId);
  img.onerror = () => { img.style.display = "none"; };
}

function initChapter(chapterId) {
  setHeroImage(chapterId);
  const a1 = document.getElementById("answer1");
  const a2 = document.getElementById("answer2");
  const obs = document.getElementById("observations");
  if (a1) a1.value = loadText(chapterId, "a1");
  if (a2) a2.value = loadText(chapterId, "a2");
  if (obs) obs.value = loadText(chapterId, "obs");
  updateProgressBadges();
}

function chapterIsDone(chapterId) {
  const a1 = loadText(chapterId, "a1").trim();
  const a2 = loadText(chapterId, "a2").trim();
  return a1.length > 0 && a2.length > 0;
}

function updateProgressBadges() {
  const badges = document.querySelectorAll("[data-chapter-id]");
  badges.forEach(b => {
    const id = b.getAttribute("data-chapter-id");
    if (!id) return;
    b.textContent = chapterIsDone(id) ? "✔︎ erledigt" : "… offen";
  });

  const totalEl = document.getElementById("progressTotal");
  const doneEl = document.getElementById("progressDone");
  if (!totalEl || !doneEl) return;

  const ids = Array.from(document.querySelectorAll("[data-chapter-id]"))
    .map(el => el.getAttribute("data-chapter-id"))
    .filter(Boolean);

  const done = ids.filter(chapterIsDone).length;
  totalEl.textContent = String(ids.length);
  doneEl.textContent = String(done);
}
