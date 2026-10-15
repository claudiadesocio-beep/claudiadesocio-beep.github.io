/* Flora Italiana — guide botaniche (testi bilingui) */
window.FLORA = window.FLORA || {};

FLORA.guides = [
  {
    id: "farnia-rovere",
    title: { it: "Farnia o rovere?", en: "Pedunculate or sessile oak?" },
    subtitle: { it: "Due querce simili, due ambienti diversi", en: "Two similar oaks, two different habitats" },
    body: {
      it: [
        "La farnia (Quercus robur) e la rovere (Quercus petraea) si confondono facilmente, e in natura formano anche ibridi. Per riconoscerle bastano due caratteri, da osservare insieme.",
        "Il picciolo della foglia: nella farnia è brevissimo e la lamina si allarga alla base in due piccole orecchiette; nella rovere il picciolo è evidente e la base della foglia è a cuneo.",
        "Il peduncolo delle ghiande: nella farnia le ghiande pendono da un lungo peduncolo; nella rovere sono quasi sessili, attaccate direttamente al rametto.",
        "Anche l'ambiente aiuta: la farnia predilige i suoli profondi e umidi delle pianure, la rovere i versanti collinari e montani meglio drenati."
      ],
      en: [
        "Pedunculate oak (Quercus robur) and sessile oak (Quercus petraea) are easily confused, and they also hybridise in the wild. Two features, observed together, are enough to tell them apart.",
        "The leaf stalk: in pedunculate oak it is very short and the blade widens at the base into two small ear-like lobes; in sessile oak the stalk is obvious and the leaf base is wedge-shaped.",
        "The acorn stalk: in pedunculate oak the acorns hang from a long stalk; in sessile oak they are almost stalkless, attached directly to the twig.",
        "Habitat helps too: pedunculate oak prefers deep, moist lowland soils, sessile oak the better-drained slopes of hills and mountains."
      ]
    },
    species: ["quercus-robur", "quercus-ilex"]
  },
  {
    id: "origine",
    title: { it: "Autoctona, endemica, naturalizzata", en: "Native, endemic, naturalised" },
    subtitle: { it: "Le parole per dire da dove viene una pianta", en: "The words for where a plant comes from" },
    body: {
      it: [
        "Autoctona (o nativa) è una specie che si è originata in un territorio o vi è arrivata senza l'intervento umano. Endemica è una specie autoctona il cui areale è limitato a un territorio circoscritto, come l'abete dei Nebrodi in Sicilia.",
        "Alloctona (o aliena) è una specie portata dall'uomo, volontariamente o per caso. Per convenzione si distinguono le archeofite, introdotte prima del 1492, e le neofite, introdotte dopo.",
        "Un'alloctona è casuale se compare in natura senza mantenersi, naturalizzata se forma popolazioni stabili, invasiva se si diffonde rapidamente e altera gli ecosistemi. La robinia è un esempio di aliena invasiva.",
        "Queste categorie seguono la terminologia di Richardson et al. (2000) e Pyšek et al. (2004), adottata dalle checklist nazionali."
      ],
      en: [
        "A native species is one that originated in an area or arrived there without human help. An endemic species is a native species whose range is restricted to a limited area, such as the Sicilian fir in Sicily.",
        "An alien species is one brought by people, deliberately or by accident. By convention, archaeophytes were introduced before 1492 and neophytes after.",
        "An alien is casual if it appears in the wild without persisting, naturalised if it forms stable populations, and invasive if it spreads rapidly and alters ecosystems. Black locust is an example of an invasive alien.",
        "These categories follow the terminology of Richardson et al. (2000) and Pyšek et al. (2004), adopted by the national checklists."
      ]
    },
    species: ["robinia-pseudoacacia", "opuntia-ficus-indica", "abies-nebrodensis"]
  },
  {
    id: "fasce",
    title: { it: "Leggere le fasce altimetriche", en: "Reading altitudinal belts" },
    subtitle: { it: "Perché la vegetazione cambia salendo di quota", en: "Why vegetation changes as you climb" },
    body: {
      it: [
        "Salendo di quota la temperatura media diminuisce e la stagione vegetativa si accorcia. La vegetazione si dispone così in fasce, ognuna con specie dominanti caratteristiche.",
        "I limiti tra le fasce non sono fissi: si alzano verso sud e sui versanti esposti al sole, si abbassano verso nord, sui versanti in ombra e nelle valli fredde. Contano anche il suolo e l'umidità.",
        "Per questo nelle schede non indichiamo quote precise senza una fonte. Il faggio, ad esempio, scende a quote insolitamente basse sul Gargano e sale molto in alto sull'Etna."
      ],
      en: [
        "As you climb, the average temperature falls and the growing season shortens. Vegetation is therefore arranged in belts, each with its own characteristic dominant species.",
        "The limits between belts are not fixed: they rise towards the south and on sunny slopes, and fall towards the north, on shady slopes and in cold valleys. Soil and moisture also play a part.",
        "That is why the entries give no precise altitudes without a source. Beech, for example, grows unusually low on the Gargano and very high on Etna."
      ]
    },
    species: ["fagus-sylvatica", "rhododendron-ferrugineum", "gentiana-acaulis"]
  }
];
