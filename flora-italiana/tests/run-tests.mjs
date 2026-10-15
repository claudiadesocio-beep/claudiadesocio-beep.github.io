// Flora Italiana — test di coerenza dei dati e delle traduzioni.
// Uso: node tests/run-tests.mjs   (oppure npm test). Nessuna dipendenza esterna.
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { window: {}, console };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["js/data/taxonomy.js", "js/data/species.js", "js/data/guides.js", "js/i18n/it.js", "js/i18n/en.js"]) {
  vm.runInContext(readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
}
const F = ctx.FLORA;
let failed = 0, passed = 0;
const check = (cond, msg) => { if (cond) passed++; else { failed++; console.error("  ✗ " + msg); } };
const LANGS = ["it", "en"];
const bi = (obj, where) => { if (obj == null) return; LANGS.forEach(l => check(obj[l] != null && obj[l] !== "", `${where}: manca la lingua "${l}"`)); };

console.log("Flora Italiana — test dei dati");

// Traduzioni dell'interfaccia: stesse chiavi in tutte le lingue
const keysIt = Object.keys(F.i18n.it), keysEn = Object.keys(F.i18n.en);
keysIt.forEach(k => check(k in F.i18n.en, `i18n: chiave "${k}" assente in en.js`));
keysEn.forEach(k => check(k in F.i18n.it, `i18n: chiave "${k}" assente in it.js`));
["months", "months.short"].forEach(k => LANGS.forEach(l => check(F.i18n[l][k].length === 12, `i18n ${l}: "${k}" deve avere 12 mesi`)));

// Vocabolari
const regionIds = F.regions.map(r => r.id), beltIds = F.belts.map(b => b.id), habIds = F.habitats.map(h => h.id), routeIds = F.routes.map(r => r.id);
check(regionIds.length === 20, "devono esserci 20 regioni");
F.regions.forEach(r => bi(r.name, `regione ${r.id}`));
F.belts.forEach(b => ["name", "label", "technical", "altitude", "text"].forEach(k => bi(b[k], `fascia ${b.id}.${k}`)));
F.habitats.forEach(h => ["name", "text"].forEach(k => bi(h[k], `habitat ${h.id}.${k}`)));
F.routes.forEach(r => ["name", "text"].forEach(k => bi(r[k], `percorso ${r.id}.${k}`)));
F.belts.forEach(b => check(!/\d{3,}\s*m\b/.test(b.altitude.it + b.altitude.en), `fascia ${b.id}: niente quote numeriche senza fonte`));

// Specie
const ids = new Set();
F.species.forEach(s => {
  const w = `specie ${s.id}`;
  check(/^[a-z0-9-]+$/.test(s.id), `${w}: id non valido`);
  check(!ids.has(s.id), `${w}: id duplicato`); ids.add(s.id);
  check(s.scientificName && s.author && s.family, `${w}: nome scientifico, autore o famiglia mancanti`);
  LANGS.forEach(l => check(Array.isArray(s.commonNames[l]) && s.commonNames[l].length > 0, `${w}: nome comune "${l}" mancante`));
  check(s.origin in F.origins, `${w}: origine "${s.origin}" non valida`);
  ["growthForm", "distribution", "altitude", "description"].forEach(k => bi(s[k], `${w}.${k}`));
  ["originNote", "nativeRange", "floweringNote", "endemism"].forEach(k => bi(s[k], `${w}.${k}`));
  LANGS.forEach(l => check(Array.isArray(s.features[l]) && s.features[l].length > 0, `${w}: caratteristiche "${l}" mancanti`));
  check(s.features.it.length === s.features.en.length, `${w}: numero di caratteristiche diverso tra it ed en`);
  s.belts.forEach(b => check(beltIds.includes(b), `${w}: fascia "${b}" sconosciuta`));
  s.habitats.forEach(h => check(habIds.includes(h), `${w}: habitat "${h}" sconosciuto`));
  s.routes.forEach(r => check(routeIds.includes(r), `${w}: percorso "${r}" sconosciuto`));
  check(Array.isArray(s.regions) && s.regions.length > 0, `${w}: regioni mancanti`);
  s.regions.forEach(r => check(regionIds.includes(r), `${w}: regione "${r}" sconosciuta`));
  check(s.flowering === null || (Array.isArray(s.flowering) && s.flowering.every(m => Number.isInteger(m) && m >= 1 && m <= 12)), `${w}: mesi di fioritura non validi`);
  check(!s.gymnosperm || s.flowering === null, `${w}: una gimnosperma non ha mesi di fioritura`);
  check(s.sources.length > 0, `${w}: nessuna fonte`);
  s.sources.forEach(k => check(k in F.sources, `${w}: fonte "${k}" non definita`));
  ["overall", "regions", "flowering"].forEach(k => check(s.quality[k] in F.quality, `${w}: qualità "${k}" non valida`));
  check(s.origin !== "endemica" || s.endemism, `${w}: specie endemica senza testo sull'endemismo`);
  check(!(s.origin === "naturalizzata" || s.origin === "invasiva") || s.nativeRange || s.originNote, `${w}: specie alloctona senza area d'origine`);
  if (s.conservation) Object.entries(s.conservation).forEach(([k, v]) => { if (typeof v === "object") bi(v, `${w}.conservation.${k}`); });
  check(/^\d{4}-\d{2}-\d{2}$/.test(s.updated), `${w}: data di aggiornamento non valida`);
  check(s.image && s.image.file && ["pending", "ready"].includes(s.image.status), `${w}: oggetto image non valido`);
  bi(s.image.alt, `${w}.image.alt`);
  if (s.image.status === "ready") check(existsSync(path.join(root, s.image.file)), `${w}: immagine "ready" ma file assente: ${s.image.file}`);
});
check(F.species.length >= 8, "servono almeno 8 specie");
check(F.species.some(s => s.origin === "naturalizzata" || s.origin === "invasiva"), "serve almeno una specie alloctona");
["leontopodium-nivale-alpinum", "papaver-rhoeas", "gentiana-acaulis", "primula-vulgaris", "lavandula-stoechas", "myrtus-communis"].forEach(id => check(ids.has(id), `specie richiesta assente: ${id}`));
F.habitats.filter(h => h.route).forEach(h => check(F.species.some(s => s.habitats.includes(h.id)), `percorso habitat "${h.id}" senza specie`));

// Guide
F.guides.forEach(g => {
  ["title", "subtitle"].forEach(k => bi(g[k], `guida ${g.id}.${k}`));
  LANGS.forEach(l => check(Array.isArray(g.body[l]) && g.body[l].length > 0, `guida ${g.id}: testo "${l}" mancante`));
  g.species.forEach(id => check(ids.has(id), `guida ${g.id}: specie "${id}" inesistente`));
});

// Immagine della homepage e file statici
check(existsSync(path.join(root, "public/images/fallback.svg")), "manca public/images/fallback.svg");
if (F.meta.hero.status === "ready") check(existsSync(path.join(root, F.meta.hero.file)), "immagine hero 'ready' ma file assente");
const html = readFileSync(path.join(root, "index.html"), "utf8");
[...html.matchAll(/(?:src|href)="((?:js|css|public)\/[^"?]+)(?:\?[^"]*)?"/g)].forEach(m => check(existsSync(path.join(root, m[1])), `index.html: file mancante ${m[1]}`));

console.log(`\n${passed} controlli superati, ${failed} falliti.`);
process.exit(failed ? 1 : 0);
