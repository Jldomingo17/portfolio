// Sesión de terminal de la cabecera: escribe los comandos carácter a carácter
// y va destapando sus salidas. El texto ya está completo en el HTML, así que
// solo se cambia su visibilidad y el bloque nunca cambia de tamaño.

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function typeLine(line: HTMLElement): Promise<void> {
  const target = line.querySelector<HTMLElement>(".t-text");
  if (!target) return;

  const text = target.textContent ?? "";
  const typed = document.createElement("span");
  const rest = document.createElement("span");
  typed.className = "t-typed";
  rest.className = "t-rest";
  rest.textContent = text;
  target.replaceChildren(typed, rest);

  line.classList.add("is-on", "is-typing");
  await sleep(380);

  for (let i = 1; i <= text.length; i++) {
    typed.textContent = text.slice(0, i);
    rest.textContent = text.slice(i);
    await sleep(26 + Math.random() * 58);
  }

  await sleep(240);
  line.classList.remove("is-typing");
}

export function initTerminal(reduced: boolean): void {
  const root = document.querySelector<HTMLElement>("[data-term]");
  if (!root) return;

  if (reduced || !("IntersectionObserver" in window)) {
    root.classList.add("is-done");
    return;
  }

  const lines = [...root.querySelectorAll<HTMLElement>(".t-line")];
  root.classList.add("is-live");

  const run = async () => {
    await sleep(900);
    for (const line of lines) {
      if (line.dataset.kind === "cmd") {
        await typeLine(line);
      } else {
        line.classList.add("is-on");
        await sleep(line.dataset.kind === "idle" ? 0 : 90);
      }
    }
    root.classList.add("is-done");
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      void run();
    },
    { threshold: 0.35 },
  );
  io.observe(root);
}
