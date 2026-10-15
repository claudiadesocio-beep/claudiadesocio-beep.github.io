/* Flora Italiana — vocabolari controllati condivisi da tutte le schede.
   Ogni testo visibile è un oggetto { it, en }: per una nuova lingua basta aggiungere la chiave (es. "de"). */
window.FLORA = window.FLORA || {};

FLORA.meta = {
  version: "0.2.1",
  updated: "2026-10-15",
  // Immagine principale della homepage: impostare status "ready" dopo aver copiato il file.
  hero: {
    file: "public/images/hero/hero-flora-italiana.webp",
    status: "pending",
    ai: true,
    alt: {
      it: "Tavola illustrativa con fiori spontanei italiani",
      en: "Illustrative plate of Italian wild flowers"
    }
  },
  // Homepage: finché l'immagine hero non è pronta si mostra un mosaico di foto delle schede (il primo riquadro è il più grande).
  // Le foto si indicano come { species, part } (part: main | leaves | flowers | fruits | habit): i crediti restano quelli delle schede.
  mosaic: [
    { species: "papaver-rhoeas", part: "main" },
    { species: "leontopodium-nivale-alpinum", part: "main" },
    { species: "gentiana-acaulis", part: "main" },
    { species: "pancratium-maritimum", part: "main" },
    { species: "lavandula-stoechas", part: "main" }
  ],
  quick: {
    catalog: { species: "iris-pseudacorus", part: "flowers" },
    habitats: { species: "pancratium-maritimum", part: "habit" },
    belts: { species: "rhododendron-ferrugineum", part: "habit" },
    regions: { species: "myrtus-communis", part: "habit" }
  }
};

/* Regioni: c = colonna, r = riga nella mappa schematica a riquadri */
FLORA.regions = [
  { id: "vda", ab: "VdA", c: 1, r: 1, name: { it: "Valle d'Aosta", en: "Aosta Valley" } },
  { id: "lom", ab: "Lom", c: 2, r: 1, name: { it: "Lombardia", en: "Lombardy" } },
  { id: "taa", ab: "TAA", c: 3, r: 1, name: { it: "Trentino-Alto Adige", en: "Trentino-South Tyrol" } },
  { id: "ven", ab: "Ven", c: 4, r: 1, name: { it: "Veneto", en: "Veneto" } },
  { id: "fvg", ab: "FVG", c: 5, r: 1, name: { it: "Friuli Venezia Giulia", en: "Friuli Venezia Giulia" } },
  { id: "pie", ab: "Pie", c: 1, r: 2, name: { it: "Piemonte", en: "Piedmont" } },
  { id: "lig", ab: "Lig", c: 2, r: 2, name: { it: "Liguria", en: "Liguria" } },
  { id: "emr", ab: "E-R", c: 3, r: 2, name: { it: "Emilia-Romagna", en: "Emilia-Romagna" } },
  { id: "tos", ab: "Tos", c: 3, r: 3, name: { it: "Toscana", en: "Tuscany" } },
  { id: "umb", ab: "Umb", c: 4, r: 3, name: { it: "Umbria", en: "Umbria" } },
  { id: "mar", ab: "Mar", c: 5, r: 3, name: { it: "Marche", en: "Marche" } },
  { id: "laz", ab: "Laz", c: 4, r: 4, name: { it: "Lazio", en: "Lazio" } },
  { id: "abr", ab: "Abr", c: 5, r: 4, name: { it: "Abruzzo", en: "Abruzzo" } },
  { id: "mol", ab: "Mol", c: 6, r: 4, name: { it: "Molise", en: "Molise" } },
  { id: "sar", ab: "Sar", c: 1, r: 5, name: { it: "Sardegna", en: "Sardinia" } },
  { id: "cam", ab: "Cam", c: 5, r: 5, name: { it: "Campania", en: "Campania" } },
  { id: "pug", ab: "Pug", c: 6, r: 5, name: { it: "Puglia", en: "Apulia" } },
  { id: "bas", ab: "Bas", c: 5, r: 6, name: { it: "Basilicata", en: "Basilicata" } },
  { id: "cal", ab: "Cal", c: 5, r: 7, name: { it: "Calabria", en: "Calabria" } },
  { id: "sic", ab: "Sic", c: 4, r: 8, name: { it: "Sicilia", en: "Sicily" } }
];
FLORA.ALL_REGIONS = FLORA.regions.map(r => r.id);

/* Fasce altimetriche. Nessuna quota fissa: i limiti dipendono da clima, latitudine, esposizione e suolo. */
FLORA.belts = [
  { id: "mediterranea", label: { it: "Costa", en: "Coast" },
    name: { it: "Costa e ambienti mediterranei", en: "Coast and Mediterranean habitats" },
    technical: { it: "Fascia mediterranea", en: "Mediterranean belt" },
    altitude: { it: "Dal livello del mare alle basse colline; il limite superiore tende a salire verso sud.",
                en: "From sea level to the low hills; the upper limit tends to rise towards the south." },
    text: { it: "Estati calde e aride, inverni miti. Leccete, macchia, garighe, rupi e dune costiere: dominano piante sempreverdi a foglie coriacee, adattate alla siccità estiva.",
            en: "Hot, dry summers and mild winters. Holm-oak woods, maquis, garrigue, cliffs and coastal dunes, dominated by evergreen plants with leathery leaves adapted to summer drought." } },
  { id: "planiziale", label: { it: "Pianura", en: "Lowlands" },
    name: { it: "Pianura", en: "Lowlands" },
    technical: { it: "Fascia planiziale", en: "Planar belt" },
    altitude: { it: "Pianure alluvionali e fondovalle.", en: "Alluvial plains and valley floors." },
    text: { it: "Suoli profondi e falda vicina alla superficie. La vegetazione potenziale è il bosco di farnia e carpino bianco, con boschi ripariali e zone umide; oggi in gran parte sostituita da coltivi e centri abitati.",
            en: "Deep soils and a shallow water table. The potential vegetation is oak–hornbeam forest with riparian woods and wetlands, now largely replaced by farmland and towns." } },
  { id: "collinare", label: { it: "Collina", en: "Hills" },
    name: { it: "Collina", en: "Hills" },
    technical: { it: "Fascia collinare", en: "Colline belt" },
    altitude: { it: "Rilievi collinari e bassi versanti; il limite superiore varia con latitudine ed esposizione.",
                en: "Hills and lower slopes; the upper limit varies with latitude and aspect." },
    text: { it: "Querceti caducifogli (roverella, cerro), boschi di carpino nero e orniello, castagneti spesso di origine colturale. È la fascia più modellata dall'agricoltura storica.",
            en: "Deciduous oak woods (downy oak, Turkey oak), hop-hornbeam and manna-ash woods, chestnut groves often of cultivated origin. It is the belt most shaped by historical farming." } },
  { id: "montana", label: { it: "Montagna", en: "Mountains" },
    name: { it: "Montagna", en: "Mountains" },
    technical: { it: "Fascia montana", en: "Montane belt" },
    altitude: { it: "Versanti montani fino al limite del bosco; più in alto al Sud e sui versanti soleggiati.",
                en: "Mountain slopes up to the treeline; higher in the south and on sunny slopes." },
    text: { it: "Sugli Appennini domina il faggio, talvolta con l'abete bianco; sulle Alpi compaiono anche abete rosso e larice. Clima fresco, precipitazioni abbondanti, innevamento invernale.",
            en: "Beech dominates in the Apennines, sometimes with silver fir; in the Alps Norway spruce and larch also appear. Cool climate, abundant rainfall and winter snow cover." } },
  { id: "alpina", label: { it: "Alta montagna", en: "High mountains" },
    name: { it: "Alta montagna e ambienti alpini", en: "High mountains and alpine habitats" },
    technical: { it: "Fascia subalpina e alpina", en: "Subalpine and alpine belt" },
    altitude: { it: "Dal limite superiore del bosco alle vette.", en: "From the treeline to the summits." },
    text: { it: "Arbusteti contorti di rododendri, ginepri e pino mugo, poi praterie, rupi, ghiaioni e vallette nivali. La stagione vegetativa dura pochi mesi.",
            en: "Twisted shrublands of alpenrose, juniper and mountain pine, then grasslands, cliffs, screes and snowbeds. The growing season lasts only a few months." } }
];

/* Habitat. route: true = compare tra i percorsi del "Viaggio botanico" (con una vignetta disegnata in js/components.js) */
FLORA.habitats = [
  { id: "boschi", route: true, name: { it: "Boschi", en: "Woodlands" },
    text: { it: "Dalle leccete costiere alle faggete montane: boschi di latifoglie e di conifere.", en: "From coastal holm-oak woods to montane beech forests: broadleaf and conifer woodlands." } },
  { id: "prati", route: true, name: { it: "Prati e praterie", en: "Meadows and grasslands" },
    text: { it: "Prati da sfalcio, pascoli e praterie d'alta quota, ricchi di specie erbacee in fioritura.", en: "Hay meadows, pastures and high-altitude grasslands, rich in flowering herbs." } },
  { id: "zone-umide", route: true, name: { it: "Zone umide", en: "Wetlands" },
    text: { it: "Sponde di laghi e fiumi, paludi, canali e fossi: ambienti oggi molto ridotti e tutelati.", en: "Lake and river banks, marshes, canals and ditches: habitats now greatly reduced and protected." } },
  { id: "rocciosi", route: true, name: { it: "Ambienti rocciosi", en: "Rocky habitats" },
    text: { it: "Rupi, cenge, pietraie e ghiaioni, dalla costa alle vette.", en: "Cliffs, ledges, rocky slopes and screes, from the coast to the summits." } },
  { id: "dune", route: true, name: { it: "Dune costiere", en: "Coastal dunes" },
    text: { it: "Spiagge e dune sabbiose: ambienti fragili, esposti a vento, sale e calpestio.", en: "Beaches and sand dunes: fragile habitats exposed to wind, salt and trampling." } },
  { id: "macchia", route: false, name: { it: "Macchia e garighe", en: "Maquis and garrigue" },
    text: { it: "Arbusteti sempreverdi mediterranei.", en: "Mediterranean evergreen shrublands." } },
  { id: "arbusteti", route: false, name: { it: "Arbusteti d'altitudine", en: "High-altitude shrublands" },
    text: { it: "Brughiere subalpine oltre il limite del bosco.", en: "Subalpine heaths above the treeline." } },
  { id: "antropici", route: false, name: { it: "Campi, margini e incolti", en: "Fields, verges and waste ground" },
    text: { it: "Ambienti modificati dall'uomo: coltivi, bordi delle strade, scarpate.", en: "Human-modified habitats: crops, roadsides, embankments." } }
];

/* Percorsi geografici */
FLORA.routes = [
  { id: "alpi", name: { it: "Alpi", en: "Alps" },
    text: { it: "Dai boschi montani alle praterie d'alta quota: un arco di oltre mille chilometri, dai massicci cristallini alle Dolomiti calcaree.", en: "From montane forests to high grasslands: an arc of over a thousand kilometres, from crystalline massifs to the limestone Dolomites." } },
  { id: "appennini", name: { it: "Appennini", en: "Apennines" },
    text: { it: "La dorsale della penisola, dalle faggete del Nord ai massicci calcarei del Centro fino al Pollino, con specie relitte e popolazioni isolate.", en: "The backbone of the peninsula, from northern beech forests to the limestone massifs of the centre and Pollino, with relict species and isolated populations." } },
  { id: "padana", name: { it: "Pianura Padana", en: "Po Valley" },
    text: { it: "La pianura più estesa d'Italia. Dei boschi originari restano pochi lembi; molte specie alloctone vi hanno trovato ambienti favorevoli.", en: "Italy's largest plain. Only fragments of the original forests remain; many alien species have found favourable habitats here." } },
  { id: "coste", name: { it: "Coste", en: "Coasts" },
    text: { it: "Dune, scogliere, macchie e leccete costiere: ambienti fragili, esposti al vento salmastro e alla pressione urbanistica.", en: "Dunes, cliffs, maquis and coastal holm-oak woods: fragile habitats exposed to salt winds and urban pressure." } },
  { id: "sardegna", name: { it: "Sardegna", en: "Sardinia" },
    text: { it: "Un'isola antica e isolata, con molti endemismi, vasti territori di macchia e montagne silicee e calcaree.", en: "An ancient, isolated island with many endemics, extensive maquis and both siliceous and limestone mountains." } },
  { id: "sicilia", name: { it: "Sicilia", en: "Sicily" },
    text: { it: "Dalle coste meridionali alle faggete dell'Etna e delle Madonie: ambienti molto diversi e endemismi rarissimi.", en: "From the southern coasts to the beech forests of Etna and the Madonie: very diverse habitats and extremely rare endemics." } }
];

/* Origine. "non-verificata" si usa quando lo status non è stato controllato su una fonte. */
FLORA.origins = {
  "autoctona":      { name: { it: "Autoctona", en: "Native" }, def: { it: "Specie nativa del territorio italiano.", en: "Species native to Italy." } },
  "endemica":       { name: { it: "Endemica", en: "Endemic" }, def: { it: "Autoctona con areale limitato a un territorio circoscritto.", en: "Native species whose range is restricted to a limited area." } },
  "naturalizzata":  { name: { it: "Naturalizzata", en: "Naturalised" }, def: { it: "Alloctona che si riproduce stabilmente in natura senza intervento umano.", en: "Alien species that reproduces steadily in the wild without human help." } },
  "invasiva":       { name: { it: "Aliena invasiva", en: "Invasive alien" }, def: { it: "Alloctona naturalizzata che si diffonde rapidamente e altera gli ecosistemi.", en: "Naturalised alien that spreads rapidly and alters ecosystems." } },
  "non-verificata": { name: { it: "Origine da verificare", en: "Origin to be verified" }, def: { it: "Lo status di origine in Italia non è ancora stato verificato su una fonte.", en: "The origin status in Italy has not yet been checked against a source." } }
};

/* Qualità del dato */
FLORA.quality = {
  "verificato":   { name: { it: "Verificato", en: "Verified" }, def: { it: "Controllato da un revisore sulle fonti citate.", en: "Checked by a reviewer against the cited sources." } },
  "dimostrativo": { name: { it: "Dimostrativo", en: "Demonstrative" }, def: { it: "Testo basato su letteratura botanica corrente, non ancora revisionato.", en: "Text based on current botanical literature, not yet reviewed." } },
  "da-verificare":{ name: { it: "Da verificare", en: "To be verified" }, def: { it: "Dato provvisorio da controllare prima della pubblicazione.", en: "Provisional data to be checked before publication." } }
};

/* Bibliografia: un solo elenco, richiamato per chiave dalle schede */
FLORA.sources = {
  pignatti:  { text: "Pignatti S., Guarino R., La Rosa M. (2017–2019). Flora d'Italia, 2ª ed., 4 voll. Edagricole, Bologna." },
  bartolucci:{ text: "Bartolucci F. et al. (2018). An updated checklist of the vascular flora native to Italy. Plant Biosystems 152(2): 179–303." },
  galasso:   { text: "Galasso G. et al. (2018). An updated checklist of the vascular flora alien to Italy. Plant Biosystems 152(3): 556–592." },
  portale:   { text: "Portale della Flora d'Italia / Portal to the Flora of Italy.", url: "https://dryades.units.it/floritaly/" },
  iucn:      { text: "IUCN Red List of Threatened Species.", url: "https://www.iucnredlist.org/" },
  habitat:   { text: "Direttiva 92/43/CEE del Consiglio (Direttiva Habitat), Allegato II.", url: "https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:31992L0043" },
  piovesan:  { text: "Piovesan G. et al. (2018). The oldest dated tree of Europe lives in the wild Pollino massif: Italus, a strip-bark Heldreich's pine. Ecology 99(7): 1682–1684." },
  unesco:    { text: "UNESCO World Heritage Centre. Ancient and Primeval Beech Forests of the Carpathians and Other Regions of Europe.", url: "https://whc.unesco.org/en/list/1133" }
};
