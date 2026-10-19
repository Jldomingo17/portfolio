// Empaqueta dist/ en portfolio.zip con index.html en la raíz.
// Lo hace con Python (zipfile) para que las rutas vayan limpias: sin prefijo
// "./", con barras "/" y sin entradas de carpeta, que algunos validadores rechazan.
import { execFileSync } from "node:child_process";

const py = `
import os, zipfile
root = "dist"
with zipfile.ZipFile("portfolio.zip", "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for base, _, files in os.walk(root):
        for name in sorted(files):
            full = os.path.join(base, name)
            z.write(full, os.path.relpath(full, root).replace(os.sep, "/"))
    for n in z.namelist(): print(n)
`;
console.log(execFileSync("python", ["-c", py], { encoding: "utf8" }));
