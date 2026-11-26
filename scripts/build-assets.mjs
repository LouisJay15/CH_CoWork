// Makes WebP copies of the photographs and the tour poster, and writes src/generated/assets.json,
// which tells the site which media files exist (so a missing photo shows a labelled panel, not a broken image).
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pub = join(root, "public");
let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[assets] sharp is not installed, so no WebP copies will be made.");
}

async function scan(dir) {
  const out = {};
  if (!existsSync(dir)) return out;
  for (const file of readdirSync(dir)) {
    const { name, ext } = parse(file);
    const e = ext.toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(e)) continue;
    const src = join(dir, file);
    const webp = join(dir, `${name}.webp`);
    const entry = { file, webp: existsSync(webp) };
    if (sharp) {
      try {
        const meta = await sharp(src).metadata();
        entry.width = meta.width;
        entry.height = meta.height;
        if (!entry.webp || statSync(webp).mtimeMs < statSync(src).mtimeMs) {
          await sharp(src).webp({ quality: 78 }).toFile(webp);
          entry.webp = true;
        }
      } catch (err) {
        console.warn(`[assets] could not process ${file}: ${err.message}`);
      }
    }
    out[name] = entry;
  }
  return out;
}

const images = await scan(join(pub, "images"));
const videoDir = join(pub, "video");
const posters = await scan(videoDir);
const manifest = {
  images,
  poster: posters["cowork-tour-poster"] ?? null,
  tourVideo: existsSync(join(videoDir, "cowork-tour.mp4")),
};
mkdirSync(join(root, "src", "generated"), { recursive: true });
writeFileSync(join(root, "src", "generated", "assets.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`[assets] ${Object.keys(images).length} photographs, poster: ${manifest.poster ? "yes" : "no"}, tour clip: ${manifest.tourVideo ? "yes" : "no"}`);
