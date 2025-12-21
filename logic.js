/* Talwasser – Leseassistent (ROOT) */
const QUESTIONS = {"I":{"1":[{"num":1,"question":"Wie wird die Ausgangssituation des Tals als verletzlich beschrieben?","expectation":"Das Tal erscheint abhängig von äusseren Kräften und naturgegebenen Bedingungen.","synonyms":["verletzlich","bedroht","abhängig","ausgeliefert"]},{"num":2,"question":"Welche Grundstimmung prägt den Beginn des Romans?","expectation":"Eine Mischung aus Unsicherheit, Spannung und latenter Angst.","synonyms":["Unsicherheit","Ungewissheit","Angst","Bedrohung"]}],"2":[{"num":1,"question":"Wie reagieren die Menschen im Tal auf erste Anzeichen von Veränderung?","expectation":"Reaktionen schwanken zwischen Hoffnung, Skepsis und Verdrängung.","synonyms":["Hoffnung","Skepsis","Verdrängung","Abwehr"]},{"num":2,"question":"Warum entstehen unterschiedliche Deutungen derselben Situation?","expectation":"Unterschiedliche Erfahrungen und Interessen prägen die Wahrnehmung.","synonyms":["Deutung","Interpretation","Wahrnehmung","Blick"]}],"3":[{"num":1,"question":"Wie zeigt sich das Verhältnis zwischen Individuum und Gemeinschaft?","expectation":"Einzelne ordnen sich häufig dem Gemeinwohl unter.","synonyms":["Individuum","Einzelner","Gemeinschaft","Kollektiv"]},{"num":2,"question":"Welche Spannungen entstehen daraus?","expectation":"Persönliche Bedürfnisse geraten in Konflikt mit kollektiven Erwartungen.","synonyms":["Spannung","Konflikt","Erwartung","Pflicht"]}],"4":[{"num":1,"question":"Wie wird Heimat als emotionaler Bezugspunkt dargestellt?","expectation":"Heimat ist mehr als ein Ort und eng mit Identität verbunden.","synonyms":["Heimat","Herkunft","Identität","Selbstbild"]},{"num":2,"question":"Warum ist der Gedanke an Verlust besonders belastend?","expectation":"Der Verlust betrifft Lebensgeschichte und Zugehörigkeit.","synonyms":["Verlust","Abschied","Zugehörigkeit","Bindung"]}],"5":[{"num":1,"question":"Wie wird Unsicherheit im Alltag konkret erfahrbar?","expectation":"Fehlende Informationen beeinflussen Handeln und Denken.","synonyms":["Unsicherheit","Ungewissheit","Information","Wissen"]},{"num":2,"question":"Welche Rolle spielen Gespräche und Gerüchte?","expectation":"Sie ersetzen gesicherte Fakten und verstärken Emotionen.","synonyms":["Gerücht","Hörensagen","Verstärkung","Zuspitzung"]}],"6":[{"num":1,"question":"Wie zeigt sich Verantwortung innerhalb der Familie?","expectation":"Verantwortung äussert sich in Fürsorge und Verzicht.","synonyms":["Verantwortung","Pflicht","Verzicht","Entbehrung"]},{"num":2,"question":"Warum ist Verantwortung nicht konfliktfrei?","expectation":"Sie kollidiert mit individuellen Wünschen.","synonyms":["Konflikt","Spannung","Wunsch","Bedürfnis"]}],"7":[{"num":1,"question":"Wie wird politische Entscheidungsmacht wahrgenommen?","expectation":"Entscheidungen erscheinen fern und schwer beeinflussbar.","synonyms":["Macht","Entscheidung","Distanz","Ferne"]},{"num":2,"question":"Welche Gefühle löst dies aus?","expectation":"Ohnmacht und Frustration prägen die Haltung.","synonyms":["Ohnmacht","Machtlosigkeit","Frustration","Ärger"]}],"8":[{"num":1,"question":"Welche Bedeutung hat zwischenmenschliche Nähe in unsicheren Zeiten?","expectation":"Beziehungen geben Halt und Orientierung.","synonyms":["Nähe","Beziehung","Halt","Stabilität"]},{"num":2,"question":"Warum wird Hoffnung an Menschen gebunden?","expectation":"Verlässlichkeit entsteht durch persönliche Bindung.","synonyms":["Hoffnung","Zuversicht","Bindung","Vertrauen"]}],"9":[{"num":1,"question":"Wie verändert sich der Blick auf Zukunftspläne?","expectation":"Zukunft erscheint weniger planbar und offen.","synonyms":["Zukunft","Perspektive","offen","unsicher"]},{"num":2,"question":"Welche Strategien im Umgang mit dieser Unsicherheit werden sichtbar?","expectation":"Anpassung und vorsichtiges Abwarten.","synonyms":["Anpassung","Flexibilität","Abwarten","Zurückhaltung"]}],"10":[{"num":1,"question":"Wie wird Belastung im Alltag spürbar?","expectation":"Dauerhafte Anspannung wirkt körperlich und psychisch.","synonyms":["Belastung","Druck","Anspannung","Stress"]},{"num":2,"question":"Warum fehlt Raum für Entlastung?","expectation":"Die Situation lässt kaum Pausen zu.","synonyms":["Entlastung","Erholung","Pause","Ruhe"]}],"11":[{"num":1,"question":"Wie wird Ausnahmezustand als neue Normalität erfahrbar?","expectation":"Das Ungewöhnliche wird alltäglich.","synonyms":["Ausnahmezustand","Krise","Alltag","Normalität"]},{"num":2,"question":"Welche Gefahren birgt diese Gewöhnung?","expectation":"Abstumpfung und Verlust von Sensibilität.","synonyms":["Gewöhnung","Routine","Abstumpfung","Gleichgültigkeit"]}],"12":[{"num":1,"question":"Wie verändert sich der Umgang mit Leid?","expectation":"Leid wird funktional bewältigt, nicht emotional verarbeitet.","synonyms":["Leid","Schmerz","funktional","distanziert"]},{"num":2,"question":"Warum ist diese Distanz ambivalent?","expectation":"Sie ermöglicht Handeln, verhindert aber Nähe.","synonyms":["Distanz","Abgrenzung","Nähe","Empathie"]}],"13":[{"num":1,"question":"Wie wird Tod dargestellt?","expectation":"Der Tod erscheint anonym und entindividualisiert.","synonyms":["Tod","Sterben","anonym","unpersönlich"]},{"num":2,"question":"Welche Wirkung hat dies auf die Wahrnehmung des Geschehens?","expectation":"Das Ausmass der Situation tritt in den Vordergrund.","synonyms":["Ausmass","Dimension","Wahrnehmung","Eindruck"]}],"14":[{"num":1,"question":"Wie wird Zeit als Belastungsfaktor erfahrbar?","expectation":"Lange Dauer verstärkt Erschöpfung.","synonyms":["Zeit","Dauer","Erschöpfung","Müdigkeit"]},{"num":2,"question":"Warum fehlt ein klarer Endpunkt?","expectation":"Der Verlauf bleibt unberechenbar.","synonyms":["Endpunkt","Abschluss","Unberechenbarkeit","Unsicherheit"]}],"15":[{"num":1,"question":"Wie verändert Routine den Umgang mit Extremsituationen?","expectation":"Routine schafft Stabilität, aber auch Distanz.","synonyms":["Routine","Gewohnheit","Stabilität","Distanz"]},{"num":2,"question":"Welche Ambivalenz zeigt sich darin?","expectation":"Schutz und Abstumpfung wirken zugleich.","synonyms":["Ambivalenz","Zwiespalt","Schutz","Abstumpfung"]}],"16":[{"num":1,"question":"Wie wird Hoffnung trotz Erschöpfung aufrechterhalten?","expectation":"Hoffnung entsteht aus kleinen Zeichen der Veränderung.","synonyms":["Hoffnung","Zuversicht","Veränderung","Anzeichen"]},{"num":2,"question":"Warum bleibt diese Hoffnung fragil?","expectation":"Rückschläge sind jederzeit möglich.","synonyms":["fragil","brüchig","Rückschlag","Gefahr"]}],"17":[{"num":1,"question":"Wie verändert sich der Blick auf Gemeinschaft?","expectation":"Gemeinschaft wird als tragend, aber fordernd erlebt.","synonyms":["Gemeinschaft","Zusammenhalt","Forderung","Belastung"]},{"num":2,"question":"Welche Spannungen bleiben bestehen?","expectation":"Unterschiedliche Erfahrungen führen zu Konflikten.","synonyms":["Spannung","Konflikt","Unterschied","Divergenz"]}],"18":[{"num":1,"question":"Wie wird Erinnerung thematisiert?","expectation":"Erinnerung dient der Verarbeitung des Erlebten.","synonyms":["Erinnerung","Gedenken","Verarbeitung","Bewältigung"]},{"num":2,"question":"Warum ist Vergessen keine Option?","expectation":"Erfahrungen prägen Identität nachhaltig.","synonyms":["Vergessen","Verdrängen","Prägung","Identität"]}],"19":[{"num":1,"question":"Wie kehrt Alltag schrittweise zurück?","expectation":"Alltägliche Strukturen stabilisieren, bleiben aber unsicher.","synonyms":["Alltag","Routine","Stabilisierung","Unsicherheit"]},{"num":2,"question":"Warum wirkt Normalität verändert?","expectation":"Erlebnisse haben Erwartungen verschoben.","synonyms":["Normalität","Gewohnheit","Veränderung","Verschiebung"]}],"20":[{"num":1,"question":"Wie werden langfristige Folgen sichtbar?","expectation":"Das Erlebte beeinflusst Denken und Handeln nachhaltig.","synonyms":["langfristig","dauerhaft","Einfluss","Wirkung"]},{"num":2,"question":"Welche neuen Prioritäten entstehen?","expectation":"Werte verschieben sich.","synonyms":["Priorität","Wert","Verschiebung","Wandel"]}],"21":[{"num":1,"question":"Wie wird Verantwortung rückblickend bewertet?","expectation":"Verantwortung erscheint geteilter und differenzierter.","synonyms":["Verantwortung","Pflicht","Differenzierung","Relativierung"]},{"num":2,"question":"Warum werden einfache Schuldzuweisungen vermieden?","expectation":"Komplexe Zusammenhänge erschweren klare Urteile.","synonyms":["Schuld","Verantwortung","Komplexität","Vielschichtigkeit"]}],"22":[{"num":1,"question":"Wie wird der Abschluss von Teil I gestaltet?","expectation":"Der Teil endet offen und ohne endgültige Lösung.","synonyms":["Abschluss","Ende","offen","vorläufig"]},{"num":2,"question":"Welche Grundhaltung gegenüber der Zukunft wird sichtbar?","expectation":"Vorsichtige Offenheit und Lernbereitschaft.","synonyms":["Offenheit","Wachsamkeit","Lernen","Entwicklung"]}]},"II":{"1":[{"num":1,"question":"Wie verändert sich die Grundstimmung zu Beginn von Teil II im Vergleich zum Ende von Teil I?","expectation":"Der Ton wird nüchterner und stärker von Konsequenzen als von akuter Bedrohung geprägt.","synonyms":["Grundstimmung","Ton","Konsequenz","Folge"]},{"num":2,"question":"Welche neuen Fragen rücken in den Vordergrund?","expectation":"Nicht mehr das Überstehen, sondern das Weiterleben steht im Zentrum.","synonyms":["Überstehen","Bewältigen","Weiterleben","Alltag"]}],"2":[{"num":1,"question":"Wie wird der Blick auf vergangene Entscheidungen geschärft?","expectation":"Rückblick ermöglicht kritische Distanz zum eigenen Handeln.","synonyms":["Rückblick","Erinnerung","Distanz","Reflexion"]},{"num":2,"question":"Warum wird Schuld nicht eindeutig verteilt?","expectation":"Komplexe Zusammenhänge verhindern einfache Zuweisungen.","synonyms":["Schuld","Verantwortung","Komplexität","Vielschichtigkeit"]}],"3":[{"num":1,"question":"Wie wird Veränderung als unumkehrbar dargestellt?","expectation":"Die alte Ordnung kann nicht vollständig wiederhergestellt werden.","synonyms":["Veränderung","Wandel","unumkehrbar","dauerhaft"]},{"num":2,"question":"Welche Reaktionen löst diese Erkenntnis aus?","expectation":"Zwischen Akzeptanz und Widerstand entsteht Spannung.","synonyms":["Akzeptanz","Annahme","Widerstand","Ablehnung"]}],"4":[{"num":1,"question":"Wie zeigt sich der Versuch, Normalität neu zu definieren?","expectation":"Normalität wird aktiv ausgehandelt und nicht vorausgesetzt.","synonyms":["Normalität","Alltag","Aushandlung","Anpassung"]},{"num":2,"question":"Warum bleibt dieser Prozess fragil?","expectation":"Unterschiedliche Erwartungen kollidieren.","synonyms":["fragil","brüchig","Erwartung","Anspruch"]}],"5":[{"num":1,"question":"Wie wird Verantwortung nun stärker aufgeteilt?","expectation":"Lasten werden gemeinschaftlich getragen.","synonyms":["Verantwortung","Pflicht","gemeinsam","geteilt"]},{"num":2,"question":"Welche Spannungen entstehen daraus?","expectation":"Unterschiedliche Belastungsgrenzen werden sichtbar.","synonyms":["Spannung","Konflikt","Grenze","Belastbarkeit"]}],"6":[{"num":1,"question":"Wie verändert sich der Umgang mit Erinnerung?","expectation":"Erinnerung wird bewusster und selektiver.","synonyms":["Erinnerung","Gedenken","bewusst","reflektiert"]},{"num":2,"question":"Warum ist Vergessen weiterhin problematisch?","expectation":"Vergessen würde Erfahrungen entwerten.","synonyms":["Vergessen","Verdrängen","Erfahrung","Bedeutung"]}],"7":[{"num":1,"question":"Wie wird der Blick auf Zukunft vorsichtiger?","expectation":"Planungen erfolgen zurückhaltend.","synonyms":["Zukunft","Perspektive","vorsichtig","zurückhaltend"]},{"num":2,"question":"Welche Rolle spielt Erfahrung dabei?","expectation":"Erfahrung dient als warnender Massstab.","synonyms":["Erfahrung","Erlebtes","Massstab","Orientierung"]}],"8":[{"num":1,"question":"Wie wird Gemeinschaft als Ressource dargestellt?","expectation":"Gemeinschaft bietet Stabilität und Unterstützung.","synonyms":["Gemeinschaft","Zusammenhalt","Unterstützung","Halt"]},{"num":2,"question":"Warum bleibt Gemeinschaft zugleich fordernd?","expectation":"Gemeinschaft verlangt Anpassung und Rücksicht.","synonyms":["fordernd","anspruchsvoll","Rücksicht","Anpassung"]}],"9":[{"num":1,"question":"Wie wird der Alltag neu strukturiert?","expectation":"Abläufe werden angepasst, nicht einfach übernommen.","synonyms":["Alltag","Routine","Anpassung","Veränderung"]},{"num":2,"question":"Welche Unsicherheiten bleiben bestehen?","expectation":"Zukünftige Entwicklungen sind offen.","synonyms":["Unsicherheit","Ungewissheit","offen","ungeklärt"]}],"10":[{"num":1,"question":"Wie wird Hoffnung differenzierter dargestellt als zuvor?","expectation":"Hoffnung ist realistischer und weniger naiv.","synonyms":["Hoffnung","Zuversicht","realistisch","nüchtern"]},{"num":2,"question":"Warum bleibt Hoffnung dennoch notwendig?","expectation":"Ohne Hoffnung fehlt Orientierung.","synonyms":["notwendig","unverzichtbar","Orientierung","Halt"]}],"11":[{"num":1,"question":"Wie verändert sich das Verhältnis zu Arbeit?","expectation":"Arbeit erhält neue Bedeutung zwischen Pflicht und Sinn.","synonyms":["Arbeit","Tätigkeit","Sinn","Zweck"]},{"num":2,"question":"Welche Ambivalenz wird sichtbar?","expectation":"Arbeit stabilisiert, kann aber überfordern.","synonyms":["Ambivalenz","Zwiespalt","Überforderung","Belastung"]}],"12":[{"num":1,"question":"Wie wird Belastung langfristig erfahrbar?","expectation":"Spätfolgen treten deutlicher hervor.","synonyms":["Belastung","Druck","langfristig","nachhaltig"]},{"num":2,"question":"Warum sind diese Folgen schwer einzuordnen?","expectation":"Sie zeigen sich schleichend.","synonyms":["schleichend","allmählich","Einordnung","Bewertung"]}],"13":[{"num":1,"question":"Wie wird der Umgang mit Verlusten vertieft?","expectation":"Verluste werden Teil der Lebensgeschichte.","synonyms":["Verlust","Trauer","Lebensgeschichte","Biografie"]},{"num":2,"question":"Warum bleibt Trauer wandelbar?","expectation":"Trauer verändert sich mit der Zeit.","synonyms":["Trauer","Schmerz","Wandel","Veränderung"]}],"14":[{"num":1,"question":"Wie wird Zeit nun anders wahrgenommen?","expectation":"Zeit wird als offener Raum erlebt.","synonyms":["Zeit","Dauer","offen","weit"]},{"num":2,"question":"Welche Bedeutung hat diese Wahrnehmung?","expectation":"Sie ermöglicht neue Perspektiven.","synonyms":["Perspektive","Blick","Möglichkeit","Offenheit"]}],"15":[{"num":1,"question":"Wie werden alte Gewissheiten hinterfragt?","expectation":"Selbstverständlichkeiten verlieren Gültigkeit.","synonyms":["Gewissheit","Sicherheit","hinterfragen","relativieren"]},{"num":2,"question":"Welche neuen Haltungen entstehen?","expectation":"Vorsicht und Reflexion prägen den Umgang.","synonyms":["Haltung","Einstellung","Reflexion","Nachdenken"]}],"16":[{"num":1,"question":"Wie zeigt sich Lernen aus Erfahrung?","expectation":"Fehler und Erlebnisse beeinflussen zukünftiges Handeln.","synonyms":["Lernen","Erfahrung","Einfluss","Wirkung"]},{"num":2,"question":"Warum ist Lernen kein abgeschlossener Prozess?","expectation":"Erfahrungen wirken weiter.","synonyms":["Prozess","Entwicklung","Weiterwirken","Nachhall"]}],"17":[{"num":1,"question":"Wie verändert sich das Verhältnis von Individuum und Gemeinschaft erneut?","expectation":"Balance zwischen Eigenständigkeit und Zugehörigkeit wird gesucht.","synonyms":["Individuum","Einzelner","Zugehörigkeit","Gemeinschaft"]},{"num":2,"question":"Warum bleibt diese Balance fragil?","expectation":"Interessen stehen teils im Widerspruch.","synonyms":["Balance","Gleichgewicht","Widerspruch","Konflikt"]}],"18":[{"num":1,"question":"Wie wird Verantwortung generationenübergreifend gedacht?","expectation":"Handeln wird in Bezug auf Nachfolgende reflektiert.","synonyms":["Generation","Nachkommende","Verantwortung","Pflicht"]},{"num":2,"question":"Welche Konsequenzen hat dies?","expectation":"Langfristiges Denken gewinnt an Bedeutung.","synonyms":["langfristig","vorausschauend","Bedeutung","Gewicht"]}],"19":[{"num":1,"question":"Wie wird Erinnerung kollektiv organisiert?","expectation":"Gemeinsames Erinnern stiftet Sinn.","synonyms":["Erinnerung","Gedenken","Sinn","Bedeutung"]},{"num":2,"question":"Warum bleibt Erinnerung auch konfliktträchtig?","expectation":"Unterschiedliche Deutungen bestehen fort.","synonyms":["Konflikt","Spannung","Deutung","Interpretation"]}],"20":[{"num":1,"question":"Wie wird Stabilität neu definiert?","expectation":"Stabilität bedeutet Anpassungsfähigkeit.","synonyms":["Stabilität","Sicherheit","Anpassung","Flexibilität"]},{"num":2,"question":"Welche Anforderungen stellt dies an die Menschen?","expectation":"Offenheit und Lernbereitschaft.","synonyms":["Anforderung","Anspruch","Offenheit","Bereitschaft"]}],"21":[{"num":1,"question":"Wie verändert sich der Blick auf Planung?","expectation":"Planung wird vorsichtiger und flexibler.","synonyms":["Planung","Vorbereitung","vorsichtig","flexibel"]},{"num":2,"question":"Warum bleibt Planung dennoch notwendig?","expectation":"Sie gibt Orientierung.","synonyms":["notwendig","unverzichtbar","Orientierung","Halt"]}],"22":[{"num":1,"question":"Wie werden frühere Konflikte neu bewertet?","expectation":"Konflikte erscheinen im Rückblick differenzierter.","synonyms":["Konflikt","Streit","Rückblick","Reflexion"]},{"num":2,"question":"Welche Rolle spielt Zeit dabei?","expectation":"Zeit schafft Distanz.","synonyms":["Zeit","Abstand","Distanz","Einordnung"]}],"23":[{"num":1,"question":"Wie wird Zuversicht vorsichtig formuliert?","expectation":"Zuversicht entsteht aus realistischer Einschätzung.","synonyms":["Zuversicht","Hoffnung","realistisch","nüchtern"]},{"num":2,"question":"Warum bleibt Skepsis bestehen?","expectation":"Erfahrungen mahnen zur Vorsicht.","synonyms":["Skepsis","Zweifel","Vorsicht","Zurückhaltung"]}],"24":[{"num":1,"question":"Wie verändert sich das Verhältnis zur Vergangenheit?","expectation":"Vergangenheit wird integriert, nicht verdrängt.","synonyms":["Vergangenheit","Geschichte","Integration","Einbindung"]},{"num":2,"question":"Warum ist diese Integration wichtig?","expectation":"Sie ermöglicht Weiterentwicklung.","synonyms":["Weiterentwicklung","Wachstum","Bedeutung","Sinn"]}],"25":[{"num":1,"question":"Wie wird Alltag erneut als gestaltbar dargestellt?","expectation":"Menschen übernehmen aktiv Verantwortung.","synonyms":["gestaltbar","formbar","Verantwortung","Handlung"]},{"num":2,"question":"Welche Grenzen bleiben sichtbar?","expectation":"Nicht alles ist kontrollierbar.","synonyms":["Grenze","Begrenzung","Kontrolle","Einfluss"]}],"26":[{"num":1,"question":"Wie wird der Blick auf Gemeinschaft gefestigt?","expectation":"Gemeinschaft wird als dauerhafte Ressource anerkannt.","synonyms":["Gemeinschaft","Zusammenhalt","Ressource","Kraft"]},{"num":2,"question":"Warum bleibt Gemeinschaft verletzlich?","expectation":"Abhängigkeiten bestehen fort.","synonyms":["verletzlich","fragil","Abhängigkeit","Bindung"]}],"27":[{"num":1,"question":"Wie wird Erfahrung zum Orientierungswissen?","expectation":"Erlebtes dient als Leitfaden für Entscheidungen.","synonyms":["Erfahrung","Wissen","Orientierung","Leitfaden"]},{"num":2,"question":"Warum ersetzt Erfahrung keine Gewissheit?","expectation":"Zukünftige Ereignisse bleiben offen.","synonyms":["Gewissheit","Sicherheit","Offenheit","Unvorhersehbarkeit"]}],"28":[{"num":1,"question":"Wie wird Verantwortung erneut konkretisiert?","expectation":"Verantwortung zeigt sich im Alltagshandeln.","synonyms":["konkret","praktisch","Alltag","Handlung"]},{"num":2,"question":"Welche Haltung wird dabei sichtbar?","expectation":"Achtsamkeit und Umsicht.","synonyms":["Achtsamkeit","Aufmerksamkeit","Umsicht","Vorsicht"]}],"29":[{"num":1,"question":"Wie wird der Blick auf Zukunft erneut geöffnet?","expectation":"Zukunft wird als gestaltbarer Raum gedacht.","synonyms":["Zukunft","Perspektive","gestaltbar","offen"]},{"num":2,"question":"Warum bleibt Offenheit zentral?","expectation":"Fixe Pläne erscheinen unzureichend.","synonyms":["Offenheit","Flexibilität","Planung","Fixierung"]}],"30":[{"num":1,"question":"Wie endet der Roman  in seiner Grundhaltung?","expectation":"Der Teil endet mit vorsichtiger Zuversicht.","synonyms":["Ende","Abschluss","Zuversicht","Hoffnung"]},{"num":2,"question":"Welche Haltung wird damit gegenüber dem Leben vermittelt?","expectation":"Lernbereitschaft und verantwortungsbewusste Offenheit.","synonyms":["Lernen","Entwicklung","Verantwortung","Offenheit"]}]}};

function pad2(n){ return String(n).padStart(2,'0'); }

function lsAnswerKey(part, chap, qIndex){ return `talwasser:${part}:${chap}:q:${qIndex}`; }
function lsCommentKey(part, chap){ return `talwasser:${part}:${chap}:comment`; }

function normalize(s){
  return (s||"")
    .toLowerCase()
    .replace(/\s+/g," ")
    .replace(/[“”„"]/g,'"')
    .replace(/[’‘]/g,"'")
    .trim();
}

function isCorrect(userAnswer, solutions){
  const a = normalize(userAnswer);
  if(!a) return false;
  return (solutions||[]).some(sol => normalize(sol) === a);
}

function renderQuestionCard(part, chap, qIndex, qObj){
  const card = document.createElement("div");
  card.className = "qcard";

  const title = document.createElement("div");
  title.className = "qtitle";
  title.textContent = `${qIndex+1}. ${qObj.q}`;
  card.appendChild(title);

  const hint = document.createElement("div");
  hint.className = "hint";
  hint.textContent = qObj.hint || "";
  if(!qObj.hint) hint.style.display = "none";
  card.appendChild(hint);

  const ta = document.createElement("textarea");
  ta.rows = 4;
  ta.placeholder = "Deine Antwort …";
  const saved = localStorage.getItem(lsAnswerKey(part, chap, qIndex));
  if(saved) ta.value = saved;
  card.appendChild(ta);

  const row = document.createElement("div");
  row.className = "row";

  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = "Antwort prüfen";
  row.appendChild(btn);

  const status = document.createElement("div");
  status.className = "status";
  row.appendChild(status);

  card.appendChild(row);

  function updateStatus() {
    const v = ta.value || "";
    if(!v.trim()) {
      status.textContent = "";
      status.className = "status";
      return;
    }
    if(isCorrect(v, qObj.a)) {
      status.textContent = "✓ gespeichert (bereits korrekt).";
      status.className = "status ok";
    } else {
      status.textContent = "✗ gespeichert (noch nicht korrekt).";
      status.className = "status bad";
    }
  }

  ta.addEventListener("input", () => {
    localStorage.setItem(lsAnswerKey(part, chap, qIndex), ta.value);
    updateStatus();
  });

  btn.addEventListener("click", () => {
    updateStatus();
    // Hint erst nach Klick zeigen (falls vorhanden)
    if(qObj.hint) hint.style.display = "block";
  });

  updateStatus();
  return card;
}

function renderQuestions(part, chap, container) {
  container.innerHTML = "";
  const partData = QUESTIONS?.[part] || {};
  const chapData = partData?.[String(chap)] || [];
  if(!Array.isArray(chapData) || chapData.length === 0) {
    const p = document.createElement("p");
    p.className = "small";
    p.textContent = "Keine Fragen gefunden (prüfe Fragen-Daten).";
    container.appendChild(p);
    return;
  }
  chapData.forEach((qObj, idx) => {
    container.appendChild(renderQuestionCard(part, chap, idx, qObj));
  });
}

function clearChapter(part, chap) {
  const prefix = `talwasser:${part}:${chap}:`;
  const toRemove = [];
  for (let i=0;i<localStorage.length;i++) {
    const k = localStorage.key(i);
    if(k && k.startsWith(prefix)) toRemove.push(k);
  }
  toRemove.forEach(k => localStorage.removeItem(k));
}

function initChapter(part, chap) {
  // Fragen
  const qDiv = document.getElementById("questions");
  if(qDiv) renderQuestions(part, chap, qDiv);

  // Beobachtungen
  const c = document.getElementById("comment");
  if(c) {
    const saved = localStorage.getItem(lsCommentKey(part, chap));
    if(saved) c.value = saved;
    c.addEventListener("input", () => {
      localStorage.setItem(lsCommentKey(part, chap), c.value);
    });
  }

  // Reset
  const resetBtn = document.getElementById("resetBtn");
  if(resetBtn) {
    resetBtn.addEventListener("click", () => {
      const ok = confirm("Alle Antworten und Beobachtungen für dieses Kapitel wirklich löschen?");
      if(!ok) return;
      clearChapter(part, chap);
      location.reload();
    });
  }

  // Export-Button ist in export.js verdrahtet (falls vorhanden)
}
