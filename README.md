# Bienenluft Graf-Hof – Website

Statische Website (HTML/CSS/JS), keine Datenbank, kein Framework, keine externen Dienste.

## Struktur

```
imkerei-website/
├── index.html        Onepager: Start, Über uns, Honig, Galerie, Verkauf, Kontakt
├── impressum.html    Pflicht in Österreich (§ 5 ECG, § 25 MedienG)
├── datenschutz.html  DSGVO-Vorlage
├── css/style.css     Alle Farben/Schriften oben in :root anpassen
├── js/main.js        Menü, Scroll-Animationen, Zähler, Lightbox
├── fonts/            Schriften lokal (Fraunces, Inter – SIL OFL)
└── img/fotos/        Fotos (max. 2000 px, komprimiert)
```

Alle Stellen zum Ausfüllen sind mit `[ECKIGEN KLAMMERN]` markiert
(Suche nach `[` im Editor).

## Bilder einfügen

- Vorher verkleinern (max. ~1600 px Breite, JPG/WebP, < 300 KB pro Bild).
- Galerie: Platzhalter `<div class="img-placeholder">` ersetzen durch
  `<a href="img/galerie/bild1.jpg"><img src="img/galerie/bild1.jpg" alt="Bienenstand im Frühling" loading="lazy"></a>`
- Hero-Hintergrund: in `style.css` bei `.hero` die Zeile `url("../img/hero.jpg") center/cover` einkommentieren.

## Kostenlos online stellen (GitHub Pages)

1. Kostenloses Konto auf github.com anlegen.
2. Neues **öffentliches** Repository erstellen, z. B. `imkerei`.
3. Alle Dateien hochladen („Add file → Upload files“) oder per `git push`.
4. Settings → Pages → Source: „Deploy from a branch“, Branch `main`, Ordner `/ (root)`.
5. Nach 1–2 Minuten erreichbar unter `https://janukalaka.github.io/imkerei-graf/`.
6. Optional: eigene Domain (z. B. `imkerei-name.at`, ca. 10–20 €/Jahr) unter
   Settings → Pages → Custom domain eintragen, „Enforce HTTPS“ aktivieren.

Alternativen mit gleichem Ablauf: Netlify, Cloudflare Pages (Ordner einfach per Drag & Drop hochladen).

## Auf Google Maps eintragen

1. Auf business.google.com ein **Google-Unternehmensprofil** anlegen
   (Name, Kategorie „Imker“ bzw. „Honighändler“, Adresse).
2. Inhaberschaft bestätigen (per Post-Code, Telefon oder Video).
3. Im Profil unter „Website“ die GitHub-Pages-Adresse eintragen.
4. Öffnungszeiten, Fotos (Logo, Bienenstand, Produkte) direkt im Profil hochladen.
5. Danach in `index.html` den Google-Maps-Link bei „Kontakt“ auf das Profil umstellen.

Wichtig: Name, Adresse und Telefonnummer sollten auf Website und Google-Profil
**exakt gleich** geschrieben sein – das hilft beim Ranking.
