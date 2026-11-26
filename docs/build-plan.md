# Charles Hope Cowork: Lovable build plan

**Public name:** Charles Hope Cowork  
**Place:** 81 Loop Street, 9th floor, Cape Town, inside the Charles Hope hotel (a 41-room boutique hotel)  
**Restaurant:** Noah, on site  
**For:** Lovable to build and host the marketing site, following this plan step by step  
**Source of truth:** `CharlesHope_CoWork_Lovable_Website_Guide.md` for rates, colours, assets and confirmed facts, together with the locked rules in section 0 of this plan (WhatsApp prefills that name the page, prices shown incl. VAT, the confirmed boardroom rates, a Screen desk with two monitors, the glass pod and phone booths included in desk rates, the hotel and Noah benefits with no figures, rooms bookable by time slot on WhatsApp, telephone 021 600 6826 as a secondary contact, hosting on the default Lovable URL, and no data-storing form in this version). If a rate, address or photograph were to conflict, section 0 and the guide win over any later flourish in a component description.  
**Status:** Builder execution plan and draft copy only. Nothing in this file is to be published as a public page.  
**Hosting:** Lovable hosts the site on its default Lovable URL. There is no custom domain yet. Do not register or connect a domain from this plan. A custom domain can be connected later, at which point `SITE_URL` is updated. Set `SITE_URL` to the project's default Lovable HTTPS URL (no trailing slash) as soon as the project exists, and use that constant for canonical tags, `sitemap.xml`, Open Graph and JSON-LD.

**How to use this file.** Paste this plan into Lovable and attach the website guide, the seven photographs, `cowork-tour.mp4` and its poster (section 10.2). If Lovable will not take the MP4 as an attachment, add it to `public/video/` through the project's GitHub sync. Text marked **Final copy** or shown in a copy block is for the public site. Square-bracket tokens such as `[HOTEL WEBSITE URL]` are builder inputs only; never render them on the site. Do not mention this plan, the builder, prompts or how the copy was prepared, anywhere on the public site.

---

## 0. Hard rules (read before writing any code)

1. Never invent opening hours, room capacities, Wi-Fi speeds, parking details, email addresses, further phone numbers, walking times, discounts, or prices. If a fact is not in this plan, omit it or send the visitor to WhatsApp. Never show a placeholder, bracket token or "to confirm" note on the live site (section 17).
2. All published prices include VAT. Show **Prices shown incl. VAT.** on every price list and on the calculator. Do not claim that prices exclude VAT. Do not add VAT again in the calculator arithmetic.
3. Use only these rates: Basic R3,000 per month and R280 per day; Screen R3,750 per month and R350 per day (a Screen desk includes two monitors); hotel guest R200 per day; private workspace R450 per day; boardroom R1,500 for four hours and R4,000 for a full day. The glass meeting pod and the phone booths are included in the monthly and day-pass desk rates, and in the hotel guest desk rate; they have no separate price, and are booked by time slot on WhatsApp. Coffee is included in the desk rates.
4. Do not use any day-pass figures other than R280 and R350.
5. The Charles Hope hotel is a 41-room boutique hotel. Never call it serviced apartments.
6. The only public address is **81 Loop Street, 9th floor, Cape Town**. Never use 78 Loop Street.
7. Public contact: WhatsApp **+27 68 947 8807** is the primary call to action for bookings and quotes. Telephone **021 600 6826** (`tel:+27216006826`) is the secondary contact, shown in the footer, on Location and on Book / Enquire, and in JSON-LD `telephone`. Email **louis@charleshope.co.uk** is shown in the footer, on Book / Enquire, in the privacy notice, and in JSON-LD `email`. The responsible party is **CHARLES HOPE SA (PTY) LTD**, shown in the footer copyright, on Terms, and in the privacy notice. Do not invent a further phone number or a social URL.
8. No em dashes, and no en dashes used as a dash, in site copy or UI strings. Use a comma, a hyphen, or the word "to".
9. Do not hide or blur published prices. Do not invent reviews, stats, awards or "you save" lines.
10. Do not take online payment or collect card details. Do not add a shop, membership login or booking system in this version.
11. Do not use stock photographs or fabricated interiors. Do not edit people or furniture into photographs.
12. Primary CTA text is `#111111` on `#FF6661`. Never use white text on `#FF6661`.
13. The site does not store personal data in this version. All enquiries go to WhatsApp. Do not add a data-storing form unless later approved.
14. Photos are the primary imagery on every page except the Home tour. The only video is `cowork-tour.mp4`, moved by scroll in the Home tour on large screens (section 6.19). It never plays sound, never autoplays and never loops.

---

## 1. Goal and conversion

Charles Hope Cowork is a hot-desk workspace on the 9th floor at 81 Loop Street, Cape Town, inside the Charles Hope hotel. Noah is the hotel's on-site restaurant.

**Primary goal:** every page must lead the visitor to WhatsApp +27 68 947 8807 to book a site inspection and request a quote. Every booking, quote and enquiry button opens `https://wa.me/27689478807?text=` with a URL-encoded prefilled message that names the page, and, if a calculator or Find your setup selection exists, the option and the estimated total.

**Secondary goal:** explain desks, rates, bookable rooms, the hotel and Noah benefits, and the location, so an attorney, advocate, consultant or hotel guest can decide whether to visit.

**Launch booking rule:** quotes are confirmed on WhatsApp. Monthly desks are then collected by invoice and EFT. Do not add a payment link on the live site. Payment is arranged on WhatsApp. Do not collect card details.

**Public wordmark.** Use **Charles Hope Cowork** (with spaces) in headings and sentences. The timber-wall mark in the photographs reads **CharlesHope**. Use that compact treatment only as a photo crop, not as the written name in body copy.

**Audience:** visiting attorneys (including those in Cape Town for the High Court), advocates, consultants, hotel guests who need a desk, and professionals who want a desk for a day or a month. Tone: professional, warm, plain words, short sentences. Do not publish a walking time to the High Court.

---

## 2. Tech stack

Use the default Lovable stack:

- React, with TypeScript preferred
- Tailwind CSS
- shadcn/ui
- Hosting on the default Lovable URL. Define a single constant `SITE_URL` set to that URL (HTTPS, no trailing slash) as soon as the project exists, and use it for canonical tags, `sitemap.xml`, Open Graph and JSON-LD. A custom domain can be connected later; do not register one from this plan.
- Google Fonts: DM Serif Display (headings) and Work Sans 400, 500, 600 (body and UI), loaded with `display=swap`
- Google Maps embed on the Location page, pinned by address "81 Loop Street, Cape Town", captioned "81 Loop Street, 9th floor, Cape Town" (section 6.16). Do not invent coordinates or a plus code.
- React Bits, four components only, TypeScript + Tailwind (section 5)

**Routing (React Router or the host equivalent):**

| Page | Path | Main nav |
|---|---|---|
| Home | `/` | Logo |
| Desks and pricing | `/desks-and-pricing` | Yes |
| Day pass | `/day-pass` | Yes, or under Desks |
| Hotel guests | `/hotel-guests` | Yes |
| Amenities | `/amenities` | Yes |
| Location | `/location` | Yes |
| FAQ | `/faq` | Yes, or footer |
| Book / Enquire | `/book` | Yes, styled as the WhatsApp CTA |
| Terms and house rules | `/terms` | Footer only |
| Privacy | `/privacy` | Footer only |

Document language: `lang="en-ZA"`. Optional footer links for the hotel and Noah only when `[HOTEL WEBSITE URL]` and `[NOAH URL]` are supplied. External links use `target="_blank"` and `rel="noopener noreferrer"`.

---

## 3. Build order (phases)

Complete each phase, and the checks at the end of it, before starting the next. Do not skip the design tokens or the WhatsApp helper to "fill in later".

### Phase A: Project shell

1. Create the React + Tailwind + shadcn app on the default Lovable host. Set `SITE_URL` to that project's default Lovable HTTPS URL (no trailing slash). Do not register or connect a custom domain in this version.
2. Set `lang="en-ZA"` on the document.
3. Add the design tokens in section 4 (colours, fonts, type scale, spacing, radius, shadows) to `tailwind.config` (or the Tailwind v4 `@theme` block).
4. Add Google Fonts (DM Serif Display, Work Sans 400/500/600, `display=swap`).
5. Create the ten routes in section 2, each rendering a temporary page heading until Phase D.
6. Build `Header`, `Footer` and `StickyWhatsApp` (section 6) with the default WhatsApp link.
7. Upload photographs to `/public/images/` and the video plus poster to `/public/video/` (section 10). Generate WebP companions for each JPEG.
8. Add `/privacy` with the privacy notice in section 11.10 before any other content work. Analytics stay off.

**Phase A check:** every route loads, the header and footer appear, the sticky button opens WhatsApp with the default prefilled message, images resolve, no console errors.

### Phase B: WhatsApp and calculator core

9. Implement `buildWhatsAppUrl({ page, option, estimate })` (section 7). Cover default, page-only, and page plus option plus estimate.
10. Implement the rate table and `estimate(selection)` (section 8). Do not add VAT, fees or discounts in the arithmetic.
11. Write the test cases in section 8.5 and confirm each expected total.
12. Build `PriceNote` (the line `Prices shown incl. VAT.`) and `EstimateDisclaimer`.
13. Build `DeskCalculator` in full and compact modes, including the 1 to 20 desk range (no assumption note), live breakdown and day-pass hint.
14. Build `FindYourSetup` (section 9) with back, skip-to-room, and no email gate.

**Phase B check:** all calculator test cases pass; WhatsApp URLs encode correctly; changing the slider updates the total and the prefilled message in the same render.

### Phase C: Home and global look

15. Build the Home hero: tour poster as a still, dark overlay, white heading, coral CTA with `#111111` text, and a `Tour the floor` link (sections 6.11 and 11.1). No video in the hero.
16. Install only the four React Bits components (section 5). Apply Split Text to the Home heading only.
17. Build `ScrollTour` (section 6.19) in all three modes, then add the compact calculator, hotel and Noah band, rates-at-a-glance Spotlight Cards, and close band.
18. Wire `prefers-reduced-motion`, the viewport width and the data-saver checks so the tour picks the right mode and the clip is fetched only in `scrub` mode.

**Phase C check:** Home matches section 11.1. On desktop the tour clip moves smoothly forwards and backwards with scroll in Chrome, Safari and Firefox, and each caption appears over its area. Mobile shows the photo tour and never fetches the MP4. Reduced-motion users see the static list. `Skip the tour` works from the keyboard. No white text on orange.

### Phase D: Remaining pages

19. Desks and pricing: rate tables, room table, full calculator, Find your setup, photographs, WhatsApp CTA.
20. Day pass, Hotel guests (including the hotel tie-in with no discount figures), Amenities, Location (map by address only), FAQ, Book, Terms, Privacy.
21. Add SEO titles, meta descriptions, Open Graph and JSON-LD (section 12). Use `SITE_URL` for canonical, sitemap, Open Graph and JSON-LD URLs. No invented hours or geo in schema. JSON-LD `telephone` is `+27216006826`. JSON-LD `email` is `louis@charleshope.co.uk`. JSON-LD `legalName` is `CHARLES HOPE SA (PTY) LTD`.

**Phase D check:** run the per-page acceptance list in section 16.

### Phase E: Quality, security, launch readiness

22. Accessibility pass (section 13): keyboard, focus rings, contrast, alt text, reduced motion, 44px targets.
23. Performance pass (section 14): WebP, dimensions, lazy-load below the fold, no tour clip fetch outside `scrub` mode.
24. Apply security headers and CSP as far as the host allows (section 15). Record any header the host cannot set.
25. Confirm there is no data-storing form, no analytics, no payment fields, and no secrets in the client bundle.
26. Walk the "Things not to do" list in section 18. Fix any failure before calling the build complete.

**Phase E check:** the site is ready for Louis's review on the default Lovable URL. Do not register or connect a custom domain, and do not connect analytics, without his yes.

---

## 4. Design tokens

### 4.1 Colours (use only these)

| Token | Hex | Role |
|---|---|---|
| `primary` | `#FF6661` | Buttons, links, active states, logo accent. An orange/red. |
| `ink` | `#111111` | Text on `primary` buttons and on light backgrounds. Body text may use `#111111` or `#454443`. |
| `secondary` | `#454443` | Dark grey. Headings on pale pages, hero overlay, footer background. |
| `accent` | `#90DFF5` | Sky blue. Underlines, chips, focus glow, selected calculator state. |
| `deep` | `#193f48` | Deep teal. Footer band or dark section. Never treat this as a light colour. |
| `mid` | `#47656D` | Mid teal. Captions, labels, muted text on pale backgrounds. |
| `light` | `#E1F1F4` | Light teal tint. Page background, section bands, card wash. |
| `white` | `#FFFFFF` | Cards, hero headline on the dark overlay, footer text. |
| `rule` | `rgba(25, 63, 72, 0.12)` | Card and table borders (`#193f48` at 12%). |

Do not add a fifth brand colour. Do not set any text in `#FF6661` on white or `#E1F1F4`, at any size or weight (2.87:1 and 2.47:1, both below even the 3:1 large-text minimum). Use `#FF6661` for fills, underlines and borders, with text in `#111111` or `#193f48`.

### 4.2 Contrast (do not break these)

| Pairing | Contrast | Rule |
|---|---|---|
| White on `#FF6661` | about 2.87:1 | Fails WCAG AA. Never use white text on the primary button, including hover and focus. |
| `#111111` on `#FF6661` | about 6.59:1 | Required text colour on every primary button, chip and price badge that sits on `#FF6661`. |
| `#454443` on `#E1F1F4` | about 8.37:1 | Preferred body text on the light teal tint. |
| `#193f48` on `#E1F1F4` | about 9.8:1 | Headings on the light tint. |
| `#47656D` on `#E1F1F4` | about 5.4:1 | Captions and labels. Keep caption type at 14px or larger. |
| `#FF6661` text on white or `#E1F1F4` | about 2.87:1 / 2.47:1 | Fails at every size. Never use coral as a text colour on a pale background. |
| `#90DFF5` on white or `#E1F1F4` | about 1.49:1 / 1.29:1 | Too faint for a focus ring on a pale background. Use it only on dark backgrounds. |
| `#FFFFFF` on `#193f48` | about 11.4:1 | Footer and dark-band text. |
| `#FFFFFF` on `#454443` | about 9.7:1 | Hero headline over the dark overlay. |

Hero overlay: tint `#454443` or `#193f48` at 55% to 65% over the hero image. Prefer about 65% so body-size type on the hero meets contrast if windows in the image are bright. White is allowed for the large hero heading only, because it sits on the overlay, not on `#FF6661`. The hero CTA is still `#111111` on `#FF6661`. If a short line of body-size type sits on the hero, put a stronger local scrim behind that line.

Focus rings: 2px solid, offset 2px. Because of the offset, the ring is seen against the background around the control, so choose its colour by that background: `#90DFF5` on dark backgrounds (`#193f48`, `#454443`, the hero overlay), and `#193f48` on white or `#E1F1F4`, including a coral button that sits in a pale section.

### 4.3 Tailwind config

If the project uses Tailwind v3, add this to `theme.extend`. If it uses Tailwind v4, map the same tokens in `@theme`. Do not replace the default spacing scale; extend it.

```js
// tailwind.config.js (theme.extend)
{
  colors: {
    primary: "#FF6661",
    ink: "#111111",
    secondary: "#454443",
    accent: "#90DFF5",
    deep: "#193f48",
    mid: "#47656D",
    light: "#E1F1F4",
  },
  fontFamily: {
    display: ['"DM Serif Display"', "Georgia", "serif"],
    sans: ['"Work Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
  },
  fontSize: {
    overline: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "600" }],
    caption: ["0.875rem", { lineHeight: "1.5" }],
    body: ["1rem", { lineHeight: "1.6" }],
    "body-lg": ["1.125rem", { lineHeight: "1.6" }],
    h3: ["1.25rem", { lineHeight: "1.3", fontWeight: "500" }],
    h2: ["1.75rem", { lineHeight: "1.25" }],
    h1: ["2.25rem", { lineHeight: "1.2" }],
    display: ["3rem", { lineHeight: "1.15" }],
  },
  borderRadius: {
    card: "1rem",
    "card-lg": "1.5rem",
    button: "0.75rem",
    pill: "9999px",
  },
  boxShadow: {
    card: "0 8px 24px rgba(25, 63, 72, 0.08)",
    "card-hover": "0 12px 32px rgba(25, 63, 72, 0.12)",
    sticky: "0 -4px 16px rgba(25, 63, 72, 0.10)",
  },
  maxWidth: {
    site: "72rem",
  },
}
```

### 4.4 Type scale in use

Load fonts as:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Work+Sans:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

| Style | Font | Mobile | Desktop | Line height | Use |
|---|---|---|---|---|---|
| Display / Home H1 | DM Serif Display | 32px | 48px | 1.15 | Home hero heading only |
| H1 (inner pages) | DM Serif Display | 32px | 36px | 1.2 | Page titles |
| H2 | DM Serif Display | 24px | 32px | 1.25 | Section headings |
| H3 | Work Sans 500 or 600, or DM Serif Display | 20px | 24px | 1.3 | Card titles, calculator result |
| Body | Work Sans 400 | 16px | 18px | 1.6 | Paragraphs |
| Body emphasis | Work Sans 500 | 16px / 18px | same | 1.6 | Nav, button labels |
| Caption / table | Work Sans 400 | 14px | 14px | 1.5 | Photo captions, incl. VAT line, estimate disclaimer |
| Overline | Work Sans 600 | 12px | 12px | 1.4 | "Rates at a glance", "incl. VAT" |
| Price figure | Work Sans 600 | 24px | 32px | 1.2 | Calculator total. Never use a counting animation. |

Do not set body text smaller than 16px. Do not italicise prices.

### 4.5 Spacing, layout, radius, shadows

**Spacing scale to use in components:** 4, 8, 12, 16, 24, 32, 40, 48, 64, 80 and 96 px (`1`, `2`, `3`, `4`, `6`, `8`, `10`, `12`, `16`, `20`, `24` in Tailwind).

**Layout:**

- Page background: `#E1F1F4`.
- Content column: `max-w-site` (72rem) centred, horizontal padding 20px on small screens and 24px from `md` up.
- Section vertical padding: 40px on small screens, 64px from `md` up, 80px only for the Home close band if it needs more air.
- Stack of sections: alternate a white band and a `#E1F1F4` band so the page has a clear rhythm. The footer is `#193f48` or `#454443` with white text.
- Grid: 4 columns on small screens, 8 from `md`, 12 from `lg`. Card grids are 1 column, then 2, then 3.

**Radius:**

- Cards and the calculator panel: `rounded-card` (16px). A large Spotlight Card may use `rounded-card-lg` (24px).
- Primary and secondary buttons: `rounded-pill` (fully rounded) or `rounded-button` (12px). Pick one and use it on every button. Prefer `rounded-pill` for the game-like feel.
- Chips and the WhatsApp sticky: `rounded-pill`.
- Inputs, if any later form is approved: `rounded-button`.
- Photograph frames: `rounded-card`, `overflow-hidden`.
- Tables: `rounded-card` on the wrapper, with `overflow-hidden`.

**Borders and shadows:**

- Default card: white (or very light `#E1F1F4`) background, `1px` border `rgba(25, 63, 72, 0.12)`, `shadow-card`.
- Hover on a non-button card may use `shadow-card-hover`. Do not lift or tilt cards in a way that hides price text.
- Sticky mobile bar: `shadow-sticky`.

**Buttons:**

- Primary: background `#FF6661`, text `#111111`, font Work Sans 600, min height 44px, horizontal padding 24px. Hover: slightly darker orange (mix `#FF6661` with 8% `#111111`, about `#EA5E5A`; `#111111` on it is about 5.6:1) and the same `#111111` text. Focus: ring colour per section 4.2 (`#193f48` in pale sections, `#90DFF5` on dark ones). Disabled: 40% opacity and `aria-disabled`.
- Secondary: transparent or white, 2px border `#193f48` or `#FF6661`, text `#193f48` or `#111111`. Never a white fill with white text.
- Ghost / text link: `#193f48` text with an underline, which may be `#FF6661`. Do not set link text in `#FF6661` on a pale background (see section 4.2).

**Prices in typography:** always written as text, for example `R3,000 per month`, never as a graphic or a blurred block.

### 4.6 Look and feel

Aim for a professional, slightly playful site, closer to charleshopeliving.com than to a stiff corporate template:

- Friendly progress steps in Find your setup (1 of 3, 2 of 3, 3 of 3).
- Immediate "reward": the live estimate updates as the slider moves.
- Light React Bits only (section 5).
- Clear chips for Basic / Screen, monthly / day pass, and room types.

Do not copy the Living site's white text on coral, its "serviced apartment" wording, or any of its prices. Do not add a score, a timer, or a confetti effect.

---

## 5. Motion and React Bits

Use React Bits lightly. Install the TypeScript + Tailwind versions:

```bash
npx shadcn@latest add @react-bits/SplitText-TS-TW
npx shadcn@latest add @react-bits/SpotlightCard-TS-TW
npx shadcn@latest add @react-bits/FadeContent-TS-TW
npx shadcn@latest add @react-bits/ScrollReveal-TS-TW
```

**Allowed uses:**

| Component | Where | Rule |
|---|---|---|
| Split Text | Home hero heading only: "A desk in the city, inside Charles Hope." | One heading. Put the full sentence in `aria-label` on the `<h1>` and `aria-hidden="true"` on the split letter spans, so screen readers do not read it letter by letter. If `prefers-reduced-motion: reduce`, render the heading as static text. |
| Spotlight Card | Pricing cards on Home and on Desks and pricing | Keep all prices fully visible. The spotlight is a hover glow, not a hide. |
| Fade Content | Section intros below the Home fold, Amenities blocks | Short fade only. |
| Scroll Reveal (optional) | One short intro line under a section heading | At most one line per section. |

**Do not use:** Count Up, any WebGL or canvas background, cursor trails, image trails, or a second heading animation. Do not animate prices, rates, VAT notes, legal copy, or form labels (if a form is later added).

**Reduced motion (required):**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

When this media query matches: the Home tour uses `static` mode (section 6.19) and never fetches the clip; render Split Text and Scroll Reveal as static text; keep Fade Content at full opacity.

On viewports under 768px, or when `navigator.connection.saveData` is true or `effectiveType` is `2g` or `slow-2g`, the Home tour uses `photos` mode and never fetches the clip. This is the default for mobile in this version.

The Home tour is built with plain React, `requestAnimationFrame` and `IntersectionObserver`. It is not a React Bits component and needs no animation library.

---

## 6. Component inventory

Build these components once and reuse them. Prop names may be adapted to the host's conventions, but the behaviour must match.

### 6.1 `WhatsAppButton`

**Purpose:** the only enquiry path in this version.

**Props:**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `page` | string, required | | Human page name, for example `"Home"` or `"Desks and pricing"` |
| `option` | string, optional | none | Calculator or card summary |
| `estimate` | number, optional | none | Integer rand total, no cents |
| `label` | string | `"Book a site inspection on WhatsApp"` | Visible label |
| `variant` | `"primary"` \| `"secondary"` \| `"sticky"` | `"primary"` | |
| `fullWidth` | boolean | false | |

**States:** default, hover, focus-visible, active, disabled (only if WhatsApp URL cannot be built).

**Behaviour:** `href` is the return value of `buildWhatsAppUrl`. `target="_blank"` and `rel="noopener noreferrer"`. The accessible name is the label plus ", opens WhatsApp in a new tab".

### 6.2 `StickyWhatsApp`

Fixed to the bottom of the viewport from `0` to `md` (under 768px). Hidden from `md` up if the header already shows a WhatsApp control, or kept as a compact corner button if the header CTA is easy to miss. Contains `WhatsAppButton` with `variant="sticky"`, `page` set to the current page name, and any live calculator `option` and `estimate` if those exist on the page. Min height 56px including safe-area inset. Must not cover the last section's text; add `pb-20` (or more) on the page content on small screens. `aria-label` as above.

### 6.3 `Header`

Logo left: the wordmark "Charles Hope Cowork", text or a later SVG, linking to `/`. Colour `#193f48` or `#454443` on pale headers; white when the header sits on a dark Home hero until the page scrolls.

Nav links (desktop): Desks and pricing, Day pass (optional if grouped), Hotel guests, Amenities, Location, FAQ, then a primary `WhatsAppButton` labelled "WhatsApp us" with `page` of the current page.

Mobile: hamburger or "Menu" button, `aria-expanded`, focus trap when open, Esc and overlay click to close, focus return to the button. Menu includes the same links plus the WhatsApp button.

States: default, scrolled (solid `#E1F1F4` or white background, `shadow-card`), open (mobile), current page (`aria-current="page"`).

### 6.4 `Footer`

Background `#193f48` or `#454443`, text white. Contains:

- Charles Hope Cowork
- 81 Loop Street, 9th floor, Cape Town
- Inside the Charles Hope hotel, a 41-room boutique hotel. Noah is the on-site restaurant.
- WhatsApp +27 68 947 8807 (the default or page-named prefill), as the primary contact
- Telephone 021 600 6826 (`tel:+27216006826`), as the secondary contact
- Nav: Home, Desks and pricing, Day pass, Hotel guests, Amenities, Location, FAQ, Book
- Footer-only: Terms and house rules, Privacy
- Optional hotel and Noah links when URLs are supplied
- Email louis@charleshope.co.uk (`mailto:louis@charleshope.co.uk`)
- Copyright line: © 2026 CHARLES HOPE SA (PTY) LTD

Show telephone 021 600 6826 and email louis@charleshope.co.uk in the footer, beneath or beside WhatsApp. Do not invent a further phone number, opening hours, or social icons. Omit hotel and Noah links on the live site until those URLs are supplied.

### 6.5 `PriceNote`

Renders exactly: `Prices shown incl. VAT.` Caption style, `#47656D`. Used under every rate table, under the calculator total, and beside "Rates at a glance".

### 6.6 `EstimateDisclaimer`

Renders: `This estimate is not a quote. We will confirm availability and the final amount on WhatsApp.` Caption style.

### 6.7 `AssumptionNote`

This component is not used for public "to confirm" or "working assumption" notes. Unconfirmed facts are omitted from the live site, not labelled as a TODO.

### 6.8 `RateTable`

Props: `rows` (array of `{ label, monthly?, daily?, note? }`), `caption`. Renders a semantic `<table>` with a header row, not a grid of typography that looks like a table. Includes `PriceNote` underneath.

### 6.9 `SpotlightPriceCard`

Props: `title`, `priceLabel` (for example `"R3,000"`), `period` (for example `"per month"`), `hint` (optional), `href` (internal route or WhatsApp), `page`, `option`. Uses the React Bits Spotlight Card. Price stays fully visible in every state (default, hover, focus). CTA uses `#111111` on `#FF6661`.

### 6.10 `Photo` and `PhotoGallery`

`Photo` props: `src`, `webpSrc`, `alt` (required, from section 10), `caption` (optional), `priority` (boolean; true only for the LCP image), `sizes`, `objectPosition` (use `right` or a crop towards the desks on `05-open-plan-desks.jpg` so fire equipment on the right is less prominent).

`PhotoGallery` props: `items` (list of Photo props). On Amenities (Home uses the scroll tour instead of a gallery), a responsive grid: 1 column, then 2, then 3. Lightbox is optional; if added, it must be keyboard-accessible (Esc, arrows, focus trap) and use the same alt text. No autoplay.

### 6.11 `HeroMedia`

Used only on Home. Props: `posterSrc` (`/video/cowork-tour-poster.webp`, with `/video/cowork-tour-poster.jpg` as the JPEG fallback in a `<picture>`), `fallbackPhotoSrc` (`/images/01-entrance-live-work-stay.jpg`, used if the poster is missing).

**Behaviour:**

- Renders one still image under a 55% to 65% `#454443` or `#193f48` overlay: eager, `fetchpriority="high"`, `width` and `height` set. It is the Home LCP image. It is decorative behind the heading, so `alt=""`.
- There is no `<video>` in the hero, on any viewport. The walkthrough is shown by `ScrollTour` directly below (section 6.19), which starts from the same frame, so the hero flows into the tour.
- The heading and CTA sit in a column with sufficient contrast.

### 6.12 `DeskCalculator`

Props: `variant`: `"full"` | `"compact"`. Compact is Home (and optionally Day pass). Full is Desks and pricing.

**Internal state:**

| Field | Type | Default | Notes |
|---|---|---|---|
| `product` | `"hot-desk"` \| `"hotel-guest"` \| `"private-workspace"` \| `"boardroom"` | `"hot-desk"` | |
| `deskType` | `"basic"` \| `"screen"` | `"basic"` | Hidden when product is not hot-desk |
| `term` | `"monthly"` \| `"day-pass"` | `"monthly"` | Hot desk only |
| `desks` | integer 1 to 20 | `1` | Used for hot-desk and hotel-guest only |
| `days` | integer, minimum 1 | `1` | Day-pass, hotel-guest, private workspace |
| `boardroomLength` | `"four-hours"` \| `"full-day"` | `"four-hours"` | Boardroom only |
| `slots` | integer, minimum 1 | `1` | Boardroom only |

**UI:**

- Product radio or chips: Hot desk, Hotel guest, Private workspace, Boardroom.
- For a hot desk: Basic / Screen chips; Monthly / Day pass chips; "How many desks do you need?" slider and a numeric input, both bound to `desks`, `min=1`, `max=20`, `step=1`. Visible label, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` (for example "3 desks").
- Day-pass and hotel-guest: "How many days?" number input, `min=1`, `step=1`. No invented maximum.
- Private workspace: days only. Do not multiply by `desks`. Hide or disable the desk slider.
- Boardroom: four hours or full day; "How many slots?" number input, `min=1`.
- Live result: breakdown list plus `R[formatted total]`. Include `PriceNote` and `EstimateDisclaimer`. No assumption notes.
- Day-pass crossover hint (section 8.3) when it applies.
- Primary CTA: `WhatsAppButton` with `page`, `option` (the summary sentence) and `estimate` (the integer total).

**States:** default, editing, invalid (non-integer or out of range: clamp to the allowed range and do not show `NaN`), reduced motion (no animation of the total).

### 6.13 `FindYourSetup`

Three steps plus a result, on Desks and pricing only. See section 9 for the questions, copy and WhatsApp hand-off. States: step index, selections, result, back, "skip to rooms". Progress text: "Step 1 of 3" to "Step 3 of 3". Do not require an email address.

### 6.14 `FaqList`

Props: `items: { question: string; answer: ReactNode }[]`. A semantic list of buttons or `<details>`. Only one item need be open, or several may stay open; either is fine. Keyboard: Enter/Space to toggle. Do not use a layout that hides answers from search or from a no-javascript fallback if the host allows static markup. Prefer `<details>` and `<summary>` for this reason.

### 6.15 `Placeholder`

Do not render bracket tokens, "to confirm" flags or "working assumption" notes on the live site. If a fact is not confirmed, omit it.

### 6.16 `MapEmbed`

Location page only. Google Maps iframe for the query "81 Loop Street, Cape Town". Visible caption: "81 Loop Street, 9th floor, Cape Town". `title="Map of 81 Loop Street, Cape Town"`. Do not drop a pin at invented coordinates. If the embed cannot load, show the address as text and a link to Google Maps search for that address, not a blank box.

### 6.17 `SkipLink`

First focusable element: "Skip to content", visible on focus, jumps to `#main`.

### 6.18 Page wrapper `Page`

Props: `title` (H1), `eyebrow` optional, `children`. Renders `SkipLink` target, `Header`, `<main id="main">`, `Footer`, `StickyWhatsApp`. Sets document title and meta from section 12.1.

### 6.19 `ScrollTour`

Home only, directly below the hero. A scroll-driven walk through the 9th floor: as the visitor scrolls, the walkthrough clip moves forward (or back, when they scroll up) and a caption for each area passes over it. It replaces a Home photo gallery.

**Data:** one array. Order the stops to match the footage. `time` is the second in `cowork-tour.mp4` at which that area is centred on screen; it is a builder input read off the cut (section 10.2), not public copy. The `heading` and `line` values are final copy.

```ts
export const TOUR_STOPS = [
  { id: "entrance",   photo: "01-entrance-live-work-stay",    heading: "Arrive on the 9th floor", line: "Take the lift to the 9th floor at 81 Loop Street.", time: 0 },
  { id: "reception",  photo: "07-reception-charleshope-wall", heading: "Reception",               line: "Charles Hope Cowork sits inside Charles Hope, a 41-room boutique hotel.", time: 0 },
  { id: "desks",      photo: "05-open-plan-desks",            heading: "Open-plan desks",         line: "Choose a Basic desk, or a Screen desk with two monitors. Coffee is included.", time: 0 },
  { id: "boardrooms", photo: "02-meeting-room-screen",        heading: "Three boardrooms",        line: "Book a boardroom for four hours or a full day, by time slot on WhatsApp.", time: 0 },
  { id: "pod",        photo: "03-glass-meeting-pod",          heading: "Glass meeting pod",       line: "Included in the desk rates. Book a time slot on WhatsApp.", time: 0 },
  { id: "booths",     photo: "04-phone-booths",               heading: "Phone booths",            line: "For calls, included in the desk rates. Book a time slot on WhatsApp.", time: 0 },
  { id: "lounge",     photo: "06-lounge-city-view",           heading: "Lounge with city views",  line: "Part of the floor, open to everyone working here.", time: 0 },
] as const;
// Fill in every `time` from the cut. If the times are missing or not strictly increasing, use `photos` mode on every viewport.
```

Do not show prices in the tour. The estimate follows straight after it.

**Modes** (chosen on mount, and again when the media queries change):

| Mode | When | What the visitor sees |
|---|---|---|
| `scrub` | Viewport 768px or wider, motion allowed, no data-saver, connection not `2g` or `slow-2g` | A pinned full-height frame showing the clip, which moves with scroll. Captions scroll over it. |
| `photos` | Under 768px, or data-saver or `2g`, with motion allowed. Also used in `scrub` conditions while the clip is still loading, or if it fails to load | The same pinned frame showing the current stop's photograph, swapped with a 200ms cross-fade as each caption crosses the middle of the screen. |
| `static` | `prefers-reduced-motion: reduce` | No pinning, scrubbing or cross-fades. A plain list of stops, each a `Photo` with its section 10.1 alt text, heading and line. |

**Layout (`scrub` and `photos`):**

- Section `id="tour"` with the H2 and intro from section 11.1, then the stops.
- The frame is a `position: sticky; top: 0; height: 100svh` layer behind the stop blocks (for example, a sticky child with the stops pulled up over it by `margin-top: -100svh`). It sits under a 40% to 50% `#193f48` overlay.
- Each stop is a normal-flow block, `min-height: 90svh` in `scrub` and `70svh` in `photos`, holding its caption in a solid card: white with a `#193f48` H3 and `#454443` text, or `#193f48` with white text. Text never sits directly on the moving picture. On mobile, keep the cards to the lower part of the screen so most of the photo stays visible, and clear of the sticky WhatsApp bar.
- A visible `Skip the tour` text link at the top of the section, and again in the bottom corner of the frame, jumps to `#estimate`. It comes before the stops in the tab order.
- In `photos` mode, the frame image carries the current stop's alt text from section 10.1. Load each stop photo lazily, one stop ahead. Use an `IntersectionObserver` with a root margin of `-50% 0px -50% 0px` to detect which caption is at the middle of the screen.

**Scrub behaviour:**

- Do not fetch the clip before the window `load` event, so it never competes with the hero image. Then fetch `/video/cowork-tour.mp4` in full (`fetch`, then `URL.createObjectURL` on the Blob) and set it as the `src` of `<video muted playsInline preload="auto" aria-hidden="true">` with no controls. Never call `play()`: the clip only moves through `currentTime`. Until `loadeddata` fires, show `photos` mode.
- Map scroll to time piecewise. When the centre of stop *i*'s block is at the centre of the viewport, the clip is at `TOUR_STOPS[i].time`. Between two stops, interpolate linearly. Before the first stop, run from 0 to its time; after the last, run to the end of the clip.
- On each `requestAnimationFrame`, ease the shown time toward the target (`shown += (target - shown) * 0.2`), and set `video.currentTime = shown` only when the gap is more than about 1/30 s and `video.seeking` is false. Use a passive scroll listener. Stop the frame loop with an `IntersectionObserver` while the section is off screen.
- The page scrolls normally: no scroll-jacking, no wheel interception, no scroll snapping, no sound, no loop, no autoplay.
- If a browser scrubs unevenly with the section 10.2 encode, re-encode with a keyframe every 2 frames before changing anything else.

**Accessibility:** the stop headings (H3) and lines are real text in DOM order, so screen readers and keyboard users get the tour as a list. The video and the frame overlay are `aria-hidden="true"`. Focus rings follow section 4.2.

---

## 7. WhatsApp system

### 7.0 Site URL and telephone constants

```ts
// Set this to the project's default Lovable HTTPS URL, no trailing slash,
// as soon as the project exists, for example https://your-project.lovable.app
export const SITE_URL = "https://YOUR-PROJECT.lovable.app";

export const PHONE_DISPLAY = "021 600 6826";
export const PHONE_TEL = "tel:+27216006826";
export const PHONE_E164 = "+27216006826";
export const EMAIL = "louis@charleshope.co.uk";
export const LEGAL_NAME = "CHARLES HOPE SA (PTY) LTD";
```

Use `SITE_URL` as the single origin for canonical links, `sitemap.xml`, Open Graph `og:url` and `og:image`, and JSON-LD `url` and `image`. Do not register or connect a custom domain in this version. If a custom domain is connected later, change `SITE_URL` to that origin and rebuild those tags.

Show `PHONE_DISPLAY` as a text link to `PHONE_TEL`, and `EMAIL` as a `mailto:` link, in the footer, on Location and on Book / Enquire, and in the privacy notice. WhatsApp remains the primary call to action. JSON-LD `telephone` is `PHONE_E164`, `email` is `EMAIL`, and `legalName` is `LEGAL_NAME`. The footer copyright and the terms and privacy pages name `LEGAL_NAME`.

### 7.1 Number and base URL

- Display number: `+27 68 947 8807`
- Link base: `https://wa.me/27689478807?text=`
- The `text` query value must be `encodeURIComponent` of the prefilled message. Do not leave raw spaces or line breaks in the URL.

Helper (TypeScript):

```ts
export const WHATSAPP_NUMBER_DISPLAY = "+27 68 947 8807";
export const WHATSAPP_BASE = "https://wa.me/27689478807";

export function buildWhatsAppUrl(args: {
  page: string;
  option?: string;
  estimate?: number;
}): string {
  const text = buildWhatsAppText(args);
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}
```

### 7.2 Message templates

Use these exact strings. Do not add marketing lines or invented prices.

**A. Default (header, footer, sticky, or a page with no selection):**

```
Hello, I would like to book a site inspection at Charles Hope Cowork, 81 Loop Street, 9th floor, and request a quote. I am writing from the [Page] page.
```

If the control is on Home and there is no calculator selection, `[Page]` is `Home`.

**B. Calculator or Find your setup (when an option and a numeric estimate exist):**

```
Hello, I would like to book a site inspection at Charles Hope Cowork, 81 Loop Street, 9th floor, and request a quote for: [summary]. Estimated total shown on the site: R[total]. I am writing from the [Page] page. Prices shown on the site are incl. VAT. Please confirm availability and the final quote.
```

- `[summary]` is the sentence built in section 8.4, for example `3 Screen desks, monthly`.
- `[total]` uses a thousands separator, for example `11,250`. No cents.
- `[Page]` is the page the button sits on, for example `Desks and pricing` or `Home`.

**C. Hotel guest card or Hotel guests page (no calculator selection):**

```
Hello, I am a guest at the Charles Hope hotel and would like to use Charles Hope Cowork. Please tell me how to book the hotel guest rate. I am writing from the Hotel guests page.
```

If this visitor has used the calculator on that page, use template B and make sure the summary includes "hotel guest".

**D. Noah discount or corporate accommodation (no figures):**

```
Hello, I would like to ask about the Noah restaurant discount for monthly tenants and corporate accommodation rates at the Charles Hope hotel. I am writing from the [Page] page.
```

**E. Bookable room, no calculator selection:**

```
Hello, I would like to check a time slot for [a boardroom / the glass meeting pod / a phone booth / a private workspace] at Charles Hope Cowork, 81 Loop Street, 9th floor. I am writing from the [Page] page.
```

**F. Day pass page, no calculator selection:**

```
Hello, I would like to book a day pass at Charles Hope Cowork, 81 Loop Street, 9th floor, and request a quote. I am writing from the Day pass page.
```

Every primary, secondary and sticky WhatsApp control must use one of these templates. Never open `https://wa.me/27689478807` with an empty `text`.

### 7.3 Button labels (use these exact labels)

| Location | Label |
|---|---|
| Home hero, Home close, Location, default global | Book a site inspection on WhatsApp |
| Compact or full calculator, after a total is shown | Request this quote on WhatsApp |
| Day pass page | Book a day pass on WhatsApp |
| Hotel guests page | Enquire as a hotel guest on WhatsApp |
| Hotel and Noah band | Ask us on WhatsApp |
| Amenities room cards | Check a time on WhatsApp |
| Book page | Message us on WhatsApp at +27 68 947 8807 |
| Header | WhatsApp us |
| Sticky mobile | WhatsApp us |
| Footer | +27 68 947 8807 |

---

## 8. Calculator specification

The calculator never adds VAT, fees, discounts or membership credits. Published rates already include VAT, so the total is a sum of those rates only. The VAT line is copy only: `Prices shown incl. VAT.`

### 8.1 Rate constants (do not change)

```ts
export const RATES = {
  basicMonthly: 3000,
  basicDaily: 280,
  screenMonthly: 3750,
  screenDaily: 350,
  hotelGuestDaily: 200, // R200 per day; if several desks are selected, multiply by desks and days
  privateWorkspaceDaily: 450,
  boardroomFourHours: 1500,
  boardroomFullDay: 4000,
} as const;

export const DESK_MIN = 1;
export const DESK_MAX = 20; // practical control range, not a floor capacity; no note on the live site
export const DAYS_MIN = 1;
export const SLOTS_MIN = 1;
```

### 8.2 Formulas

All inputs are integers. If the user types a decimal, round to the nearest integer, then clamp. If the field is empty, treat it as the minimum (1). Never show `NaN`, `Infinity` or a blank total.

```
hot desk, monthly:     desks * (deskType === "screen" ? 3750 : 3000)
hot desk, day pass:    desks * days * (deskType === "screen" ? 350 : 280)
hotel guest:           desks * days * 200
private workspace:     days * 450
boardroom, four hours: slots * 1500
boardroom, full day:   slots * 4000
```

**Important:** private workspace and boardroom are not multiplied by the desk slider. If the user switches to Private workspace with `desks` still at 3, the total is `days * 450` only. Hide or ignore `desks` for those products.

`desks` is clamped to 1 to 20 inclusive. `days` and `slots` have a minimum of 1 and no published maximum. Do not invent a 30-day cap.

### 8.3 Rounding and display

- Arithmetic uses integer rands only. There are no cents in these rates, so there is nothing to round after multiplication.
- Display with a thousands separator and a leading R, no decimals: `R3,000`, `R11,250`, `R60,000`. Use `en-ZA` or a manual format that inserts commas.
- Do not use a counting-up animation on the total.
- The VAT line is copy only: `Prices shown incl. VAT.`
- The estimate line: `This estimate is not a quote. We will confirm availability and the final amount on WhatsApp.`
- The desk slider uses a 1 to 20 range as a practical control. Do not present it as an official floor capacity, and do not show an assumption note on the live site.
- When hotel guest is selected, show the rate as R200 per day. If more than one desk is selected, multiply by the number of desks and days in the total, without labelling a "per desk" assumption on the page.
- When boardroom full day is selected: show R4,000 with no flag.
- Day-pass crossover hint, only when product is hot desk and term is day pass:
  - If `desks * days * 280 > desks * 3000` for Basic, show: `11 or more Basic day passes (R3,080 for 11 days, one desk) cost more than a Basic monthly desk at R3,000. Ask us which option fits.`
  - If `desks * days * 350 > desks * 3750` for Screen, show the Screen equivalent (`R3,850` for 11 days, one desk, versus `R3,750` monthly).
  - Compare using the same desk count on both sides. For 2 desks, 11 Basic days: `2 * 3080 = 6,160` versus `2 * 3000 = 6,000`. Show the hint when the day-pass total is higher than the monthly total for that desk count. Do not invent a "you save" amount.

### 8.4 Summary sentence (`option` for WhatsApp)

Build a short plain sentence, no trailing full stop inside the WhatsApp "for:" clause if the template already supplies punctuation. Preferred forms:

| Selection | Summary |
|---|---|
| 1 Basic, monthly | `1 Basic desk, monthly` |
| 3 Screen, monthly | `3 Screen desks, monthly` |
| 2 Basic, day pass, 3 days | `2 Basic desks, day pass, 3 days` |
| 1 hotel guest, 2 days | `1 hotel guest desk, 2 days` |
| 1 private workspace, 1 day | `1 private workspace, 1 day` |
| 1 boardroom, four hours, 1 slot | `1 boardroom slot, four hours` |
| 2 boardroom, full day | `2 boardroom slots, full day` |

Use "desk" / "desks" correctly. Use "slot" / "slots" for the boardroom.

### 8.5 Test cases (expected outputs)

Implement these as unit tests or as a manual checklist and confirm every row before building the UI around the helper.

| # | Product | Inputs | Expected total | Formatted | Notes |
|---|---|---|---|---|---|
| T1 | Hot desk | 1 Basic, monthly | 3000 | R3,000 | |
| T2 | Hot desk | 1 Screen, monthly | 3750 | R3,750 | |
| T3 | Hot desk | 3 Screen, monthly | 11250 | R11,250 | |
| T4 | Hot desk | 20 Basic, monthly | 60000 | R60,000 | Max desks |
| T5 | Hot desk | 20 Screen, monthly | 75000 | R75,000 | Max desks |
| T6 | Hot desk | 2 Basic, day pass, 3 days | 1680 | R1,680 | `2 * 3 * 280` |
| T7 | Hot desk | 1 Basic, day pass, 1 day | 280 | R280 | |
| T8 | Hot desk | 1 Screen, day pass, 1 day | 350 | R350 | |
| T9 | Hot desk | 1 Basic, day pass, 10 days | 2800 | R2,800 | No monthly hint (2800 < 3000) |
| T10 | Hot desk | 1 Basic, day pass, 11 days | 3080 | R3,080 | Show Basic hint |
| T11 | Hot desk | 1 Screen, day pass, 10 days | 3500 | R3,500 | No hint (3500 < 3750) |
| T12 | Hot desk | 1 Screen, day pass, 11 days | 3850 | R3,850 | Show Screen hint |
| T13 | Hot desk | 2 Basic, day pass, 11 days | 6160 | R6,160 | Hint on (6160 > 6000) |
| T14 | Hotel guest | 1 desk, 2 days | 400 | R400 | No assumption note |
| T15 | Hotel guest | 2 desks, 1 day | 400 | R400 | No assumption note |
| T16 | Hotel guest | 1 desk, 1 day | 200 | R200 | |
| T17 | Private workspace | 1 day (desks left at 3 in state) | 450 | R450 | Ignore desks |
| T18 | Private workspace | 5 days | 2250 | R2,250 | Ignore desks |
| T19 | Boardroom | 1 slot, four hours | 1500 | R1,500 | |
| T20 | Boardroom | 2 slots, four hours | 3000 | R3,000 | |
| T21 | Boardroom | 1 slot, full day | 4000 | R4,000 | Confirmed rate |
| T22 | Boardroom | 2 slots, full day | 8000 | R8,000 | Confirmed rate |

**Edge cases:**

| # | Input | Expected behaviour |
|---|---|---|
| E1 | `desks = 0` or empty | Clamp to 1 |
| E2 | `desks = 21` | Clamp to 20 |
| E3 | `desks = 2.6` | Round to 3, then clamp if needed |
| E4 | `desks = 20.4` | Round to 20 |
| E5 | `days = 0` or empty | Clamp to 1 |
| E6 | `days = -3` | Clamp to 1 |
| E7 | `slots = 0` | Clamp to 1 |
| E8 | Switching from 5 desks monthly to private workspace, 1 day | Total becomes R450, not R2,250 |
| E9 | Switching from private workspace back to 5 Basic monthly | Total becomes R15,000 |
| E10 | VAT is never added on top of the published rates (rates already include VAT) | T3 stays R11,250, not R12,937.50 or similar |
| E11 | Prefill for T3 on Desks and pricing | Message includes `3 Screen desks, monthly`, `R11,250`, and `Desks and pricing` |
| E12 | Prefill for T21 | Message includes `full day`, `R4,000`, and the page name |

---

## 9. Find your setup

A short guided flow on `/desks-and-pricing` only, above or beside the full calculator. Selections must stay in sync with the calculator: changing either updates the other.

**Progress:** "Step 1 of 3", "Step 2 of 3", "Step 3 of 3", then a result. A "Back" control on steps 2 and 3. A text link "I want a private workspace or a boardroom" jumps to the room product in the calculator and may skip straight to a result for that product.

**Step 1. How long do you need a desk?**

- "A month or more" (sets product to hot desk and term to monthly)
- "A day or a short stay" (sets product to hot desk and term to day pass)
- "I am staying at the Charles Hope hotel" (sets product to hotel guest)

**Step 2. Which desk?**

- "Basic desk, no monitor" (Basic)
- "Screen desk, with two monitors" (Screen)
- Hotel guests also see this step. The rate stays R200 per day whichever desk they choose; do not add a surcharge for a Screen desk on the hotel guest rate. When the product is hotel guest, show this copy under the choices: `The hotel guest rate is R200 per day. We will confirm the desk type when you book.`

**Step 3. How many desks?**

Reuse the 1 to 20 slider and, if term is day pass or hotel guest, the days field. Do not show an assumption note.

**Result.**

Show the same breakdown, total, `Prices shown incl. VAT.`, estimate disclaimer and hints as the calculator. CTA: "Request this quote on WhatsApp" using template B. Secondary text link: "Adjust this in the calculator".

Do not add more than these questions. Do not ask for a name or email. Do not present a score or a badge that looks like a confirmed booking.

---

## 10. Assets

Place files in the public folder as shown. Do not rename in a way that breaks these paths. Generate a WebP for each JPEG at upload; keep the JPEG as fallback.

### 10.1 Photographs

All seven stills are 1792 x 1008 px JPEGs. These are the primary images on the site.

| File | Public path | Alt text (use exactly) | Where it is used |
|---|---|---|---|
| `01-entrance-live-work-stay.jpg` | `/images/01-entrance-live-work-stay.jpg` (plus `.webp`) | Entrance to Charles Hope Cowork, with a timber wall reading Live Work Stay and a glass door into the workspace | Home hero fallback if the poster is missing; Home tour stop (entrance); Amenities arrival; optional Location |
| `02-meeting-room-screen.jpg` | `/images/02-meeting-room-screen.jpg` | Boardroom at Charles Hope Cowork with a wall-mounted screen, a timber table and eight chairs | Home tour stop (boardrooms); Desks and pricing beside the room table; Amenities |
| `03-glass-meeting-pod.jpg` | `/images/03-glass-meeting-pod.jpg` | Glass meeting pod at Charles Hope Cowork, seen from the open-plan desks | Home tour stop (glass meeting pod); Amenities |
| `04-phone-booths.jpg` | `/images/04-phone-booths.jpg` | Two timber and glass phone booths on the cowork floor | Home tour stop (phone booths); Amenities |
| `05-open-plan-desks.jpg` | `/images/05-open-plan-desks.jpg` | Open-plan desks at Charles Hope Cowork, with timber benches, black chairs and a wall of windows | Home tour stop (open-plan desks); Desks and pricing; Amenities. Crop or `object-position` away from fire equipment on the right. |
| `06-lounge-city-view.jpg` | `/images/06-lounge-city-view.jpg` | Lounge at Charles Hope Cowork with timber walls, a long table and city views | Home tour stop (lounge); Hotel guests; Amenities; Location. Check the flipchart in frame before publish; if confidential writing is readable, omit this crop or use a tight crop that excludes the chart. Do not blur writing. |
| `07-reception-charleshope-wall.jpg` | `/images/07-reception-charleshope-wall.jpg` | Reception at Charles Hope Cowork, with a timber wall reading CharlesHope, a desk and a computer | Home tour stop (reception); Hotel guests; Amenities arrival; Location |

**Still missing (omit from the live site; do not fill with stock and do not show empty slots):** desk close-up of a Basic desk; desk close-up of a Screen desk; kitchen; Noah; hotel exterior of 81 Loop Street; clearer signage; a crop of the timber wall mark if a logo is later needed. If Louis later supplies these, drop them into the matching sections. Until then, do not invent them.

**Do not use:** stock interiors, generated interiors, screenshots from other sites, or the 4K master video as a page asset.

### 10.2 Tour clip and poster (Home only)

The Home scroll tour (section 6.19) uses one cut-down clip made from the walkthrough. The hero uses its first frame as a still. There is no looping background video.

| File | Public path | Spec | Use |
|---|---|---|---|
| `cowork-tour.mp4` | `/video/cowork-tour.mp4` | 1280 x 720, 20 to 30 seconds, no audio track, a keyframe at least every 6 frames, `+faststart`. Target 6 MB or less; 8 MB is the hard cap | Home tour, `scrub` mode only |
| `cowork-tour-poster.webp` | `/video/cowork-tour-poster.webp` | First frame of the cut, 1280 x 720, under 250 KB | Home hero image (the LCP image) |
| `cowork-tour-poster.jpg` | `/video/cowork-tour-poster.jpg` | JPEG of the same frame | Fallback if WebP is not supported |

**The cut:** from `cowork-walkthrough-4k.mp4` (or the per-area clips), keep one continuous forward walk through the stops in `TOUR_STOPS` order: entrance, reception, open-plan desks, a boardroom, the glass meeting pod, the phone booths, the lounge. Cut turns, pauses, doubling back, and any frame where writing on the lounge flipchart is readable. Aim for 20 to 30 seconds of steady movement; every extra second is more scrolling and more weight. If the walk needs more than one segment, cut each segment, join them, and encode once. If the file is over the cap, cut footage or raise the CRF before lowering the resolution. If the first frame is not a clean shot of the entrance, use photo 01 as the hero image instead.

```bash
ffmpeg -ss <start> -to <end> -i cowork-walkthrough-4k.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -g 6 -keyint_min 6 -sc_threshold 0 -movflags +faststart cowork-tour.mp4
```

```bash
ffmpeg -i cowork-tour.mp4 -frames:v 1 -c:v libwebp -quality 78 cowork-tour-poster.webp
```

```bash
ffmpeg -i cowork-tour.mp4 -frames:v 1 -q:v 3 cowork-tour-poster.jpg
```

After cutting, note the second at which each stop's area is centred and set `TOUR_STOPS[].time`.

Do not add `cowork-walkthrough-4k.mp4`, `cowork-walkthrough-web.mp4`, per-area clips or frame sequences to the site. `cowork-tour.mp4` is the only video file on the site.

### 10.3 Favicon and social

Until a designed mark is supplied, use a tight, well-lit crop of the timber wall reading CharlesHope (`07` or `01`) as a temporary favicon and Apple touch icon. Open Graph default image: `01-entrance-live-work-stay.jpg` or `cowork-tour-poster.jpg`, width and height attributes set to the real pixel size. Alt is not available in OG; the surrounding title and description must carry the meaning.

---

## 11. Pages, section by section

Copy below is for the public site. Replace nothing with livelier marketing language. Do not render square-bracket tokens; where a fact is missing, omit it (section 17).

Shared on every page: `SkipLink`, `Header`, `Footer`, `StickyWhatsApp` with `page` set to the page name in this section, and `pb` on `<main>` so the sticky bar does not cover content on small screens.

---

### 11.1 Home (`/`)

**Document title and H1:** see section 12.1 for the title. Visible H1: `A desk in the city, inside Charles Hope.`

#### Section H1. Hero

**Media:** `HeroMedia` as specified in section 6.11: the tour poster as a still under a 55% to 65% `#454443` or `#193f48` overlay. No video in the hero.

**Eyebrow (optional, overline):** `Charles Hope Cowork`

**H1:** `A desk in the city, inside Charles Hope.`

**Standfirst (final copy):**

```
Charles Hope Cowork is a hot-desk workspace on the 9th floor at 81 Loop Street, Cape Town, inside the Charles Hope hotel. Noah, the hotel's restaurant, is on site. Book a site inspection or request a quote on WhatsApp.
```

**Primary CTA:** label `Book a site inspection on WhatsApp`. Prefill template A, `[Page]` = `Home`. If the compact calculator below has been used in this session, the hero may stay on template A; the compact calculator has its own button with template B.

**Secondary link:** `Tour the floor`, a white underlined text link (Work Sans 500, at least 44px tall) that moves to `#tour`. With reduced motion, jump without smooth scrolling.

Layout: heading and copy left or centred over the media, max width about 36rem, white heading, standfirst white or near-white only if it sits on a stronger local scrim or the 65% overlay. CTA is `#111111` on `#FF6661`.

#### Section H2. Tour the floor

**H2:** `Tour the floor`

**Intro (final copy):**

```
The 9th floor has open-plan desks, three boardrooms, a glass meeting pod, phone booths, a lounge with city views and a kitchen. Scroll to walk through it.
```

Render `ScrollTour` as in section 6.19, with the stops and copy in `TOUR_STOPS`.

After the last stop: `Book a site inspection on WhatsApp` (template A, `[Page]` = `Home`), and the text links `See what a desk costs` (to `#estimate`) and `See amenities` (to `/amenities`).

#### Section H3. Compact desk estimate

Section `id="estimate"`, the target of `Skip the tour` and `See what a desk costs`.

**H2:** `How many desks do you need?`

**Intro:**

```
Choose a desk type and move the slider to see an estimated total.
```

Render `DeskCalculator` in `compact` variant. Default: 1 Basic desk, monthly, total R3,000. Show `PriceNote` and `EstimateDisclaimer` (no assumption note). CTA: `Request this quote on WhatsApp` (template B, `[Page]` = `Home`).

Text link under the CTA: `See full desks and pricing` to `/desks-and-pricing`.

#### Section H4. Hotel and Noah

**H2:** `Part of the Charles Hope hotel`

**Final copy:**

```
Charles Hope Cowork sits inside Charles Hope, a 41-room boutique hotel, so you get more than a desk.

Monthly tenants get a discount at Noah, the on-site restaurant, for client lunches, coffee and after-work drinks. Ask us on WhatsApp for the current discount.

Corporate accommodation rates are available at Charles Hope for your visiting clients, colleagues, or yourself when you are in town. Ask us on WhatsApp for those rates.

Hotel guests can work from Cowork at R200 a day.
```

Do not publish a discount percentage or a room rate.

**CTA:** `Ask us on WhatsApp` (template D, `[Page]` = `Home`). Secondary text link: `For hotel guests` to `/hotel-guests`.

Photograph optional: `07-reception-charleshope-wall.jpg` or `06-lounge-city-view.jpg`.

#### Section H5. Rates at a glance

**H2:** `Rates at a glance`

`PriceNote` immediately under the heading.

Four `SpotlightPriceCard` items (or a table plus cards):

| Title | Price label | Period / hint | Link |
|---|---|---|---|
| Basic desk | R3,000 | per month (day rate R280 if you are not on a monthly plan) | `/desks-and-pricing` |
| Screen desk | R3,750 | per month (day rate R350 if you are not on a monthly plan) | `/desks-and-pricing` |
| Hotel guests | R200 | per day | `/hotel-guests` |
| Private workspace | R450 | per day | `/desks-and-pricing` |

A fifth line or a footnote is allowed: `Boardroom R1,500 for four hours, or R4,000 for a full day.`

#### Section H6. Close band

**H2:** `Visit the 9th floor`

**Final copy:**

```
Message us to book a site inspection and request a quote. We will confirm what is available and how to pay.
```

**CTA:** `Book a site inspection on WhatsApp` (template A if no live estimate, otherwise B). `[Page]` = `Home`.

---

### 11.2 Desks and pricing (`/desks-and-pricing`)

**H1:** `Desks and pricing`

#### Section D1. Intro and desk table

**Final copy:**

```
Two desk types. Monthly rates are for a hot desk, billed month to month, with no minimum term. Day rates apply if you are not on a monthly plan.
```

`RateTable`:

| Desk | Monthly | Day rate (if not monthly) |
|---|---|---|
| Basic desk | R3,000 per month | R280 per day |
| Screen desk | R3,750 per month | R350 per day |

`PriceNote` plus: `Prices are quoted per desk. Please ask if you need a tax invoice.`

**Final copy (Screen):**

```
A Screen desk is a Basic desk with two monitors.
```

**Final copy (included):**

```
What is included: a desk and chair, power, Wi-Fi, coffee, and access to the shared workspace. The glass meeting pod and the phone booths are included in the monthly and day-pass desk rates, and in the hotel guest desk rate, and are booked by time slot on WhatsApp. The boardrooms are charged separately (see rates below). Printing is available on request. The lounge is part of the floor (see Amenities).
```

Do not publish a Wi-Fi speed. Do not list a printer model.

Link sentence: `Hotel guests see the Hotel guests page for the R200 guest rate.` linking to `/hotel-guests`.

Photograph: `05-open-plan-desks.jpg`.

#### Section D2. Rooms and private workspace

**H2:** `Rooms and private workspace`

**Final copy:**

```
There are three boardrooms. Tenants and day guests can book a time slot for a boardroom, the glass meeting pod or a phone booth. Ask on WhatsApp to check a time. The glass meeting pod and the phone booths are included in the monthly and day-pass desk rates, and in the hotel guest desk rate. There is no separate charge for those rooms. Boardrooms are charged separately.
```

`RateTable`:

| Room | Rate |
|---|---|
| Private workspace | R450 per day |
| Boardroom, four hours | R1,500 |
| Boardroom, full day | R4,000 |

`PriceNote`. Photograph: `02-meeting-room-screen.jpg` beside the table.

CTA under the table: `Check a time on WhatsApp` (template E, defaulting to "a boardroom" unless the visitor picked a room). `[Page]` = `Desks and pricing`.

#### Section D3. Full calculator

**H2:** `How many desks do you need?`

`DeskCalculator` in `full` variant, all products available. CTA: `Request this quote on WhatsApp` (template B, `[Page]` = `Desks and pricing`).

#### Section D4. Find your setup

**H2:** `Find your setup`

Intro: `Answer three short questions and we will show an estimated total. You can adjust it in the calculator.`

Then `FindYourSetup` as in section 9.

#### Section D5. Close

**CTA:** `Book a site inspection on WhatsApp` (template B if a selection exists, otherwise A). `[Page]` = `Desks and pricing`.

---

### 11.3 Day pass (`/day-pass`)

**H1:** `Day pass`

**Final copy:**

```
If you do not need a monthly desk, you can book a day pass.

- Basic desk: R280 per day
- Screen desk: R350 per day

Prices are quoted per desk. Prices shown incl. VAT.

A day pass is for a single date. Please book before you arrive so a desk can be held for you.

Payment is arranged when the booking is confirmed, after you message us on WhatsApp.
```

Do not add a payment link. Payment is arranged on WhatsApp.

Include the day-pass crossover hint from section 8.3, either as static copy (the 11-day figures) or by mounting a compact calculator defaulted to day pass.

A compact Basic / Screen plus days control is allowed, with the same WhatsApp hand-off (template B, `[Page]` = `Day pass`).

**CTA:** `Book a day pass on WhatsApp` (template F if no selection, B if a selection exists).

Link: `See monthly desks` to `/desks-and-pricing`.

---

### 11.4 Hotel guests (`/hotel-guests`)

**H1:** `For guests of the Charles Hope hotel`

#### Section HG1. Guest rate

**Final copy:**

```
If you are staying at the Charles Hope hotel, you can use Charles Hope Cowork at the hotel guest rate of R200, with full access to the cowork amenities, except the Noah discount.

The hotel guest rate is R200 per day. Prices shown incl. VAT. Please book through WhatsApp or through the hotel desk, and bring your room confirmation when you arrive.
```

Photographs: `07-reception-charleshope-wall.jpg` and/or `06-lounge-city-view.jpg`.

**CTA:** `Enquire as a hotel guest on WhatsApp` (template C, or B if the calculator is used). `[Page]` = `Hotel guests`.

A compact calculator defaulted to hotel guest is optional on this page.

#### Section HG2. Hotel and Noah benefits

**H2:** `Part of the Charles Hope hotel`

**Final copy:**

```
Charles Hope is a 41-room boutique hotel, and Noah is the on-site restaurant.

Monthly tenants get a discount at Noah for client lunches, coffee and after-work drinks. The hotel guest cowork rate does not include the Noah discount. Ask us on WhatsApp for the current monthly-tenant discount.

Corporate accommodation rates at Charles Hope are available for tenants, their clients and colleagues, or for you on a later stay. Ask us on WhatsApp for those rates.
```

**CTA:** `Ask us on WhatsApp` (template D, `[Page]` = `Hotel guests`).

---

### 11.5 Amenities (`/amenities`)

**H1:** `Amenities`

**Intro:**

```
Charles Hope Cowork sits on the 9th floor at 81 Loop Street, inside the Charles Hope hotel.
```

#### Section A1. In the workspace

**H2:** `In the workspace`

```
Desks and chairs, power, Wi-Fi, coffee, and a quiet working floor, including the open-plan desks and the lounge with city views. Printing is available on request.
```

Do not state a Wi-Fi speed or a printer model. Coffee is included in the desk rates. Printing is available on request.

Photographs: `05-open-plan-desks.jpg`, `06-lounge-city-view.jpg`.

#### Section A2. Rooms you can book

**H2:** `Rooms you can book`

```
The three boardrooms, the glass meeting pod and the phone booths can be booked by time slot by tenants and day guests. The glass meeting pod and the phone booths are included in the monthly and day-pass desk rates, and in the hotel guest desk rate, with no separate charge. A private workspace is R450 per day. A boardroom is R1,500 for four hours, or R4,000 for a full day. Ask on WhatsApp for a time.
```

Do not publish a room capacity or headcount.

**CTAs:** three `Check a time on WhatsApp` buttons or a single button that names the room if the visitor has selected a card. Template E, `[Page]` = `Amenities`.

Photographs and captions (no invented capacity):

- `02-meeting-room-screen.jpg` Boardroom
- `03-glass-meeting-pod.jpg` Glass meeting pod
- `04-phone-booths.jpg` Phone booths

#### Section A3. Noah

**H2:** `Noah`

```
Noah is the hotel's restaurant, on site. Cowork customers are welcome at Noah during the restaurant's own opening hours. Monthly tenants get a discount at Noah; ask us on WhatsApp for the current discount. The hotel guest cowork rate does not include the Noah discount.
```

Do not invent Noah's hours or a sample menu.

#### Section A4. The hotel

**H2:** `The hotel`

```
You are working inside a 41-room boutique hotel. Please use hotel areas with the same care as other guests, and follow hotel rules on access, noise and visitors. Corporate accommodation rates are available; ask us on WhatsApp.
```

Photographs: `01-entrance-live-work-stay.jpg` or `07-reception-charleshope-wall.jpg`, caption `Arrival`.

---

### 11.6 Location (`/location`)

**H1:** `Location`

**Final copy:**

```
Charles Hope Cowork
81 Loop Street, 9th floor
Cape Town

WhatsApp: +27 68 947 8807
Telephone: 021 600 6826
Email: louis@charleshope.co.uk

The workspace is inside the Charles Hope hotel, a 41-room boutique hotel. Come to 81 Loop Street and take the lift to the 9th floor.
```

Then `MapEmbed` as in section 6.16. Caption: `81 Loop Street, 9th floor, Cape Town`.

**Parking line (only this, nothing more):**

```
Please ask when you book if you need parking advice.
```

Do not publish a car park name, a price, a side-street entrance, or a walking time to the High Court or any other landmark.

Photographs: `06-lounge-city-view.jpg`, `07-reception-charleshope-wall.jpg`. If an exterior photograph is later supplied, add it here. Do not show an empty photo slot on the live site.

**CTA:** `Book a site inspection on WhatsApp` (template A, `[Page]` = `Location`).

---

### 11.7 FAQ (`/faq`)

**H1:** `Questions`

Use `FaqList` with the following questions and answers, in this order. Do not add FAQs that invent hours, parking, Wi-Fi speeds or email.

**Where are you?**  
Charles Hope Cowork is on the 9th floor at 81 Loop Street, Cape Town, inside the Charles Hope hotel.

**What is the difference between Basic and Screen?**  
A Screen desk is a Basic desk with two monitors.

**Do the prices include VAT?**  
Yes. All prices on this site are shown incl. VAT. Please ask if you need a tax invoice.

**I am staying at the hotel. Can I use a desk?**  
Yes. Hotel guests can use the workspace at R200 a day, with full access to cowork amenities except the Noah discount.

**Can I come for just one day?**  
Yes. Day rates are R280 for a Basic desk and R350 for a Screen desk if you are not on a monthly plan.

**Can I book a boardroom or a pod?**  
Yes. There are three boardrooms. Tenants and day guests can book a time slot for a boardroom, the glass meeting pod or a phone booth. The glass meeting pod and the phone booths are included in the monthly and day-pass desk rates, and in the hotel guest desk rate, with no separate charge. A private workspace is R450 per day. A boardroom is R1,500 for four hours, or R4,000 for a full day. Message us on WhatsApp to check a time.

**Is coffee included?**  
Yes. Coffee is included in the desk rates. Printing is available on request.

**Is there a discount at Noah, or a corporate hotel rate?**  
Monthly tenants get a discount at Noah, and corporate accommodation rates are available at the Charles Hope hotel. Ask us on WhatsApp. The hotel guest cowork rate does not include the Noah discount.

**Is there parking?**  
Please ask when you book if you need parking advice.

**Who is this for?**  
The space is aimed at professionals who need a quiet, presentable desk in the city centre, including visiting attorneys, advocates and consultants. Others are welcome to enquire.

**How do I book?**  
Message us on WhatsApp at +27 68 947 8807 to book a site inspection and request a quote. You can also call 021 600 6826 or email louis@charleshope.co.uk. We will confirm availability and how to pay.

Close the page with `Book a site inspection on WhatsApp` (template A, `[Page]` = `FAQ`).

---

### 11.8 Book / Enquire (`/book`)

**H1:** `Book a site inspection`

**Final copy:**

```
The quickest way to book a site inspection or request a quote is WhatsApp.
You can also call 021 600 6826 or email louis@charleshope.co.uk.
```

**Primary CTA:** `Message us on WhatsApp at +27 68 947 8807`. If the visitor arrived with calculator state (query string or in-memory state from the same session), use template B and reuse the selection. Otherwise use template A. `[Page]` = `Book`.

**Final copy continued:**

```
Tell us the date, the desk type (Basic or Screen), and whether you want a monthly desk, a day pass, the hotel guest rate, a private workspace or a boardroom. If you want the glass meeting pod or a phone booth, say so. We will confirm availability and how to pay.
```

Do not add a data-storing form in this version. Show telephone 021 600 6826 (`tel:+27216006826`) and email louis@charleshope.co.uk (`mailto:louis@charleshope.co.uk`) as secondary contacts on this page. WhatsApp remains the primary call to action.

**Address line:**

```
Charles Hope Cowork, 81 Loop Street, 9th floor, Cape Town.
```

---

### 11.9 Terms and house rules (`/terms`)

**H1:** `Terms and house rules`

**Final copy:**

```
Charles Hope Cowork is operated by CHARLES HOPE SA (PTY) LTD.

A message on WhatsApp, a phone call or an email is an enquiry, not a completed booking. A booking is confirmed when we write back to agree the dates, the rate and how to pay.

By sending an enquiry you agree that we may contact you about your request and store your details for that purpose, in line with the privacy notice on this site.

Please use the workspace and the hotel areas with care, and follow hotel rules on access, noise and visitors.
```

Link the words "privacy notice" to `/privacy`. Do not invent cancellation windows, deposit rules or liability caps.

---

### 11.10 Privacy (`/privacy`)

**H1:** `Privacy`

**Final copy:**

```
Charles Hope Cowork is operated by CHARLES HOPE SA (PTY) LTD, the responsible party for this notice.

Address: Charles Hope Cowork, 81 Loop Street, 9th floor, Cape Town
Contact: WhatsApp +27 68 947 8807, telephone 021 600 6826, and louis@charleshope.co.uk

What is collected: if you message us on WhatsApp, the conversation takes place on WhatsApp, under WhatsApp's own terms. If you call us, we receive your phone number. If you email us, we receive the contents of that email. This website does not store enquiry forms in this version. Analytics are off in this version.

Third parties: this site loads its fonts from Google Fonts, and the Location page shows a Google Maps map. When these load, Google receives your device's IP address, and the map may set Google's own cookies, under Google's privacy policy.

Why: to answer your enquiry, arrange a visit or booking.

Sharing: not sold. Shared only where needed to provide the service (for example the hotel desk for a hotel-guest booking).

Retention: we keep enquiry details only as long as needed to answer your request, arrange a visit or booking, and meet any legal duties.

Your rights under the Protection of Personal Information Act (POPIA): access, correction, deletion and objection, via the contact details above. You may also lodge a complaint with the Information Regulator.

If analytics or other cookies are later enabled, this page will say so and will link to cookie choices. Apart from the Google Maps map on the Location page, they are off in this version.
```

---

## 12. SEO, Open Graph and JSON-LD

Default title pattern: `Page name | Charles Hope Cowork, 81 Loop Street`. Keep titles under about 60 characters where possible. Meta descriptions under about 155 characters. No keyword stuffing. Do not claim "best coworking space" or a High Court walking time.

Set `lang="en-ZA"`. Define a single constant `SITE_URL` set to the project's default Lovable HTTPS URL (no trailing slash) as soon as the project exists. Use `SITE_URL` for the canonical link on every page, for `sitemap.xml`, for Open Graph URLs and images, and for JSON-LD `url` and `image`. Add a simple `robots.txt` that allows indexing of the ten pages. If a custom domain is connected later, change `SITE_URL` to that origin and rebuild those tags.

### 12.1 Titles and meta descriptions (use exactly)

| Page | Title | Meta description |
|---|---|---|
| Home | Charles Hope Cowork \| Hot desks at 81 Loop Street, Cape Town | Professional hot desks on the 9th floor at 81 Loop Street, Cape Town, inside the Charles Hope hotel. Book a site inspection on WhatsApp. |
| Desks and pricing | Desks and pricing \| Charles Hope Cowork | Basic desks from R3,000 a month and R280 a day, Screen desks from R3,750 a month and R350 a day. Prices incl. VAT. |
| Day pass | Day pass \| Charles Hope Cowork | A day pass at Charles Hope Cowork: R280 for a Basic desk, R350 for a Screen desk. Book on WhatsApp. |
| Hotel guests | Hotel guests \| Charles Hope Cowork | Staying at the Charles Hope hotel? Use the cowork space at the R200 guest rate. Enquire on WhatsApp. |
| Amenities | Amenities \| Charles Hope Cowork | Open-plan desks, three boardrooms, a glass pod, phone booths and a lounge with city views on the 9th floor at 81 Loop Street. |
| Location | Location \| Charles Hope Cowork, 81 Loop Street | Charles Hope Cowork is on the 9th floor at 81 Loop Street, Cape Town, inside the Charles Hope hotel. |
| FAQ | Questions \| Charles Hope Cowork | VAT, day passes, hotel guest rates, coffee and how to book a site inspection at Charles Hope Cowork. |
| Book | Book a site inspection \| Charles Hope Cowork | Message Charles Hope Cowork on WhatsApp at +27 68 947 8807 to book a site inspection and request a quote. |
| Terms | Terms and house rules \| Charles Hope Cowork | Terms and house rules for Charles Hope Cowork at 81 Loop Street, Cape Town. |
| Privacy | Privacy \| Charles Hope Cowork | How Charles Hope Cowork handles enquiry details and any site-usage data, in line with POPIA. |

**Keywords to write for (in natural copy only, never as a hidden list):** Cape Town coworking, Cape Town CBD hot desk, hot desk 81 Loop Street, coworking in a Cape Town hotel, day pass Cape Town, desk for visiting attorneys Cape Town. Do not use "serviced apartments".

### 12.2 Open Graph and Twitter

On every page:

- `og:type` = `website`
- `og:locale` = `en_ZA`
- `og:site_name` = `Charles Hope Cowork`
- `og:title` and `og:description` match the page title and meta description
- `og:url` = `SITE_URL` plus the path (the default Lovable URL, no trailing slash on `SITE_URL`)
- `og:image` = `SITE_URL` + `/images/01-entrance-live-work-stay.jpg` (or the poster). Set `og:image:width` and `og:image:height` to the real pixel size. Do not invent a 1200 x 630 image by generating a new interior. A later cropped derivative of photo 01 is allowed if it is only a crop and resize of the supplied file.
- Twitter: `summary_large_image`, same title, description and image
- The site is a single-page app, and WhatsApp, Facebook and LinkedIn link previews do not run JavaScript. Put the Home title, description and absolute `og:image` URL as static tags in `index.html`, so a link shared in WhatsApp shows a proper preview. Per-page tags set by JavaScript still help search engines.

### 12.3 JSON-LD (confirmed facts only)

Add this `LocalBusiness` block. Do not add `CoworkingSpace`: schema.org has no such type. Interpolate the `SITE_URL` constant (the default Lovable HTTPS URL, no trailing slash). Omit any fact that is still missing. Do not invent geo coordinates or opening hours.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Charles Hope Cowork",
  "description": "Hot desks on the 9th floor at 81 Loop Street, Cape Town, inside the Charles Hope hotel.",
  "url": "SITE_URL",
  "telephone": "+27216006826",
  "email": "louis@charleshope.co.uk",
  "legalName": "CHARLES HOPE SA (PTY) LTD",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "81 Loop Street, 9th floor",
    "addressLocality": "Cape Town",
    "addressRegion": "Western Cape",
    "addressCountry": "ZA"
  },
  "containedInPlace": {
    "@type": "Hotel",
    "name": "Charles Hope",
    "description": "A 41-room boutique hotel"
  },
  "priceRange": "R200-R4000",
  "image": [
    "SITE_URL/images/01-entrance-live-work-stay.jpg"
  ]
}
```

Do not add `openingHours` or `geo`.

The FAQ page may include `FAQPage` schema using only the published questions and answers in section 11.7.

The `priceRange` value uses the confirmed published range from R200 (hotel guest) to R4,000 (boardroom, full day).

---

## 13. Accessibility checklist

Complete every item before calling the build ready.

### 13.1 Foundations

- [ ] `lang="en-ZA"` on the root element
- [ ] A "Skip to content" link is the first focusable control and lands on `#main`
- [ ] One H1 per page, and heading levels do not skip (H1 then H2 then H3)
- [ ] Pages still make sense if CSS fails: headings, lists, tables and links remain readable
- [ ] Visible text and accessible names do not rely on colour alone

### 13.2 Contrast and typography

- [ ] No white text on `#FF6661` in default, hover, active, focus or disabled-on-primary states
- [ ] Primary buttons use `#111111` on `#FF6661` (and on the hover mix)
- [ ] Body text is at least 16px, line height 1.6
- [ ] Hero heading sits on a 55% to 65% dark overlay and meets large-text contrast; any body-size hero line has a stronger local scrim
- [ ] Footer text is white on `#193f48` or `#454443`
- [ ] Caption text in `#47656D` on `#E1F1F4` is at least 14px

### 13.3 Keyboard and focus

- [ ] Every interactive control is reachable with Tab, and can be operated with Enter or Space
- [ ] Focus order follows the visual order
- [ ] Focus rings are visible: 2px, 2px offset, `#90DFF5` on dark backgrounds and `#193f48` on white or `#E1F1F4` (including coral buttons in pale sections)
- [ ] The mobile menu traps focus when open, closes on Escape and overlay click, and returns focus to the menu button
- [ ] The desk slider is usable from the keyboard, and a numeric input sits beside it
- [ ] Chips and radio groups use arrow keys or native radio behaviour
- [ ] FAQ items open and close from the keyboard
- [ ] If a lightbox is added, it traps focus, supports Escape and arrow keys, and returns focus to the thumbnail

### 13.4 Name, role, value

- [ ] Buttons have an accessible name that matches or includes the visible label
- [ ] WhatsApp links include that they open in a new tab, in the accessible name
- [ ] The sticky button has the accessible name `WhatsApp us, opens WhatsApp in a new tab` (it must contain the visible label)
- [ ] The slider exposes `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and a text value such as `3 desks`
- [ ] Current nav item uses `aria-current="page"`
- [ ] The tour video and frame overlay are `aria-hidden="true"`; the stop headings and lines are real text in DOM order; `Skip the tour` is visible and reachable by keyboard
- [ ] The map iframe has `title="Map of 81 Loop Street, Cape Town"`

### 13.5 Images and motion

- [ ] Every photograph uses the exact alt text in section 10.1
- [ ] Captions do not invent capacities
- [ ] `prefers-reduced-motion: reduce` disables React Bits motion and animations, and the tour falls back to the `static` list with no pinning, scrubbing or cross-fades
- [ ] Target size is at least 44 by 44 px for buttons, chips, nav links and the sticky control
- [ ] The sticky bar does not cover body text, the last FAQ, or a future cookie banner; main content has enough bottom padding on small screens

### 13.6 Forms

- [ ] This version has no data-storing form. If a form is later approved, every field has a visible label, errors are text (not colour alone), and the WhatsApp path remains available.

---

## 14. Performance budgets

These are build targets, not published marketing claims. Measure on a mid-range phone profile and a mid-range desktop profile.

| Budget | Target | How to hit it |
|---|---|---|
| Largest Contentful Paint | Under 2.5 seconds on 4G for every page, including Home, where the LCP image is the tour poster | Compress the poster and photographs to WebP, set width and height, `fetchpriority="high"` only on the Home LCP image |
| Cumulative Layout Shift | Under 0.1 | Width and height on images and the video box; reserve space for the calculator total; no late webfont swaps that shift headings more than a flash (use `display=swap` and similar fallback metrics) |
| Interaction to Next Paint | Under 200 milliseconds | Keep the calculator math synchronous and tiny; no heavy animation on input. The tour's scroll listener is passive and does its work in `requestAnimationFrame` |
| Home LCP image weight | Under 250 KB | WebP poster or photo 01, quality tuned by eye |
| Other photograph WebP | Under 400 KB each | Compress the 1792-wide sources; serve `sizes` so mobile is not given the full width |
| Tour clip | 6 MB target, 8 MB cap; desktop `scrub` mode only | Fetch only after the window `load` event, and only in `scrub` mode. Never fetch it on mobile, data-saver, `2g` or reduced motion. Do not ship the 4K master or the uncut walkthrough. |
| Fonts | Two families only | DM Serif Display (regular) and Work Sans 400, 500, 600. Preconnect to Google Fonts. No extra weights or italics. |
| Third-party scripts | Fonts on every page; Maps on Location only | No analytics, no chat widgets, no tag managers, no heatmaps. WhatsApp is a link, not an embedded SDK. |
| JavaScript | No WebGL, no unused React Bits | Only the four allowed motion components. No Count Up. Tree-shake icons. |
| Layout | No horizontal overflow at 320, 375, 390, 768, 1024 and 1440 px | Thumb-sized chips and slider on small screens |

Other rules:

- `loading="lazy"` on all images below the fold. The Home LCP image is eager, with `fetchpriority="high"`.
- Lazy-load the Location map (for example, load the iframe when the section is near the viewport).
- Do not fetch or play video on mobile.
- After changes, run Lighthouse (or the host equivalent) on Home, Desks and pricing, and Location, mobile and desktop, and fix any contrast, heading or CLS regression.

---

## 15. Security

The site takes enquiries on WhatsApp, not payments, and it must not store personal data in this version.

### 15.1 Transport and hosting

- HTTPS only. Redirect HTTP to HTTPS.
- The site is hosted on the default Lovable URL. Rely on the host's HTTPS. Enable HSTS only later, if a custom domain is connected and is on a stable certificate: start with a modest `max-age` (for example 86400) before raising it. Do not register or connect a custom domain from this plan.

### 15.2 Headers (set as far as the host allows)

If a header cannot be set on the host, record the gap in a short note for Louis. Do not invent a JavaScript workaround for a missing header. A CSP in a `<meta http-equiv>` tag is allowed as a fallback, but browsers ignore `frame-ancestors` there, and `X-Frame-Options` cannot be set by a meta tag at all, so record those two as gaps if the host cannot send headers.

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://maps.googleapis.com https://maps.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https://maps.googleapis.com https://maps.gstatic.com https://*.google.com https://*.googleapis.com https://*.ggpht.com;
  media-src 'self' blob:;
  frame-src https://www.google.com https://maps.google.com;
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;

X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

Notes on the CSP:

- Tighten `script-src` further if the app can run without any third-party scripts on pages other than Location.
- Avoid `unsafe-eval` unless a dependency cannot run without it, and record that dependency if so.
- `style-src` may need `'unsafe-inline'` for the default toolchain. Do not add `http:` sources.
- `wa.me` and `api.whatsapp.com` are navigations, not script sources. Do not add them to `script-src`.
- `Cross-Origin-Resource-Policy` may be set to `same-origin` if it does not break the Maps embed; if it does, leave it unset and record why.
- `X-Frame-Options: DENY` must stay aligned with `frame-ancestors 'none'`.
- `media-src` includes `blob:` because the Home tour loads its clip into memory as a Blob, so scrubbing is smooth.

### 15.3 Secrets, data and payments

- No API keys, tokens, form-endpoint secrets or environment credentials in client-side code or public files.
- If a Google Maps embed key is required, use a browser key restricted to the site domain.
- Do not collect payment card data, CVV or bank details. Payment, if any, happens later by invoice and EFT, or a hosted Yoco or Paystack link that is not live in this version.
- Do not add a data-storing enquiry form in this version. Do not log prefilled WhatsApp message contents on a server.
- Do not install analytics or a cookie banner until Louis says yes. If GA4 is later approved, use the measurement ID Louis supplies, load it only after consent, and update `/privacy`. Do not show a measurement-ID placeholder on the live site. Suggested event names, if that later work happens: `whatsapp_click` (with a location label only: hero, pricing, footer, sticky, book page), `calculator_complete`, `find_setup_complete`. Never send names, phone numbers or the WhatsApp message body.

### 15.4 Links and dependencies

- External links use `target="_blank"` and `rel="noopener noreferrer"`.
- Keep React, Tailwind, shadcn and the four React Bits packages up to date. Do not add unused libraries or a second animation toolkit.

---

## 16. Acceptance checklist per page

Run these after Phase D and again after Phase E. A page is not done if any of its rows fail.

### 16.1 Every page

- [ ] Header, footer and (on small screens) sticky WhatsApp are present
- [ ] Document title and meta description match section 12.1
- [ ] Primary CTA text is `#111111` on `#FF6661`
- [ ] Every WhatsApp URL includes a prefilled `text` that names the page
- [ ] If a calculator selection exists, the prefill also names the option and the formatted estimate
- [ ] No invented hours, capacities, Wi-Fi speeds, parking details, emails or prices
- [ ] `Prices shown incl. VAT.` appears wherever rates are shown
- [ ] Hotel is described as a 41-room boutique hotel, never as serviced apartments
- [ ] Address is 81 Loop Street, 9th floor, Cape Town
- [ ] No em dashes, and no en dashes used as a dash, in visible copy
- [ ] No mention of the builder, prompts, or how the site was produced
- [ ] Photographs use the supplied files and the exact alt text
- [ ] Bottom content is not hidden by the sticky bar
- [ ] Keyboard and reduced-motion behaviour work as in section 13

### 16.2 Home

- [ ] H1 is `A desk in the city, inside Charles Hope.`
- [ ] Hero shows the tour poster under the dark overlay, with the H1, the WhatsApp CTA and a `Tour the floor` link; there is no video in the hero
- [ ] On desktop with motion allowed, the tour clip moves forwards and backwards with scroll and each caption sits over its area; on mobile and data-saver the photo tour shows and the MP4 is not fetched; with reduced motion the tour is a static list
- [ ] Compact calculator defaults to 1 Basic monthly = R3,000, slider 1 to 20, with no assumption note
- [ ] Hotel and Noah band mentions the monthly-tenant Noah discount and corporate accommodation rates, with no figures, and an "Ask us on WhatsApp" control
- [ ] Hotel guest rate is shown as R200 per day
- [ ] The tour has all seven stops, each with its supplied photograph and alt text, and `Skip the tour` jumps to the estimate
- [ ] Rates at a glance match the four published desk and guest figures, plus the boardroom footnote at R1,500 and R4,000 with no 'to confirm' flag

### 16.3 Desks and pricing

- [ ] Desk table: Basic R3,000 / R280, Screen R3,750 / R350
- [ ] Screen copy says the desk includes two monitors, and does not invent a monitor size
- [ ] Room table: private workspace R450, boardroom R1,500 / R4,000
- [ ] Copy states that there are three boardrooms, and that tenants and day guests can book a boardroom, the glass pod and phone booths by time slot on WhatsApp, and that the pod and booths are included in monthly, day-pass and hotel-guest desk rates, with no separate charge
- [ ] Full calculator passes tests T1 to T22 and E1 to E12
- [ ] Private workspace totals ignore the desk slider
- [ ] Find your setup stays in sync with the calculator and does not ask for an email
- [ ] Day-pass hint appears at 11 Basic or 11 Screen days as specified

### 16.4 Day pass

- [ ] Only R280 and R350 are shown as day-pass prices
- [ ] Booking rule copy is shown: book before you arrive, payment arranged on WhatsApp, no payment link
- [ ] Crossover hint or compact calculator is present
- [ ] CTA uses the Day pass prefill (template F or B)

### 16.5 Hotel guests

- [ ] Hotel guest rate is shown as R200 per day
- [ ] Copy states full amenity access except the Noah discount
- [ ] Hotel and Noah band repeats the discount and corporate rates with no figures, "Ask us on WhatsApp"
- [ ] CTA uses the hotel-guest prefill (template C or B)

### 16.6 Amenities

- [ ] Coffee is listed as included in the desk rates. Printing is available on request. No invented Wi-Fi speed
- [ ] Bookable rooms include the three boardrooms (charged), and the glass pod and phone booths (included in desk rates), via WhatsApp, with no separate pod or booth price
- [ ] Boardroom full-day rate is R4,000 with no 'to confirm' flag
- [ ] No published room capacity or headcount
- [ ] Noah and hotel sections match section 11.5

### 16.7 Location

- [ ] Address block is exact
- [ ] Telephone 021 600 6826 and WhatsApp +27 68 947 8807 are shown
- [ ] Map is pinned by the address, captioned "81 Loop Street, 9th floor, Cape Town", with no invented coordinates
- [ ] Parking line is only "Please ask when you book if you need parking advice."
- [ ] No walking times

### 16.8 FAQ

- [ ] All eleven questions in section 11.7 are present, with the same answers
- [ ] No extra FAQ invents a fact

### 16.9 Book

- [ ] WhatsApp is the only enquiry path
- [ ] No form and no payment fields. Telephone 021 600 6826 and email louis@charleshope.co.uk are shown as secondary contacts
- [ ] Calculator state, if carried into this page, is reused in the prefill

### 16.10 Terms

- [ ] Copy matches section 11.9 and names CHARLES HOPE SA (PTY) LTD; a WhatsApp message is described as an enquiry, not a contract
- [ ] Link to `/privacy`

### 16.11 Privacy

- [ ] POPIA rights are listed
- [ ] Privacy names CHARLES HOPE SA (PTY) LTD as the responsible party, and lists WhatsApp, 021 600 6826 and louis@charleshope.co.uk. No bracket tokens
- [ ] The notice says this version does not store enquiry forms and that analytics are off

### 16.12 SEO and security

- [ ] JSON-LD contains only the confirmed facts in section 12.3, with `SITE_URL` interpolated
- [ ] No `openingHours` or `geo` unless later confirmed
- [ ] Security headers are set or the host gaps are recorded
- [ ] CSP allows Fonts and Maps only as needed, and `frame-ancestors 'none'`
- [ ] No secrets in the client bundle
- [ ] No analytics script

---

## 17. What not to invent, and what not to show as a TODO

The live site must not show bracket tokens, "to confirm" flags, "working assumption" notes, or "this will be published later" lines. If a fact is not confirmed, omit it.

These are confirmed and must be published: all prices incl. VAT; boardroom full day R4,000; a Screen desk includes two monitors; the glass meeting pod and the phone booths are included in monthly, day-pass and hotel-guest desk rates and are booked by time slot on WhatsApp; coffee is included in the desk rates; telephone 021 600 6826 is the secondary contact; email louis@charleshope.co.uk; the responsible party is CHARLES HOPE SA (PTY) LTD; the site is hosted on the default Lovable URL, with `SITE_URL` set to that URL; monthly desks have no minimum term; there are three boardrooms; visitors take the lift to the 9th floor.

Quietly omit from the live site (do not invent, and do not show a placeholder):

- Screen size, cables, keyboard and mouse, and how many Screen desks there are. Public copy stops at "A Screen desk is a Basic desk with two monitors."
- Official room capacities and visiting hours
- Noah discount amounts and corporate accommodation rates. Public copy says "Ask us on WhatsApp" only
- Wi-Fi speeds, printer models, parking details and walking times. Parking copy is only "Please ask when you book if you need parking advice."
- Hotel and Noah website links, until URLs are supplied
- Photographs that have not been supplied. Do not use stock, and do not show empty photo slots
- `openingHours` and `geo` in JSON-LD
- Analytics, until approved
- A payment link. Payment is arranged on WhatsApp
- A custom domain. Host on the Lovable URL

`SITE_URL` is a build constant, not public copy. Set it to the project's default Lovable HTTPS URL (no trailing slash) as soon as the project exists, and use it for canonical tags, `sitemap.xml`, Open Graph and JSON-LD.

## 18. Things the build must not do

- Do not invent reviews, testimonials, star ratings, client logos, occupancy figures, "X professionals already booked" or other social proof.
- Do not invent prices, discounts, packages, opening hours, parking prices, walking times, Wi-Fi speeds, monitor sizes or room capacities. Do not claim that prices exclude VAT. All published prices include VAT. A Screen desk includes two monitors; do not invent a size.
- Do not use day-pass prices other than R280 Basic and R350 Screen.
- Do not use em dashes, or en dashes as a stand-in for a dash, anywhere in site copy or in UI strings. Use a comma, a hyphen, or the word "to".
- Do not mention the builder, prompts, or how the copy or site was produced, anywhere on the public site.
- Do not call the Charles Hope hotel "serviced apartments" or a "serviced apartment". It is a 41-room boutique hotel.
- Do not use the address 78 Loop Street, or any address other than 81 Loop Street, 9th floor.
- Do not use stock photographs or fabricated interiors in place of the supplied floor photographs.
- Do not hide or blur the published rates behind a lead form.
- Do not take online payment or collect card numbers.
- Do not add a shop, a membership login, a data-storing form, or booking software in this version.
- Do not publish terms as if they were a finished legal contract.
- Do not add Count Up, WebGL, or any motion component beyond the four listed in section 5.
- Do not put white text on `#FF6661`.
- Do not play sound, autoplay or loop video, hijack scrolling, or ship the 4K master or the uncut walkthrough. The only video is `cowork-tour.mp4`, moved by scroll in the Home tour.
- Do not add analytics, pixels or trackers without Louis's yes and a consent banner.
- Do not register or buy a domain, a plugin, or a third-party account from this plan. Host on the default Lovable URL. A custom domain can be connected later if Louis says yes.

---

## 19. Definition of done

The build is ready for Louis's review when:

1. All ten routes match the copy and behaviour in section 11.
2. Calculator tests T1 to T22 and edge cases E1 to E12 pass.
3. Every WhatsApp control carries a prefilled message that names the page, and names the option and estimate when a selection exists.
4. Accessibility (section 13), performance (section 14) and security (section 15) checklists are complete or have recorded host gaps.
5. Per-page acceptance (section 16) is complete.
6. No placeholders, bracket tokens or "to confirm" notes are visible; facts still missing are omitted, as section 17 requires.
7. Nothing in section 18 has been done.

Do not turn on analytics, or treat a WhatsApp enquiry as a signed contract, until Louis confirms the remaining open facts and a lawyer-reviewed terms page is in place. Keep the site on the default Lovable URL until he decides to connect a custom domain.

