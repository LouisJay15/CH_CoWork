# Photographs: where each one came from

All page photographs come from Google Drive, folder **Charles Hope / CH CoWork** and its subfolder **CoWork**
(the WhatsApp photos, all 1600x1200), plus the named files at the top of **CH CoWork**.
`npm run media` (scripts/build-media.mjs) turns the originals into small AVIF and WebP files in `public/media/frames/`,
and records each one in `src/media/manifest.json`. The originals are kept out of git (`assets/source/`), because staff appear in some.

## Used on the site

**The cleaned-up photos (27 November).** Seven retouched, straightened photos plus Terrace.jpg, uploaded by the owner
to the top of **CH CoWork**. They are the Home hero and gallery, and replace the older shots of the same spaces on
every page. All 1792x1008 except the terrace (1600x1200).

| Gallery | Frame | Drive file | Also used on |
|---|---|---|---|
| 1 Entrance | `space-entrance` | Front.jpg | Home hero, Hotel guests, Location, link previews (og-image) |
| 2 Live. Work. Stay. | `space-lws` | professional-cleaned-up-and-straightened-6.jpg | |
| 3 Boardroom | `space-boardroom` | professional-cleaned-up-and-straightened-5.jpg | Amenities, Desks and pricing |
| 4 Glass meeting pod | `space-pod` | professional-cleaned-up-and-straightened-4.jpg | Amenities (replaces the "photo to follow" panel) |
| 5 Open-plan desks | `space-open` | professional-cleaned-up-and-straightened-2.jpg | Amenities, Desks and pricing |
| 6 Call pods | `space-callpods` | professional-cleaned-up-and-straightened-3.jpg | Amenities. No whiteboard in this version. |
| 7 Lounge and kitchen | `space-lounge` | professional-cleaned-up-and-straightened-1.jpg | Hotel guests. The flip chart's writing is illegible; it is blurred anyway (`redact` in the script). |
| 8 Terrace view | `space-terrace` | Terrace.jpg | Location, Home hotel section. Devil's Peak and Table Mountain. |

**Earlier photos still in use** (Drive, CH CoWork and its CoWork subfolder):

| Frame | Drive file | Used on |
|---|---|---|
| `lws-close` | IMG_3877_cleaned.jpg (CH CoWork) | Amenities, Home hotel section |
| `open-2` | WhatsApp Image 2026-11-26 at 10.45.08.jpeg (CoWork) | Day pass |
| `lounge` | WhatsApp Image 2026-11-26 at 10.45.20 (3).jpeg (CoWork) | Home hotel section |
| `kitchen-1` | WhatsApp Image 2026-11-26 at 10.45.22 (1).jpeg (CoWork) | Home hotel section |
| `kitchen-2` | WhatsApp Image 2026-11-26 at 10.45.23 (2).jpeg (CoWork) | Amenities, Home hotel section |

The other earlier shots (entrance, signage, corridor, boardroom, open plan, pods and views from the walkthrough) were
replaced by the cleaned-up photos and removed from the site.

The 1600x1200 WhatsApp files are the originals at their full size (checked byte for byte against Drive). Where a sharper
version of the same scene existed (the `_cleaned` signage files), that was used instead.

## Looked at and left out

111 photos in **CoWork** and 5 at the top of **CH CoWork** were reviewed. Left out:

- **Security:** every photo with the whiteboard by the call pods (10.45.16 (2) to 10.45.19 (2) and the pod-door shots).
  It shows a front door code, a phone number, booking-site logins and what look like passwords. **Wipe that board, and
  treat those codes as exposed: they are in a shared Drive folder.**
- **Photographer's reflection:** the straight-on pod interiors (10.45.18 (4), 10.45.19, 10.45.19 (1)).
- **Advertising:** kitchen shots with a betting billboard outside the window (10.45.22 (2), 10.45.22 (3), 10.45.23, 10.45.59 (4)).
- **People:** frames where staff are close and recognisable (10.45.10 to 10.45.14, 10.45.15 (2) and (3)). Get written
  consent before using any of these, even the ones where people are small.
- **Blur and near-duplicates:** motion-blurred walking frames, and duplicates (Entrance.jpeg is the same file as
  10.44.57; 10.45.57 is the same size as 10.45.24).

## Video

`cowork-walkthrough-4k.mp4` (152 MB) and `Office_Walk_Through.mp4` (9.5 MB) are at the top of **CH CoWork**. As agreed, they
are a backup only: the Home page uses the stills, which are sharper and far lighter. The videos are not part of the site.

## Re-running

1. Download the files above from Drive into `assets/source/`, named by frame (`space-entrance.jpg`, and so on),
   with a `sources.json` as in these tables.
2. `npm run media` (all photos, about 8 minutes), or `npm run media -- --only space-terrace` for one or a few.
   To change only alt text, edit FRAMES in `scripts/build-media.mjs` and run `npm run media -- --motion`.
