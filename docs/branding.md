# Branding: swapping in the approved guideline

The current logo, colours and fonts are **placeholders**. Everything brand-specific lives in `src/brand/` and
`public/brand/`, so the approved guideline can be applied without touching pages or components.

| What | Where | How |
|---|---|---|
| Colours | `src/brand/brand.css` | Change the values of the variables (keep the names). Text on the primary colour is `--on-primary`. |
| Fonts | `src/brand/fonts.js` and `--font-display`, `--font-sans` in `brand.css` | Install the new families (for example `npm install @fontsource/<family>`) or add licensed `.woff2` files, swap the imports, then set the two variables. |
| Logo | `public/brand/` and `src/brand/brand.js` | Add `logo.svg` (and `logo-white.svg` for the dark hero), then set `logo: { src: "brand/logo.svg", srcOnDark: "brand/logo-white.svg", width, height }`. The header and menu pick it up. |
| Favicon | `public/brand/favicon.svg` | Replace the file (keep the name), or change the `<link rel="icon">` in `index.html`. |
| Browser bar colour | `index.html`, `<meta name="theme-color">` | Set to the new dark brand colour. |
| Rate card glow | `spotlightColor` in `src/brand/brand.js` | Usually the accent colour. |
| Link preview image | `public/media/og-image.jpg` | 1200x630 JPEG; currently a crop of the entrance photo. |

After a change, check contrast (the rules are at the top of `brand.css`), then run `npm run build`.
Nothing else in the site uses a brand colour directly: the stylesheet mixes these variables for tints and shadows.
