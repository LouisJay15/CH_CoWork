# Photographs: where each one came from

All page photographs come from Google Drive, folder **Charles Hope / CH CoWork** and its subfolder **CoWork**
(the WhatsApp photos, all 1600x1200), plus the named files at the top of **CH CoWork**.
`npm run media` (scripts/build-media.mjs) turns the originals into small AVIF and WebP files in `public/media/frames/`,
and records each one in `src/media/manifest.json`. The originals are kept out of git (`assets/source/`), because staff appear in some.

## Used on the site

| Group | Frame | Drive file | Drive folder | Why this one |
|---|---|---|---|---|
| 1 Entrance | `entrance-wide` | Entrance.jpeg | Charles Hope / CH CoWork | Named Entrance; the full logo wall, lit. Same file as WhatsApp 10.44.57. |
| 1 Entrance | `entrance-logo` | WhatsApp Image 2026-11-26 at 10.44.58.jpeg | Charles Hope / CH CoWork/CoWork | Closest sharp shot of the logo on the slats. |
| 2 Live. Work. Stay. | `lws-wide` | Lobby_cleaned.jpg | Charles Hope / CH CoWork | Highest-resolution file in the folder (3840x2160); sign and slat wall together, a natural step from the logo. |
| 2 Live. Work. Stay. | `lws-close` | IMG_3877_cleaned.jpg | Charles Hope / CH CoWork | 2016x1512 original, sharper than the WhatsApp copies of the same sign. |
| 3 Boardroom (approach) | `corridor` | WhatsApp Image 2026-11-26 at 10.45.01 (1).jpeg | Charles Hope / CH CoWork/CoWork | Walk from the sign to the boardroom; no people, no blur. |
| 3 Boardroom | `boardroom-door` | WhatsApp Image 2026-11-26 at 10.45.03 (1).jpeg | Charles Hope / CH CoWork/CoWork | Glass boardroom from the corridor. |
| 3 Boardroom | `boardroom` | WhatsApp Image 2026-11-26 at 10.45.04 (1).jpeg | Charles Hope / CH CoWork/CoWork | Cleanest interior: screen, oak table, eight chairs, no door frame in shot. |
| 4 Open space | `open-1` | WhatsApp Image 2026-11-26 at 10.45.07.jpeg | Charles Hope / CH CoWork/CoWork | Widest open-plan shot; people only small and far away. |
| 4 Open space | `open-2` | WhatsApp Image 2026-11-26 at 10.45.08.jpeg | Charles Hope / CH CoWork/CoWork | Second wide angle along the windows; people small and far away. |
| 5 Call pods | `pod-door` | WhatsApp Image 2026-11-26 at 10.45.18 (2).jpeg | Charles Hope / CH CoWork/CoWork | Cropped to x 230 to 820: the whiteboard with door codes and the seated person are outside the crop. |
| 5 Call pods | `pod-inside` | WhatsApp Image 2026-11-26 at 10.45.16 (3).jpeg | Charles Hope / CH CoWork/CoWork | Cropped to x 0 to 800: inside a pod, whiteboard excluded. The other pod interiors show the photographer reflected in the glass. |
| 6 Kitchen (lounge) | `lounge` | WhatsApp Image 2026-11-26 at 10.45.20 (3).jpeg | Charles Hope / CH CoWork/CoWork | Sharpest wide shot of the lounge and kitchen, empty. |
| 6 Kitchen | `kitchen-1` | WhatsApp Image 2026-11-26 at 10.45.22 (1).jpeg | Charles Hope / CH CoWork/CoWork | Island, mirrors and tables; no betting billboard outside the window. |
| 6 Kitchen | `kitchen-2` | WhatsApp Image 2026-11-26 at 10.45.23 (2).jpeg | Charles Hope / CH CoWork/CoWork | Best kitchen close-up, no billboard. |
| 7 View | `view-1` | WhatsApp Image 2026-11-26 at 10.45.58 (3).jpeg | Charles Hope / CH CoWork/CoWork | Devil's Peak and Table Mountain from the window. |
| 7 View | `view-2` | WhatsApp Image 2026-11-26 at 10.45.59.jpeg | Charles Hope / CH CoWork/CoWork | Widest, clearest mountain view. |

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
- **Not found:** a photo of the glass meeting pod as a separate room. Amenities shows a "photo to follow" panel for it.

## Home gallery (until the new photos arrive)

The Home gallery (`src/lib/spaces.js`) shows six spaces. On 27 November the owner sent six newer, brighter photos of
these spaces (entrance, Live. Work. Stay., open-plan desks, boardroom, glass meeting pod, the two call pods) in the chat;
they are not yet in Drive, so the gallery uses the closest photos above until the files arrive:
`entrance-wide`, `lws-wide`, `open-1`, `boardroom`, `boardroom-door` (the glass-fronted room) and `pod-door`.

## Video

`cowork-walkthrough-4k.mp4` (152 MB) and `Office_Walk_Through.mp4` (9.5 MB) are at the top of **CH CoWork**. As agreed, they
are a backup only: the Home page uses the stills, which are sharper and far lighter. The videos are not part of the site.

## Re-running

1. Download the files above from Drive into `assets/source/`, named by frame (`entrance-wide.jpg`, and so on),
   with a `sources.json` as in this table.
2. `npm run media`. To change only alt text or the pan and zoom points, edit FRAMES in `scripts/build-media.mjs`
   and run `npm run media -- --motion`.
