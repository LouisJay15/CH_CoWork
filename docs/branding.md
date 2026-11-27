# Branding

The site follows the Charles Hope Coworking Space brand guidelines (CH_Coworking_Space_Brand_Guidelines.pdf, kept
outside this public repository). Everything brand-specific lives in `src/brand/` and `public/brand/`, so a later
revision can be applied without touching pages or components.

## What the guideline sets, and where it is applied

| Guideline | On the site |
|---|---|
| Name: Charles Hope Coworking Space | Page titles, header, footer, WhatsApp and email messages |
| Signature Coral #F8706B | The accent: logo mark, link underlines, section rules, separators, progress bars, the light on the main buttons, the rate card glow |
| Charles Hope Navy #194049 | Headings, body text, buttons, dark bands, footer |
| Warm Ivory #F7F4EF | Page background |
| Soft Sand, Muted Sage, Soft Grey, White | Support: placeholders, borders, cards |
| Playfair Display (headlines), DM Sans (body) | `src/brand/fonts.js`, served from the site |
| Sentence case headlines, uppercase section labels | Headings and the `.overline` labels (with a short coral rule, as on the guideline pages) |
| Logo lockup: CharlesHope wordmark with COWORKING SPACE | `src/brand/Logo.jsx`; navy on light backgrounds, white on dark |
| Proposed tagline: Make room for better work. | Home heading |

**Contrast.** The guideline asks that all text has sufficient contrast. White text on coral is 2.8:1 and navy on a full
coral block is advised against, so coral never carries small text here: buttons are navy with white text (white with
navy text on dark backgrounds), and coral is used as the accent. Navy on ivory is 10.2:1, white on navy 10.9:1.

**Logo files.** `public/brand/wordmark-*.webp` are the CharlesHope wordmark from the guideline PDF, recoloured to the
approved navy, white and coral only (no effects, proportions kept). `public/brand/monogram.svg` and the favicon are
the monogram, traced as vector shapes. When marketing supplies vector logo files, replace the wordmark files and the
`logo` entry in `src/brand/brand.js`.

## Changing it later

| What | Where | How |
|---|---|---|
| Colours | `src/brand/brand.css` | Change the values (keep the names). Re-check contrast: the rules are at the top of the file. |
| Fonts | `src/brand/fonts.js` and `--font-display`, `--font-sans` in `brand.css` | `npm install @fontsource/<family>` or add licensed `.woff2` files, swap the imports, set the two variables. |
| Logo | `public/brand/` and `src/brand/brand.js` | Replace the wordmark files, or point `logo.src` and `logo.srcOnDark` at new ones (with their width and height). |
| Favicon | `public/brand/favicon.svg` | Replace the file (keep the name). |
| Browser bar colour | `index.html`, `<meta name="theme-color">` | Navy, #194049. |
| Rate card glow | `spotlightColor` in `src/brand/brand.js` | A soft coral. |
| Effects colours | `src/components/FloorGallery.jsx`, `MarqueeBand.jsx`, `GlowWhatsAppButton.jsx` | The React Bits components take colours as props; they use the guideline hex values. |
| Link preview image | `public/media/og-image.jpg` | 1200x630 JPEG; a crop of the entrance photo. |

After a change, run `npm run build` and look at the Home page on a phone and a desktop.
