/* Flora Italiana — intestazione, piè di pagina, router e eventi globali. */
(function () {
  const F = FLORA, t = F.t, Pg = F.pages;
  const $ = s => document.querySelector(s);

  const NAV = [["home", "nav.home"], ["catalogo", "nav.catalog"], ["viaggio", "nav.journey"], ["regioni", "nav.regions"], ["fioriture", "nav.flowering"], ["guide", "nav.guides"], ["preferiti", "nav.favorites"], ["metodo", "nav.method"]];

  /* Percorsi: "#token" → [pagina, voce di menu attiva] */
  const ROUTES = [
    [/^(home)?$/, () => [Pg.home(), "home"]],
    [/^catalogo$/, () => [Pg.catalog(), "catalogo", Pg.bindCatalog]],
    [/^specie-(.+)$/, m => [Pg.species(m[1]), "catalogo"]],
    [/^(viaggio|fasce|percorsi)$/, () => [Pg.journey(), "viaggio"]],
    [/^viaggio-habitat$/, () => [Pg.journey(), "viaggio", () => { const el = document.getElementById("habitat-routes"); if (el) el.scrollIntoView(); }]],
    [/^fascia-(.+)$/, m => [Pg.belt(m[1]), "viaggio"]],
    [/^habitat-(.+)$/, m => [Pg.habitatPage(m[1]), "viaggio"]],
    [/^percorso-(.+)$/, m => [Pg.routePage(m[1]), "viaggio"]],
    [/^regioni$/, () => [Pg.regions(null), "regioni"]],
    [/^regione-(.+)$/, m => [Pg.regions(m[1]), "regioni"]],
    [/^fioriture$/, () => [Pg.flowering(), "fioriture"]],
    [/^guide$/, () => [Pg.guides(), "guide"]],
    [/^guida-(.+)$/, m => [Pg.guidePage(m[1]), "guide"]],
    [/^preferiti$/, () => [Pg.favorites(), "preferiti"]],
    [/^metodo$/, () => [Pg.method(), "metodo"]]
  ];

  function renderChrome(active) {
    $(".skip").textContent = t("skip");
    $("header.site").innerHTML = `<div class="wrap bar">
      <a class="brand" href="#home"><b>Flora Italiana</b><span>${t("brand.tag")}</span></a>
      <div class="bar-tools">
        <div class="lang" role="group" aria-label="${F.esc(t("lang.label"))}">${F.LANGS.map(l => `<button type="button" data-lang="${l}" aria-pressed="${F.getLang() === l}" lang="${l}" title="${F.esc(F.i18n[l]["lang.name"])}">${l.toUpperCase()}</button>`).join("")}</div>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav">${t("menu.open")}</button>
      </div>
      <nav class="main" id="main-nav" aria-label="${F.esc(t("menu.open"))}">${NAV.map(([k, key]) => `<a href="#${k}"${k === active ? ' aria-current="page"' : ""}>${t(key)}${k === "preferiti" && F.favs.list().length ? ` <span class="count-dot">${F.favs.list().length}</span>` : ""}</a>`).join("")}</nav>
    </div>`;
    $("footer.site").innerHTML = `<div class="wrap cols">
      <div><p class="label">Flora Italiana</p><p>${t("footer.about")}</p></div>
      <div><p class="label">${t("footer.refs")}</p><p>${t("footer.refs.text")}</p></div>
      <div><p class="label">${t("footer.sections")}</p><p>${NAV.slice(1).map(([k, key]) => `<a href="#${k}">${t(key)}</a>`).join(" · ")}</p></div>
    </div>`;
  }

  F.render = function () {
    const h = decodeURIComponent((location.hash || "#home").slice(1));
    let out = null;
    for (const [re, fn] of ROUTES) { const m = h.match(re); if (m) { out = fn(m); break; } }
    if (!out) out = [Pg.notFound(), ""];
    const [html, active, after] = out;
    renderChrome(active);
    $("#contenuto").innerHTML = html;
    document.title = h && h !== "home" ? `${($("#contenuto h1") || {}).textContent || ""} · Flora Italiana` : "Flora Italiana";
    if (after) after();
  };

  /* Va al catalogo con filtri preimpostati (mantiene l'ordinamento scelto) */
  F.goCatalog = patch => {
    Object.assign(F.state, F.EMPTY_FILTERS(), { sort: F.state.sort }, patch); F.saveFilters();
    if (location.hash === "#catalogo") F.render(); else location.hash = "catalogo";
  };

  document.addEventListener("click", e => {
    const el = e.target.closest("[data-lang],[data-fav],[data-q],[data-go],.menu-btn");
    if (!el) return;
    if (el.dataset.lang) {
      const y = window.scrollY; F.setLang(el.dataset.lang); F.render(); window.scrollTo(0, y);
      const b = document.querySelector(`[data-lang="${el.dataset.lang}"]`); if (b) b.focus();
    } else if (el.dataset.fav) {
      e.preventDefault();
      F.favs.toggle(el.dataset.fav);
      const y = window.scrollY, id = el.dataset.fav; F.render(); window.scrollTo(0, y);
      const b = document.querySelector(`[data-fav="${id}"]`); if (b) b.focus();
    } else if (el.dataset.q) F.goCatalog({ q: el.dataset.q });
    else if (el.dataset.go) F.goCatalog(JSON.parse(el.dataset.go));
    else if (el.classList.contains("menu-btn")) {
      const open = el.getAttribute("aria-expanded") !== "true";
      el.setAttribute("aria-expanded", String(open)); $("#main-nav").classList.toggle("open", open);
    }
  });
  document.addEventListener("submit", e => {
    if (e.target.id === "home-search") { e.preventDefault(); F.goCatalog({ q: $("#hq").value }); }
  });
  /* Viaggio botanico: la tappa sotto il puntatore (o con il focus) evidenzia la sua fascia nel profilo, e viceversa */
  const highlight = e => {
    const el = e.target.closest && e.target.closest(".transect [data-belt]"); if (!el) return;
    const box = el.closest(".transect"), on = e.type === "mouseover" || e.type === "focusin", id = el.dataset.belt;
    box.classList.toggle("is-hover", on);
    box.querySelectorAll("[data-belt]").forEach(x => x.classList.toggle("is-active", on && x.dataset.belt === id));
  };
  ["mouseover", "mouseout", "focusin", "focusout"].forEach(type => document.addEventListener(type, highlight));

  window.addEventListener("hashchange", () => {
    F.render();
    if (location.hash !== "#viaggio-habitat") window.scrollTo(0, 0);
    $("#contenuto").focus({ preventScroll: true });
  });

  F.render();
})();
