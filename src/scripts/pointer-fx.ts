// Efectos que siguen al puntero: foco de luz en las tarjetas .spot e
// inclinación 3D del terminal. Solo en dispositivos con ratón; las escrituras
// de estilo se agrupan en un requestAnimationFrame por movimiento.
export function initPointerFx(): void {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  for (const group of document.querySelectorAll<HTMLElement>("[data-spot-group]")) {
    const cards = [...group.querySelectorAll<HTMLElement>("[data-spot]")];
    let event: PointerEvent | null = null;
    let queued = false;

    group.addEventListener(
      "pointermove",
      (e) => {
        event = e;
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => {
          queued = false;
          if (!event) return;
          // Se actualizan todas las tarjetas del grupo: el borde de las
          // vecinas también se ilumina cuando el puntero pasa cerca
          const rects = cards.map((card) => card.getBoundingClientRect());
          cards.forEach((card, i) => {
            card.style.setProperty("--mx", `${(event!.clientX - rects[i]!.left).toFixed(1)}px`);
            card.style.setProperty("--my", `${(event!.clientY - rects[i]!.top).toFixed(1)}px`);
          });
        });
      },
      { passive: true },
    );
  }

  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const tilt = hero?.querySelector<HTMLElement>("[data-tilt]");
  if (!hero || !tilt) return;

  let event: PointerEvent | null = null;
  let queued = false;

  hero.addEventListener(
    "pointermove",
    (e) => {
      event = e;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        if (!event) return;
        const rect = hero.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        tilt.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
      });
    },
    { passive: true },
  );

  hero.addEventListener("pointerleave", () => {
    event = null;
    tilt.style.setProperty("--rx", "0deg");
    tilt.style.setProperty("--ry", "0deg");
  });
}
