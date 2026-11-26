# Charles Hope Cowork

The marketing site and booking requests for Charles Hope Cowork, 81 Loop Street, 9th floor, Cape Town.

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

## Photographs and the scroll tour

The Home page tour is built from stills, not video: 16 photographs from the floor, in seven scenes (entrance, Live.
Work. Stay., boardroom, open space, call pods, kitchen, view). As you scroll, each one zooms and pans toward its subject
and blends into the next (a Ken Burns effect). On phones it uses tall crops, loads each frame just before it is needed,
and moves with transforms only, so it stays smooth on mid-range phones.

- Where each photo came from, and which were left out and why: `docs/media-sources.md`
- Image pipeline: `npm run media` (scripts/build-media.mjs), AVIF with WebP fallback at 640, 1200 and 1600 px
- Scenes and captions: `src/lib/tour.js`; motion: `src/lib/kenburns.js` and `src/components/ScrollTour.jsx`

## Branding (placeholder)

The logo, colours and fonts are placeholders until the approved brand guideline arrives. They all live in `src/brand/`
and `public/brand/`: see `docs/branding.md` for the swap.

## Speed

Measured on an emulated mid-range phone over slow 4G (Lighthouse mobile settings): the Home page shows its main image in
about 1.3 s, with 261 KB for the first load (JavaScript 110 KB, fonts 86 KB, hero image 59 KB). The whole tour adds
about 0.5 MB, only as the visitor scrolls through it. How: AVIF images sized per screen, lazy loading below the fold,
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

The simplest setup is one service: the Python app serves the built site and the API from the same address, with the security headers from the build plan (CSP, frame blocking, nosniff, referrer and permissions policies).

```bash
docker build -f api/Dockerfile -t charleshope-cowork .
```

Run that image on any container host (Render, Railway, Fly.io, Google Cloud Run and similar), with the settings above as environment variables. It listens on `$PORT` (default 8000). `GET /api/health` shows whether Supabase and email are configured.

If the site is hosted somewhere else (for example on Lovable), set `VITE_API_BASE` to the API's address before building the site, and add the site's address to `ALLOWED_ORIGINS` on the API.

## Offline demo

```bash
npm run build:demo
```

This makes `dist-demo/index.html`, a single file that opens straight from disk with no server. In this version the forms show a "not sent" message instead of sending.

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
- **Fonts are part of the site** instead of being loaded from Google Fonts. They are the same DM Serif Display and Work Sans, so visitors' IP addresses are no longer sent to Google for fonts.
- **Code style:** the site is plain JavaScript and CSS rather than TypeScript, Tailwind and shadcn/ui.
- **Home tour from stills:** the scroll tour pans and zooms through photographs instead of scrubbing a video clip.
- **Optional component not used:** React Bits Scroll Reveal (the plan lists it as optional).
- **Brand mark:** the favicon is a simple CH monogram until a designed mark is supplied.
