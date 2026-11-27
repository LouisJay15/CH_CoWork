# Charles Hope Coworking Space

The marketing site and booking requests for Charles Hope Coworking Space, 81 Loop Street, 9th floor, Cape Town.

- **Site:** React with plain JavaScript and CSS, built with Vite. Motion uses three React Bits components (JS + CSS versions) in `src/reactbits/`.
- **Bookings and questions:** a Python (FastAPI) API in `api/`. Each request is saved to a Supabase table and emailed to louis@charleshope.co.uk, with the visitor as Reply-To.
- **WhatsApp** stays the main call to action. Every button opens WhatsApp with a prefilled message that names the page, and the calculator choice and estimate when there is one.

The full brief is in `docs/build-plan.md`.

## Run it on your computer

You need Node 20 or later and Python 3.11 or later.

```bash
npm install
```

```bash
cd api && python3 -m venv .venv && .venv/bin/pip install -r requirements-dev.txt && cd ..
```

Start the API in one terminal. With no Supabase or email settings it runs in development mode: requests are kept in memory and the email is printed in the terminal instead of sent.

```bash
npm run api
```

Start the site in a second terminal, then open http://localhost:5173:

```bash
npm run dev
```

## Home page: photographs and effects

The Home page uses React Bits effects (`src/reactbits/`) rather than a scroll tour:

- **The 9th floor**: eight photographs (entrance, Live. Work. Stay., a boardroom from the hall and inside, open-plan
  desks, call pods, lounge and kitchen, the terrace view of Table Mountain) in an expanding gallery. Desktop: point at a
  photo to open it. Phone: tap. (`src/lib/spaces.js`)
- **"Live. Work. Stay."** scrolls across a navy band under the hero; visitors can drag it.
- **Hotel section**: a fan of photos that bounces in and parts when you point at one.
- **Main WhatsApp buttons**: a coral light runs round the edge.

Each effect loads only when the visitor scrolls near it. Where the photos came from: `docs/media-sources.md`.
Image pipeline: `npm run media` (scripts/build-media.mjs), AVIF with WebP fallback at 640, 1200 and 1600 px.

## Branding

The site follows the Charles Hope Coworking Space brand guidelines: coral, navy and ivory, Playfair Display and
DM Sans, and the CharlesHope wordmark with COWORKING SPACE. Everything brand-specific lives in `src/brand/` and
`public/brand/`: see `docs/branding.md`.

## Speed

Measured on an emulated mid-range phone over slow 4G (Lighthouse mobile settings): the Home page shows its main image in
about 1.1 s, with 228 KB for the first load (JavaScript 118 KB, fonts 64 KB, images 38 KB). The gallery and the
other effects add their photos and code only as the visitor scrolls to them. How: AVIF images sized per screen, lazy loading below the fold,
pages other than Home loaded on demand, the animation library loaded after first paint, fonts served from the site,
and Brotli or gzip files written at build time (the Python app sends them).

## Set up Supabase

1. Create a project at supabase.com.
2. In the SQL editor, run `supabase/migrations/20261126000000_enquiries.sql`. It creates the `enquiries` table (row level security on, so only the server can read or write it) and an `open_bookings` view.
3. From Project Settings, API, copy the project URL and the **service role** key. The key goes only into the API's settings, never into the site.

New requests arrive with status `new`. Change it to `contacted`, `confirmed`, `declined`, `closed` or `spam` in the table editor as you work through them.

## Set up email

The API sends through any SMTP provider. For example, use the mail service behind charleshope.co.uk (Google Workspace or Microsoft 365, with an app password), or a sending service such as Resend, Postmark or SendGrid. `MAIL_FROM` must be an address the provider lets you send from. `MAIL_TO` defaults to louis@charleshope.co.uk.

## Settings

The API reads these from the environment, or from `api/.env` (copy `api/.env.example`):

| Setting | What it is |
|---|---|
| `ENVIRONMENT` | `production` on the live server |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | From Supabase, Project Settings, API |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURITY`, `SMTP_USERNAME`, `SMTP_PASSWORD` | From your email provider |
| `MAIL_FROM`, `MAIL_TO` | Sender, and where requests go |
| `ALLOWED_ORIGINS` | Only if the site is on a different domain from the API |
| `TRUST_PROXY` | `true` on most hosts, so the spam limit sees real visitor addresses |

The site reads `.env` at build time: set `VITE_SITE_URL` to the live address (used for canonical links, the sitemap and link previews). Leave `VITE_API_BASE` empty when the API serves the site.

In production, the API refuses requests with a clear message if Supabase or email is not configured. If one of the two fails at request time, the request still succeeds through the other, and the failure is logged.

## Deploy

### GitHub Pages (the site only)

The site is at **https://louisjay15.github.io/CH_CoWork/**. The workflow in `.github/workflows/pages.yml` builds it
every time `main` changes and puts the built files on the `gh-pages` branch (never edit that branch by hand). One-time
setup: in the repository, Settings > Pages > Build and deployment > Source: **Deploy from a branch**, Branch:
**gh-pages**, Folder: **/ (root)**. (Pages on the free plan needs a public repository.) `main` itself is not published:
its root holds the unbuilt source, and `docs/` holds the project notes.

Pages can only serve files, so it cannot run the Python API. On Pages the booking and question forms check the details,
then open WhatsApp or the visitor's email app with the request written out, ready to send; nothing is stored, and the
privacy notice says so. Pages also cannot send the extra security headers. To build the same thing locally:
`npm run build:pages` (output in `dist-pages/`).

### Full setup (site, bookings to Supabase, email)

The Python app serves the built site and the API from the same address, with the security headers from the build plan
(CSP, frame blocking, nosniff, referrer and permissions policies), and sends the precompressed files.

```bash
docker build -f api/Dockerfile -t charleshope-cowork .
```

Run that image on any container host (Render, Railway, Fly.io, Google Cloud Run and similar), with the settings above as
environment variables. It listens on `$PORT` (default 8000). `GET /api/health` shows whether Supabase and email are configured.

If the site stays on GitHub Pages while the API runs elsewhere, build with `VITE_FORMS=api` and `VITE_API_BASE` set to
the API's address, and add the Pages address to `ALLOWED_ORIGINS` on the API.

## Offline demo

```bash
npm run build:demo
```

This makes `dist-demo/index.html`, a single file that opens straight from disk with no server. As on GitHub Pages, the forms hand the request to WhatsApp or email.

## Tests

```bash
npm test
```

Runs the calculator test cases T1 to T22 and E1 to E12 and the WhatsApp message checks from the build plan.

```bash
npm run test:api
```

Runs the API tests: validation, spam protection, the stored row and the email, a real SMTP send to a local server, and the Supabase client against a local stand-in for its REST API.

## Changes from the build plan

- **Booking and question forms** are added (the plan's version 1 had none). The privacy notice and terms now say that requests are stored in Supabase and emailed.
- **Fonts are part of the site** instead of being loaded from Google Fonts. They are Playfair Display and DM Sans, as in the brand guidelines, so visitors' IP addresses are not sent to Google for fonts.
- **Code style:** the site is plain JavaScript and CSS rather than TypeScript, Tailwind and shadcn/ui.
- **Home effects instead of a video tour:** an expanding photo gallery and other React Bits effects, rather than scrubbing a video clip.
- **Optional component not used:** React Bits Scroll Reveal (the plan lists it as optional).
- **Brand:** applied from the Charles Hope Coworking Space brand guidelines (see docs/branding.md); the logo files are taken from the guideline PDF until vector files are supplied.
