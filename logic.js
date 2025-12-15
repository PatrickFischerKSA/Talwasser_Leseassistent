// Talwasser – vollständige Kapitel- & PDF-Logik

function pdfPath(part, chapterNumber) {
  return `../Talwasser_${part}:${chapterNumber}.pdf`;
}

function chapterImage(part, chapterNumber) {
  const map = {
    "I": {
      1:"Alt_Innerthal.jpg",2:"WaegitalimWinter.jpg",3:"Alt_Innerthal.jpg",4:"WaegitalimWinter.jpg",
      5:"Bauarbeiten.jpg",6:"Bauarbeiten_2.jpg",7:"Bauarbeiten_3.jpg",8:"Stollenbau.jpg",
      9:"Stollenbau.jpg",10:"StaumauerBauarbeiten.jpg",11:"StaumauerBauarbeiten.jpg",
      12:"Bauarbeiten_3.jpg",13:"Stollenbau.jpg",14:"StaumauerBauarbeiten.jpg",
      15:"Bauarbeiten_2.jpg",16:"Bauarbeiten.jpg",17:"Bauarbeiten_3.jpg",
      18:"StaumauerBauarbeiten.jpg",19:"BlickaufStaumauer.jpg",
      20:"BlickaufStaumauer.jpg",21:"BlickaufStaumauer_2.jpg",22:"BlickaufStaumauer_2.jpg"
    },
    "II": {
      1:"BlickaufStaumauer_2.jpg",2:"Waegitalersee.jpg",3:"Waegitalersee.jpg",4:"Waegitalersee.jpg",
      5:"Kraftwerk.jpg",6:"Kraftwerk.jpg",7:"Kraftwerk.jpg"
    }
  };
  return map[part]?.[chapterNumber]
    ? `../assets/images/${map[part][chapterNumber]}`
    : null;
}

function initChapter(cfg) {
  const img = chapterImage(cfg.part, cfg.chapterNumber);
  if (img) {
    const i = document.createElement("img");
    i.src = img;
    i.style.width = "100%";
    i.style.marginBottom = "0.8rem";
    document.querySelector(".pdf-panel")?.prepend(i);
  }
}
