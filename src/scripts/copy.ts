// Botones [data-copy]: copian su valor al portapapeles y lo confirman.

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Sin Clipboard API (http, permiso denegado): se intenta la vía clásica
  }

  const area = document.createElement("textarea");
  area.value = text;
  area.readOnly = true;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  area.remove();
  return ok;
}

export function initCopy(): void {
  for (const btn of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
    const label = btn.querySelector<HTMLElement>("[data-copy-label]");
    const idle = label?.textContent ?? "";
    let timer = 0;

    btn.addEventListener("click", async () => {
      const ok = await copyText(btn.dataset.copy ?? "");
      btn.classList.toggle("is-copied", ok);
      if (label) label.textContent = ok ? "Copiado" : "No se pudo copiar";
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        btn.classList.remove("is-copied");
        if (label) label.textContent = idle;
      }, 2000);
    });
  }
}
