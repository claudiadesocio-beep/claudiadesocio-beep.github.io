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
    if (sp.conservation.legal) return `<span class="badge cons">${t("badge.protected")}</span>`;
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

  /* Attribuzione di una fotografia con licenza: autore, licenza (con link) e fonte */
  C.credit = cr => {
    const link = (href, text) => href ? `<a href="${F.esc(href)}" target="_blank" rel="noopener">${F.esc(text)}</a>` : F.esc(text);
    const host = /commons\.wikimedia\.org/.test(cr.source) ? "Wikimedia Commons" : t("img.source");
    return t("img.photo", { author: F.esc(cr.author), license: link(cr.licenseUrl, cr.license), source: link(cr.source, host) });
  };
  /* Versione breve per le miniature: autore (link alla fonte) e licenza (link al testo della licenza) */
  C.creditShort = cr => {
    const link = (href, text) => href ? `<a href="${F.esc(href)}" target="_blank" rel="noopener">${F.esc(text)}</a>` : F.esc(text);
    return t("img.photo.short", { author: link(cr.source, cr.author), license: link(cr.licenseUrl, cr.license) });
  };
  /* Didascalia dell'immagine principale: AI, fotografia con crediti, oppure tavola illustrata */
  C.imageCaption = sp => {
    if (sp.image && sp.image.status === "ready") {
      if (sp.image.ai) return t("img.ai");
      if (sp.image.credit) return C.credit(sp.image.credit);
    }
    return t("img.illustration");
  };

  /* Foto di una scheda indicata come { species, part }: part "main" è l'immagine principale, le altre sono le miniature.
     Restituisce { file, alt, credit, sp } oppure null se la foto non c'è. */
  C.photo = ref => {
    const sp = ref && F.byId(ref.species); if (!sp) return null;
    if (ref.part === "main") return sp.image.status === "ready" && !sp.image.ai ? { file: sp.image.file, alt: sp.image.alt, credit: sp.image.credit, sp } : null;
    const ph = sp.photos && sp.photos[ref.part];
    return ph ? Object.assign({ sp }, ph) : null;
  };
  /* Immagine decorativa con il nome della specie come testo alternativo di riserva */
  C.photoImg = (ph, eager) => `<img src="${ph.file}" alt="${F.esc(F.pick(ph.alt).value || F.commonName(ph.sp).value)}"${eager ? "" : ` loading="lazy"`} decoding="async" onerror="this.onerror=null;this.src='public/images/fallback.svg'">`;

  /* Mosaico della homepage: ogni riquadro porta alla scheda; gli autori sono elencati nella didascalia */
  C.heroMosaic = refs => {
    const list = refs.map(C.photo).filter(Boolean);
    if (list.length < 3) return "";
    const authors = [...new Set(list.map(p => p.credit.author))].map(F.esc).join(", ");
    return `<figure class="hero-mosaic">
      <div class="mosaic">${list.map((p, i) => `<a class="tile-ph t${i}" href="#specie-${p.sp.id}">${C.photoImg(p, true)}<span>${F.esc(F.commonName(p.sp).value)}</span></a>`).join("")}</div>
      <figcaption>${t("home.mosaic.credit", { authors })} <a href="#metodo">${t("home.mosaic.more")}</a></figcaption>
    </figure>`;
  };

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

  /* Tavola illustrata del viaggio: profilo costa → vetta disegnato a mano in SVG, con la vegetazione tipica di ogni fascia.
     Le cinque fasce sono cliccabili; sotto, le "tappe" allineate alle fasce.
     full: tappe con l'elenco delle specie (pagina del viaggio). */
  const TR_BANDS = [["mediterranea", 0, 225], ["planiziale", 225, 450], ["collinare", 450, 675], ["montana", 675, 930], ["alpina", 930, 1200]];
  /* Punti del profilo (x, y): raccordati dolcemente in basso, a spigolo vivo oltre il limite del bosco */
  const TR_PTS = [[0, 240], [92, 240], [130, 226], [168, 233], [225, 226], [300, 223], [380, 225], [450, 220], [500, 205], [545, 211], [590, 190], [632, 195], [675, 172], [740, 152], [800, 131], [860, 114], [930, 92], [968, 72], [1008, 84], [1050, 42], [1090, 64], [1132, 26], [1168, 52], [1200, 40]];
  const trY = x => {
    for (let i = 1; i < TR_PTS.length; i++) {
      const [x0, y0] = TR_PTS[i - 1], [x1, y1] = TR_PTS[i];
      if (x <= x1) { const f = (x - x0) / (x1 - x0), k = x0 >= 930 ? f : (1 - Math.cos(f * Math.PI)) / 2; return y0 + (y1 - y0) * k; }
    }
    return TR_PTS[TR_PTS.length - 1][1];
  };
  const R = n => Math.round(n * 10) / 10;
  /* Piccoli elementi del paesaggio (x, y = punto d'appoggio al suolo) */
  const TR = {
    stonePine: (x, y) => `<path class="stem" stroke-width="2" d="M${x} ${y} q2 -12 -1 -24"/><ellipse class="lf" cx="${x - 1}" cy="${y - 27}" rx="17" ry="6"/><ellipse class="lf2" cx="${x + 5}" cy="${y - 30}" rx="9" ry="3.5"/>`,
    palm: (x, y) => `<g class="tr-ink">${[-70, -45, -22, 0, 22, 45, 70].map(a => `<path d="M${x} ${y} l${R(Math.sin(a * Math.PI / 180) * 13)} ${R(-Math.cos(a * Math.PI / 180) * 13)}"/>`).join("")}</g>`,
    bush: (x, y, r = 6) => `<circle class="lf" cx="${x - r * .7}" cy="${y - r * .7}" r="${r}"/><circle class="lf2" cx="${x + r * .6}" cy="${y - r * .8}" r="${r * .85}"/><circle class="lf" cx="${x}" cy="${y - r * 1.3}" r="${r * .8}"/>`,
    poplar: (x, y) => `<path class="stem" stroke-width="1.4" d="M${x} ${y} L${x} ${y - 8}"/><ellipse class="lf2" cx="${x}" cy="${y - 22}" rx="5" ry="16"/>`,
    reeds: (x, y) => `<g class="tr-ink">${[-6, -3, 0, 3, 6].map((d, i) => `<path d="M${x + d} ${y} q${d * .3} -8 ${d * .8} -${12 + (i % 2) * 5}"/>`).join("")}</g>`,
    oak: (x, y, s = 1) => `<path class="stem" stroke-width="${2 * s}" d="M${x} ${y} L${x} ${y - 9 * s}"/><circle class="lf" cx="${x - 5 * s}" cy="${y - 15 * s}" r="${7 * s}"/><circle class="lf" cx="${x + 5 * s}" cy="${y - 15 * s}" r="${7 * s}"/><circle class="lf2" cx="${x}" cy="${y - 21 * s}" r="${7 * s}"/>`,
    cypress: (x, y) => `<path class="tr-cypress" d="M${x} ${y - 34} C${x + 6} ${y - 22} ${x + 5} ${y - 6} ${x} ${y} C${x - 5} ${y - 6} ${x - 6} ${y - 22} ${x} ${y - 34}Z"/>`,
    beech: (x, y) => `<path class="stem" stroke-width="2" d="M${x} ${y} L${x} ${y - 10}"/><ellipse class="lf2" cx="${x}" cy="${y - 20}" rx="11" ry="12"/><path class="vein" d="M${x - 5} ${y - 22} q5 -4 10 0"/>`,
    fir: (x, y, s = 1) => `<path class="stem" stroke-width="1.6" d="M${x} ${y} L${x} ${y - 4}"/><path class="lf" d="M${x} ${y - 34 * s} L${x + 7 * s} ${y - 20 * s} L${x + 4 * s} ${y - 20 * s} L${x + 10 * s} ${y - 9 * s} L${x + 6 * s} ${y - 9 * s} L${x + 12 * s} ${y - 3} L${x - 12 * s} ${y - 3} L${x - 6 * s} ${y - 9 * s} L${x - 10 * s} ${y - 9 * s} L${x - 4 * s} ${y - 20 * s} L${x - 7 * s} ${y - 20 * s}Z"/>`,
    rock: (x, y, w = 14) => `<path class="tr-rock" d="M${x - w} ${y + 1} L${x - w * .6} ${y - w * .7} L${x} ${y - w * .9} L${x + w * .7} ${y - w * .5} L${x + w} ${y + 1}Z"/>`,
    dot: (x, y, cls, r = 2.6) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`,
    snow: (x, y) => `<path class="tr-snow" d="M${x} ${y} L${x + 13} ${y + 13} L${x + 8} ${y + 11} L${x + 4} ${y + 15} L${x} ${y + 10} L${x - 5} ${y + 15} L${x - 9} ${y + 11} L${x - 14} ${y + 13}Z"/>`,
    lily: (x, y, s = 1) => `<path class="tr-ink" d="M${x} ${y} q-1 ${-8 * s} 0 ${-14 * s}"/>${[0, 60, 120, 180, 240, 300].map(a => `<ellipse class="petal" cx="${x}" cy="${R(y - 14 * s - 5 * s)}" rx="${1.6 * s}" ry="${5 * s}" transform="rotate(${a} ${x} ${R(y - 14 * s)})"/>`).join("")}<circle class="yel" cx="${x}" cy="${R(y - 14 * s)}" r="${1.6 * s}"/>`,
    bird: (x, y) => `<path class="tr-bird" d="M${x - 6} ${y} q3 -3 6 0 q3 -3 6 0"/>`
  };
  const TR_SCALE = 1.35;
  const on = (fn, x, ...a) => { const y = R(trY(x)); return `<g transform="translate(${x} ${y}) scale(${TR_SCALE}) translate(${-x} ${-y})">${TR[fn](x, y, ...a)}</g>`; };

  C.transect = (opts = {}) => {
    const W = 1200, H = 300, tints = ["band-1", "band-2", "band-3", "band-4", "band-5"];
    let s = `<svg class="tr-art" viewBox="0 0 ${W} ${H}" role="group" aria-label="${F.esc(t("journey.title"))}">`;
    /* cielo: sole, uccelli e montagne lontane */
    s += `<circle class="tr-sun" cx="150" cy="70" r="26"/>` + TR.bird(300, 60) + TR.bird(322, 72) + TR.bird(345, 56);
    s += `<path class="tr-far" d="M560 ${H} L560 200 L640 150 L700 168 L780 104 L850 132 L930 58 L990 88 L1060 20 L1110 54 L1160 14 L1200 30 L1200 ${H}Z"/>`;
    /* fasce di terreno cliccabili */
    TR_BANDS.forEach(([id, a, b], i) => {
      let d = `M${a} ${H}`; for (let x = a; x <= b; x += 5) d += ` L${x} ${R(trY(x))}`; d += ` L${b} ${H}Z`;
      s += `<a class="band" href="#fascia-${id}" data-belt="${id}" aria-label="${F.esc(F.name(F.belt(id).name))}"><path class="${tints[i]}" d="${d}"/></a>`;
    });
    /* linee di contorno parallele al profilo, a tratteggio come in un'incisione */
    let c = "";
    [16, 34, 54].forEach((dy, k) => {
      let d = ""; for (let x = 104; x <= W; x += 6) d += `${d ? " L" : "M"}${x} ${R(trY(x) + dy)}`;
      c += `<path class="tr-contour" style="opacity:${.32 - k * .08}" d="${d}"/>`;
    });
    s += `<g aria-hidden="true">${c}</g>`;
    /* mare con onde e spiaggia */
    s += `<path class="tr-water" d="M0 240 L96 240 Q104 252 112 ${H} L0 ${H}Z"/>`;
    s += [252, 266, 280].map((y, i) => `<path class="tr-wave" d="M${8 + i * 6} ${y} q8 -4 16 0 t16 0 t16 0 t16 0"/>`).join("");
    s += `<path class="tr-sand" d="M92 240 Q110 236 130 ${R(trY(130))} Q150 ${R(trY(150) - 4)} 168 ${R(trY(168))} L168 248 Q130 252 104 252Z"/>`;
    /* vegetazione per fascia, dal mare alla vetta */
    let v = "";
    v += on("lily", 112, .9) + on("lily", 122, .8) + on("palm", 140) + on("bush", 160, 5) + on("stonePine", 186) + on("bush", 206, 6) + on("palm", 218);
    v += `<path class="tr-water" d="M305 ${R(trY(305) + 1)} q32 7 72 0 q-34 11 -72 0Z"/>` + on("reeds", 298) + on("reeds", 384);
    v += on("poplar", 250) + on("poplar", 268) + on("oak", 290, .9) + on("poplar", 400) + on("oak", 425, .9);
    v += on("oak", 478) + on("cypress", 515) + on("oak", 560, 1.1) + on("cypress", 600) + on("cypress", 612) + on("oak", 650);
    v += on("beech", 700) + on("beech", 728) + on("beech", 760) + on("fir", 800) + on("fir", 830, 1.1) + on("fir", 862) + on("fir", 892, .9) + on("fir", 915, .8);
    v += on("bush", 948, 4) + on("dot", 948, "pink") + on("rock", 985, 12) + on("bush", 1020, 4) + on("rock", 1075, 16) + on("rock", 1150, 12);
    [962, 1000, 1030].forEach(x => v += TR.dot(x, R(trY(x) - 3), "pink", 2.4));
    [1012, 1102, 1182].forEach(x => v += TR.dot(x, R(trY(x) - 3), "petal", 2.4));
    v += TR.snow(1050, 42) + TR.snow(1132, 26) + TR.snow(968, 72);
    s += `<g class="tr-veg" aria-hidden="true">${v}</g></svg>`;

    const stations = TR_BANDS.map(([id]) => {
      const belt = F.belt(id), list = F.species.filter(sp => sp.belts.includes(id));
      const names = opts.full && list.length ? `<ul class="st-species">${list.map(sp => `<li><a href="#specie-${sp.id}">${F.esc(F.commonName(sp).value)}</a></li>`).join("")}</ul>` : "";
      return `<li class="station" data-belt="${id}"><a class="st-link" href="#fascia-${id}"><span class="label">${F.esc(F.name(belt.technical))} · ${t("quick.count", { n: list.length })}</span><h3>${F.esc(F.name(belt.label))}</h3><p>${F.name(belt.altitude)}</p></a>${names}</li>`;
    }).join("");
    return s + `<ol class="stations${opts.full ? " full" : ""}" style="--cols:${TR_BANDS.map(([, a, b]) => `${b - a}fr`).join(" ")}">${stations}</ol>`;
  };

  /* Vignette disegnate dei percorsi per habitat */
  C.habitatVignette = id => {
    const g = 92, ground = `<path class="band-2" d="M0 ${g} Q50 ${g - 6} 100 ${g} T200 ${g} L200 120 L0 120Z"/>`;
    const art = {
      boschi: ground + TR.beech(30, g - 1) + TR.fir(62, g - 3, 1.2) + TR.oak(100, g, 1.3) + TR.fir(135, g - 3, 1.4) + TR.beech(170, g - 1) + TR.bush(118, g + 2, 4),
      prati: `<path class="band-2" d="M0 80 Q100 70 200 82 L200 120 L0 120Z"/>` + Array.from({ length: 26 }, (_, i) => `<path class="tr-ink" d="M${6 + i * 7.5} ${84 - (i % 3)} l${(i % 2) * 2 - 1} -${8 + (i % 4) * 2}"/>`).join("") + [[22, 70, "tr-poppy"], [48, 66, "yel"], [70, 72, "tr-poppy"], [96, 64, "petal"], [118, 70, "tr-poppy"], [142, 66, "yel"], [165, 71, "tr-poppy"], [186, 67, "petal"]].map(([x, y, c]) => TR.dot(x, y, c, 4)).join(""),
      "zone-umide": `<path class="band-2" d="M0 76 L200 76 L200 120 L0 120Z"/><path class="tr-water" d="M20 96 Q100 80 180 96 Q100 112 20 96Z"/>` + [[30, 86], [58, 82], [150, 82], [176, 86]].map(([x, y]) => TR.reeds(x, y)).join("") + TR.dot(62, 64, "yel", 4.5) + TR.dot(152, 64, "yel", 4.5) + `<path class="tr-wave" d="M70 98 q10 -3 20 0 t20 0 t20 0"/>`,
      rocciosi: `<path class="band-5" d="M0 120 L0 70 L40 40 L70 58 L110 22 L150 52 L180 38 L200 50 L200 120Z"/>` + TR.rock(50, 92, 22) + TR.rock(140, 96, 26) + TR.snow(110, 22) + TR.bush(92, 100, 5) + TR.dot(80, 86, "petal", 3) + TR.dot(160, 66, "pink", 3) + TR.palm(176, 104),
      dune: `<path class="tr-water" d="M0 52 L200 52 L200 70 L0 70Z"/><path class="tr-wave" d="M10 60 q10 -3 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"/><path class="tr-sand" d="M0 120 L0 80 Q50 64 100 78 T200 74 L200 120Z"/>` + TR.palm(30, 84) + TR.lily(70, 90, 1.5) + TR.lily(92, 86, 1.2) + TR.lily(148, 88, 1.5) + TR.bush(178, 90, 4)
    }[id];
    return art ? `<svg class="hab-art" viewBox="0 0 200 120" aria-hidden="true" focusable="false">${art}</svg>` : "";
  };

  C.habitatRoutes = () => `<div class="hab-routes">${F.habitats.filter(h => h.route).map(h => {
    const n = F.species.filter(s => s.habitats.includes(h.id)).length;
    const art = C.habitatVignette(h.id);
    return `<a class="hab-route${art ? " has-art" : ""}" href="#habitat-${h.id}">${art ? `<span class="hab-img">${art}</span>` : ""}<span class="label">${t("quick.count", { n })}</span><h3>${F.name(h.name)}</h3><p>${F.name(h.text)}</p></a>`;
  }).join("")}</div>`;

  C.routeList = (full) => `<div class="percorsi">${F.routes.map(r => {
    const n = F.species.filter(s => s.routes.includes(r.id)).length, txt = F.name(r.text);
    return `<a class="percorso" href="#percorso-${r.id}"><span class="n">${t("quick.count", { n })}</span><h3>${F.name(r.name)}</h3><p>${full ? txt : txt.split(".")[0] + "."}</p></a>`;
  }).join("")}</div>`;

  C.monthCalendar = months => `<div class="calendar" role="img" aria-label="${F.esc(t("sp.flowering"))}: ${months.map(m => t("months")[m - 1]).join(", ")}">${t("months.short").map((m, i) => `<div class="${months.includes(i + 1) ? "on" : ""}${F.currentMonth() === i + 1 ? " now" : ""}">${m}</div>`).join("")}</div>`;
})();
