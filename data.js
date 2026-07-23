/*
 * Srovnávač advokátů — sdílená datová vrstva prototypu.
 * Načítá se přes <script src="data.js"> na homepage i na poptávkové stránce,
 * takže funguje jak lokálně (otevření souboru v prohlížeči), tak po nahostování
 * na GitHub Pages — žádné fetch()/CORS závislosti na JSON souborech.
 *
 * "real": true  -> reálná osoba/kancelář, data čerpána z veřejných zdrojů (viz sourceNote)
 * "real": false -> fiktivní ukázkový profil, slouží jen k demonstraci funkcí srovnávače
 */

const SITE_DATA = {

  firms: [
    {
      id: "janiskova-lata",
      real: true,
      name: "Janisková & Lata, advokátní kancelář",
      page: "Profil_Kancelar_Janiskova_Lata.html",
      city: "Brno",
      size: "malá (2 advokáti + koncipientka)",
      founded: 2019,
      tags: ["Rodinné právo", "Trestní právo", "Občanské právo", "Obchodní právo", "Stavební a správní právo"],
      sourceNote: "vyhledavac.cak.cz, janiskova-lata.cz"
    },
    {
      id: "rowan-legal",
      real: true,
      name: "ROWAN LEGAL, advokátní kancelář s.r.o.",
      page: "Profil_Rowan_Legal.html",
      city: "Praha / Brno",
      size: "velká (14 advokátů/partnerů uvedených na webu, desítky členů týmu)",
      founded: 1991,
      tags: ["Fúze, akvizice a korporátní právo", "IT a telekomunikace", "Hospodářská soutěž", "Energetika a životní prostředí", "Veřejné zakázky (ZZVZ)", "Duševní vlastnictví", "Arbitráže"],
      sourceNote: "rowan.legal (veřejné stránky O nás, Tým, Ocenění, Reference, Kontakty), stav k 22. 7. 2026"
    },
    {
      id: "petras-rezek",
      real: true,
      name: "Advokátní kancelář Petráš Rezek s.r.o.",
      page: "Profil_Petras_Rezek.html",
      city: "Zlín / Praha",
      size: "velká (50+ advokátů a kolegů dle vlastního webu)",
      founded: null,
      tags: ["Obchodní právo", "Transakce a M&A", "Daně a účetnictví", "Veřejné zakázky", "Generační výměna ve firmách"],
      sourceNote: "petrasrezek.cz (veřejná homepage: O nás, Tým, Naše práce, Reference, Aktuality, Kontakty), stav k 22. 7. 2026"
    },
    {
      id: "novak-partneri",
      real: false,
      name: "Novák & partneři, advokátní kancelář",
      page: null,
      city: "Praha",
      size: "velká (14 advokátů)",
      founded: null,
      tags: ["Obchodní právo", "Nemovitosti", "Retainer i hodinová sazba", "Pobočky: Praha, Brno, Ostrava", "Skupina i s daněmi a účetnictvím"],
      sourceNote: "FIKTIVNÍ ukázkový profil — demonstruje, jak budou vypadat pole u velké kanceláře (žebříčky, veřejné zakázky, síť). Není reálná kancelář."
    }
  ],

  lawyers: [
    {
      id: "sulova",
      real: true,
      name: "Mgr. Katarína Šulová",
      page: "Profil_Katarina_Sulova.html",
      firmId: "janiskova-lata",
      firmName: "Janisková & Lata, advokátní kancelář",
      city: "Brno",
      avatarInitials: "KŠ",
      avatarColor: "#14a37f",
      role: "Advokátka · spoluzakladatelka a řídící partnerka",
      tags: ["Rodinné právo", "Trestní právo", "Občanské právo", "Angličtina", "Malá kancelář (2+1)"],
      keywords: ["rodinné právo", "rozvod", "péče o dítě", "nezletilé", "trestní právo", "hospodářské trestné činy", "stavební právo", "správní právo", "občanské právo", "brno", "anglicky", "angličtina", "b2c"],
      verified: true,
      sourceNote: "vyhledavac.cak.cz (evid. č. 13656), janiskova-lata.cz, LinkedIn, Google Maps"
    },
    {
      id: "lata",
      real: true,
      name: "Mgr. Štěpán Lata",
      page: "Profil_Kancelar_Janiskova_Lata.html",
      firmId: "janiskova-lata",
      firmName: "Janisková & Lata, advokátní kancelář",
      city: "Brno",
      avatarInitials: "ŠL",
      avatarColor: "#6b7280",
      role: "Advokát · trvale spolupracující",
      tags: ["Obchodní právo", "Občanské právo"],
      keywords: ["obchodní právo", "občanské právo", "brno", "b2c", "b2b"],
      verified: false,
      sourceNote: "janiskova-lata.cz — Tým. Profil je automaticky vytvořený stub (nenárokováno), specializace odpovídá tagům z veřejné týmové stránky kanceláře."
    },
    {
      id: "podesva",
      real: true,
      name: "JUDr. Vilém Podešva, LL.M.",
      page: "Profil_Vilem_Podesva.html",
      firmId: "rowan-legal",
      firmName: "ROWAN LEGAL, advokátní kancelář s.r.o.",
      city: "Praha",
      avatarInitials: "VP",
      avatarColor: "#185fa5",
      role: "Advokát · Partner",
      tags: ["Hospodářská soutěž", "Energetika a životní prostředí", "Právo nemovitostí", "Veřejné zakázky (ZZVZ)", "Legal 500 · Chambers Europe"],
      keywords: ["hospodářská soutěž", "antitrust", "energetika", "životní prostředí", "veřejné zakázky", "zzvz", "nemovitosti", "stavební projekty", "praha", "regulace", "compliance", "b2b", "b2g"],
      verified: false,
      sourceNote: "rowan.legal — Tým, Ocenění (Legal 500 EMEA 2026, Chambers Europe 2026), Kontakty. Profil je automaticky sestavený stub (nenárokováno) — osobní ověření u ČAK v tomto kole neprovedeno, proto verified: false, i když je zdroj veřejný a spolehlivý."
    },
    {
      id: "donat",
      real: true,
      name: "JUDr. Josef Donát, LL.M.",
      page: "Profil_Rowan_Legal.html",
      firmId: "rowan-legal",
      firmName: "ROWAN LEGAL, advokátní kancelář s.r.o.",
      city: "Praha",
      avatarInitials: "JD",
      avatarColor: "#6b7280",
      role: "Advokát · Partner",
      tags: ["Bankovní a finanční právo", "Duševní vlastnictví", "IT a telekomunikace"],
      keywords: ["bankovní právo", "finanční právo", "duševní vlastnictví", "it právo", "it a telekomunikace", "telekomunikace", "praha", "b2b"],
      verified: false,
      sourceNote: "rowan.legal — Tým (veřejná stránka). Profil je automaticky vytvořený stub (nenárokováno), specializace odpovídá tagům z veřejné týmové stránky kanceláře."
    },
    {
      id: "nulicek",
      real: true,
      name: "Mgr. Michal Nulíček, LL.M., FCIArb",
      page: "Profil_Rowan_Legal.html",
      firmId: "rowan-legal",
      firmName: "ROWAN LEGAL, advokátní kancelář s.r.o.",
      city: "Praha",
      avatarInitials: "MN",
      avatarColor: "#6b7280",
      role: "Advokát · Partner",
      tags: ["IT a telekomunikace", "Ochrana osobních údajů", "Regulace a compliance"],
      keywords: ["it právo", "it a telekomunikace", "telekomunikace", "ochrana osobních údajů", "gdpr", "regulace", "compliance", "praha", "b2b", "b2g"],
      verified: false,
      sourceNote: "rowan.legal — Tým (veřejná stránka). Profil je automaticky vytvořený stub (nenárokováno), specializace odpovídá tagům z veřejné týmové stránky kanceláře."
    },
    {
      id: "rezek",
      real: true,
      name: "JUDr. Lukáš Rezek, LL.M.",
      page: "Profil_Lukas_Rezek.html",
      firmId: "petras-rezek",
      firmName: "Advokátní kancelář Petráš Rezek s.r.o.",
      city: "Zlín",
      avatarInitials: "LR",
      avatarColor: "#92620a",
      role: "Advokát · Partner",
      tags: ["Obchodní právo", "Transakce", "Generační výměna ve firmách", "Veřejné zakázky"],
      keywords: ["obchodní právo", "transakce", "generační výměna", "rodinná firma", "veřejné zakázky", "dotace", "zlín", "praha", "b2b"],
      verified: false,
      sourceNote: "petrasrezek.cz — Náš tým, kontaktní údaje kanceláře. Profil je automaticky sestavený stub (nenárokováno) — osobní ověření u ČAK v tomto kole neprovedeno, proto verified: false, i když je zdroj veřejný a spolehlivý."
    },
    {
      id: "novak-partner",
      real: false,
      name: "Novák & partneři, advokátní kancelář",
      page: null,
      firmId: "novak-partneri",
      firmName: null,
      city: "Praha",
      avatarInitials: "NP",
      avatarColor: "#3c3489",
      role: "Advokátní kancelář · 14 advokátů",
      tags: ["Obchodní právo", "Nemovitosti", "Retainer i hodinová sazba", "Pobočky: Praha, Brno, Ostrava", "Skupina i s daněmi a účetnictvím"],
      keywords: ["obchodní právo", "nemovitosti", "nájemní spor", "praha", "brno", "ostrava", "veřejné zakázky", "rozhodčí řízení", "b2b", "b2g"],
      verified: false,
      sourceNote: "FIKTIVNÍ ukázkový profil — demonstruje pole pro žebříčky, veřejné zakázky a síť u velké kanceláře. Není reálná osoba ani firma."
    },
    {
      id: "bartosova",
      real: false,
      name: "Mgr. Veronika Bartošová",
      page: null,
      firmId: null,
      firmName: "Solo advokátka",
      city: "Brno",
      avatarInitials: "VB",
      avatarColor: "#7a52b0",
      role: "Solo advokátka · jen online",
      tags: ["Nájemní spory", "Bezplatná úvodní konzultace", "Reaguje do 24 h"],
      keywords: ["nájemní spor", "nájemní smlouva", "brno", "online", "b2c"],
      verified: false,
      sourceNote: "FIKTIVNÍ ukázkový profil — demonstruje neověřený, automaticky vytvořený stub profil. Není reálná osoba."
    }
  ]
};

/*
 * Jednoduchá JS simulace „AI" shody — žádné volání externího modelu.
 * Rozloží text na slova a porovná je s keywords pomocí lehkého "stemování"
 * (porovnání prvních N znaků), aby fungovalo i s běžnou českou skloňovanou
 * podobou slov (např. "veřejnými zakázkami" vs. keyword "veřejné zakázky").
 * Vrátí seřazený seznam { entry, score, matched } pro dané pole (lawyers).
 */
function tokenizeCs(text) {
  // Explicitní výčet znaků české abecedy — NEpoužívat rozsah á-ž, protože
  // pořadí Unicode code pointů neodpovídá české abecedě (ž by tak vypadlo).
  return (text || "")
    .toLowerCase()
    .split(/[^a-z0-9áčďéěíňóřšťúůýž]+/)
    .filter(w => w.length > 2);
}

function wordsMatch(a, b) {
  if (a === b) return true;
  const minLen = Math.min(a.length, b.length);
  if (minLen < 4) return false;
  // Tolerujeme obvyklou délku české pádové koncovky (1–2 znaky) —
  // u delších slov odřežeme 2 znaky, u kratších jen 1.
  let cmpLen = minLen >= 7 ? minLen - 2 : minLen - 1;
  if (cmpLen < 3) cmpLen = 3;
  return a.slice(0, cmpLen) === b.slice(0, cmpLen);
}

function matchLawyers(queryText, minResults = 2, segment = null) {
  const qWords = tokenizeCs(queryText);

  const scored = SITE_DATA.lawyers.map(entry => {
    const matched = entry.keywords.filter(k => {
      const kWords = tokenizeCs(k);
      // U víceslovných klíčových slov vyžadujeme shodu VŠECH slov (ne jen jednoho) —
      // jinak by např. "hospodářské trestné činy" chytilo dotaz jen na základě
      // shodného adjektiva "hospodářské", i když šlo o úplně jiný obor (soutěžní právo).
      return kWords.length > 0 && kWords.every(kw => qWords.some(qw => wordsMatch(qw, kw)));
    });
    let score = matched.length;
    // menší bonus, pokud se v textu zmiňuje i lokalita profilu
    if (entry.city) {
      const cityWords = tokenizeCs(entry.city);
      if (cityWords.some(cw => qWords.some(qw => wordsMatch(qw, cw)))) score += 1;
    }
    // bonus podle aktivního segmentu (B2C / B2B / B2G přepínač na homepage) —
    // profil, který se sám označuje jako relevantní pro daný segment, poskočí výš
    if (segment && entry.keywords.includes(segment)) score += 1.5;
    return { entry, score, matched };
  });

  scored.sort((a, b) => b.score - a.score);
  const withScore = scored.filter(s => s.score > 0);
  const result = withScore.length >= minResults ? withScore : scored.slice(0, minResults);

  const maxScore = Math.max(1, result[0] ? result[0].score : 1);
  return result.slice(0, 6).map(r => ({
    entry: r.entry,
    matched: r.matched,
    percent: Math.max(28, Math.min(96, Math.round((r.score / (maxScore + 1)) * 100)))
  }));
}
