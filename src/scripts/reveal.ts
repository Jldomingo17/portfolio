// Aparición de los elementos [data-reveal] al entrar en pantalla.
export function initReveal(): void {
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        el.classList.add("is-visible");

        // Al terminar se retira el atributo: la transición de entrada (lenta y
        // con retardo escalonado) deja de pisar las transiciones propias del
        // elemento, como el hover de las tarjetas
        const done = (e: TransitionEvent) => {
          if (e.target !== el || e.propertyName !== "opacity") return;
          el.removeEventListener("transitionend", done);
          el.removeAttribute("data-reveal");
        };
        el.addEventListener("transitionend", done);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  els.forEach((el) => io.observe(el));
}
