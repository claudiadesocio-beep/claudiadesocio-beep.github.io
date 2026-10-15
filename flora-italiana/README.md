# Flora Italiana

Prototipo di enciclopedia illustrata della flora spontanea italiana, in italiano e inglese.
È un sito statico in HTML, CSS e JavaScript semplici: nessun framework, nessuna dipendenza, nessuna chiave API.

## Avvio

**Metodo 1, il più semplice.** Fai doppio clic su `index.html`: si apre nel browser e funziona.

**Metodo 2, con un piccolo server locale (consigliato durante lo sviluppo).** Dal Terminale:

```bash
cd ~/Desktop/"Flora Italiana"
python3 -m http.server 8000
```

Poi apri <http://localhost:8000> nel browser. Per fermare il server premi `Ctrl+C`.
Se hai Node.js installato puoi usare anche `npm start`.

**Test dei dati:**

```bash
npm test
```

oppure, senza npm: `node tests/run-tests.mjs`.

## Struttura

```
index.html                 pagina unica; carica stile, dati e logica
css/style.css              colori (token per tema chiaro e scuro), tipografia, layout responsive
js/data/taxonomy.js        vocabolari: regioni, fasce, habitat, percorsi, origini, qualità, bibliografia
js/data/species.js         schede delle specie (una per specie, testi { it, en })
js/data/guides.js          guide botaniche
js/i18n/it.js, en.js       testi dell'interfaccia per lingua
js/core.js                 lingua, traduzioni, preferiti, filtri del catalogo
js/illustrations.js        tavole botaniche disegnate in SVG (immagini di riserva)
js/components.js           schede, mappa, profilo altimetrico, badge
js/pages.js                pagine del sito
js/main.js                 intestazione, router (#catalogo, #specie-…), eventi
public/images/species/     immagini delle specie (vedi README nella cartella)
public/images/hero/        immagine della homepage
public/images/fallback.svg immagine mostrata se un file manca
tests/run-tests.mjs        controlli automatici su dati e traduzioni
archivio/                  versione 1 del prototipo (file unico), conservata per riferimento
```

## Aggiungere una specie

1. Apri `js/data/species.js` e copia una scheda esistente simile (per esempio un'erbacea).
2. Cambia `id` (minuscolo, con trattini: `genere-specie`), nome scientifico, autore e famiglia.
3. Compila i testi in **entrambe** le lingue (`{ it: "...", en: "..." }`). Se una traduzione non è disponibile,
   lascia solo la lingua che hai: il sito mostrerà il testo nell'altra lingua con l'avviso "traduzione mancante".
4. Usa solo valori dei vocabolari in `js/data/taxonomy.js` per `belts`, `habitats`, `routes`, `regions`, `origin`.
5. Indica le fonti (`sources`) con le chiavi della bibliografia; se la fonte è nuova, aggiungila in `FLORA.sources`.
6. Imposta `quality`: `"dimostrativo"` per testi non revisionati, `"da-verificare"` per dati incerti,
   `"verificato"` solo dopo il controllo di un revisore.
7. Non inventare dati: se un'informazione manca, usa `null` (per esempio `conservation: null`).
8. Esegui `npm test`: segnala campi mancanti, id duplicati, regioni o habitat sconosciuti.

Per l'illustrazione di riserva copia un `plate` da una specie dalla forma simile (`branch`, `herb`, `rosette`, `needle`…).

## Aggiungere una lingua

1. Copia `js/i18n/en.js` in `js/i18n/de.js` (per esempio) e traduci i valori, lasciando invariate le chiavi.
2. Aggiungi `<script src="js/i18n/de.js"></script>` in `index.html` dopo gli altri file di lingua.
3. In `js/core.js` aggiungi `"de"` a `F.LANGS`.
4. Aggiungi la chiave `de` ai testi delle schede quando sono disponibili: dove manca, il sito lo segnala.
5. In `tests/run-tests.mjs` aggiungi `"de"` a `LANGS` per controllare la completezza.

## Aggiungere immagini

Le istruzioni complete sono in `public/images/species/README.md`. In breve: copia il file con il nome
`<id>.jpg` (o `.webp`), poi nella scheda indica il file in `image.file` e cambia `image.status` da `"pending"` a `"ready"`.
Le schede attuali usano fotografie di Wikimedia Commons con licenza libera: per ogni fotografia (`ai: false`)
il campo `image.credit` con autore, licenza e pagina della fonte è obbligatorio, e il sito lo mostra nella didascalia
e nella pagina "Metodo e fonti". Le immagini generate con AI (`ai: true`) restano etichettate come illustrative.

Le miniature di foglie, fiori, frutti e portamento stanno in `public/images/species/parts/` (`<id>-<parte>.jpg`, quadrate)
e si attivano con il campo `photos` della scheda (`leaves`, `flowers`, `fruits`, `habit`), ognuna con `file`, `alt` e `credit`.
Se una parte manca, il sito mostra la tavola disegnata.

## Cosa manca per le estensioni future

| Funzione | Stato | Cosa serve |
|---|---|---|
| Mappa interattiva con confini reali | mappa schematica a riquadri già attiva | confini regionali in GeoJSON con licenza aperta (es. ISTAT) e una libreria di mappe come Leaflet o D3 |
| Specie documentate per regione | attiva (`#regione-…`) | presenze regionali verificate sul Portale della Flora d'Italia, con fonte per ogni regione |
| Calendario e "Cosa fiorisce adesso" | attivi (`#fioriture`) | periodi di fioritura verificati; in futuro anche per fascia altimetrica |
| Preferiti | attivi, salvati nel browser (`localStorage`) | per sincronizzarli tra dispositivi servirebbero account utente e un server |
| Database | dati in file JS strutturati come tabelle | per un catalogo grande: SQLite o PostgreSQL, con le stesse tabelle (specie, nomi, presenze regionali, fonti, immagini) e un'API che restituisca lo stesso formato |
