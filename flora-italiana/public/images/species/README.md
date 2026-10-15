# Immagini delle specie

Cartella per le immagini principali delle schede. Finché un file non c'è, il sito mostra la
tavola illustrata disegnata in codice, quindi non compaiono mai immagini rotte.

## Formato

- Formato: **JPG** (le foto attuali) o WebP, proporzione **3:4 verticale**, almeno **900 × 1200 px**, meno di 300 KB.
- Nome del file = identificativo della specie (`id` in `js/data/species.js`) + estensione.
- Soggetto centrato su sfondo neutro chiaro: le schede ritagliano l'immagine al centro.

## Fotografie attuali

Tutte le 17 schede hanno una fotografia di Wikimedia Commons (`<id>.jpg`, 3:4, crediti nella scheda).
Per sostituirne una, segui i passi qui sotto.

## File attesi (elenco originale)

Le prime sei, in ordine di priorità:

| File | Specie | Soggetto suggerito |
|---|---|---|
| `leontopodium-nivale-alpinum.webp` | Stella alpina (*Leontopodium nivale* subsp. *alpinum*, sin. *L. alpinum*) | infiorescenza con brattee bianche lanose, tra le rocce calcaree |
| `papaver-rhoeas.webp` | Papavero comune (*Papaver rhoeas*) | fiore a 4 petali rossi con macchia nera alla base, un bocciolo peloso, una capsula |
| `gentiana-acaulis.webp` | Genziana di Koch (*Gentiana acaulis*) | grande fiore blu a trombetta con macchie verdi nella gola, rosetta di foglie larghe |
| `primula-vulgaris.webp` | Primula comune (*Primula vulgaris*) | fiori giallo pallido singoli su peduncoli, rosetta di foglie rugose |
| `lavandula-stoechas.webp` | Lavanda selvatica (*Lavandula stoechas*) | spighe viola scuro con ciuffo apicale di brattee violacee |
| `myrtus-communis.webp` | Mirto (*Myrtus communis*), macchia mediterranea | rametto con foglie opposte, fiori bianchi con molti stami, bacche blu-nerastre |

Le altre schede usano lo stesso schema: `quercus-ilex.webp`, `chamaerops-humilis.webp`,
`opuntia-ficus-indica.webp`, `quercus-robur.webp`, `robinia-pseudoacacia.webp`,
`fagus-sylvatica.webp`, `pinus-heldreichii.webp`, `abies-nebrodensis.webp`,
`rhododendron-ferrugineum.webp`, `pancratium-maritimum.webp`, `iris-pseudacorus.webp`.

## Come attivare un'immagine

1. Copia il file in questa cartella con il nome indicato sopra.
2. In `js/data/species.js`, nella scheda della specie, cambia `status: "pending"` in `status: "ready"`.
3. Se l'immagine **non** è generata con AI (per esempio una fotografia con licenza), imposta `ai: false`
   e aggiungi i crediti, che il sito mostra nella didascalia:
   `credit: { author: "Nome autore", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:..." }`.
   Usa solo licenze libere (CC0, CC BY, CC BY-SA) e annota che l'immagine è stata ritagliata.
4. Controlla il testo alternativo `alt` (italiano e inglese): deve descrivere ciò che si vede.
5. Esegui `npm test`: il test controlla che ogni immagine segnata come `ready` esista davvero.

Se il file viene cancellato o rinominato per errore, il sito mostra `public/images/fallback.svg`.

## Immagini generate con AI

Le immagini AI hanno solo scopo illustrativo. Il sito le etichetta sempre come
"Immagine generata con AI · illustrativa, non documentale" e non vanno presentate come
fotografie o come prova dell'aspetto reale di una specie. Prima di attivarne una, confrontala con
una fonte botanica (ad esempio Acta Plantarum o il Portale della Flora d'Italia): numero di petali,
colore, forma delle foglie e portamento devono corrispondere alla specie indicata.
