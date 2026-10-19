// Rellena la línea de tiempo de experiencia según el avance del scroll.
// Solo escucha el scroll mientras la línea está en pantalla.
export function initTimeline(): void {
  const timeline = document.querySelector<HTMLElement>("[data-timeline]");
  if (!timeline) return;

  if (!("IntersectionObserver" in window)) {
    timeline.style.setProperty("--progress", "1");
    return;
  }

  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = timeline.getBoundingClientRect();
    // La línea llega hasta el 62 % de la altura de la ventana
    const progress = (window.innerHeight * 0.62 - rect.top) / rect.height;
    timeline.style.setProperty("--progress", Math.min(1, Math.max(0, progress)).toFixed(4));
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  const io = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      onScroll();
    } else {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      // Al salir de pantalla se deja en el extremo que corresponda
      update();
    }
  });
  io.observe(timeline);
}
