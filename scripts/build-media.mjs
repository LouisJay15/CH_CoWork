// Builds the web images for the Home scroll tour and the rest of the site from the original photographs.
//
//   npm run media            (all images; a few minutes)
//   npm run media -- --motion  (only the alt text, into the existing manifest)
//   npm run media -- --only space-terrace,space-lws  (only these photos, merged into the existing manifest)
//
// Reads assets/source/<id>.jpg (originals from Google Drive, not committed: staff appear in some),
// writes public/media/frames/<id>[-tall]-<width>.avif|webp and src/media/manifest.json (committed).
// Each frame gets AVIF (small) with a WebP fallback, at 640, 1200 and 1600 px wide.
// Frames with a "crop" keep only that part of the photo (used to cut a whiteboard out of the pod shots);
// on wide screens those crops are shown over a blurred copy of themselves, so nothing is stretched.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname;
const SRC = join(root, "assets", "source");
const OUT = join(root, "public", "media", "frames");
const MANIFEST = join(root, "src", "media", "manifest.json");
const WIDTHS = [640, 1200, 1600];
const AVIF = { quality: 45, effort: 6, chromaSubsampling: "4:2:0" };
const WEBP = { quality: 60, effort: 5 };

// Frames with "redact" have those rectangles blurred (writing on boards), before anything else.
export const FRAMES = [
  // The seven cleaned-up, straightened photos (Drive, CH CoWork, 27 November): Home hero and gallery, and the pages.
  { id: "space-entrance", alt: "Entrance to Charles Hope Coworking Space: the CharlesHope sign on a lit timber-slat wall, beside windows over the city" },
  { id: "space-lws", alt: "White wall reading Live. Work. Stay. beside the timber-slat entrance wall" },
  { id: "space-boardroom", alt: "Boardroom with a teal wall, a wall-mounted screen, an oak table and eight chairs" },
  { id: "space-pod", alt: "Glass meeting pod: a teal room with frosted glass sliding doors and a table for six, on the open floor" },
  { id: "space-open", alt: "Open-plan floor with long timber desks, monitors, pendant lights and a wall of windows" },
  { id: "space-callpods", alt: "The two call pods: glass doors into two private booths, each with a desk and a window" },
  { id: "space-lounge", alt: "Long room along the windows to the lounge and kitchen, with sofas, tables and city views", redact: [{ left: 1425, top: 350, width: 150, height: 170 }] },
  { id: "space-terrace", alt: "The terrace, with a view over central Cape Town to Devil's Peak and Table Mountain" },
  // Earlier photos from the walkthrough, still used in the hotel section and on the day pass and amenities pages.
  { id: "lws-close", alt: "Close-up of the Live. Work. Stay. signage" },
  { id: "open-2", alt: "Open-plan desks along the windows, under a black steel roof" },
  { id: "lounge", alt: "Lounge with sofas and dining tables beside the kitchen" },
  { id: "kitchen-1", alt: "Kitchen with a timber-slat island, bar stools and dining tables" },
  { id: "kitchen-2", alt: "Kitchen island with a marble top, gas hob and bar stools" },
];

async function writeVariants(pipelineFactory, base, naturalWidth) {
  const widths = WIDTHS.filter((w) => w <= naturalWidth);
  if (!widths.includes(Math.min(naturalWidth, WIDTHS[WIDTHS.length - 1]))) widths.push(Math.min(naturalWidth, 1600));
  const out = [];
  let bytes = { avif: 0, webp: 0 };
  for (const w of [...new Set(widths)].sort((a, b) => a - b)) {
    const avif = await pipelineFactory().resize({ width: w }).avif(AVIF).toBuffer();
    const webp = await pipelineFactory().resize({ width: w }).webp(WEBP).toBuffer();
    writeFileSync(join(OUT, `${base}-${w}.avif`), avif);
    writeFileSync(join(OUT, `${base}-${w}.webp`), webp);
    bytes.avif += avif.length;
    bytes.webp += webp.length;
    out.push({ w, avif: avif.length, webp: webp.length });
  }
  return { widths: out.map((o) => o.w), sizes: out };
}

async function main() {
  if (process.argv.includes("--motion")) {
    const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
    for (const f of FRAMES) Object.assign(manifest.frames[f.id], { alt: f.alt });
    writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
    console.log("[media] alt text updated");
    return;
  }
  if (!existsSync(SRC)) {
    console.log("[media] assets/source is not here, so the committed images are kept as they are.");
    return;
  }
  const sources = JSON.parse(readFileSync(join(SRC, "sources.json"), "utf8"));
  mkdirSync(OUT, { recursive: true });
  mkdirSync(join(root, "src", "media"), { recursive: true });
  const onlyArg = process.argv.find((a, i) => process.argv[i - 1] === "--only");
  const only = onlyArg ? new Set(onlyArg.split(",")) : null;
  const previous = only && existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")).frames : {};
  const manifest = { generated: "npm run media", widths: WIDTHS, frames: {} };
  let total = 0;

  for (const f of FRAMES) {
    if (only && !only.has(f.id)) {
      if (previous[f.id]) manifest.frames[f.id] = previous[f.id];
      continue;
    }
    const file = join(SRC, `${f.id}.jpg`);
    const meta = await sharp(file).metadata();
    const crop = f.crop ?? { left: 0, top: 0, width: meta.width, height: meta.height };
    let input = file;
    if (f.redact) {
      // Blur writing on boards so nothing on them can be read.
      const layers = await Promise.all(
        f.redact.map(async (r) => ({ input: await sharp(file).rotate().extract(r).blur(12).toBuffer(), left: r.left, top: r.top })),
      );
      input = await sharp(file).rotate().composite(layers).jpeg({ quality: 95 }).toBuffer();
    }
    const cropped = () => sharp(input).rotate().extract(crop);
    const entry = { alt: f.alt, source: sources[f.id] };

    if (f.crop) {
      // Tall: the crop itself, for portrait screens.
      const tall = await writeVariants(cropped, `${f.id}-tall`, crop.width);
      entry.tall = { w: crop.width, h: crop.height, ...tall };
      // Wide: the crop centred over a darkened, blurred copy of itself, 16:9.
      const W = 1600, H = 900;
      const bg = await cropped().resize(W, H, { fit: "cover" }).blur(28).modulate({ brightness: 0.55 }).toBuffer();
      const fg = await cropped().resize({ height: H }).toBuffer();
      const fgMeta = await sharp(fg).metadata();
      const composite = await sharp(bg).composite([{ input: fg, left: Math.round((W - fgMeta.width) / 2), top: 0 }]).jpeg({ quality: 92 }).toBuffer();
      const wide = await writeVariants(() => sharp(composite), `${f.id}`, W);
      entry.wide = { w: W, h: H, ...wide };
    } else {
      // Keep 4:3 photos 4:3 (the tour pans across them); the 3840x2160 signage shot stays 16:9.
      const wide = await writeVariants(cropped, f.id, crop.width);
      entry.wide = { w: crop.width, h: crop.height, ...wide };
    }
    const bytes = [...(entry.wide?.sizes ?? []), ...(entry.tall?.sizes ?? [])].reduce((s, x) => s + x.avif + x.webp, 0);
    total += bytes;
    const big = entry.wide.sizes.find((s) => s.w === 1200) ?? entry.wide.sizes.at(-1);
    console.log(`[media] ${f.id.padEnd(15)} ${String(crop.width).padStart(4)}x${crop.height}  1200w: avif ${(big.avif / 1024).toFixed(0)} KB, webp ${(big.webp / 1024).toFixed(0)} KB`);
    for (const v of ["wide", "tall"]) if (entry[v]) delete entry[v].sizes;
    manifest.frames[f.id] = entry;
  }

  // Link-preview image for WhatsApp, Facebook and LinkedIn: a crop of the entrance photo, 1200x630 JPEG.
  if (!only || only.has("space-entrance")) await sharp(join(SRC, "space-entrance.jpg")).resize(1200, 630, { fit: "cover", position: "centre" }).jpeg({ quality: 78, mozjpeg: true }).toFile(join(root, "public", "media", "og-image.jpg"));

  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`[media] ${FRAMES.length} frames, ${(total / 1024 / 1024).toFixed(1)} MB across all sizes and formats (a visitor downloads one size in one format).`);
}

main();
