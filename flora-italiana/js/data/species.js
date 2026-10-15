/* Flora Italiana — schede delle specie.
   Una sola voce per specie (id univoco); i testi sono oggetti { it, en }.
   Regole: nessun dato senza fonte; se un dato manca si lascia null e l'interfaccia lo segnala.
   quality: "verificato" | "dimostrativo" | "da-verificare" (vedi taxonomy.js).
   image.status: "pending" finché il file non è in public/images/species/, poi "ready". */
window.FLORA = window.FLORA || {};

FLORA.species = [
  {
    id: "quercus-ilex", scientificName: "Quercus ilex", author: "L.", synonyms: [], family: "Fagaceae",
    commonNames: { it: ["Leccio", "Elce"], en: ["Holm oak"] },
    origin: "autoctona",
    growthForm: { it: "Albero o arbusto sempreverde", en: "Evergreen tree or shrub" },
    belts: ["mediterranea", "collinare"], routes: ["coste", "appennini", "sardegna", "sicilia"], habitats: ["boschi", "macchia", "rocciosi"],
    regions: ["lig", "lom", "taa", "ven", "fvg", "emr", "tos", "umb", "mar", "laz", "abr", "mol", "cam", "pug", "bas", "cal", "sic", "sar"],
    distribution: {
      it: "Diffuso lungo le coste, nelle isole e nell'entroterra peninsulare a clima mite. Nel Nord è presente con popolamenti extrazonali in ambienti favorevoli, come le sponde dei laghi prealpini.",
      en: "Widespread along the coasts, on the islands and in the mild inland areas of the peninsula. In the north it occurs as extrazonal stands in favourable sites, such as the shores of the pre-Alpine lakes." },
    altitude: { it: "Dal livello del mare alla bassa montagna, con limiti più elevati nel Mezzogiorno.", en: "From sea level to the lower mountains, reaching higher in southern Italy." },
    flowering: [4, 5],
    floweringNote: { it: "Fiori unisessuali poco vistosi: amenti maschili penduli, fiori femminili isolati.", en: "Inconspicuous unisexual flowers: hanging male catkins, solitary female flowers." },
    description: {
      it: "Quercia sempreverde simbolo della vegetazione mediterranea. Forma boschi chiusi e ombrosi, le leccete, e partecipa alla macchia. Nelle stazioni più aride e rupestri vive in forma di arbusto.",
      en: "Evergreen oak and emblem of Mediterranean vegetation. It forms dense, shady woods and is part of the maquis. On the driest, rockiest sites it grows as a shrub." },
    features: {
      it: ["Foglie persistenti e coriacee, verde scuro e lucide sopra, grigio-tomentose sotto.", "Forma e margine delle foglie variano anche sulla stessa pianta: intere sui rami adulti, spesso dentato-spinose sui polloni e sui getti giovani.", "Ghianda allungata, in una cupola con squame appressate.", "Corteccia grigio scura, finemente screpolata in piccole placche."],
      en: ["Persistent, leathery leaves, dark glossy green above and grey-felted below.", "Leaf shape and margin vary even on the same tree: entire on mature branches, often spiny-toothed on suckers and young shoots.", "Elongated acorn in a cup with appressed scales.", "Dark grey bark, finely cracked into small plates."] },
    conservation: null,
    sources: ["bartolucci", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/quercus-ilex.webp", status: "pending", ai: true, alt: { it: "Ramo di leccio con foglie coriacee e ghiande", en: "Holm oak branch with leathery leaves and acorns" } },
    plate: { type: "branch", leaf: "ovate", L: 46, W: 16, n: 9, flower: "amento", fruit: "acorn", habit: "tree-round" }
  },
  {
    id: "myrtus-communis", scientificName: "Myrtus communis", author: "L.", synonyms: [], family: "Myrtaceae",
    commonNames: { it: ["Mirto", "Mortella"], en: ["Common myrtle"] },
    origin: "autoctona",
    growthForm: { it: "Arbusto sempreverde aromatico", en: "Aromatic evergreen shrub" },
    belts: ["mediterranea"], routes: ["coste", "sardegna", "sicilia"], habitats: ["macchia", "boschi"],
    regions: ["lig", "tos", "laz", "cam", "bas", "cal", "pug", "sic", "sar"],
    distribution: {
      it: "Specie tipica della macchia mediterranea, diffusa soprattutto lungo le coste tirreniche e ioniche, in Sicilia e in Sardegna.",
      en: "A typical maquis species, found mainly along the Tyrrhenian and Ionian coasts, in Sicily and in Sardinia." },
    altitude: { it: "Prevalentemente dalla costa alla bassa collina.", en: "Mainly from the coast to the low hills." },
    flowering: [6, 7],
    floweringNote: { it: "La fioritura può anticipare o prolungarsi secondo la stagione e la località.", en: "Flowering may start earlier or last longer depending on the season and site." },
    description: {
      it: "Arbusto sempreverde e aromatico della macchia mediterranea, legato ai climi miti. In Sardegna le bacche sono usate tradizionalmente per il liquore di mirto.",
      en: "Aromatic evergreen shrub of the Mediterranean maquis, tied to mild climates. In Sardinia the berries are traditionally used to make myrtle liqueur." },
    features: {
      it: ["Foglie opposte, piccole, lanceolate e coriacee; in controluce mostrano punteggiature traslucide, le ghiandole oleifere.", "Le foglie strofinate emettono un profumo resinoso caratteristico.", "Fiori bianchi solitari, a cinque petali, con un ciuffo di numerosissimi stami.", "Il frutto è una bacca blu-nerastra, più raramente biancastra, che matura in autunno-inverno."],
      en: ["Small, opposite, lanceolate, leathery leaves; held against the light they show translucent dots, the oil glands.", "Crushed leaves give off a characteristic resinous scent.", "Solitary white five-petalled flowers with a tuft of very many stamens.", "The fruit is a blue-black, more rarely whitish, berry ripening in autumn and winter."] },
    conservation: null,
    sources: ["bartolucci", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/myrtus-communis.webp", status: "pending", ai: true, alt: { it: "Rametto di mirto con fiori bianchi e bacche blu-nerastre", en: "Myrtle sprig with white flowers and blue-black berries" } },
    plate: { type: "branch", leaf: "lanceolate", L: 30, W: 8, n: 14, opp: true, flower: "myrtle", fruit: "berry", habit: "shrub" }
  },
  {
    id: "chamaerops-humilis", scientificName: "Chamaerops humilis", author: "L.", synonyms: [], family: "Arecaceae",
    commonNames: { it: ["Palma nana", "Palma di San Pietro"], en: ["Mediterranean dwarf palm", "European fan palm"] },
    origin: "autoctona",
    growthForm: { it: "Palma cespitosa, raramente con fusto evidente", en: "Clump-forming palm, rarely with a visible trunk" },
    belts: ["mediterranea"], routes: ["coste", "sardegna", "sicilia"], habitats: ["rocciosi", "macchia"],
    regions: ["tos", "laz", "cam", "cal", "sic", "sar"],
    distribution: {
      it: "Rupi e pendii costieri soleggiati della Sicilia e della Sardegna; sul versante tirrenico peninsulare è localizzata in poche stazioni, ad esempio su promontori calcarei.",
      en: "Sunny coastal cliffs and slopes of Sicily and Sardinia; on the Tyrrhenian side of the peninsula it is confined to a few sites, for example on limestone headlands." },
    altitude: { it: "Prevalentemente fascia costiera.", en: "Mainly the coastal belt." },
    flowering: [4, 5],
    floweringNote: { it: "Pianta generalmente dioica: individui con fiori maschili e individui con fiori femminili.", en: "Usually dioecious: some plants bear male flowers, others female flowers." },
    description: {
      it: "È l'unica palma spontanea della flora italiana. Cresce in cespi bassi e densi su rupi, garighe e macchie aride, spesso su substrati calcarei.",
      en: "The only palm native to Italy. It grows in low, dense clumps on cliffs, garrigue and dry maquis, often on limestone." },
    features: {
      it: ["Foglie a ventaglio (palmate), rigide, divise in segmenti lineari.", "Picciolo armato di robuste spine.", "Fiori gialli, piccoli, in infiorescenze dense e brevi tra le foglie.", "Frutti carnosi, da giallastri a bruno-rossastri a maturità."],
      en: ["Stiff fan-shaped (palmate) leaves divided into linear segments.", "Leaf stalk armed with strong spines.", "Small yellow flowers in short, dense clusters among the leaves.", "Fleshy fruits, yellowish to reddish-brown when ripe."] },
    conservation: null,
    sources: ["bartolucci", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/chamaerops-humilis.webp", status: "pending", ai: true, alt: { it: "Cespo di palma nana con foglie a ventaglio", en: "Dwarf palm clump with fan-shaped leaves" } },
    plate: { type: "fan", flower: "palmflower", fruit: "drupe", habit: "palm" }
  },
  {
    id: "opuntia-ficus-indica", scientificName: "Opuntia ficus-indica", author: "(L.) Mill.", synonyms: [], family: "Cactaceae",
    commonNames: { it: ["Fico d'India"], en: ["Prickly pear", "Indian fig opuntia"] },
    origin: "naturalizzata",
    nativeRange: { it: "Messico", en: "Mexico" },
    originNote: { it: "Lo status (naturalizzata o invasiva) varia da regione a regione: verificare nella checklist della flora alloctona.", en: "The status (naturalised or invasive) varies between regions: check the checklist of the alien flora." },
    growthForm: { it: "Pianta succulenta arbustiva", en: "Shrubby succulent" },
    belts: ["mediterranea"], routes: ["coste", "sardegna", "sicilia"], habitats: ["rocciosi", "antropici"],
    regions: ["lig", "tos", "laz", "cam", "pug", "bas", "cal", "sic", "sar"],
    distribution: {
      it: "Coltivata da secoli nel Mediterraneo e naturalizzata soprattutto nel Sud, in Sicilia e in Sardegna, su rupi, muri a secco e incolti soleggiati.",
      en: "Grown for centuries around the Mediterranean and naturalised mainly in the south, in Sicily and in Sardinia, on cliffs, dry-stone walls and sunny waste ground." },
    altitude: { it: "Prevalentemente fascia costiera e collinare a clima caldo.", en: "Mainly coastal and hill areas with a warm climate." },
    flowering: [5, 6],
    floweringNote: { it: "Nelle coltivazioni siciliane una seconda fioritura viene indotta con la pratica della scozzolatura.", en: "In Sicilian plantations a second flowering is induced by removing the first flowers (scozzolatura)." },
    description: {
      it: "Originaria del Messico, è oggi un elemento caratteristico del paesaggio dell'Italia meridionale, ma non appartiene alla flora autoctona: è una specie alloctona introdotta dall'uomo.",
      en: "Native to Mexico, it is now a characteristic feature of the southern Italian landscape, but it is not part of the native flora: it is an alien species introduced by people." },
    features: {
      it: ["Fusti formati da segmenti appiattiti e carnosi, i cladodi, comunemente chiamati pale.", "Areole con spine e glochidi: minuscole setole uncinate che si staccano facilmente.", "Fiori giallo-arancio inseriti sul margine superiore delle pale.", "Frutto carnoso e commestibile, rivestito di glochidi."],
      en: ["Stems made of flattened fleshy segments (cladodes), commonly called pads.", "Areoles bearing spines and glochids: tiny barbed bristles that detach easily.", "Yellow-orange flowers borne on the upper edge of the pads.", "Fleshy edible fruit covered in glochids."] },
    conservation: null,
    sources: ["galasso", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/opuntia-ficus-indica.webp", status: "pending", ai: true, alt: { it: "Pale di fico d'India con fiori gialli e frutti", en: "Prickly pear pads with yellow flowers and fruits" } },
    plate: { type: "cladode", flower: "opuntia", fruit: "prickly", habit: "cactus" }
  },
  {
    id: "quercus-robur", scientificName: "Quercus robur", author: "L.", synonyms: [], family: "Fagaceae",
    commonNames: { it: ["Farnia", "Quercia peduncolata"], en: ["Pedunculate oak", "English oak"] },
    origin: "autoctona",
    growthForm: { it: "Grande albero caducifoglio", en: "Large deciduous tree" },
    belts: ["planiziale", "collinare"], routes: ["padana"], habitats: ["boschi"],
    regions: ["pie", "lom", "taa", "ven", "fvg", "lig", "emr", "tos", "umb", "mar", "laz", "abr", "mol", "cam", "pug", "bas", "cal"],
    distribution: {
      it: "Diffusa soprattutto nell'Italia settentrionale e centrale, più rara e localizzata al Sud. Nella Pianura Padana sopravvive in pochi boschi residui, come il Bosco Fontana (Mantova) e il Bosco della Mesola (Ferrara).",
      en: "Found mainly in northern and central Italy, rarer and more local in the south. In the Po Valley it survives in a few remnant woods, such as Bosco Fontana (Mantua) and Bosco della Mesola (Ferrara)." },
    altitude: { it: "Pianure e bassi versanti collinari su suoli profondi e freschi.", en: "Plains and lower hill slopes on deep, moist soils." },
    flowering: [4, 5],
    floweringNote: { it: "Fioritura contemporanea all'emissione delle foglie.", en: "Flowers appear together with the new leaves." },
    description: {
      it: "Grande quercia caducifoglia dei suoli profondi e umidi di pianura. Un tempo dominava i boschi della Pianura Padana insieme al carpino bianco.",
      en: "Large deciduous oak of deep, moist lowland soils. It once dominated the forests of the Po Valley together with hornbeam." },
    features: {
      it: ["Foglie lobate con picciolo brevissimo e base a orecchiette (auricolata).", "Ghiande portate su un lungo peduncolo, da cui il nome di quercia peduncolata.", "Corteccia grigia, profondamente solcata negli esemplari adulti.", "Da non confondere con la rovere (Quercus petraea), che ha foglie con picciolo evidente e ghiande quasi sessili."],
      en: ["Lobed leaves with a very short stalk and an eared (auriculate) base.", "Acorns borne on a long stalk, hence the name pedunculate oak.", "Grey bark, deeply furrowed on mature trees.", "Not to be confused with sessile oak (Quercus petraea), which has clearly stalked leaves and almost stalkless acorns."] },
    conservation: null,
    sources: ["bartolucci", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/quercus-robur.webp", status: "pending", ai: true, alt: { it: "Ramo di farnia con foglie lobate e ghiande peduncolate", en: "Pedunculate oak branch with lobed leaves and stalked acorns" } },
    plate: { type: "branch", leaf: "lobed", L: 58, W: 22, n: 7, flower: "amento", fruit: "acorn-long", habit: "tree-round" }
  },
  {
    id: "robinia-pseudoacacia", scientificName: "Robinia pseudoacacia", author: "L.", synonyms: [], family: "Fabaceae",
    commonNames: { it: ["Robinia", "Gaggia"], en: ["Black locust", "False acacia"] },
    origin: "invasiva",
    nativeRange: { it: "Nord America orientale", en: "Eastern North America" },
    growthForm: { it: "Albero caducifoglio spinoso", en: "Thorny deciduous tree" },
    belts: ["planiziale", "collinare"], routes: ["padana"], habitats: ["antropici", "boschi"],
    regions: "ALL",
    distribution: {
      it: "Segnalata in tutte le regioni. Molto diffusa lungo scarpate, argini, margini di boschi e ferrovie, soprattutto nell'Italia settentrionale.",
      en: "Recorded in all regions. Very common along embankments, riverbanks, woodland edges and railways, especially in northern Italy." },
    altitude: { it: "Dalla pianura alla bassa montagna.", en: "From the lowlands to the lower mountains." },
    flowering: [4, 5, 6],
    floweringNote: { it: "Fiori molto visitati dalle api: è una fonte importante di miele (miele di acacia).", en: "The flowers are much visited by bees and are an important source of honey (sold as acacia honey)." },
    description: {
      it: "Albero originario del Nord America orientale, introdotto in Europa all'inizio del Seicento come pianta ornamentale e poi usato per consolidare scarpate e produrre legname. In Italia è naturalizzata e invasiva: forma popolamenti densi che sostituiscono la vegetazione autoctona.",
      en: "A tree from eastern North America, introduced to Europe in the early seventeenth century as an ornamental and later used to stabilise slopes and produce timber. In Italy it is naturalised and invasive, forming dense stands that replace native vegetation." },
    features: {
      it: ["Foglie composte imparipennate, con foglioline ovali a margine intero.", "Alla base delle foglie, coppie di spine derivate dalle stipole.", "Fiori bianchi, profumati, papilionacei, in grappoli penduli.", "Frutto: legume appiattito, bruno, che resta sulla pianta in inverno.", "Come molte leguminose arricchisce il suolo di azoto, favorendo le specie nitrofile."],
      en: ["Odd-pinnate compound leaves with oval, untoothed leaflets.", "Pairs of spines, derived from stipules, at the base of the leaves.", "Fragrant white pea-like flowers in hanging clusters.", "Fruit: a flat brown pod that stays on the tree in winter.", "Like many legumes it enriches the soil with nitrogen, favouring nitrogen-loving species."] },
    conservation: null,
    sources: ["galasso", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "dimostrativo", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/robinia-pseudoacacia.webp", status: "pending", ai: true, alt: { it: "Ramo di robinia con foglie composte e grappoli di fiori bianchi", en: "Black locust branch with compound leaves and white flower clusters" } },
    plate: { type: "branch", leaf: "pinnate", L: 70, W: 10, n: 6, flower: "raceme", fruit: "legume", habit: "tree-oval" }
  },
  {
    id: "fagus-sylvatica", scientificName: "Fagus sylvatica", author: "L.", synonyms: [], family: "Fagaceae",
    commonNames: { it: ["Faggio"], en: ["European beech"] },
    origin: "autoctona",
    growthForm: { it: "Grande albero caducifoglio", en: "Large deciduous tree" },
    belts: ["montana"], routes: ["alpi", "appennini", "sicilia"], habitats: ["boschi"],
    regions: "ALL_EXCEPT:sar",
    distribution: {
      it: "Lungo tutto l'arco alpino e la dorsale appenninica fino alla Sicilia (Madonie, Nebrodi, Etna). Non è spontaneo in Sardegna. Sul Gargano scende a quote insolitamente basse (Foresta Umbra).",
      en: "Throughout the Alps and along the Apennines as far as Sicily (Madonie, Nebrodi, Etna). It is not native to Sardinia. On the Gargano it grows at unusually low altitudes (Foresta Umbra)." },
    altitude: { it: "Fascia montana; sulle Alpi spesso più in basso che sugli Appennini.", en: "Montane belt; in the Alps often lower than in the Apennines." },
    flowering: [4, 5],
    floweringNote: { it: "Fiori poco vistosi, contemporanei all'apertura delle foglie.", en: "Inconspicuous flowers, appearing as the leaves open." },
    description: {
      it: "Albero dominante della fascia montana appenninica e di parte di quella alpina. Le faggete, ombrose e con poco sottobosco, sono tra i boschi più estesi d'Italia. Alcune faggete italiane, tra cui Sasso Fratino e la Foresta Umbra, fanno parte del sito UNESCO delle antiche faggete primordiali d'Europa.",
      en: "The dominant tree of the Apennine montane belt and of part of the Alpine one. Beech forests, shady and with little undergrowth, are among the most extensive woods in Italy. Some Italian beech forests, including Sasso Fratino and the Foresta Umbra, belong to the UNESCO site of the ancient and primeval beech forests of Europe." },
    features: {
      it: ["Corteccia liscia, grigio-argentea, anche negli alberi vecchi.", "Foglie ovali a margine intero o leggermente ondulato, cigliate da giovani.", "Gemme lunghe, sottili e appuntite.", "Frutto: faggiola, un achenio trigono racchiuso a coppie in una cupola legnosa con aculei morbidi."],
      en: ["Smooth, silvery-grey bark, even on old trees.", "Oval leaves with an entire or slightly wavy margin, fringed with hairs when young.", "Long, slender, pointed buds.", "Fruit: beechnut, a three-sided nut enclosed in pairs in a woody husk with soft spines."] },
    conservation: null,
    sources: ["bartolucci", "pignatti", "portale", "unesco"],
    quality: { overall: "dimostrativo", regions: "dimostrativo", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/fagus-sylvatica.webp", status: "pending", ai: true, alt: { it: "Ramo di faggio con foglie ovali e faggiole", en: "Beech branch with oval leaves and beechnuts" } },
    plate: { type: "branch", leaf: "ovate", L: 44, W: 20, n: 8, flower: "amento", fruit: "beechnut", habit: "tree-oval" }
  },
  {
    id: "pinus-heldreichii", scientificName: "Pinus heldreichii", author: "H.Christ", synonyms: ["Pinus leucodermis Antoine"], family: "Pinaceae", gymnosperm: true,
    commonNames: { it: ["Pino loricato"], en: ["Bosnian pine"] },
    origin: "autoctona",
    endemism: { it: "Non endemica: in Italia ha un areale molto ristretto, ma la specie è presente anche nella Penisola balcanica.", en: "Not endemic: its Italian range is very small, but the species also grows in the Balkan Peninsula." },
    growthForm: { it: "Albero sempreverde, spesso contorto", en: "Evergreen tree, often twisted" },
    belts: ["montana", "alpina"], routes: ["appennini"], habitats: ["rocciosi", "boschi"],
    regions: ["bas", "cal"],
    distribution: {
      it: "In Italia cresce soltanto sul massiccio del Pollino e sui Monti di Orsomarso, tra Basilicata e Calabria.",
      en: "In Italy it grows only on the Pollino massif and the Orsomarso mountains, between Basilicata and Calabria." },
    altitude: { it: "Fascia montana superiore e subalpina, su creste e rupi calcaree.", en: "Upper montane and subalpine belt, on limestone ridges and cliffs." },
    flowering: null,
    floweringNote: { it: "Gimnosperma: non produce fiori ma strobili (coni).", en: "Gymnosperm: it produces cones, not flowers." },
    description: {
      it: "Pino dalle forme scolpite dal vento, simbolo del Parco Nazionale del Pollino. Il nome richiama la corteccia degli adulti, divisa in placche simili alla lorica, l'armatura dei legionari romani. Un esemplare del Pollino, chiamato Italus, è stato datato a oltre 1.200 anni.",
      en: "A wind-sculpted pine and symbol of Pollino National Park. Its Italian name refers to the bark of mature trees, split into plates like the lorica, the armour of Roman legionaries. A Pollino tree known as Italus has been dated to over 1,200 years old." },
    features: {
      it: ["Aghi riuniti a coppie, rigidi, verde scuro, addensati verso l'apice dei rametti.", "Corteccia degli adulti divisa in placche poligonali grigie.", "Coni ovoidi che maturano nel secondo anno.", "Portamento spesso contorto o a bandiera nelle stazioni esposte."],
      en: ["Stiff, dark green needles in pairs, crowded towards the tips of the shoots.", "Bark of mature trees divided into grey polygonal plates.", "Ovoid cones ripening in the second year.", "Often twisted or flag-shaped on exposed sites."] },
    conservation: {
      iucn: { it: "Least Concern (valutazione globale)", en: "Least Concern (global assessment)" },
      note: { it: "Le popolazioni italiane ricadono nel Parco Nazionale del Pollino.", en: "The Italian populations lie within Pollino National Park." } },
    sources: ["bartolucci", "pignatti", "portale", "iucn", "piovesan"],
    quality: { overall: "dimostrativo", regions: "dimostrativo", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/pinus-heldreichii.webp", status: "pending", ai: true, alt: { it: "Pino loricato su una cresta rocciosa", en: "Bosnian pine on a rocky ridge" } },
    plate: { type: "needle", fruit: "cone", habit: "conifer-wind" }
  },
  {
    id: "abies-nebrodensis", scientificName: "Abies nebrodensis", author: "(Lojac.) Mattei", synonyms: [], family: "Pinaceae", gymnosperm: true,
    commonNames: { it: ["Abete dei Nebrodi"], en: ["Sicilian fir"] },
    origin: "endemica",
    endemism: { it: "Endemica della Sicilia: la popolazione naturale si trova sulle Madonie.", en: "Endemic to Sicily: the natural population is in the Madonie mountains." },
    growthForm: { it: "Albero sempreverde", en: "Evergreen tree" },
    belts: ["montana"], routes: ["sicilia"], habitats: ["boschi", "rocciosi"],
    regions: ["sic"],
    distribution: {
      it: "La popolazione naturale sopravvive con circa trenta alberi adulti nel Vallone Madonna degli Angeli, sulle Madonie (Parco delle Madonie). Nonostante il nome, non si trova sui Nebrodi.",
      en: "The natural population survives as about thirty adult trees in the Vallone Madonna degli Angeli, in the Madonie mountains (Madonie Park). Despite its name, it does not grow in the Nebrodi mountains." },
    altitude: { it: "Versanti in quota delle Madonie.", en: "Upper slopes of the Madonie." },
    flowering: null,
    floweringNote: { it: "Gimnosperma: non produce fiori ma strobili (coni).", en: "Gymnosperm: it produces cones, not flowers." },
    description: {
      it: "Una delle conifere più rare d'Europa. Sopravvissuta come popolazione relitta, è oggetto di programmi di conservazione e di rinforzo della popolazione con piantine di origine locale.",
      en: "One of the rarest conifers in Europe. It survives as a relict population and is the focus of conservation programmes that reinforce it with locally sourced seedlings." },
    features: {
      it: ["Aghi appiattiti, corti e rigidi, con due bande biancastre sulla pagina inferiore.", "Rami disposti in palchi regolari.", "Coni eretti e cilindrici, che a maturità si disfano sulla pianta, come in tutti gli abeti."],
      en: ["Short, stiff, flattened needles with two whitish bands underneath.", "Branches arranged in regular whorls.", "Upright cylindrical cones that break up on the tree when ripe, as in all firs."] },
    conservation: {
      iucn: { it: "Critically Endangered (CR)", en: "Critically Endangered (CR)" }, iucnCode: "CR",
      legal: { it: "Specie prioritaria della Direttiva Habitat 92/43/CEE (Allegato II).", en: "Priority species under the Habitats Directive 92/43/EEC (Annex II)." },
      note: { it: "Popolazione naturale ridotta a poche decine di individui adulti.", en: "Natural population reduced to a few dozen adult trees." } },
    sources: ["bartolucci", "pignatti", "iucn", "habitat"],
    quality: { overall: "dimostrativo", regions: "dimostrativo", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/abies-nebrodensis.webp", status: "pending", ai: true, alt: { it: "Ramo di abete dei Nebrodi con aghi corti e coni eretti", en: "Sicilian fir branch with short needles and upright cones" } },
    plate: { type: "needle", fir: true, fruit: "cone-up", habit: "conifer" }
  },
  {
    id: "rhododendron-ferrugineum", scientificName: "Rhododendron ferrugineum", author: "L.", synonyms: [], family: "Ericaceae",
    commonNames: { it: ["Rododendro rosso", "Rododendro ferrugineo"], en: ["Alpenrose", "Rusty-leaved alpenrose"] },
    origin: "autoctona",
    growthForm: { it: "Arbusto sempreverde", en: "Evergreen shrub" },
    belts: ["alpina"], routes: ["alpi"], habitats: ["arbusteti"],
    regions: ["pie", "vda", "lom", "taa", "ven", "fvg"],
    distribution: {
      it: "Diffuso sull'arco alpino, dove forma estese brughiere subalpine. Eventuali stazioni appenniniche vanno verificate sulle fonti regionali.",
      en: "Widespread in the Alps, where it forms extensive subalpine heaths. Any Apennine sites need to be checked against regional sources." },
    altitude: { it: "Fascia subalpina, al limite superiore del bosco e appena oltre.", en: "Subalpine belt, at and just above the treeline." },
    flowering: [6, 7, 8],
    floweringNote: { it: "Alle quote più elevate la fioritura si sposta verso l'estate piena.", en: "At higher altitudes flowering shifts towards midsummer." },
    description: {
      it: "Arbusto sempreverde che forma estesi tappeti nella fascia subalpina, spesso insieme a mirtilli, larici e pino cembro. Predilige suoli acidi e una buona copertura nevosa invernale.",
      en: "Evergreen shrub forming extensive carpets in the subalpine belt, often with bilberries, larch and Swiss stone pine. It prefers acid soils and good winter snow cover." },
    features: {
      it: ["Foglie coriacee, ellittiche, a margine revoluto; la pagina inferiore diventa bruno-ruggine per fitte squamette.", "Fiori rosso-rosati, imbutiformi, riuniti all'apice dei rami.", "Si distingue dal rododendro irsuto (R. hirsutum) dei suoli calcarei, che ha foglie cigliate e verdi sotto."],
      en: ["Leathery elliptic leaves with rolled-under margins; the underside turns rusty brown from dense tiny scales.", "Pinkish-red funnel-shaped flowers clustered at the branch tips.", "Distinguished from hairy alpenrose (R. hirsutum) of limestone soils, which has hair-fringed leaves that are green underneath."] },
    conservation: null,
    sources: ["bartolucci", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/rhododendron-ferrugineum.webp", status: "pending", ai: true, alt: { it: "Arbusto di rododendro rosso in fiore", en: "Alpenrose shrub in flower" } },
    plate: { type: "branch", leaf: "lanceolate", L: 34, W: 10, n: 12, flower: "rhodo", fruit: null, habit: "shrub-low" }
  },
  {
    id: "leontopodium-nivale-alpinum", scientificName: "Leontopodium nivale subsp. alpinum", author: "(Cass.) Greuter", synonyms: ["Leontopodium alpinum Cass."], family: "Asteraceae",
    commonNames: { it: ["Stella alpina"], en: ["Edelweiss"] },
    origin: "autoctona",
    growthForm: { it: "Erbacea perenne", en: "Perennial herb" },
    belts: ["alpina"], routes: ["alpi"], habitats: ["rocciosi", "prati"],
    regions: ["pie", "vda", "lom", "taa", "ven", "fvg"],
    distribution: {
      it: "Arco alpino, soprattutto su substrati calcarei. Sull'Appennino centrale è presente un'entità affine, Leontopodium nivale subsp. nivale, non inclusa in questa scheda.",
      en: "The Alps, mainly on limestone. A related taxon, Leontopodium nivale subsp. nivale, occurs in the central Apennines and is not covered by this entry." },
    altitude: { it: "Fascia alpina, su rupi, cenge e praterie sassose.", en: "Alpine belt, on cliffs, ledges and stony grasslands." },
    flowering: [7, 8, 9],
    floweringNote: null,
    description: {
      it: "La pianta più celebre delle Alpi, simbolo dell'alpinismo. Cresce oltre il limite del bosco, su rupi e praterie aride e sassose.",
      en: "The most famous plant of the Alps and a symbol of mountaineering. It grows above the treeline, on cliffs and dry, stony grasslands." },
    features: {
      it: ["Intera pianta ricoperta da una fitta peluria bianco-lanosa.", "Quello che sembra un unico fiore è un'infiorescenza: piccoli capolini giallastri circondati da una stella di brattee feltrose.", "Foglie basali lineari-lanceolate, grigio-tomentose."],
      en: ["Whole plant covered in dense, white woolly hairs.", "What looks like a single flower is an inflorescence: small yellowish flower heads surrounded by a star of felted bracts.", "Linear-lanceolate, grey-felted basal leaves."] },
    conservation: {
      legal: { it: "Protetta dalla normativa di diverse regioni alpine: la raccolta è vietata o limitata.", en: "Protected by the laws of several Alpine regions: picking is banned or restricted." },
      note: { it: "Verificare la legge regionale vigente nel luogo di osservazione.", en: "Check the regional law in force where the plant is observed." } },
    sources: ["bartolucci", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/leontopodium-nivale-alpinum.webp", status: "pending", ai: true, alt: { it: "Stella alpina con brattee bianche lanose tra le rocce", en: "Edelweiss with white woolly bracts among rocks" } },
    plate: { type: "rosette", leaf: "lanceolate", leaves: 7, leafL: 75, leafW: 9, flower: "edelweiss", stems: [[150, 118, 2.4]], habit: "herb", habitFlower: "edelweiss" }
  },
  {
    id: "papaver-rhoeas", scientificName: "Papaver rhoeas", author: "L.", synonyms: [], family: "Papaveraceae",
    commonNames: { it: ["Papavero comune", "Rosolaccio"], en: ["Common poppy", "Corn poppy"] },
    origin: "non-verificata",
    originNote: {
      it: "In parte dell'Europa centro-settentrionale è considerata un'archeofita, cioè introdotta in tempi antichi insieme all'agricoltura. Lo status in Italia va verificato sulle checklist nazionali prima della pubblicazione.",
      en: "In parts of central and northern Europe it is regarded as an archaeophyte, introduced in ancient times along with agriculture. Its status in Italy must be checked against the national checklists before publication." },
    growthForm: { it: "Erbacea annuale", en: "Annual herb" },
    belts: ["mediterranea", "planiziale", "collinare"], routes: ["padana"], habitats: ["antropici", "prati"],
    regions: "ALL",
    distribution: {
      it: "Comune in tutta Italia nei campi di cereali, lungo i margini delle strade, negli incolti e nei terreni smossi.",
      en: "Common throughout Italy in cereal fields, along roadsides, on waste ground and on disturbed soil." },
    altitude: { it: "Prevalentemente dalla pianura alla collina.", en: "Mainly from the lowlands to the hills." },
    flowering: [4, 5, 6, 7],
    floweringNote: { it: "Periodo indicativo, da verificare: varia con la latitudine e con la data di semina dei campi.", en: "Indicative period, to be verified: it varies with latitude and with the sowing date of the fields." },
    description: {
      it: "Il papavero rosso dei campi di grano, una delle piante spontanee più riconoscibili. È legato agli ambienti coltivati e ai terreni smossi, dove i semi possono restare vitali a lungo nel suolo.",
      en: "The red poppy of wheat fields, one of the most recognisable wild plants. It is tied to cultivated land and disturbed soil, where its seeds can remain viable in the ground for a long time." },
    features: {
      it: ["Pianta annuale con fusti e foglie ispidi.", "Foglie profondamente divise in lobi dentati.", "Fiori con quattro petali rosso vivo, spesso con una macchia nera alla base.", "Frutto: capsula glabra che libera i semi da piccoli pori sotto il disco stigmatico.", "Il fusto spezzato emette un lattice bianco."],
      en: ["Annual plant with bristly stems and leaves.", "Leaves deeply divided into toothed lobes.", "Flowers with four bright red petals, often with a black blotch at the base.", "Fruit: a hairless capsule that releases its seeds through small pores beneath the stigmatic disc.", "Broken stems exude white latex."] },
    conservation: null,
    sources: ["pignatti", "bartolucci", "galasso", "portale"],
    quality: { overall: "da-verificare", regions: "dimostrativo", flowering: "da-verificare" },
    updated: "2026-10-15",
    image: { file: "public/images/species/papaver-rhoeas.webp", status: "pending", ai: true, alt: { it: "Papaveri rossi in fiore con boccioli e capsule", en: "Red poppies in flower with buds and seed capsules" } },
    plate: { type: "herb", leaf: "lobed", leafL: 50, leafW: 14, flower: "poppy", fruit: "capsule", stems: [[110, 70, 1.6], [190, 110, 1.3], [150, 160, 1]], habit: "herb", habitFlower: "poppy" }
  },
  {
    id: "gentiana-acaulis", scientificName: "Gentiana acaulis", author: "L.", synonyms: [], family: "Gentianaceae",
    commonNames: { it: ["Genziana di Koch"], en: ["Stemless gentian", "Trumpet gentian"] },
    origin: "autoctona",
    growthForm: { it: "Erbacea perenne", en: "Perennial herb" },
    belts: ["alpina"], routes: ["alpi"], habitats: ["prati"],
    regions: ["pie", "vda", "lom", "taa", "ven", "fvg"],
    distribution: {
      it: "Praterie e pascoli dell'arco alpino su suoli acidi. Eventuali presenze nelle Alpi Liguri e sull'Appennino vanno verificate sulle fonti regionali.",
      en: "Grasslands and pastures of the Alps on acid soils. Any occurrences in the Ligurian Alps and the Apennines need to be checked against regional sources." },
    altitude: { it: "Fascia subalpina e alpina.", en: "Subalpine and alpine belt." },
    flowering: [5, 6, 7],
    floweringNote: { it: "Periodo indicativo, da verificare: dipende dalla quota e dalla fusione della neve.", en: "Indicative period, to be verified: it depends on altitude and snowmelt." },
    description: {
      it: "Piccola genziana delle praterie alpine con un grande fiore blu intenso che sembra quasi privo di fusto. Cresce su suoli acidi, generalmente su rocce silicee.",
      en: "A small gentian of alpine grasslands with a large, deep blue flower that seems almost stemless. It grows on acid soils, usually over siliceous rock." },
    features: {
      it: ["Rosetta basale di foglie ellittiche, larghe e un po' coriacee.", "Fiore singolo, grande, blu intenso, a campana-imbuto, su un fusto molto breve.", "Gola della corolla con macchie verde-olivastre.", "Si distingue dalla genziana di Clusius (G. clusii), dei suoli calcarei, che ha foglie più strette, rigide e appuntite e gola senza macchie verdi."],
      en: ["Basal rosette of broad, elliptic, slightly leathery leaves.", "A single large, deep blue, bell- to funnel-shaped flower on a very short stem.", "Throat of the corolla with olive-green spots.", "Distinguished from Clusius's gentian (G. clusii) of limestone soils, which has narrower, stiff, pointed leaves and a throat without green spots."] },
    conservation: null,
    sources: ["bartolucci", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "da-verificare" },
    updated: "2026-10-15",
    image: { file: "public/images/species/gentiana-acaulis.webp", status: "pending", ai: true, alt: { it: "Genziana di Koch con grande fiore blu a trombetta e rosetta di foglie", en: "Stemless gentian with a large blue trumpet flower and leaf rosette" } },
    plate: { type: "rosette", leaf: "ovate", leaves: 6, leafL: 60, leafW: 20, flower: "gentian", stems: [[150, 300, 4.4]], habit: "herb", habitFlower: "gentian" }
  },
  {
    id: "primula-vulgaris", scientificName: "Primula vulgaris", author: "Huds.", synonyms: [], family: "Primulaceae",
    commonNames: { it: ["Primula comune", "Primavera"], en: ["Primrose"] },
    origin: "autoctona",
    growthForm: { it: "Erbacea perenne", en: "Perennial herb" },
    belts: ["planiziale", "collinare", "montana"], routes: ["appennini", "alpi"], habitats: ["boschi", "prati"],
    regions: "ALL",
    distribution: {
      it: "Diffusa in gran parte d'Italia, isole comprese, in boschi di latifoglie, siepi e prati freschi.",
      en: "Widespread across most of Italy, including the islands, in broadleaf woods, hedgerows and moist meadows." },
    altitude: { it: "Dalla pianura alla montagna.", en: "From the lowlands to the mountains." },
    flowering: [2, 3, 4],
    floweringNote: { it: "Fioritura molto precoce: nelle località miti può iniziare già in inverno.", en: "Very early flowering: in mild places it can begin in winter." },
    description: {
      it: "Una delle prime fioriture dell'anno nei boschi di latifoglie e lungo le siepi. I fiori giallo pallido spuntano direttamente dalla rosetta di foglie.",
      en: "One of the first flowers of the year in broadleaf woods and along hedgerows. The pale yellow flowers rise directly from the leaf rosette." },
    features: {
      it: ["Rosetta di foglie oblunghe e rugose, che si restringono gradualmente verso la base.", "Fiori singoli su lunghi peduncoli che nascono dalla rosetta, senza uno scapo comune.", "Corolla giallo pallido con il centro giallo più intenso.", "Eterostilia: alcune piante hanno fiori a stilo lungo, altre a stilo corto, un meccanismo che favorisce l'impollinazione incrociata, studiato da Charles Darwin.", "Si distingue dalla primula odorosa (P. veris), che ha fiori giallo intenso riuniti in ombrella all'apice di uno scapo."],
      en: ["Rosette of oblong, wrinkled leaves gradually narrowing towards the base.", "Single flowers on long stalks rising from the rosette, with no common stem.", "Pale yellow corolla with a deeper yellow centre.", "Heterostyly: some plants have long-styled flowers and others short-styled ones, a mechanism that promotes cross-pollination and was studied by Charles Darwin.", "Distinguished from cowslip (P. veris), which has deep yellow flowers clustered in an umbel on top of a stem."] },
    conservation: null,
    sources: ["bartolucci", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/primula-vulgaris.webp", status: "pending", ai: true, alt: { it: "Primula comune con fiori giallo pallido e foglie rugose", en: "Primrose with pale yellow flowers and wrinkled leaves" } },
    plate: { type: "rosette", leaf: "ovate", leaves: 8, leafL: 90, leafW: 22, flower: "primula", stems: [[110, 250, 1.6], [150, 220, 1.7], [190, 245, 1.6], [130, 290, 1.3], [175, 285, 1.3]], habit: "herb", habitFlower: "primula" }
  },
  {
    id: "lavandula-stoechas", scientificName: "Lavandula stoechas", author: "L.", synonyms: [], family: "Lamiaceae",
    commonNames: { it: ["Lavanda selvatica", "Steca"], en: ["French lavender", "Topped lavender"] },
    origin: "autoctona",
    originNote: { it: "Il nome 'lavanda selvatica' è usato anche per altre specie di Lavandula: in questa scheda indica soltanto L. stoechas.", en: "The Italian name 'lavanda selvatica' is also used for other Lavandula species: in this entry it refers only to L. stoechas." },
    growthForm: { it: "Piccolo arbusto aromatico", en: "Small aromatic shrub" },
    belts: ["mediterranea"], routes: ["coste", "sardegna", "sicilia"], habitats: ["macchia"],
    regions: ["lig", "tos", "laz", "cam", "cal", "sic", "sar"],
    distribution: {
      it: "Macchie e garighe su suoli acidi, frequente in Sardegna, in Sicilia e lungo il versante tirrenico.",
      en: "Maquis and garrigue on acid soils, frequent in Sardinia, Sicily and along the Tyrrhenian side." },
    altitude: { it: "Prevalentemente dalla costa alla bassa collina.", en: "Mainly from the coast to the low hills." },
    flowering: [3, 4, 5],
    floweringNote: { it: "Fioritura primaverile; il periodo esatto varia con la località.", en: "Spring flowering; the exact period varies by site." },
    description: {
      it: "Piccolo arbusto aromatico della macchia mediterranea, riconoscibile per il ciuffo di brattee violacee in cima alle spighe. A differenza di altre lavande evita i suoli calcarei.",
      en: "A small aromatic shrub of the Mediterranean maquis, recognisable by the tuft of purple bracts on top of the flower spikes. Unlike other lavenders it avoids limestone soils." },
    features: {
      it: ["Foglie lineari, grigio-tomentose, con margine revoluto.", "Fiori viola scuro in spighe dense e corte, a sezione quadrangolare.", "All'apice della spiga, un ciuffo di grandi brattee sterili violacee, molto vistose.", "Tutta la pianta è fortemente aromatica."],
      en: ["Linear, grey-felted leaves with rolled-under margins.", "Dark purple flowers in short, dense, four-sided spikes.", "A conspicuous tuft of large sterile purple bracts on top of each spike.", "The whole plant is strongly aromatic."] },
    conservation: null,
    sources: ["bartolucci", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/lavandula-stoechas.webp", status: "pending", ai: true, alt: { it: "Lavanda selvatica con spighe viola e brattee apicali", en: "French lavender with purple spikes and top bracts" } },
    plate: { type: "herb", leaf: "lanceolate", leafL: 26, leafW: 4, flower: "lavender", fruit: null, stems: [[100, 175, 2], [150, 150, 2.2], [200, 185, 2], [125, 225, 1.7], [180, 230, 1.7]], habit: "shrub-lav", habitFlower: "lavender" }
  },
  {
    id: "pancratium-maritimum", scientificName: "Pancratium maritimum", author: "L.", synonyms: [], family: "Amaryllidaceae",
    commonNames: { it: ["Giglio di mare"], en: ["Sea daffodil", "Sea lily"] },
    origin: "autoctona",
    growthForm: { it: "Erbacea perenne bulbosa", en: "Perennial bulbous herb" },
    belts: ["mediterranea"], routes: ["coste", "sardegna", "sicilia"], habitats: ["dune"],
    regions: ["lig", "tos", "laz", "cam", "bas", "cal", "pug", "mol", "abr", "mar", "emr", "ven", "fvg", "sic", "sar"],
    distribution: {
      it: "Spiagge e dune sabbiose lungo le coste italiane, dove la duna è ancora ben conservata.",
      en: "Sandy beaches and dunes along the Italian coasts, where the dunes are still well preserved." },
    altitude: { it: "Fascia costiera.", en: "Coastal belt." },
    flowering: [7, 8, 9],
    floweringNote: { it: "Fiori profumati, aperti soprattutto la sera e visitati da falene sfingidi.", en: "Fragrant flowers, open mainly in the evening and visited by hawkmoths." },
    description: {
      it: "Pianta bulbosa delle dune sabbiose. In piena estate produce grandi fiori bianchi profumati. È minacciata dalla pulizia meccanica delle spiagge e dal calpestio.",
      en: "A bulbous plant of sand dunes. In midsummer it produces large, fragrant white flowers. It is threatened by mechanical beach cleaning and trampling." },
    features: {
      it: ["Foglie lineari, glauche, che spuntano dal bulbo profondamente interrato nella sabbia.", "Fiori bianchi grandi, con sei tepali stretti e una corona centrale dentata.", "Frutto: capsula con semi neri e leggeri, adatti alla dispersione."],
      en: ["Linear, blue-green leaves rising from a bulb buried deep in the sand.", "Large white flowers with six narrow tepals and a toothed central corona.", "Fruit: a capsule with light black seeds suited to dispersal."] },
    conservation: null,
    sources: ["bartolucci", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/pancratium-maritimum.webp", status: "pending", ai: true, alt: { it: "Giglio di mare con fiori bianchi sulla duna", en: "Sea daffodil with white flowers on a dune" } },
    plate: { type: "rosette", leaf: "lanceolate", leaves: 8, leafL: 150, leafW: 7, spread: 60, flower: "pancratium", stems: [[125, 150, 3], [192, 190, 2.6]], habit: "herb", habitFlower: "pancratium" }
  },
  {
    id: "iris-pseudacorus", scientificName: "Iris pseudacorus", author: "L.", synonyms: [], family: "Iridaceae",
    commonNames: { it: ["Giaggiolo acquatico", "Iris giallo"], en: ["Yellow flag", "Yellow iris"] },
    origin: "autoctona",
    growthForm: { it: "Erbacea perenne rizomatosa", en: "Perennial rhizomatous herb" },
    belts: ["planiziale", "collinare"], routes: ["padana"], habitats: ["zone-umide"],
    regions: "ALL",
    distribution: {
      it: "Sponde di fossi, canali, laghi e paludi in gran parte d'Italia, più frequente in pianura.",
      en: "Banks of ditches, canals, lakes and marshes across much of Italy, most frequent in the lowlands." },
    altitude: { it: "Prevalentemente pianura e bassa collina.", en: "Mainly lowlands and low hills." },
    flowering: [4, 5, 6],
    floweringNote: null,
    description: {
      it: "Iris dai vistosi fiori gialli, tipico delle sponde delle acque ferme o lente. Con il suo rizoma robusto tollera i suoli sommersi.",
      en: "An iris with showy yellow flowers, typical of the banks of still or slow waters. Its strong rhizome tolerates waterlogged soils." },
    features: {
      it: ["Foglie a spada, larghe, verde-glauco, disposte a ventaglio.", "Fiori gialli con tre tepali esterni ricurvi, spesso venati di bruno.", "Rizoma robusto e strisciante.", "Frutto: capsula con semi che galleggiano e sono dispersi dall'acqua."],
      en: ["Broad, sword-shaped, grey-green leaves arranged in a fan.", "Yellow flowers with three outer drooping tepals, often veined brown.", "Stout creeping rhizome.", "Fruit: a capsule whose seeds float and are dispersed by water."] },
    conservation: null,
    sources: ["bartolucci", "pignatti", "portale"],
    quality: { overall: "dimostrativo", regions: "da-verificare", flowering: "dimostrativo" },
    updated: "2026-10-15",
    image: { file: "public/images/species/iris-pseudacorus.webp", status: "pending", ai: true, alt: { it: "Giaggiolo acquatico con fiori gialli lungo una sponda", en: "Yellow flag iris with yellow flowers on a bank" } },
    plate: { type: "rosette", leaf: "lanceolate", leaves: 7, leafL: 250, leafW: 12, spread: 28, flower: "iris", stems: [[118, 130, 2.8], [190, 105, 2.5]], habit: "herb", habitFlower: "iris" }
  }
];

/* Espande "ALL" e "ALL_EXCEPT:x,y" in elenchi di regioni */
FLORA.species.forEach(s => {
  if (s.regions === "ALL") s.regions = FLORA.ALL_REGIONS.slice();
  else if (typeof s.regions === "string" && s.regions.startsWith("ALL_EXCEPT:")) {
    const ex = s.regions.slice(11).split(",");
    s.regions = FLORA.ALL_REGIONS.filter(r => !ex.includes(r));
  }
});
