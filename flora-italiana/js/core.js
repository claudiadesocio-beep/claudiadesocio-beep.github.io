/* Flora Italiana — funzioni di base: lingua, traduzioni, archiviazione locale, utilità. */
window.FLORA = window.FLORA || {};
(function () {
  const F = FLORA;

  /* Lingue disponibili: per aggiungerne una, creare js/i18n/<codice>.js e aggiungerla qui. */
  F.LANGS = ["it", "en"];
  F.DEFAULT_LANG = "it";

  /* ---------- archiviazione locale (può non essere disponibile: navigazione privata, anteprime) ---------- */
  const memory = {};
  F.store = {
    ok: true,
    get(key, fallback) {
      try { const v = localStorage.getItem("flora." + key); return v === null ? fallback : JSON.parse(v); }
      catch (e) { this.ok = false; return key in memory ? memory[key] : fallback; }
    },
    set(key, value) {
      memory[key] = value;
      try { localStorage.setItem("flora." + key, JSON.stringify(value)); }
      catch (e) { this.ok = false; }
    }
  };

  /* ---------- lingua ---------- */
  let lang = F.store.get("lang", F.DEFAULT_LANG);
  if (!F.LANGS.includes(lang)) lang = F.DEFAULT_LANG;
  F.getLang = () => lang;
  F.setLang = l => { if (F.LANGS.includes(l)) { lang = l; F.store.set("lang", l); document.documentElement.lang = l; } };
  document.documentElement.lang = lang;

  /* Testo dell'interfaccia. Se la chiave manca nella lingua corrente si usa l'italiano e lo si segnala in console. */
  F.t = (key, vars) => {
    let s = F.i18n[lang] && F.i18n[lang][key];
    if (s === undefined) { s = F.i18n[F.DEFAULT_LANG][key]; console.warn(`[i18n] chiave mancante in "${lang}": ${key}`); }
    if (s === undefined) return key;
    if (vars && typeof s === "string") Object.keys(vars).forEach(k => { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  };

  /* Contenuto bilingue { it, en }. Restituisce { value, missing }: se manca la lingua corrente usa
     la prima disponibile e segnala la traduzione mancante, senza inventarla. */
  F.pick = obj => {
    if (obj == null) return { value: null, missing: false };
    if (obj[lang] != null && obj[lang] !== "") return { value: obj[lang], missing: false };
    const alt = [F.DEFAULT_LANG, ...F.LANGS].find(l => obj[l] != null && obj[l] !== "");
    return { value: alt ? obj[alt] : null, missing: true };
  };
  /* Versione HTML con segnalazione visiva */
  F.tx = obj => {
    const r = F.pick(obj);
    if (r.value == null) return `<span class="na">${F.t("sp.notAvailable")}</span>`;
    return r.missing ? `${F.esc(r.value)} <span class="tr-missing" title="${F.esc(F.t("tr.missing"))}">${F.t("tr.missing.short")}</span>` : F.esc(r.value);
  };

  /* ---------- utilità ---------- */
  F.esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  F.norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  F.byId = id => F.species.find(s => s.id === id);
  F.belt = id => F.belts.find(b => b.id === id);
  F.habitat = id => F.habitats.find(h => h.id === id);
  F.region = id => F.regions.find(r => r.id === id);
  F.route = id => F.routes.find(r => r.id === id);
  F.guide = id => F.guides.find(g => g.id === id);
  F.name = obj => F.pick(obj).value;                              // nome di un vocabolario { it, en }
  F.commonName = sp => { const r = F.pick(sp.commonNames); return { value: r.value ? r.value[0] : sp.scientificName, missing: r.missing }; };
  F.fmtDate = d => new Date(d + "T12:00:00").toLocaleDateString(lang === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  F.currentMonth = () => new Date().getMonth() + 1;

  /* ---------- preferiti ---------- */
  F.favs = {
    list() { return F.store.get("favorites", []).filter(id => F.byId(id)); },
    has(id) { return this.list().includes(id); },
    toggle(id) { const l = this.list(); const i = l.indexOf(id); i < 0 ? l.push(id) : l.splice(i, 1); F.store.set("favorites", l); return i < 0; }
  };

  /* ---------- stato del catalogo (sopravvive al cambio lingua e alla navigazione) ---------- */
  F.EMPTY_FILTERS = () => ({ q: "", belt: "", region: "", habitat: "", months: [], origins: [], sort: "common-az" });
  F.state = Object.assign(F.EMPTY_FILTERS(), F.store.get("filters", {}));
  F.saveFilters = () => F.store.set("filters", F.state);

  F.filterSpecies = st => {
    const q = F.norm(st.q.trim());
    const list = F.species.filter(s => {
      if (q) {
        const hay = [s.scientificName, s.family, ...s.synonyms, ...Object.values(s.commonNames).flat()].map(F.norm);
        if (!hay.some(h => h.includes(q))) return false;
      }
      if (st.belt && !s.belts.includes(st.belt)) return false;
      if (st.region && !s.regions.includes(st.region)) return false;
      if (st.habitat && !s.habitats.includes(st.habitat)) return false;
      if (st.months.length && !(s.flowering && st.months.some(m => s.flowering.includes(m)))) return false;
      if (st.origins.length && !st.origins.includes(s.origin)) return false;
      return true;
    });
    const coll = new Intl.Collator(lang);
    const key = st.sort.startsWith("sci") ? (s => s.scientificName) : (s => F.commonName(s).value);
    list.sort((a, b) => coll.compare(key(a), key(b)));
    if (st.sort.endsWith("za")) list.reverse();
    return list;
  };
  F.activeFilterCount = st => [st.q.trim(), st.belt, st.region, st.habitat].filter(Boolean).length + st.months.length + st.origins.length;
})();
