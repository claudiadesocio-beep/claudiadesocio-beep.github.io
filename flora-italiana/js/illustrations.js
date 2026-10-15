/* Flora Italiana — tavole botaniche schematiche in SVG.
   Sono illustrazioni disegnate in codice, non fotografie: servono da immagine di riserva
   quando il file in public/images/ manca o non è ancora pronto. I colori vengono dai token CSS. */
window.FLORA = window.FLORA || {};
(function () {
  const P = n => Math.round(n * 10) / 10;

  function leafPath(shape, L, W) {
    if (shape === "ovate") return `M0 0 C${W} ${-L * .15} ${W * .95} ${-L * .75} 0 ${-L} C${-W * .95} ${-L * .75} ${-W} ${-L * .15} 0 0Z`;
    if (shape === "lanceolate") return `M0 0 C${W} ${-L * .25} ${W * .7} ${-L * .8} 0 ${-L} C${-W * .7} ${-L * .8} ${-W} ${-L * .25} 0 0Z`;
    if (shape === "lobed") {
      const N = 48, R = [], Lf = [];
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const env = W * Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.05)), .7) * (0.55 + 0.45 * t);
        const lobe = .58 + .42 * Math.abs(Math.cos(t * Math.PI * 4.5));
        const x = P(env * lobe);
        R.push(`${x} ${P(-L * t)}`); Lf.unshift(`${-x} ${P(-L * t)}`);
      }
      return "M0 0 L" + R.join(" L") + " L" + Lf.join(" L") + "Z";
    }
    return "";
  }

  function leafG(shape, L, W, x, y, a, cls = "lf") {
    if (shape === "pinnate") {
      let s = `<g transform="translate(${P(x)} ${P(y)}) rotate(${P(a)})"><path class="stem" stroke-width="1" d="M0 0 L0 ${-L}"/>`;
      for (let i = 0; i < 5; i++) {
        const yy = -L * (.22 + i * .16);
        s += `<path class="${cls}" transform="translate(0 ${P(yy)}) rotate(70)" d="${leafPath("ovate", W * 1.3, W * .5)}"/><path class="${cls}" transform="translate(0 ${P(yy)}) rotate(-70)" d="${leafPath("ovate", W * 1.3, W * .5)}"/>`;
      }
      return s + `<path class="${cls}" transform="translate(0 ${-L})" d="${leafPath("ovate", W * 1.3, W * .5)}"/></g>`;
    }
    return `<g transform="translate(${P(x)} ${P(y)}) rotate(${P(a)})"><path class="${cls}" d="${leafPath(shape, L, W)}"/><path class="vein" d="M0 0 L0 ${P(-L * .93)}"/></g>`;
  }

  function glyph(kind, x, y, s = 1) {
    const g = c => `<g transform="translate(${P(x)} ${P(y)}) scale(${s})">${c}</g>`;
    let c = "";
    switch (kind) {
      case "amento": c = `<path class="stem" stroke-width="1" d="M0 0 C3 10 -3 22 1 34"/>`; for (let i = 0; i < 8; i++) c += `<circle class="yel" cx="${P(Math.sin(i) * 1.5)}" cy="${6 + i * 3.6}" r="2.2"/>`; return g(c);
      case "myrtle": for (let i = 0; i < 5; i++) c += `<ellipse class="petal" rx="5" ry="8" transform="rotate(${i * 72}) translate(0 -7)"/>`;
        for (let i = 0; i < 24; i++) { const a = i * 15 * Math.PI / 180; c += `<line class="stamen" x1="0" y1="0" x2="${P(Math.cos(a) * 10)}" y2="${P(Math.sin(a) * 10)}"/>`; }
        return g(c + `<circle class="yel" r="2"/>`);
      case "raceme": c = `<path class="stem" stroke-width="1" d="M0 0 C4 15 2 35 6 52"/>`; for (let i = 0; i < 9; i++) { const yy = 6 + i * 5.2, xx = P(Math.sin(i * .6) * 3 + i * .5); c += `<path class="petal" d="M${xx - 5} ${yy} q5 -6 10 0 q-5 6 -10 0Z"/>`; } return g(c);
      case "rhodo": for (let i = 0; i < 6; i++) c += `<g transform="rotate(${-75 + i * 30}) translate(0 -6)"><path class="pink" d="M0 0 L-5 -14 Q0 -18 5 -14Z"/></g>`; return g(c);
      case "opuntia": return g(`<path class="yel" d="M-9 0 Q-12 -14 -4 -16 Q0 -20 4 -16 Q12 -14 9 0Z"/><path class="vein" d="M-4 -2 L-3 -13 M0 -2 L0 -15 M4 -2 L3 -13"/>`);
      case "palmflower": c = `<path class="stem" stroke-width="1.4" d="M0 0 L0 -14"/>`; for (let i = 0; i < 14; i++) c += `<circle class="yel" cx="${P(Math.cos(i * 2.4) * 6)}" cy="${P(-16 - Math.sin(i * 2.4) * 5 - i * .3)}" r="2.3"/>`; return g(c);
      case "edelweiss": for (let i = 0; i < 9; i++) c += `<ellipse class="wool" rx="4" ry="11" transform="rotate(${i * 40}) translate(0 -11)"/>`;
        for (let i = 0; i < 6; i++) c += `<circle class="lf2" cx="${P(Math.cos(i) * 4)}" cy="${P(Math.sin(i) * 4)}" r="2.6"/>`;
        return g(c + `<circle class="wool" r="3"/>`);
      case "poppy": for (let i = 0; i < 4; i++) c += `<path class="red" transform="rotate(${i * 90 + 20})" d="M0 0 C10 -3 16 -12 12 -19 C6 -25 -6 -25 -12 -19 C-16 -12 -10 -3 0 0Z"/>`;
        for (let i = 0; i < 4; i++) c += `<ellipse class="dark" rx="2.4" ry="4" transform="rotate(${i * 90 + 20}) translate(0 -5)"/>`;
        return g(c + `<circle class="lf2" r="3.6"/><path class="vein" d="M-3 0 L3 0 M0 -3 L0 3 M-2 -2 L2 2 M-2 2 L2 -2"/>`);
      case "gentian": return g(`<path class="blue" d="M-5 0 C-6 -10 -8 -22 -13 -32 Q-7 -36 -4 -31 Q0 -38 4 -31 Q7 -36 13 -32 C8 -22 6 -10 5 0Z"/><path class="vein" style="stroke:var(--petal)" d="M-2 -6 L-5 -28 M2 -6 L5 -28"/><circle class="lf2" cx="-3" cy="-24" r="1.2"/><circle class="lf2" cx="3" cy="-25" r="1.2"/><circle class="lf2" cx="0" cy="-20" r="1"/><path class="lf" d="M-5 0 L-6 4 L6 4 L5 0Z"/>`);
      case "primula": for (let i = 0; i < 5; i++) c += `<path class="pale" transform="rotate(${i * 72})" d="M0 -2 C5 -4 8 -10 6 -14 C4 -15 2 -13 0 -12 C-2 -13 -4 -15 -6 -14 C-8 -10 -5 -4 0 -2Z"/>`;
        return g(c + `<circle class="yel" r="3.4"/><circle class="lf2" r="1.2"/>`);
      case "lavender": c = `<path class="stem" stroke-width="1" style="stroke:var(--leaf-ink)" d="M0 0 L0 -14"/>`;
        for (let i = 0; i < 6; i++) c += `<ellipse class="violet-dark" cx="${i % 2 ? 2 : -2}" cy="${-17 - i * 3.6}" rx="3.4" ry="2.6"/>`;
        c += `<path class="violet" d="M0 -37 C-6 -44 -9 -52 -6 -56 C-3 -52 -1 -45 0 -37Z"/><path class="violet" d="M0 -37 C5 -45 9 -51 7 -56 C3 -52 1 -45 0 -37Z"/><path class="violet" d="M0 -37 C-1 -45 0 -52 1 -57 C3 -51 2 -44 0 -37Z"/>`;
        return g(c);
      case "pancratium": for (let i = 0; i < 6; i++) c += `<path class="petal" transform="rotate(${i * 60})" d="M0 -4 C3 -10 2 -20 0 -24 C-2 -20 -3 -10 0 -4Z"/>`;
        c += `<path class="petal" d="M-7 -2 L-8 -9 L-5 -7 L-3 -10 L0 -7 L3 -10 L5 -7 L8 -9 L7 -2 Q0 4 -7 -2Z"/>`;
        for (let i = 0; i < 6; i++) { const a = (i * 60 + 30) * Math.PI / 180; c += `<line class="stamen" x1="0" y1="0" x2="${P(Math.cos(a) * 10)}" y2="${P(Math.sin(a) * 10)}"/>`; }
        return g(c);
      case "iris": return g(`<path class="yel" d="M0 0 C-4 -10 -4 -22 0 -30 C4 -22 4 -10 0 0Z"/><path class="yel" d="M0 0 C-6 -6 -14 -14 -15 -22 C-10 -20 -4 -12 0 0Z"/><path class="yel" d="M0 0 C6 -6 14 -14 15 -22 C10 -20 4 -12 0 0Z"/><path class="yel" d="M0 -2 C-8 2 -18 10 -20 20 C-14 18 -6 10 0 -2Z"/><path class="yel" d="M0 -2 C8 2 18 10 20 20 C14 18 6 10 0 -2Z"/><path class="vein" style="stroke:var(--bruno)" d="M-4 4 L-13 15 M4 4 L13 15 M-6 3 L-16 12 M6 3 L16 12"/><path class="lf" d="M-2 0 L-3 10 L3 10 L2 0Z"/>`);
      case "capsule": return g(`<path class="lf2" d="M-7 0 C-10 -8 -9 -18 -6 -22 L6 -22 C9 -18 10 -8 7 0Z"/><ellipse class="lf" cx="0" cy="-23" rx="8" ry="2.6"/><path class="vein" d="M-6 -23 L6 -23 M0 -25 L0 -21 M-4 -25 L4 -21 M4 -25 L-4 -21"/>`);
      case "acorn": return g(`<path class="stem" stroke-width="1" d="M0 0 L0 4"/><ellipse class="brown" cx="0" cy="17" rx="6" ry="11"/><path class="lf2" d="M-7 10 Q0 2 7 10 L6 14 Q0 11 -6 14Z"/>`);
      case "acorn-long": return g(`<path class="stem" stroke-width="1.1" d="M0 0 C2 10 -1 20 0 28"/><ellipse class="brown" cx="0" cy="40" rx="6.5" ry="10"/><path class="lf2" d="M-7.5 34 Q0 26 7.5 34 L6.5 37 Q0 34 -6.5 37Z"/>`);
      case "berry": return g(`<path class="stem" stroke-width="1" d="M0 0 L0 6"/><circle class="berry" cx="0" cy="13" r="7"/><path class="vein" d="M-2 6 l2 2 l2 -2"/>`);
      case "beechnut": c = `<path class="stem" stroke-width="1" d="M0 0 L0 6"/><path class="brown" d="M-9 8 Q0 34 9 8 Q0 2 -9 8Z"/>`; for (let i = 0; i < 10; i++) c += `<line class="spine" x1="${-7 + i * 1.5}" y1="${12 + (i % 3) * 4}" x2="${-9 + i * 1.6}" y2="${14 + (i % 3) * 4}"/>`; return g(c);
      case "legume": return g(`<path class="stem" stroke-width="1" d="M0 0 L0 6"/><path class="brown" d="M0 6 C6 20 4 50 -2 66 C-8 50 -6 20 0 6Z"/><path class="vein" d="M0 10 L-1 62"/>`);
      case "prickly": c = `<ellipse class="terra" cx="0" cy="-10" rx="8" ry="11"/>`; for (let i = 0; i < 9; i++) c += `<circle class="yel" cx="${P(Math.cos(i * 2.2) * 5)}" cy="${P(-10 + Math.sin(i * 2.2) * 7)}" r=".9"/>`; return g(c);
      case "drupe": for (let i = 0; i < 5; i++) c += `<ellipse class="terra" cx="${(i - 2) * 7}" cy="${P(8 + Math.abs(i - 2) * 3)}" rx="4" ry="5.5"/>`; return g(c);
      case "cone": c = `<ellipse class="brown" cx="0" cy="0" rx="12" ry="18"/>`; for (let i = -3; i <= 3; i++) c += `<path class="scale" d="M-11 ${i * 5} Q0 ${i * 5 + 5} 11 ${i * 5}"/>`; return g(c);
      case "cone-up": c = `<rect class="brown" x="-8" y="-34" width="16" height="34" rx="8"/>`; for (let i = 0; i < 6; i++) c += `<path class="scale" d="M-8 ${-6 - i * 5} Q0 ${-2 - i * 5} 8 ${-6 - i * 5}"/>`; return g(c);
    }
    return "";
  }

  function habitSVG(kind, flower) {
    const gr = `<path class="ground" d="M10 186 L190 186"/>`;
    let c = "";
    switch (kind) {
      case "tree-round": c = `<path class="stem" stroke-width="7" d="M100 186 L100 120 M100 135 L80 112 M100 128 L122 108"/><path class="lf" d="M40 110 C30 60 70 30 100 34 C135 30 170 60 160 108 C150 132 120 128 100 124 C80 130 48 134 40 110Z"/>`; break;
      case "tree-oval": c = `<path class="stem" stroke-width="7" d="M100 186 L100 110"/><path class="lf" d="M58 120 C40 70 70 20 100 18 C132 20 160 70 142 120 C130 140 70 140 58 120Z"/>`; break;
      case "conifer": c = `<path class="stem" stroke-width="6" d="M100 186 L100 150"/>`; for (let i = 0; i < 6; i++) { const y = 40 + i * 20, w = 16 + i * 12; c += `<path class="lf" d="M100 ${y - 26} L${100 + w} ${y + 16} L${100 - w} ${y + 16}Z"/>`; } break;
      case "conifer-wind": c = `<path class="stem" stroke-width="7" d="M96 186 C96 150 92 120 104 92 C112 74 106 56 112 40"/><path class="lf" d="M100 100 C120 92 160 96 172 108 C150 114 120 112 100 106Z"/><path class="lf" d="M106 72 C126 64 158 66 166 76 C146 82 120 80 106 78Z"/><path class="lf" d="M108 48 C122 38 146 40 152 48 C138 54 120 54 108 52Z"/><path class="lf" d="M94 132 C78 128 56 134 48 142 C66 146 84 142 94 138Z"/>`; break;
      case "shrub": c = `<path class="lf" d="M36 186 C24 150 50 110 80 116 C92 92 128 92 136 116 C166 112 182 152 166 186Z"/><path class="stem" stroke-width="2" d="M100 186 L96 150 M100 186 L116 156 M100 186 L78 160"/>`; break;
      case "shrub-low": c = `<path class="lf" d="M20 186 C16 160 40 146 64 152 C76 136 120 134 134 150 C162 144 186 162 180 186Z"/>`; for (let i = 0; i < 7; i++) c += `<circle class="pink" cx="${40 + i * 20}" cy="${152 - (i % 2) * 8}" r="5"/>`; break;
      case "shrub-lav": c = `<path class="lf2" d="M34 186 C26 160 50 138 76 144 C90 128 120 128 130 144 C156 140 176 160 168 186Z"/>`; for (let i = 0; i < 6; i++) c += glyph("lavender", 52 + i * 19, 150 - (i % 2) * 8, .75); break;
      case "palm": for (let i = 0; i < 7; i++) { const a = -70 + i * 23, r = Math.PI * a / 180, x = P(100 + Math.sin(r) * 72), y = P(176 - Math.cos(r) * 80); c += `<path class="stem" stroke-width="1.6" d="M100 184 L${x} ${y}"/><g transform="translate(${x} ${y}) rotate(${a})">`; for (let k = -4; k <= 4; k++) c += `<path class="lf" d="M0 0 L${k * 5} -22 L${k * 5 + 2} -22Z" stroke-width="1.5"/>`; c += `</g>`; } break;
      case "cactus": c = `<ellipse class="lf" cx="100" cy="160" rx="22" ry="28"/><ellipse class="lf" cx="80" cy="118" rx="18" ry="24" transform="rotate(-20 80 118)"/><ellipse class="lf" cx="124" cy="112" rx="18" ry="25" transform="rotate(18 124 112)"/><ellipse class="lf" cx="132" cy="70" rx="14" ry="20" transform="rotate(10 132 70)"/><ellipse class="lf" cx="70" cy="80" rx="13" ry="18" transform="rotate(-25 70 80)"/>` + glyph("prickly", 132, 52, .8) + glyph("prickly", 64, 64, .7); break;
      case "herb": {
        const f = flower || "edelweiss";
        c = `<path class="ground" d="M30 186 L60 176 L90 182 L130 170 L170 180" style="stroke-dasharray:none"/>`;
        const tall = ["poppy", "iris", "pancratium", "edelweiss"].includes(f);
        const pts = tall ? [[80, 110], [104, 86], [128, 116]] : [[84, 150], [104, 140], [124, 152]];
        pts.forEach(([x, y]) => { c += `<path class="stem" stroke-width="1.5" d="M104 182 Q${(x + 104) / 2} ${(y + 182) / 2 + 6} ${x} ${y}"/>`; });
        for (let i = 0; i < 5; i++) c += leafG(f === "iris" ? "lanceolate" : "lanceolate", f === "iris" ? 80 : 34, f === "iris" ? 6 : 6, 104, 182, -60 + i * 30, "lf2");
        pts.forEach(([x, y]) => { c += glyph(f, x, y, f === "gentian" ? 1.3 : 1.1); });
        break;
      }
    }
    return `<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">${c}${gr}</svg>`;
  }

  function plateBody(sp) {
    const p = sp.plate; let c = "";
    if (p.type === "branch") {
      const x0 = 150, y0 = 392, cx = 120, cy = 210, x1 = 165, y1 = 40;
      c += `<path class="stem" stroke-width="3" d="M${x0} ${y0} Q${cx} ${cy} ${x1} ${y1}"/>`;
      const pt = t => ({ x: (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1, y: (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y1 });
      for (let i = 0; i < p.n; i++) {
        const t = .14 + i * (.8 / p.n), q = pt(t), side = p.opp ? 1 : (i % 2 ? 1 : -1);
        const ang = side * (40 + 10 * Math.sin(i)) - 6, scale = .75 + .35 * Math.sin(Math.PI * t);
        c += leafG(p.leaf, p.L * scale, p.W * scale, q.x, q.y, ang, i % 3 === 2 ? "lf2" : "lf");
        if (p.opp) c += leafG(p.leaf, p.L * scale, p.W * scale, q.x, q.y, -ang - 12, "lf");
      }
      const top = pt(.96);
      if (p.flower === "amento") c += glyph("amento", pt(.55).x + 4, pt(.55).y, 1) + glyph("amento", pt(.62).x + 2, pt(.62).y, 1);
      else if (p.flower === "raceme") c += glyph("raceme", pt(.45).x, pt(.45).y, 1.2) + glyph("raceme", pt(.75).x, pt(.75).y, 1);
      else if (p.flower) c += glyph(p.flower, top.x, top.y, p.flower === "rhodo" ? 1.4 : 1.1);
      if (p.fruit === "acorn") c += glyph("acorn", pt(.3).x - 6, pt(.3).y, 1.1) + glyph("acorn", pt(.3).x + 8, pt(.3).y + 2, 1);
      else if (p.fruit === "acorn-long") c += glyph("acorn-long", pt(.3).x, pt(.3).y, 1);
      else if (p.fruit === "berry") c += glyph("berry", pt(.35).x, pt(.35).y, 1) + glyph("berry", pt(.5).x, pt(.5).y, .9);
      else if (p.fruit === "beechnut") c += glyph("beechnut", pt(.35).x, pt(.35).y, 1.1);
      else if (p.fruit === "legume") c += glyph("legume", pt(.25).x, pt(.25).y, 1);
    } else if (p.type === "needle") {
      c += `<path class="stem" stroke-width="4" d="M60 392 C110 300 150 220 200 60"/><path class="stem" stroke-width="2.5" d="M128 250 C90 210 70 180 60 140 M168 160 C200 140 230 130 250 120"/>`;
      const pts = [[96, 320], [118, 270], [140, 220], [160, 170], [178, 120], [194, 80], [96, 215], [74, 175], [62, 148], [196, 148], [224, 132], [246, 121]];
      pts.forEach(([x, y], k) => {
        const n = p.fir ? 14 : 18;
        for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + k, len = p.fir ? 14 : 30; c += `<line class="needle" x1="${x}" y1="${y}" x2="${P(x + Math.cos(a) * len * (p.fir ? 1 : .9))}" y2="${P(y + Math.sin(a) * len * (p.fir ? .6 : 1) - (p.fir ? 0 : 6))}"/>`; }
      });
      c += p.fruit === "cone-up" ? glyph("cone-up", 150, 214, 1.3) + glyph("cone-up", 184, 126, 1.1) : glyph("cone", 112, 300, 1.3) + glyph("cone", 220, 150, 1);
    } else if (p.type === "fan") {
      for (let i = 0; i < 5; i++) {
        const a = -55 + i * 27, r = Math.PI * a / 180, x = P(150 + Math.sin(r) * 170), y = P(380 - Math.cos(r) * 230);
        c += `<path class="stem" stroke-width="2.2" d="M150 384 L${x} ${y}"/>`;
        for (let s = 0; s < 6; s++) c += `<line class="spine" x1="${P(150 + (x - 150) * (.15 + s * .1))}" y1="${P(384 + (y - 384) * (.15 + s * .1))}" x2="${P(150 + (x - 150) * (.15 + s * .1) + 5)}" y2="${P(384 + (y - 384) * (.15 + s * .1) - 3)}"/>`;
        c += `<g transform="translate(${x} ${y}) rotate(${a})">`; for (let k = -6; k <= 6; k++) c += `<path class="${k % 2 ? "lf" : "lf2"}" d="M0 0 L${k * 7} -70 L${k * 7 + 3} -70Z"/>`; c += "</g>";
      }
      c += glyph("palmflower", 134, 372, 1.6) + glyph("drupe", 178, 368, 1.1);
    } else if (p.type === "cladode") {
      const pads = [[150, 330, 40, 58, 0], [110, 236, 34, 48, -18], [190, 230, 34, 50, 16], [86, 150, 28, 40, -28], [208, 146, 28, 42, 22], [150, 160, 26, 38, 4]];
      pads.forEach(([x, y, rx, ry, a], k) => {
        c += `<ellipse class="${k % 2 ? "lf2" : "lf"}" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${x} ${y})"/>`;
        for (let i = 0; i < 9; i++) { const xx = P(x + Math.cos(i * 2.1 + k) * rx * .6), yy = P(y + Math.sin(i * 2.1 + k) * ry * .6); c += `<circle class="yel" cx="${xx}" cy="${yy}" r="1.3"/><path class="vein" d="M${xx} ${yy} l3 -3 M${xx} ${yy} l-3 -2"/>`; }
      });
      c += glyph("opuntia", 200, 100, 1.4) + glyph("opuntia", 72, 112, 1.2) + glyph("prickly", 150, 124, 1.2) + glyph("prickly", 226, 104, 1) + glyph("prickly", 96, 112, 1);
    } else if (p.type === "rosette") {
      p.stems.forEach(([x, y]) => { c += `<path class="stem stem-green" stroke-width="2.2" d="M${P(150 + (x - 150) * .3)} 382 Q${P((x + 150) / 2)} ${P((y + 382) / 2)} ${x} ${y}"/>`; });
      const spread = p.spread || 75;
      for (let i = 0; i < p.leaves; i++) { const a = -spread + i * (2 * spread / (p.leaves - 1)); c += leafG(p.leaf, p.leafL * (.8 + .2 * Math.cos(a * Math.PI / 180)), p.leafW, 150, 384, a, i % 2 ? "lf" : "lf2"); }
      if (p.flower === "edelweiss") c += leafG("lanceolate", 40, 6, 150, 280, -35, "lf2") + leafG("lanceolate", 40, 6, 150, 230, 32, "lf2");
      p.stems.forEach(([x, y, s]) => { c += glyph(p.flower, x, y, s); });
    } else if (p.type === "herb") {
      p.stems.forEach(([x, y, s], k) => {
        const bx = 150 + (x - 150) * .2;
        c += `<path class="stem stem-green" stroke-width="2" d="M${P(bx)} 392 C${P(bx)} ${P(300)} ${P(x)} ${P(y + 120)} ${x} ${y}"/>`;
        for (let j = 0; j < 4; j++) {
          const t = .2 + j * .17, lx = bx + (x - bx) * t, ly = 392 + (y - 392) * t, side = (j + k) % 2 ? 1 : -1;
          c += leafG(p.leaf, p.leafL * (1 - t * .5), p.leafW * (1 - t * .3), lx, ly, side * 50, j % 2 ? "lf" : "lf2");
        }
      });
      p.stems.forEach(([x, y, s], k) => {
        if (p.fruit === "capsule" && k === p.stems.length - 1) c += glyph("capsule", x, y + 10, s * 1.2);
        else c += glyph(p.flower, x, y, s);
      });
    }
    return c;
  }

  function plateSVG(sp, label) {
    return `<svg viewBox="0 0 300 400" role="img" aria-label="${label}">${plateBody(sp)}</svg>`;
  }

  function partSVG(sp, part) {
    const p = sp.plate; let c = "";
    if (part === "leaves") {
      if (p.type === "branch") c = leafG(p.leaf, p.leaf === "pinnate" ? 150 : 130, p.leaf === "pinnate" ? 22 : (p.W * 130 / p.L), 100, 180, 0, "lf");
      else if (p.type === "needle") {
        for (let i = 0; i < (p.fir ? 9 : 6); i++) c += p.fir
          ? `<rect class="lf" x="${40 + i * 14}" y="50" width="7" height="100" rx="3"/><line class="band-line" x1="${42 + i * 14}" y1="56" x2="${42 + i * 14}" y2="144"/><line class="band-line" x1="${45 + i * 14}" y1="56" x2="${45 + i * 14}" y2="144"/>`
          : `<path class="needle" style="stroke-width:3" d="M${70 + i * 12} 180 Q${80 + i * 10} 100 ${60 + i * 16} 20"/>`;
        if (!p.fir) c += `<path class="brown" d="M64 170 L96 170 L92 188 L68 188Z"/>`;
      }
      else if (p.type === "fan") { c = `<path class="stem" stroke-width="3" d="M100 196 L100 120"/>`; for (let k = -7; k <= 7; k++) c += `<path class="${k % 2 ? "lf" : "lf2"}" d="M100 120 L${100 + k * 11} 14 L${104 + k * 11} 14Z"/>`; }
      else if (p.type === "cladode") { c = `<ellipse class="lf" cx="100" cy="100" rx="58" ry="82"/>`; for (let i = 0; i < 16; i++) { const x = P(100 + Math.cos(i * 2.4) * 40 * (i / 16 + .2)), y = P(100 + Math.sin(i * 2.4) * 60 * (i / 16 + .2)); c += `<circle class="yel" cx="${x}" cy="${y}" r="2"/><path class="vein" d="M${x} ${y} l6 -5 M${x} ${y} l-6 -3"/>`; } }
      else if (p.type === "rosette") { const big = p.leafL > 120; for (let i = 0; i < 5; i++) c += leafG(p.leaf, big ? 175 : 130, big ? Math.min(p.leafW, 12) : p.leafW * 1.3, 100, 192, -40 + i * 20, i % 2 ? "lf" : "lf2"); }
      else if (p.type === "herb") c = leafG(p.leaf, 150, p.leaf === "lobed" ? 40 : 16, 100, 185, 0, "lf");
    } else if (part === "flowers") {
      if (sp.gymnosperm) return null;
      const map = { amento: [100, 40, 3.2], myrtle: [100, 100, 5], raceme: [100, 20, 2.8], rhodo: [100, 130, 4], opuntia: [100, 150, 5.5], palmflower: [100, 190, 4.5], edelweiss: [100, 100, 4], poppy: [100, 100, 3.6], gentian: [100, 180, 4.6], primula: [100, 100, 5.5], lavender: [100, 196, 3.2], pancratium: [100, 100, 3.6], iris: [100, 96, 3.6] };
      const m = map[p.flower]; if (!m) return null; c = glyph(p.flower, m[0], m[1], m[2]);
    } else if (part === "fruits") {
      if (!p.fruit) return null;
      const map = { acorn: [100, 20, 5], "acorn-long": [100, 10, 3.4], berry: [100, 40, 6], beechnut: [100, 30, 4.5], legume: [100, 10, 2.6], prickly: [100, 170, 6.5], drupe: [100, 70, 4], cone: [100, 100, 4.5], "cone-up": [100, 180, 4.4], capsule: [100, 180, 6] };
      const m = map[p.fruit]; c = glyph(p.fruit, m[0], m[1], m[2]);
    } else if (part === "habit") return habitSVG(p.habit, p.habitFlower);
    return `<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">${c}</svg>`;
  }

  /* Tavola della homepage: un prato fiorito composto con i glifi delle specie del catalogo */
  function heroSVG(label) {
    let c = `<path class="ground" d="M0 372 C80 362 160 380 240 368 C320 356 400 378 480 366 L520 366" style="stroke-dasharray:none"/>`;
    for (let i = 0; i < 46; i++) { const x = 8 + i * 11, h = 26 + (i * 37 % 30); c += `<path class="grass" d="M${x} 372 Q${x + (i % 2 ? 6 : -6)} ${372 - h / 2} ${x + (i % 3 - 1) * 8} ${372 - h}"/>`; }
    const items = [
      ["lavender", 52, 230, 2.2, 1], ["lavender", 82, 250, 1.9, 1], ["poppy", 140, 170, 2.6, 1], ["poppy", 205, 215, 2.0, 1],
      ["gentian", 270, 320, 2.6, 0], ["edelweiss", 330, 230, 2.0, 1], ["primula", 395, 312, 2.6, 0], ["iris", 450, 160, 2.2, 1],
      ["myrtle", 110, 300, 2.0, 0], ["primula", 440, 340, 1.8, 0], ["capsule", 236, 272, 2.0, 1]
    ];
    items.forEach(([k, x, y, s, stem]) => { if (stem) c += `<path class="stem stem-green" stroke-width="2" d="M${x + (x % 3 - 1) * 6} 372 Q${x - 8} ${(y + 372) / 2} ${x} ${y + (k === "lavender" ? 0 : 4)}"/>`; });
    [[150, 330, -30], [210, 340, 35], [320, 330, -25], [460, 330, 25], [60, 340, 30]].forEach(([x, y, a]) => { c += leafG("lanceolate", 60, 9, x, y + 40, a, "lf2"); });
    items.forEach(([k, x, y, s]) => { c += glyph(k, x, y, s); });
    return `<svg viewBox="0 0 520 400" role="img" aria-label="${label}">${c}</svg>`;
  }

  FLORA.illus = { plateSVG, partSVG, habitSVG, heroSVG, glyph, leafG };
})();
