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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || "https://YOUR-PROJECT.lovable.app").replace(/\/+$/, "");
  const demo = mode === "demo";
  return {
    // The demo build is a single HTML file that opens from disk, so its asset paths are relative.
    base: demo ? "./" : "/",
    plugins: [react(), seoFiles(siteUrl), ...(demo ? [viteSingleFile()] : [])],
    build: { outDir: demo ? "dist-demo" : "dist", emptyOutDir: true },
    server: {
      proxy: { "/api": { target: env.API_PROXY_TARGET || "http://127.0.0.1:8000", changeOrigin: true } },
    },
    test: { environment: "node", include: ["src/**/*.test.js"] },
  };
});
