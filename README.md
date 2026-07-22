# Srovnávač advokátů — funkční prototyp

Klikatelný, propojený prototyp platformy pro vyhledávání, srovnávání a poptávání advokátů (B2C, B2B, B2G). Statický web (HTML/CSS/vanilla JS), žádný backend, žádné API klíče — vhodné pro GitHub Pages a prezentaci investorům a testovacím subjektům.

## Jak to spustit

**Lokálně:** stáhněte celou složku a otevřete `index.html` v prohlížeči — nic dalšího není potřeba (žádný build, žádný server).

**GitHub Pages:**
1. Založte nový repozitář na GitHubu a nahrajte do něj obsah této složky (root repozitáře = tato složka).
2. V repozitáři: Settings → Pages → Branch: `main`, folder `/ (root)` → Save.
3. Web se objeví na `https://<vas-github-username>.github.io/<nazev-repozitare>/` během cca minuty.

Jelikož zde nebyl k dispozici GitHub connector pro automatické nahrání, tento krok je potřeba udělat ručně — buď přes web GitHubu (drag & drop souborů do nového repozitáře), nebo příkazy `git init`, `git add .`, `git commit`, `git remote add origin ...`, `git push`.

## Struktura

- `index.html` / `Homepage_Srovnavac_advokatu.html` — homepage s AI vyhledáváním a B2C/B2B/B2G filtry (obsahově identické, `index.html` slouží jako vstupní bod pro GitHub Pages)
- `Poptavka_Zadani_Kauzy.html` — zadání poptávky klientem + bezpečnostní vysvětlení + JS shoda advokátů
- `data.js` — sdílená datová vrstva (reální i ukázkoví advokáti/kanceláře) + funkce `matchLawyers()` simulující AI shodu jednoduchou JS logikou (klíčová slova, žádné externí volání, žádný API klíč)
- Profilové stránky advokátů: `Profil_Katarina_Sulova.html`, `Profil_Vilem_Podesva.html`, `Profil_Lukas_Rezek.html`
- Profilové stránky kanceláří: `Profil_Kancelar_Janiskova_Lata.html`, `Profil_Rowan_Legal.html`, `Profil_Petras_Rezek.html`
- `Reserse_Srovnavac_advokatu.docx` / `.pdf` — původní tržní rešerše (konkurence, monetizace, náklady, regulace)

## Reálná data použitá v prototypu

Tři reálné advokátní kanceláře jsou zastoupeny ukázkovým profilem kanceláře + jedním reprezentativním advokátem, vždy sestaveno **výhradně z veřejně dostupných zdrojů** (vlastní web kanceláře, případně veřejný rejstřík ČAK) — nikdy z neveřejných/nabídkových materiálů:

| Kancelář | Reprezentativní advokát | Zdroj |
|---|---|---|
| Janisková & Lata, advokátní kancelář (Brno) | Mgr. Katarína Šulová | vyhledavac.cak.cz, janiskova-lata.cz |
| ROWAN LEGAL, advokátní kancelář s.r.o. (Praha/Brno) | JUDr. Vilém Podešva, LL.M. | rowan.legal (veřejné stránky O nás, Tým, Ocenění, Reference, Kontakty) |
| Advokátní kancelář Petráš Rezek s.r.o. (Zlín/Praha) | JUDr. Lukáš Rezek, LL.M. | petrasrezek.cz (veřejná homepage) |

Dvě dřívější ukázkové karty (**Novák & partneři** a **Mgr. Veronika Bartošová**) zůstávají v datech jako výslovně označené **fiktivní ukázkové profily** — demonstrují funkce srovnávače (žebříčky, veřejné zakázky, síť kanceláří), ale nejde o reálné osoby ani firmy. Ve všech kartách a profilech je patrné, zda je profil reálný/ověřený, reálný/nenárokovaný stub, nebo fiktivní ukázka.

Chybějící pole (např. ceník, kariéra, funkce v ČAK, žebříčky) jsou u reálných profilů zobrazena jako neutrální "neuvedeno" stav s vysvětlením zdroje — nikdy nejsou dopočítávána ani odhadována.

## Poznámky k "AI" vyhledávání

Q4 rozhodnutí: na staticky hostovaném GitHub Pages webu nelze bezpečně volat žádné AI API (klíč by byl veřejně vidět v kódu). `matchLawyers()` v `data.js` proto simuluje AI shodu jednoduchou JS logikou — porovnává slova z popisu kauzy s `keywords` u každého profilu a spočítá orientační % shody. Chování je transparentní a dobře demonstrovatelné, ale nejde o skutečný jazykový model.

## Úklid před nahráním na GitHub

Ve složce jsou i soubory vzniklé při přípravě a kontrole prototypu (screenshoty `qa_*.jpg` a `verify_*.jpg`, `node_modules/`, `package.json`, `build_report.js`, `shot.js`, `*.tmp`). Přidal jsem `.gitignore`, který je z repozitáře vynechá automaticky, pokud použijete `git add .` — ale pokud nahráváte přes web (drag & drop), doporučuji je do nového repozitáře prostě nezahrnout. Jediné soubory, které do repozitáře skutečně patří, jsou ty vyjmenované ve struktuře výše plus `.gitignore`, `README.md` a `data.js`.

## Stav k 22. 7. 2026

Prototyp neprošel penetračním testem ani právní revizí — pro reálné nasazení je potřeba doplnit zejména: skutečné ověření vlastnictví profilu (e-mail na doméně kanceláře / datová schránka), platební logiku, GDPR dokumentaci a automatický dopočet zkušeností z Registru smluv (smlouvy.gov.cz) přes IČO.
