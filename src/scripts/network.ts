// Fondo de la cabecera: una red de nodos enlazados por la que viajan
// "paquetes" y que reacciona al puntero. Canvas 2D sin dependencias.
//
// Rendimiento: el bucle se detiene cuando la cabecera sale de pantalla o la
// pestaña pasa a segundo plano, el DPR se limita a 2 y el número de nodos
// depende del área. Con movimiento reducido se dibuja un único fotograma.

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Packet {
  from: Node;
  to: Node;
  t: number;
  speed: number;
}

const LINK_DIST = 150;
const POINTER_DIST = 190;
const MAX_PACKETS = 7;
const LINE = "56, 189, 248";
const NODE = "148, 197, 255";
const PACKET = "110, 231, 183";

export function initNetwork(reduced: boolean): void {
  const canvas = document.querySelector<HTMLCanvasElement>("[data-network]");
  const host = canvas?.parentElement;
  const ctx = canvas?.getContext("2d");
  if (!canvas || !host || !ctx) return;

  let width = 0;
  let height = 0;
  let nodes: Node[] = [];
  let packets: Packet[] = [];
  // Enlaces del último fotograma, de donde salen los paquetes
  const links: [Node, Node][] = [];

  let running = false;
  let inView = false;
  let raf = 0;
  let last = 0;
  let nextPacket = 0;
  const pointer = { x: 0, y: 0, active: false };

  const spawn = (): Node => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.08 + Math.random() * 0.22;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 1 + Math.random() * 1.4,
    };
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    links.length = 0;

    // Enlaces entre nodos cercanos: más opacos cuanto más cerca
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgb(${LINE})`;
    const max2 = LINK_DIST * LINK_DIST;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]!;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j]!;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > max2) continue;
        ctx.globalAlpha = (1 - d2 / max2) * 0.26;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        links.push([a, b]);
      }
    }

    // Enlaces hacia el puntero
    if (pointer.active) {
      ctx.strokeStyle = `rgb(${PACKET})`;
      for (const n of nodes) {
        const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        if (d > POINTER_DIST) continue;
        ctx.globalAlpha = (1 - d / POINTER_DIST) * 0.55;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();
      }
    }

    // Nodos
    ctx.fillStyle = `rgb(${NODE})`;
    ctx.globalAlpha = 0.7;
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Paquetes: un punto con halo que recorre un enlace
    ctx.fillStyle = `rgb(${PACKET})`;
    for (const p of packets) {
      const x = p.from.x + (p.to.x - p.from.x) * p.t;
      const y = p.from.y + (p.to.y - p.from.y) * p.t;
      const fade = Math.sin(p.t * Math.PI);
      ctx.globalAlpha = 0.18 * fade;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.95 * fade;
      ctx.beginPath();
      ctx.arc(x, y, 1.9, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  };

  const step = (dt: number, now: number) => {
    for (const n of nodes) {
      n.x += n.vx * dt;
      n.y += n.vy * dt;
      if ((n.x < 0 && n.vx < 0) || (n.x > width && n.vx > 0)) n.vx *= -1;
      if ((n.y < 0 && n.vy < 0) || (n.y > height && n.vy > 0)) n.vy *= -1;
    }

    for (const p of packets) p.t += p.speed * dt;
    packets = packets.filter((p) => p.t < 1);

    if (now > nextPacket && packets.length < MAX_PACKETS && links.length) {
      const [from, to] = links[Math.floor(Math.random() * links.length)]!;
      const flip = Math.random() < 0.5;
      packets.push({ from: flip ? to : from, to: flip ? from : to, t: 0, speed: 0.012 + Math.random() * 0.012 });
      nextPacket = now + 220 + Math.random() * 520;
    }
  };

  const frame = (now: number) => {
    if (!running) return;
    // dt en fotogramas de 60 Hz, acotado para no dar saltos tras una pausa
    const dt = Math.min((now - last) / 16.67, 3);
    last = now;
    step(dt, now);
    draw();
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running || reduced || !inView || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const resize = () => {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    width = rect.width;
    height = rect.height;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Densidad constante: ~1 nodo cada 17 000 px², entre 16 y 72
    const count = Math.max(16, Math.min(72, Math.round((width * height) / 17000)));
    nodes = Array.from({ length: count }, (_, i) => nodes[i] ?? spawn());
    for (const n of nodes) {
      n.x = Math.min(n.x, width);
      n.y = Math.min(n.y, height);
    }
    packets = [];
    if (!running) draw();
  };

  new ResizeObserver(resize).observe(host);
  resize();
  canvas.classList.add("is-ready");

  if (reduced) return;

  new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? false;
    if (inView) start();
    else stop();
  }).observe(host);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    host.addEventListener(
      "pointermove",
      (e) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
        pointer.active = true;
      },
      { passive: true },
    );
    host.addEventListener("pointerleave", () => {
      pointer.active = false;
    });
  }
}
