/* Flora Italiana — componenti riutilizzabili (restituiscono stringhe HTML). */
window.FLORA = window.FLORA || {};
(function () {
  const F = FLORA, t = F.t;
  const C = F.ui = {};

  /* Piccolo rametto fiorito usato come ornamento nelle intestazioni di sezione */
  C.sprig = () => `<svg class="sprig" viewBox="0 0 64 16" aria-hidden="true" focusable="false"><path class="stem" stroke-width="1.2" d="M2 12 C20 10 40 6 62 4"/>${F.illus.leafG("lanceolate", 9, 3, 16, 11, -60, "lf2")}${F.illus.leafG("lanceolate", 9, 3, 30, 9, 55, "lf")}${F.illus.leafG("lanceolate", 8, 3, 44, 7, -60, "lf2")}<circle class="flower-dot" cx="62" cy="4" r="3"/></svg>`;

  C.secHead = (eyebrow, title, text, action) => `<div class="sec-head"><div>${C.sprig()}<span class="label">${eyebrow}</span><h2>${title}</h2>${text ? `<p>${text}</p>` : ""}</div>${action || ""}</div>`;

  C.originBadge = sp => `<span class="badge origin-${sp.origin}">${F.name(F.origins[sp.origin].name)}</span>`;
  C.qualityBadge = q => `<span class="badge q-${q}" title="${F.esc(F.name(F.quality[q].def))}">${F.name(F.quality[q].name)}</span>`;
  C.consBadge = sp => {
    if (!sp.conservation) return "";
    if (sp.conservation.iucnCode) return `<span class="badge cons">IUCN ${sp.conservation.iucnCode}</span>`;
    if (sp.conservation.legal) return `<span class="badge cons">${F.getLang() === "it" ? "Protetta" : "Protected"}</span>`;
    return "";
  };

  C.favButton = sp => {
    const on = F.favs.has(sp.id);
    return `<button class="fav" type="button" data-fav="${sp.id}" aria-pressed="${on}" aria-label="${F.esc(t(on ? "fav.remove" : "fav.add"))}: ${F.esc(F.commonName(sp).value)}" title="${F.esc(t(on ? "fav.remove" : "fav.add"))}">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></button>`;
  };

  /* Immagine di una specie: file reale se pronto, altrimenti tavola illustrata. */
  C.speciesImage = (sp, cls = "") => {
    const name = F.commonName(sp).value;
    if (sp.image && sp.image.status === "ready") {
      const alt = F.pick(sp.image.alt).value || name;
      return `<img class="sp-img ${cls}" src="${sp.image.file}" alt="${F.esc(alt)}" loading="lazy" decoding="async" width="600" height="800" onerror="this.onerror=null;this.src='public/images/fallback.svg';this.classList.add('is-fallback');var f=this.closest('figure,.plate');if(f)f.classList.add('img-missing')">`;
    }
    return F.illus.plateSVG(sp, F.esc(`${t("img.illustration")}: ${name}, ${sp.scientificName}`));
  };
  C.imageIsAI = sp => sp.image && sp.image.status === "ready" && sp.image.ai;

  C.card = sp => {
    const cn = F.commonName(sp);
    const belts = sp.belts.map(b => F.name(F.belt(b).label)).join(" · ");
    return `<article class="card">
      <a class="card-link" href="#specie-${sp.id}">
        <div class="plate">${C.speciesImage(sp)}${C.imageIsAI(sp) ? `<span class="ai-tag">AI</span>` : ""}</div>
        <div class="body"><span class="label">${sp.family}</span>
          <h3>${F.esc(cn.value)}${cn.missing ? ` <span class="tr-missing">${t("tr.missing.short")}</span>` : ""}</h3>
          <p class="sci">${sp.scientificName} <span class="auth">${sp.author}</span></p>
          <p class="card-meta">${belts}${sp.flowering ? ` · ${sp.flowering.map(m => t("months.short")[m - 1]).join("–").replace(/–.*–/, "–")}` : ""}</p>
          <div class="meta">${C.originBadge(sp)}${C.consBadge(sp)}</div>
        </div>
      </a>${C.favButton(sp)}</article>`;
  };
  C.cards = list => `<div class="cards">${list.map(C.card).join("")}</div>`;

  C.regionCounts = () => { const c = {}; F.species.forEach(s => s.regions.forEach(r => c[r] = (c[r] || 0) + 1)); return c; };

  /* Mappa schematica a riquadri. mode "nav": link alle pagine regione; mode "mini": sola lettura con evidenziazione */
  C.tilemap = (opts = {}) => {
    const counts = C.regionCounts();
    let h = `<div class="tilemap${opts.mini ? " mini" : ""}" ${opts.mini ? `role="img" aria-label="${F.esc(t("sp.regionsMap"))}: ${opts.on.map(r => F.name(F.region(r).name)).join(", ")}"` : `role="list" aria-label="${F.esc(t("map.title"))}"`}>`;
    F.regions.forEach(r => {
      const style = `grid-column:${r.c};grid-row:${r.r}`, nm = F.name(r.name);
      if (opts.mini) { const on = opts.on.includes(r.id); h += `<div class="tile ${on ? "on" : "off"}" style="${style}" title="${F.esc(nm)}${on ? ": " + t("map.present") : ""}" aria-hidden="true"><b>${r.ab}</b></div>`; }
      else h += `<a role="listitem" class="tile${opts.current === r.id ? " current" : ""}" style="${style}" href="#regione-${r.id}" aria-label="${F.esc(t("map.tile", { region: nm, n: counts[r.id] || 0 }))}"${opts.current === r.id ? ' aria-current="page"' : ""}><b>${r.ab}</b><small>${counts[r.id] || 0}</small></a>`;
    });
    return h + `</div>`;
  };

  /* Profilo schematico costa → vetta, con le cinque fasce cliccabili */
  C.transect = () => {
    const P = n => Math.round(n * 10) / 10;
    const bands = [["mediterranea", 0, 150], ["planiziale", 150, 300], ["collinare", 300, 450], ["montana", 450, 620], ["alpina", 620, 800]];
    const prof = x => x < 150 ? 200 - x * .12 : x < 300 ? 182 - (x - 150) * .02 : x < 450 ? 179 - (x - 300) * .28 - Math.sin(x / 18) * 4 : x < 620 ? 137 - (x - 450) * .45 - Math.sin(x / 14) * 5 : 60 - (x - 620) * .25 - Math.abs(Math.sin(x / 12)) * 10;
    const tints = ["band-1", "band-2", "band-3", "band-4", "band-5"];
    let s = `<svg viewBox="0 0 800 262" role="group" aria-label="${F.esc(t("journey.title"))}"><rect class="sea" x="0" y="200" width="800" height="62"/><path class="wave" d="M0 206 q20 -4 40 0 t40 0 t40 0"/>`;
    bands.forEach(([id, a, b], i) => {
      let d = `M${a} 232`; for (let x = a; x <= b; x += 5) d += ` L${x} ${P(prof(x))}`; d += ` L${b} 232Z`;
      const lab = F.name(F.belt(id).label);
      s += `<a class="band" href="#fascia-${id}" aria-label="${F.esc(F.name(F.belt(id).name))}"><path class="${tints[i]}" d="${d}"/><text x="${(a + b) / 2}" y="252" text-anchor="middle">${F.esc(lab.toUpperCase())}</text></a>`;
    });
    const tree = (x, y, cls) => `<path class="${cls}" d="M${x} ${y} c-7 -2 -8 -14 0 -16 c8 2 7 14 0 16Z"/><line class="stem" x1="${x}" y1="${y}" x2="${x}" y2="${y + 5}" stroke-width="1.2"/>`;
    const fir = (x, y) => `<path class="lf" d="M${x} ${y - 18} L${x + 6} ${y} L${x - 6} ${y}Z"/>`;
    [40, 70, 110].forEach(x => s += tree(x, P(prof(x) - 4), "lf")); [190, 240, 270].forEach(x => s += tree(x, P(prof(x) - 4), "lf"));
    [330, 380, 420].forEach(x => s += tree(x, P(prof(x) - 4), "lf2")); [480, 520, 560, 600].forEach(x => s += fir(x, P(prof(x) - 1)));
    [650, 700].forEach(x => s += `<circle class="pink" cx="${x}" cy="${P(prof(x) - 3)}" r="3"/>`);
    return s + `</svg>`;
  };

  C.habitatRoutes = () => `<div class="hab-routes">${F.habitats.filter(h => h.route).map(h => {
    const n = F.species.filter(s => s.habitats.includes(h.id)).length;
    return `<a class="hab-route" href="#habitat-${h.id}"><span class="label">${t("quick.count", { n })}</span><h3>${F.name(h.name)}</h3><p>${F.name(h.text)}</p></a>`;
  }).join("")}</div>`;

  C.routeList = (full) => `<div class="percorsi">${F.routes.map(r => {
    const n = F.species.filter(s => s.routes.includes(r.id)).length, txt = F.name(r.text);
    return `<a class="percorso" href="#percorso-${r.id}"><span class="n">${t("quick.count", { n })}</span><h3>${F.name(r.name)}</h3><p>${full ? txt : txt.split(".")[0] + "."}</p></a>`;
  }).join("")}</div>`;

  C.monthCalendar = months => `<div class="calendar" role="img" aria-label="${F.esc(t("sp.flowering"))}: ${months.map(m => t("months")[m - 1]).join(", ")}">${t("months.short").map((m, i) => `<div class="${months.includes(i + 1) ? "on" : ""}${F.currentMonth() === i + 1 ? " now" : ""}">${m}</div>`).join("")}</div>`;
})();
