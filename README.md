# Talwasser – Leseassistent (Variante A)

Dieses Paket enthält:
- chapter_template.html (Kapitel-Vorlage)
- logic.js (Sofortkorrektur, Synonyme, Freischaltung, Reset, Export)
- questions.json (alle 104 Fragen inkl. Erwartungshorizont + Synonyme)

## Grundprinzip
- Jede Kapitel-Seite setzt nur `window.TW_CHAPTER_ID` und bindet `logic.js` ein.
- Fragen & Lösungen kommen zentral aus `questions.json`.
- Alles liegt im **Root** deines Repos.

## Kapiteldateien erzeugen (ohne Programmieren)
1) `chapter_template.html` kopieren und umbenennen, z.B. `I_01.html`.
2) In der kopierten Datei 3 Platzhalter ersetzen:
   - `{{KAPITEL_TITEL}}` → z.B. `Teil I – Kapitel 1`
   - `{{PDF_NAME}}` → z.B. `I_01.pdf`
   - `{{ID}}` → z.B. `I_01`
3) Optional Bilder im Abschnitt `<div class="bilder">` als `<img src="...">` ergänzen.

## Benennung (wichtig)
- PDFs: `I_01.pdf … I_22.pdf` und `II_01.pdf … II_30.pdf`
- Kapitel-HTMLs: `I_01.html … I_22.html` und `II_01.html … II_30.html`

## Reset
- Button „Reset dieses Kapitels“ löscht nur Keys dieses Kapitels (LocalStorage).
