// Menú móvil y resaltado de la sección visible.
export function initNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  const links = document.querySelector<HTMLElement>("[data-nav-links]");
  if (!links) return;

  const setOpen = (open: boolean) => {
    links.classList.toggle("is-open", open);
    toggle?.setAttribute("aria-expanded", String(open));
  };

  toggle?.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  links.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("is-open")) {
      setOpen(false);
      toggle?.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!(e.target as HTMLElement).closest("[data-nav]")) setOpen(false);
  });

  // Sección activa: la que cruza la franja central de la ventana
  const anchors = [...links.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
  const byId = new Map(anchors.map((a) => [a.hash.slice(1), a]));
  const sections = [...byId.keys()]
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);
  if (!sections.length || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const link = byId.get(entry.target.id);
        if (!link) continue;
        if (entry.isIntersecting) {
          anchors.forEach((a) => a.removeAttribute("aria-current"));
          anchors.forEach((a) => a.classList.remove("is-active"));
          link.classList.add("is-active");
          link.setAttribute("aria-current", "true");
        } else {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  sections.forEach((s) => io.observe(s));
}
