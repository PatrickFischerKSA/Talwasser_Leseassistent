
function saveAnswer(key) {
  const val = document.getElementById(key).value;
  localStorage.setItem(key, val);
}

function loadAnswer(key) {
  const val = localStorage.getItem(key);
  if (val !== null) document.getElementById(key).value = val;
}

function resetChapter(prefix) {
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith(prefix)) localStorage.removeItem(k);
  });
  location.reload();
}
