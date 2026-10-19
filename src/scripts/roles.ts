// Rota los roles de la cabecera con un efecto de "descifrado": cada carácter
// pasa por símbolos aleatorios antes de asentarse en el definitivo.

const GLYPHS = "!<>-_\\/[]{}=+*^?#01";

interface Cell {
  from: string;
  to: string;
  start: number;
  end: number;
  glyph: string;
}

export function initRoles(): void {
  const el = document.querySelector<HTMLElement>("[data-roles]");
  if (!el) return;

  let roles: string[] = [];
  try {
    roles = JSON.parse(el.dataset.roles ?? "[]");
  } catch {
    return;
  }
  if (roles.length < 2) return;

  let index = 0;
  let raf = 0;
  let inView = true;

  const scrambleTo = (to: string) => {
    const from = el.textContent ?? "";
    const length = Math.max(from.length, to.length);
    const cells: Cell[] = Array.from({ length }, (_, i) => {
      const start = Math.floor(Math.random() * 16);
      return { from: from[i] ?? "", to: to[i] ?? "", start, end: start + 8 + Math.floor(Math.random() * 16), glyph: "" };
    });

    let frame = 0;
    const tick = () => {
      let out = "";
      let settled = 0;
      for (const cell of cells) {
        if (frame >= cell.end) {
          settled++;
          out += cell.to;
        } else if (frame >= cell.start) {
          if (!cell.glyph || Math.random() < 0.28) {
            cell.glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!;
          }
          out += cell.glyph;
        } else {
          out += cell.from;
        }
      }
      el.textContent = out;
      if (settled < cells.length) {
        frame++;
        raf = requestAnimationFrame(tick);
      }
    };

    cancelAnimationFrame(raf);
    tick();
  };

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
    }).observe(el);
  }

  setInterval(() => {
    if (document.hidden || !inView) return;
    index = (index + 1) % roles.length;
    scrambleTo(roles[index]!);
  }, 3800);
}
