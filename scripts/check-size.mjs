// Presupuesto de peso: el sitio publicado (dist/) no puede pasar de 8 MB.
// Se ejecuta tras cada build y lo hace fallar si se supera el límite.
import { readdir, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// 8 MB en su lectura más estricta (decimal), para cumplirlo se mida como se mida
const LIMIT_BYTES = 8_000_000;
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));

const entries = await readdir(DIST, { recursive: true, withFileTypes: true });
const files = await Promise.all(
  entries
    .filter((entry) => entry.isFile())
    .map(async (entry) => {
      const path = join(entry.parentPath, entry.name);
      return { path: relative(DIST, path), bytes: (await stat(path)).size };
    }),
);

const total = files.reduce((sum, file) => sum + file.bytes, 0);
const kb = (bytes) => `${(bytes / 1000).toFixed(1)} kB`;
const share = ((total / LIMIT_BYTES) * 100).toFixed(1);

console.log(`\nPeso del sitio: ${kb(total)} de ${kb(LIMIT_BYTES)} (${share} %) en ${files.length} ficheros`);
for (const file of files.sort((a, b) => b.bytes - a.bytes).slice(0, 5)) {
  console.log(`  ${kb(file.bytes).padStart(10)}  ${file.path}`);
}

if (total > LIMIT_BYTES) {
  console.error(`\nEl sitio supera el límite de 8 MB por ${kb(total - LIMIT_BYTES)}.`);
  process.exit(1);
}
