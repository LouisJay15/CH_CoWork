import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

const ROUTES = [
  "/",
  "/desks-and-pricing",
  "/day-pass",
  "/hotel-guests",
  "/amenities",
  "/location",
  "/faq",
  "/book",
  "/terms",
  "/privacy",
];

// Writes sitemap.xml and robots.txt into the build, using SITE_URL.
function seoFiles(siteUrl) {
  return {
    name: "seo-files",
    apply: "build",
    generateBundle() {
      const urls = ROUTES.map((r) => `  <url><loc>${siteUrl}${r}</loc></url>`).join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

// Writes .br and .gz copies of text files, so the server can send them compressed without doing work per request.
function precompress() {
  let outDir = "dist";
  return {
    name: "precompress",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const walk = (dir) => {
        for (const name of readdirSync(dir)) {
          const file = join(dir, name);
          if (statSync(file).isDirectory()) walk(file);
          else if (/\.(js|css|html|svg|json|xml|txt)$/.test(name)) {
            const data = readFileSync(file);
            if (data.length < 1024) continue;
            writeFileSync(`${file}.br`, brotliCompressSync(data, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }));
            writeFileSync(`${file}.gz`, gzipSync(data, { level: 9 }));
          }
        }
      };
      walk(outDir);
    },
  };
}

// index.html uses __BASE__ for files in /public, so the same HTML works at "/" and in the offline demo ("./").
function baseInHtml(base) {
  return { name: "base-in-html", transformIndexHtml: (html) => html.replaceAll("__BASE__", base) };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || "https://YOUR-PROJECT.lovable.app").replace(/\/+$/, "");
  const demo = mode === "demo";
  return {
    // The demo build is a single HTML file that opens from disk, so its asset paths are relative.
    base: demo ? "./" : "/",
    plugins: [react(), baseInHtml(demo ? "./" : "/"), seoFiles(siteUrl), ...(demo ? [viteSingleFile()] : [precompress()])],
    build: { outDir: demo ? "dist-demo" : "dist", emptyOutDir: true },
    server: {
      proxy: { "/api": { target: env.API_PROXY_TARGET || "http://127.0.0.1:8000", changeOrigin: true } },
    },
    test: { environment: "node", include: ["src/**/*.test.js"] },
  };
});
