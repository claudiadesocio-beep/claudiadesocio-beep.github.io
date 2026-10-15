/* Flora Italiana — pagine. Ogni funzione restituisce l'HTML della pagina; bind* collega gli eventi. */
window.FLORA = window.FLORA || {};
(function () {
  const F = FLORA, t = F.t, C = F.ui;
  const Pg = F.pages = {};

  /* ---------------- HOME ---------------- */
  Pg.home = () => {
    const hero = F.meta.hero;
    const heroImg = hero.status === "ready"
      ? `<img src="${hero.file}" alt="${F.esc(F.name(hero.alt))}" onerror="this.onerror=null;this.src='public/images/fallback.svg'">`
      : F.illus.heroSVG(F.esc(F.name(hero.alt)));
    const heroCap = hero.status === "ready" && hero.ai ? t("img.ai") : t("img.illustration");
    /* Senza immagine hero pronta si mostra il mosaico di foto delle schede; senza foto, la tavola disegnata */
    const heroFig = (hero.status !== "ready" && C.heroMosaic(F.meta.mosaic || [])) || `<figure class="hero-figure">${heroImg}<figcaption>${heroCap}</figcaption></figure>`;
    const quick = (href, key, count) => {
      const ph = C.photo((F.meta.quick || {})[key]);
      return `<a class="quick-item${ph ? " has-photo" : ""}" href="${href}">${ph ? `<span class="q-img">${C.photoImg(ph)}</span>` : ""}<span class="label">${count}</span><b>${t("quick." + key)}</b><span class="q-text">${t("quick." + key + ".text")}</span></a>`;
    };
    const counts = C.regionCounts();
    const featured = ["abies-nebrodensis", "leontopodium-nivale-alpinum", "pancratium-maritimum", "robinia-pseudoacacia"].map(F.byId);
    return `
    <section class="hero wrap">
      <div class="hero-text">
        <span class="label">${t("home.eyebrow")}</span>
        <h1>Flora Italiana</h1>
        <p class="lede">${t("home.lede")}</p>
        <form class="search" id="home-search" role="search">
          <label for="hq">${t("search.label")}</label>
          <div class="search-row"><input id="hq" type="search" placeholder="${F.esc(t("search.placeholder"))}" autocomplete="off"><button class="btn" type="submit">${t("search.button")}</button></div>
        </form>
        <div class="chips" role="group" aria-label="${F.esc(t("search.suggested"))}">${["Stella alpina", "Edelweiss", "Quercus", "Primula", "Lamiaceae"].map(q => `<button class="chip" type="button" data-q="${q}">${q}</button>`).join("")}</div>
      </div>
      ${heroFig}
    </section>

    <nav class="wrap quick" aria-label="${F.esc(t("quick.title"))}">
      ${quick("#catalogo", "catalog", t("quick.count", { n: F.species.length }))}
      ${quick("#viaggio-habitat", "habitats", t("quick.routes.count", { n: F.habitats.filter(h => h.route).length }))}
      ${quick("#viaggio", "belts", t("quick.belts.count", { n: F.belts.length }))}
      ${quick("#regioni", "regions", t("quick.regions.count", { n: F.regions.length }))}
    </nav>

    <section class="block tint"><div class="wrap">
      ${C.secHead(t("journey.eyebrow"), t("journey.title"), t("journey.text"), `<a class="btn ghost" href="#viaggio">${t("journey.all")}</a>`)}
      <div class="transect">${C.transect()}</div>
      <p class="note">${t("journey.note")}</p>
      <h3 class="sub">${t("journey.habitats")}</h3>
      ${C.habitatRoutes()}
    </div></section>

    <section class="block"><div class="wrap">${Pg.nowBlock()}</div></section>

    <section class="block tint"><div class="wrap map-grid">
      <div>${C.secHead(t("map.eyebrow"), t("map.title"), t("map.text"))}${C.tilemap()}<p class="note">${t("map.note")}</p></div>
      <div>${C.secHead(t("route.eyebrow"), t("journey.routes"), t("journey.routes.text"))}${C.routeList(false)}</div>
    </div></section>

    <section class="block"><div class="wrap">
      ${C.secHead(t("featured.eyebrow"), t("featured.title"), t("featured.text"), `<a class="btn ghost" href="#catalogo">${t("featured.open")}</a>`)}
      ${C.cards(featured)}
    </div></section>

    <section class="block tint"><div class="wrap">
      ${C.secHead(t("guides.eyebrow"), t("guides.title"))}
      ${Pg.guideList()}
    </div></section>`;
  };

  /* "Quali piante fioriscono adesso?" — usa il mese del dispositivo */
  Pg.nowBlock = () => {
    const m = F.currentMonth(), months = t("months");
    const now = F.species.filter(s => s.flowering && s.flowering.includes(m));
    let body;
    if (now.length) body = `<p class="lead-small">${t("now.text", { month: months[m - 1].toLowerCase() })}</p>${C.cards(now)}`;
    else {
      /* Nessuna fioritura nel mese corrente: le quattro specie che fioriranno prima */
      const wait = sp => Math.min(...sp.flowering.map(f => (f - m + 12) % 12));
      const next = F.species.filter(s => s.flowering).sort((a, b) => wait(a) - wait(b)).slice(0, 4);
      body = `<p class="lead-small">${t("now.none", { month: months[m - 1].toLowerCase() })} ${t("now.upcoming")}</p>${C.cards(next)}`;
    }
    return C.secHead(t("now.eyebrow"), t("now.title"), "", `<a class="btn ghost" href="#fioriture">${t("now.calendar")}</a>`) + body;
  };

  Pg.guideList = () => `<div class="guides">${F.guides.map(g => `<a class="guide" href="#guida-${g.id}"><span class="label">${t("guides.label")}</span><h3>${F.tx(g.title)}</h3><p>${F.tx(g.subtitle)}</p></a>`).join("")}</div>`;

  /* ---------------- CATALOGO ---------------- */
  Pg.catalog = () => {
    const st = F.state, opt = (v, label, cur) => `<option value="${v}"${cur === v ? " selected" : ""}>${F.esc(label)}</option>`;
    const coll = new Intl.Collator(F.getLang());
    return `<div class="wrap catalog">
      <details class="filters" id="filters">
        <summary><span>${t("filters.title")}</span> <span class="label" id="active-count"></span></summary>
        <div class="filters-body">
          <div class="field"><label for="f-q">${t("filter.search")}</label><input id="f-q" type="search" value="${F.esc(st.q)}" placeholder="${F.esc(t("filter.search.placeholder"))}" autocomplete="off"></div>
          <div class="field"><label for="f-belt">${t("filter.belt")}</label><select id="f-belt">${opt("", t("filter.all"), st.belt)}${F.belts.map(b => opt(b.id, F.name(b.name), st.belt)).join("")}</select></div>
          <div class="field"><label for="f-region">${t("filter.region")}</label><select id="f-region">${opt("", t("filter.all"), st.region)}${F.regions.slice().sort((a, b) => coll.compare(F.name(a.name), F.name(b.name))).map(r => opt(r.id, F.name(r.name), st.region)).join("")}</select></div>
          <div class="field"><label for="f-habitat">${t("filter.habitat")}</label><select id="f-habitat">${opt("", t("filter.allM"), st.habitat)}${F.habitats.map(h => opt(h.id, F.name(h.name), st.habitat)).join("")}</select></div>
          <fieldset class="field"><legend>${t("filter.flowering")}</legend><div class="months">${t("months.short").map((m, i) => `<button type="button" data-m="${i + 1}" aria-pressed="${st.months.includes(i + 1)}" aria-label="${t("months")[i]}">${m}</button>`).join("")}</div></fieldset>
          <fieldset class="field"><legend>${t("filter.origin")}</legend>${Object.keys(F.origins).map(k => `<label class="check"><input type="checkbox" id="o-${k}" value="${k}"${st.origins.includes(k) ? " checked" : ""}> ${F.name(F.origins[k].name)}</label>`).join("")}</fieldset>
          <button class="btn ghost" id="f-reset" type="button">${t("filter.reset")}</button>
        </div>
      </details>
      <section aria-labelledby="cat-h" class="results">
        <div class="results-head">
          <div><span class="label">${t("catalog.eyebrow")}</span><h1 id="cat-h">${t("catalog.title")}</h1></div>
          <div class="results-tools">
            <p class="label" id="count" aria-live="polite"></p>
            <label class="sort" for="f-sort">${t("sort.label")}
              <select id="f-sort">${["common-az", "common-za", "sci-az", "sci-za"].map(k => opt(k, t("sort." + k), st.sort)).join("")}</select></label>
          </div>
        </div>
        <div id="results"></div>
      </section></div>`;
  };
  Pg.renderResults = () => {
    const list = F.filterSpecies(F.state), n = F.activeFilterCount(F.state);
    document.getElementById("count").textContent = list.length === 1 ? t("count.one", { total: F.species.length }) : t("count", { n: list.length, total: F.species.length });
    document.getElementById("active-count").textContent = n ? t("active.filters", { n }) : "";
    document.getElementById("results").innerHTML = list.length ? C.cards(list)
      : `<div class="empty" role="status"><p><b>${t("empty.title")}</b></p><p>${t("empty.text")}</p><button class="btn ghost" type="button" data-reset>${t("filter.reset")}</button></div>`;
    F.saveFilters();
  };
  Pg.bindCatalog = () => {
    const st = F.state, $ = id => document.getElementById(id);
    const det = $("filters"); if (window.matchMedia("(min-width: 920px)").matches || F.activeFilterCount(st)) det.open = true;
    $("f-q").addEventListener("input", e => { st.q = e.target.value; Pg.renderResults(); });
    [["f-belt", "belt"], ["f-region", "region"], ["f-habitat", "habitat"], ["f-sort", "sort"]].forEach(([id, k]) => $(id).addEventListener("change", e => { st[k] = e.target.value; Pg.renderResults(); }));
    document.querySelectorAll(".months button").forEach(b => b.addEventListener("click", () => {
      const m = +b.dataset.m, i = st.months.indexOf(m); i < 0 ? st.months.push(m) : st.months.splice(i, 1);
      b.setAttribute("aria-pressed", String(i < 0)); Pg.renderResults();
    }));
    document.querySelectorAll(".filters input[type=checkbox]").forEach(c => c.addEventListener("change", () => {
      st.origins = [...document.querySelectorAll(".filters input[type=checkbox]:checked")].map(x => x.value); Pg.renderResults();
    }));
    const reset = () => { const sort = st.sort; Object.assign(st, F.EMPTY_FILTERS(), { sort }); F.saveFilters(); F.render(); document.getElementById("f-q").focus(); };
    $("f-reset").addEventListener("click", reset);
    $("results").addEventListener("click", e => { if (e.target.closest("[data-reset]")) reset(); });
    Pg.renderResults();
  };

  /* ---------------- SCHEDA SPECIE ---------------- */
  Pg.related = sp => {
    const score = o => (o.family === sp.family ? 3 : 0) + o.belts.filter(b => sp.belts.includes(b)).length * 2 + o.habitats.filter(h => sp.habitats.includes(h)).length + o.routes.filter(r => sp.routes.includes(r)).length;
    return F.species.filter(o => o.id !== sp.id).map(o => ({ o, s: score(o) })).filter(x => x.s > 1).sort((a, b) => b.s - a.s).slice(0, 4).map(x => x.o);
  };
  Pg.species = id => {
    const sp = F.byId(id); if (!sp) return Pg.notFound();
    const cn = F.commonName(sp), lang = F.getLang();
    const namesIt = (sp.commonNames.it || []), namesEn = (sp.commonNames.en || []);
    const parts = [["leaves", "img.leaves"], ["flowers", "img.flowers"], ["fruits", "img.fruits"], ["habit", "img.habit"]];
    const gallery = parts.map(([k, lab]) => {
      const ph = sp.photos && sp.photos[k];
      if (ph) return `<figure class="ph photo"><div class="img"><img src="${ph.file}" alt="${F.esc(F.pick(ph.alt).value || t(lab))}" loading="lazy" decoding="async" width="480" height="480" onerror="this.onerror=null;this.src='public/images/fallback.svg'"></div><figcaption><b>${t(lab)}</b><span>${C.creditShort(ph.credit)}</span></figcaption></figure>`;
      const svg = F.illus.partSVG(sp, k);
      if (!svg) return `<figure class="ph na"><div class="img">${k === "flowers" && sp.gymnosperm ? t("img.na.gymno") : t("img.na.none")}</div><figcaption><b>${t(lab)}</b><span>${t("img.na.sub")}</span></figcaption></figure>`;
      return `<figure class="ph"><div class="img">${svg}</div><figcaption><b>${t(lab)}</b><span>${t("img.illustration")}</span></figcaption></figure>`;
    }).join("");
    const mainCap = C.imageCaption(sp);
    const regs = sp.regions.map(r => F.name(F.region(r).name)).sort(new Intl.Collator(lang).compare);
    const q = sp.quality;
    let cons;
    if (sp.conservation) {
      const c = sp.conservation;
      cons = `<div class="cons-box">${c.iucn ? `<p><span class="label">${t("sp.iucn")}</span><br>${F.tx(c.iucn)}</p>` : ""}${c.legal ? `<p><span class="label">${t("sp.legal")}</span><br>${F.tx(c.legal)}</p>` : ""}${c.note ? `<p class="muted small">${F.tx(c.note)}</p>` : ""}</div>`;
    } else cons = `<p class="note">${t("sp.noConservation")}</p>`;
    const endem = sp.endemism ? F.tx(sp.endemism) : t("sp.notEndemic");
    const feats = F.pick(sp.features);
    const rel = Pg.related(sp);
    return `<div class="wrap">
      <nav class="crumbs" aria-label="breadcrumb"><a href="#home">${t("nav.home")}</a> / <a href="#catalogo">${t("sp.crumbs.catalog")}</a> / <span aria-current="page">${F.esc(cn.value)}</span></nav>
      <header class="sp-head">
        <span class="label">${t("sp.family")} ${sp.family} · ${F.tx(sp.growthForm)}</span>
        <div class="sp-title"><h1>${F.esc(cn.value)}${cn.missing ? ` <span class="tr-missing">${t("tr.missing.short")}</span>` : ""}</h1>${C.favButton(sp)}</div>
        <p class="sci">${sp.scientificName} <span class="auth">${sp.author}</span></p>
        <dl class="names">
          <div><dt>${t("sp.names.it")}</dt><dd>${namesIt.length ? F.esc(namesIt.join(", ")) : `<span class="na">${t("sp.notAvailable")}</span>`}</dd></div>
          <div><dt>${t("sp.names.en")}</dt><dd>${namesEn.length ? F.esc(namesEn.join(", ")) : `<span class="na">${t("sp.notAvailable")}</span>`}</dd></div>
          ${sp.synonyms.length ? `<div><dt>${t("sp.synonyms")}</dt><dd><i>${sp.synonyms.join(", ")}</i></dd></div>` : ""}
        </dl>
        <div class="row">${C.originBadge(sp)}${C.consBadge(sp)}${sp.nativeRange ? `<span class="label">${t("sp.nativeRange")}: ${F.tx(sp.nativeRange)}</span>` : ""}</div>
      </header>
      <div class="sp-grid">
        <div class="col">
          <figure class="main-img">${C.speciesImage(sp, "main")}<figcaption>${mainCap}</figcaption></figure>
          <div class="gallery">${gallery}</div>
          <div class="panel"><h2>${t("sp.description")}</h2><div class="prose"><p>${F.tx(sp.description)}</p></div></div>
          <div class="panel"><h2>${t("sp.features")}</h2><ul class="keys">${(feats.value || []).map(k => `<li>${F.esc(k)}</li>`).join("")}</ul>${feats.missing ? `<p class="note">${t("tr.missing")}</p>` : ""}</div>
          <div class="panel"><h2>${t("sp.habitatDist")}</h2>
            <dl class="facts">
              <div class="fact"><dt>${t("fact.origin")}</dt><dd><b>${F.name(F.origins[sp.origin].name)}.</b> ${F.name(F.origins[sp.origin].def)}${sp.originNote ? `<br><span class="muted small">${F.tx(sp.originNote)}</span>` : ""}</dd></div>
              <div class="fact"><dt>${t("fact.belt")}</dt><dd>${sp.belts.map(b => `<a href="#fascia-${b}">${F.name(F.belt(b).name)}</a>`).join(", ")}</dd></div>
              <div class="fact"><dt>${t("fact.altitude")}</dt><dd>${F.tx(sp.altitude)}</dd></div>
              <div class="fact"><dt>${t("fact.habitat")}</dt><dd>${sp.habitats.map(h => F.habitat(h).route ? `<a href="#habitat-${h}">${F.name(F.habitat(h).name)}</a>` : F.name(F.habitat(h).name)).join(", ")}</dd></div>
              <div class="fact"><dt>${t("fact.distribution")}</dt><dd>${F.tx(sp.distribution)}</dd></div>
              <div class="fact"><dt>${t("fact.regions")}</dt><dd>${regs.join(", ")} ${C.qualityBadge(q.regions)}</dd></div>
            </dl>
          </div>
        </div>
        <aside class="col side">
          <div class="panel quality"><span class="label">${t("sp.quality")}</span>
            <dl class="qlist"><div><dt>${t("sp.quality.overall")}</dt><dd>${C.qualityBadge(q.overall)}</dd></div><div><dt>${t("sp.quality.regions")}</dt><dd>${C.qualityBadge(q.regions)}</dd></div><div><dt>${t("sp.quality.flowering")}</dt><dd>${C.qualityBadge(q.flowering)}</dd></div></dl>
            <p class="muted small">${F.name(F.quality[q.overall].def)}</p></div>
          <div class="panel"><span class="label">${t("sp.regionsMap")}</span>${C.tilemap({ mini: true, on: sp.regions })}<p class="note">${t("region.note")}</p></div>
          <div class="panel"><span class="label">${t("sp.flowering")}</span>
            ${sp.flowering ? C.monthCalendar(sp.flowering) : ""}${sp.floweringNote ? `<p class="${sp.flowering ? "note" : ""}">${F.tx(sp.floweringNote)}</p>` : ""}</div>
          <div class="panel"><span class="label">${t("sp.endemism")}</span><p>${endem}</p></div>
          <div class="panel"><span class="label">${t("sp.conservation")}</span>${cons}</div>
          <div class="panel"><span class="label">${t("sp.sources")}</span><ol class="sources">${sp.sources.map(k => { const s = F.sources[k]; return `<li>${F.esc(s.text)}${s.url ? ` <a href="${s.url}" target="_blank" rel="noopener">${t("sp.sources.open")} ↗</a>` : ""}</li>`; }).join("")}</ol>
            <div class="stamp"><span>${t("sp.updated")}: ${F.fmtDate(sp.updated)}</span><span>ID: ${sp.id}</span></div></div>
        </aside>
      </div>
      ${rel.length ? `<section class="block">${C.secHead(t("sp.related"), t("sp.related.title"))}${C.cards(rel)}</section>` : ""}
    </div>`;
  };

  /* ---------------- VIAGGIO BOTANICO ---------------- */
  Pg.journey = () => `<div class="wrap">
    <div class="page-hero">${C.sprig()}<span class="label">${t("journey.eyebrow")}</span><h1>${t("journey.title")}</h1><p class="lede">${t("journey.text")}</p></div>
    <h2 class="sub">${t("journey.belts")}</h2>
    <div class="transect">${C.transect({ full: true })}</div><p class="note">${t("journey.note")}</p>
    <h2 class="sub" id="habitat-routes">${t("journey.habitats")}</h2><p class="muted">${t("journey.habitats.text")}</p>
    ${C.habitatRoutes()}
    <h2 class="sub">${t("journey.routes")}</h2><p class="muted">${t("journey.routes.text")}</p>
    ${C.routeList(true)}
  </div>`;

  const listPage = (crumbLabel, eyebrow, title, lede, extra, list, filterAttr) => `<div class="wrap">
    <nav class="crumbs" aria-label="breadcrumb"><a href="#home">${t("nav.home")}</a> / <a href="#viaggio">${crumbLabel}</a> / <span aria-current="page">${title}</span></nav>
    <div class="page-hero"><span class="label">${eyebrow}</span><h1>${title}</h1><p class="lede">${lede}</p>${extra || ""}
    ${list.length ? `<p><button class="btn ghost" type="button" ${filterAttr}>${t("route.filter")}</button></p>` : ""}</div>
    ${list.length ? C.cards(list) : `<div class="empty"><p>${t("route.empty")}</p></div>`}</div>`;

  Pg.belt = id => { const b = F.belt(id); if (!b) return Pg.notFound();
    return listPage(t("nav.journey"), `${t("belt.eyebrow")} · ${F.name(b.technical)}`, F.esc(F.name(b.name)), F.name(b.text), `<p class="label">${t("belt.altitude")}: ${F.name(b.altitude)}</p><p class="note">${t("journey.note")}</p>`, F.species.filter(s => s.belts.includes(id)), `data-go='{"belt":"${id}"}'`); };
  Pg.habitatPage = id => { const h = F.habitat(id); if (!h) return Pg.notFound();
    return listPage(t("nav.journey"), t("habitat.eyebrow"), F.esc(F.name(h.name)), F.name(h.text), "", F.species.filter(s => s.habitats.includes(id)), `data-go='{"habitat":"${id}"}'`); };
  Pg.routePage = id => { const r = F.route(id); if (!r) return Pg.notFound();
    return listPage(t("nav.journey"), t("route.eyebrow"), F.esc(F.name(r.name)), F.name(r.text), "", F.species.filter(s => s.routes.includes(id)), ""); };

  /* ---------------- REGIONI ---------------- */
  Pg.regions = current => {
    const r = current ? F.region(current) : null; if (current && !r) return Pg.notFound();
    const coll = new Intl.Collator(F.getLang()), counts = C.regionCounts();
    const list = r ? F.species.filter(s => s.regions.includes(r.id)) : [];
    return `<div class="wrap">
      ${r ? `<nav class="crumbs" aria-label="breadcrumb"><a href="#home">${t("nav.home")}</a> / <a href="#regioni">${t("nav.regions")}</a> / <span aria-current="page">${F.esc(F.name(r.name))}</span></nav>` : ""}
      <div class="page-hero">${C.sprig()}<span class="label">${t("map.eyebrow")}</span><h1>${r ? F.esc(t("region.title", { region: F.name(r.name) })) : t("regions.title")}</h1><p class="lede">${r ? t("region.note") : t("regions.lede")}</p></div>
      <div class="map-grid">
        <div>${C.tilemap({ current })}<p class="note">${t("map.note")}</p>
          <ul class="region-list">${F.regions.slice().sort((a, b) => coll.compare(F.name(a.name), F.name(b.name))).map(x => `<li><a href="#regione-${x.id}"${x.id === current ? ' aria-current="page"' : ""}>${F.esc(F.name(x.name))}</a> <span class="muted">${counts[x.id] || 0}</span></li>`).join("")}</ul></div>
        <div>${r ? (list.length ? `<p class="label">${t("quick.count", { n: list.length })}</p>${C.cards(list)}<p><button class="btn ghost" type="button" data-go='{"region":"${r.id}"}'>${t("route.filter")}</button></p>` : `<div class="empty"><p>${t("region.empty")}</p></div>`) : `<p class="muted">${t("map.text")}</p>`}</div>
      </div></div>`;
  };

  /* ---------------- FIORITURE ---------------- */
  Pg.flowering = () => {
    const m = F.currentMonth(), coll = new Intl.Collator(F.getLang());
    const list = F.species.filter(s => s.flowering).sort((a, b) => coll.compare(F.commonName(a).value, F.commonName(b).value));
    return `<div class="wrap">
      <div class="page-hero">${C.sprig()}<span class="label">${t("now.eyebrow")}</span><h1>${t("flowering.title")}</h1><p class="lede">${t("flowering.lede")}</p></div>
      <div class="tbl"><table class="fcal"><caption class="label">${t("flowering.title")} · ${t("flowering.current")}: ${t("months")[m - 1]}</caption>
        <thead><tr><th scope="col">${t("flowering.species")}</th>${t("months.short").map((x, i) => `<th scope="col" class="${i + 1 === m ? "now" : ""}" abbr="${t("months")[i]}">${x}</th>`).join("")}</tr></thead>
        <tbody>${list.map(s => `<tr><th scope="row"><a href="#specie-${s.id}">${F.esc(F.commonName(s).value)}</a><span class="sci">${s.scientificName}</span></th>${t("months.short").map((x, i) => `<td class="${s.flowering.includes(i + 1) ? "on" : ""}${i + 1 === m ? " now" : ""}">${s.flowering.includes(i + 1) ? `<span class="sr">${t("months")[i]}</span>` : ""}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <p class="note">${t("flowering.gymno")}</p>
      <section class="block">${Pg.nowBlock()}</section></div>`;
  };

  /* ---------------- GUIDE ---------------- */
  Pg.guides = () => `<div class="wrap"><div class="page-hero">${C.sprig()}<span class="label">${t("guides.eyebrow")}</span><h1>${t("guides.title")}</h1></div>${Pg.guideList()}</div>`;
  Pg.guidePage = id => { const g = F.guide(id); if (!g) return Pg.notFound();
    const body = F.pick(g.body);
    return `<div class="wrap"><nav class="crumbs" aria-label="breadcrumb"><a href="#home">${t("nav.home")}</a> / <a href="#guide">${t("nav.guides")}</a> / <span aria-current="page">${F.tx(g.title)}</span></nav>
      <article class="page-hero"><span class="label">${t("guides.label")}</span><h1>${F.tx(g.title)}</h1><p class="lede muted">${F.tx(g.subtitle)}</p>${body.missing ? `<p class="note">${t("tr.missing")}</p>` : ""}${body.value.map(p => `<p>${F.esc(p)}</p>`).join("")}</article>
      <section class="block">${C.secHead(t("guides.species"), "")}${C.cards(g.species.map(F.byId))}</section></div>`; };

  /* ---------------- PREFERITI ---------------- */
  Pg.favorites = () => {
    const list = F.favs.list().map(F.byId);
    return `<div class="wrap"><div class="page-hero">${C.sprig()}<span class="label">${t("nav.favorites")}</span><h1>${t("fav.title")}</h1><p class="lede">${t("fav.lede")}</p>${F.store.ok ? "" : `<p class="note">${t("fav.unavailable")}</p>`}</div>
      ${list.length ? C.cards(list) : `<div class="empty"><p>${t("fav.empty")}</p><p><a class="btn ghost" href="#catalogo">${t("featured.open")}</a></p></div>`}</div>`;
  };

  /* ---------------- METODO ---------------- */
  Pg.method = () => {
    const credited = F.species.filter(s => s.image.status === "ready" && !s.image.ai && s.image.credit)
      .sort((a, b) => a.scientificName.localeCompare(b.scientificName));
    /* Campo, tipo, chiave della nota in js/i18n */
    const rows = [
      ["id", "string", "id"],
      ["scientificName, author", "string", "scientificName"],
      ["synonyms", "string[]", "synonyms"],
      ["commonNames", "{ it: [], en: [] }", "commonNames"],
      ["family", "string", "family"],
      ["origin, originNote, nativeRange", "enum + { it, en }", "origin"],
      ["belts, habitats, routes", "id[]", "vocab"],
      ["regions", "id[]", "regions"],
      ["flowering", "int[] | null", "flowering"],
      ["description, features, altitude, distribution", "{ it, en }", "texts"],
      ["conservation", "{ iucn, legal, note } | null", "conservation"],
      ["quality", "{ overall, regions, flowering }", "quality"],
      ["image", "{ file, status, ai, alt, credit }", "image"],
      ["photos", "{ leaves, flowers, fruits, habit }", "photos"],
      ["sources, updated", "key[] + date", "sources"]
    ];
    return `<div class="wrap"><div class="page-hero">${C.sprig()}<span class="label">${t("nav.method")}</span><h1>${t("method.title")}</h1><p class="lede">${t("method.lede")}</p><p>${t("method.p2")}</p></div>
      <section class="block"><h2>${t("method.quality")}</h2><dl class="facts">${Object.keys(F.quality).map(k => `<div class="fact"><dt>${C.qualityBadge(k)}</dt><dd>${F.name(F.quality[k].def)}</dd></div>`).join("")}</dl></section>
      <section class="block"><h2>${t("method.images")}</h2><p class="prose">${t("method.images.text")}</p>
        ${credited.length ? `<h3 class="sub">${t("method.credits")}</h3><ul class="credits">${credited.map(s => `<li><a href="#specie-${s.id}"><i>${s.scientificName}</i></a>: ${C.credit(s.image.credit)}${s.photos ? `<br><span class="small">${t("method.credits.parts")}: ${Object.entries(s.photos).map(([k, ph]) => `${t("img." + k)} — ${C.creditShort(ph.credit)}`).join("; ")}</span>` : ""}</li>`).join("")}</ul>` : ""}</section>
      <section class="block"><h2>${t("method.model")}</h2>
        <div class="tbl"><table class="schema"><thead><tr><th>${t("method.field")}</th><th>${t("method.type")}</th><th>${t("method.notes")}</th></tr></thead><tbody>${rows.map(r => `<tr><td><code>${r[0]}</code></td><td><code>${F.esc(r[1])}</code></td><td>${F.esc(t("method.f." + r[2]))}</td></tr>`).join("")}</tbody></table></div></section>
      <section class="block"><h2>${t("method.sources")}</h2><ol class="sources">${Object.values(F.sources).map(s => `<li>${F.esc(s.text)}${s.url ? ` <a href="${s.url}" target="_blank" rel="noopener">${t("sp.sources.open")} ↗</a>` : ""}</li>`).join("")}</ol></section>
      <section class="block"><h2>${t("method.origins")}</h2><dl class="facts">${Object.values(F.origins).map(o => `<div class="fact"><dt>${F.name(o.name)}</dt><dd>${F.name(o.def)}</dd></div>`).join("")}</dl></section></div>`;
  };

  Pg.notFound = () => `<div class="wrap page-hero"><h1>${t("notfound.title")}</h1><p>${t("notfound.text")} <a href="#catalogo">${t("notfound.back")}</a>.</p></div>`;
})();
