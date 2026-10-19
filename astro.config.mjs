// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// URL pública del sitio (p. ej. https://sergiobatres.dev). Activa canonical,
// og:url y og:image absolutos. Se define en el entorno de build: SITE_URL=...
const site = process.env.SITE_URL || undefined;

export default defineConfig({
  site,
  build: {
    // Todo el CSS va inline en el HTML: cero peticiones bloqueantes de estilos
    inlineStylesheets: "always",
  },
  // Fuentes autoalojadas (sin peticiones a terceros), solo subset latin,
  // variables y con fallbacks de métricas ajustadas para evitar CLS
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Space Grotesk",
      cssVariable: "--font-display",
      weights: ["400 700"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Manrope",
      cssVariable: "--font-body",
      weights: ["400 700"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-mono",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
  // No hay Markdown con bloques de código; Shiki además es incompatible con la CSP
  markdown: { syntaxHighlight: false },
  security: {
    // Astro calcula los hashes de sus <script> y <style> y emite la meta CSP
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },
});
