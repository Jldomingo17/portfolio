import { initReveal } from "./reveal";
import { initNav } from "./nav";
import { initTerminal } from "./terminal";
import { initTimeline } from "./timeline";
import { initCopy } from "./copy";
import { initNetwork } from "./network";
import { initPointerFx } from "./pointer-fx";
import { initRoles } from "./roles";

// Habilita en el CSS los estados iniciales que dependen de JavaScript
document.documentElement.classList.add("js");

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Lo que afecta a lo que ya se ve o a la interacción básica, de inmediato
initReveal();
initNav();
initTerminal(reduced);
initTimeline();
initCopy();

// Lo decorativo espera a que el hilo principal esté libre
const whenIdle: (cb: () => void) => void =
  "requestIdleCallback" in window ? (cb) => requestIdleCallback(cb, { timeout: 1500 }) : (cb) => setTimeout(cb, 200);

whenIdle(() => {
  initNetwork(reduced);
  if (!reduced) {
    initPointerFx();
    initRoles();
  }
});
