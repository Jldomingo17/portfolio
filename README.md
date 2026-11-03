# Portfolio · Sergio Batres López-Bueno

Portfolio personal de **Sergio Batres López-Bueno**, Administrador DevOps en Madrid: servidores Linux, Docker, Coolify, redes, DNS y Active Directory.

**🌐 Ver en vivo: [jldomingo17.github.io/portfolio](https://jldomingo17.github.io/portfolio/)**

Es una web estática de una sola página hecha con [Astro](https://astro.build), sin frameworks de UI ni dependencias en el navegador, y pensada para ser rápida, accesible y segura.

## Características

- **Contenido centralizado**: todo el texto sale de [`src/data/cv.ts`](src/data/cv.ts). Para actualizar la web basta con editar ese archivo.
- **Cabecera interactiva**: fondo de red de nodos en canvas que reacciona al puntero, terminal que escribe comandos en directo y roles que rotan.
- **Secciones**: Sobre mí, Experiencia (con línea de tiempo), Proyectos, Stack, Formación y Contacto.
- **Rendimiento**:
  - CSS inline en el HTML (sin peticiones bloqueantes).
  - Fuentes autoalojadas (Space Grotesk, Manrope y JetBrains Mono), solo subset latin y con fallbacks ajustados para evitar saltos de diseño.
  - Las animaciones se pausan fuera de pantalla y respetan `prefers-reduced-motion`.
  - Límite de peso de **8 MB** comprobado en cada build.
- **Seguridad**: Content Security Policy con hashes generada por Astro y cabeceras de seguridad en nginx.
- **SEO**: metadatos Open Graph, datos estructurados JSON-LD (`Person`), `robots.txt` y página 404 propia.

## Tecnologías

| Área        | Herramientas                         |
| ----------- | ------------------------------------ |
| Framework   | Astro 7                              |
| Lenguaje    | TypeScript                           |
| Estilos     | CSS propio (`src/styles/global.css`) |
| Servidor    | nginx (Alpine)                       |
| Despliegue  | Docker + Coolify                     |

## Estructura

```
.
├── public/              # Ficheros estáticos (favicon, og.jpg, robots.txt)
├── scripts/
│   ├── check-size.mjs   # Comprueba que dist/ no pase de 8 MB
│   └── make-zip.mjs     # Empaqueta dist/ en portfolio.zip
├── src/
│   ├── assets/          # Imágenes optimizadas por Astro (foto)
│   ├── components/      # Secciones de la página (Hero, Experience, Projects…)
│   ├── data/cv.ts       # Todo el contenido del portfolio
│   ├── layouts/         # Base.astro: <head>, metadatos y JSON-LD
│   ├── pages/           # index.astro y 404.astro
│   ├── scripts/         # Interactividad (terminal, red, scroll, navegación…)
│   └── styles/          # Estilos globales
├── astro.config.mjs     # Configuración de Astro (fuentes, CSP, build)
├── Dockerfile           # Build multietapa: Node → nginx
└── nginx.conf           # Servidor de producción
```

## Desarrollo local

Requisitos: **Node.js 24** (la misma versión que usa el Dockerfile) y npm.

```bash
npm install
```

```bash
npm run dev
```

La web queda disponible en `http://localhost:4321`.

### Scripts

| Comando           | Qué hace                                                      |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en caliente                |
| `npm run build`   | Genera el sitio en `dist/` y comprueba el límite de 8 MB      |
| `npm run preview` | Sirve localmente el resultado del build                       |
| `npm run check`   | Comprobación de tipos y errores de Astro                      |
| `npm run size`    | Muestra el peso de `dist/` y los 5 ficheros más grandes       |
| `npm run zip`     | Crea `portfolio.zip` con `index.html` en la raíz (requiere Python) |

## Actualizar el contenido

Edita [`src/data/cv.ts`](src/data/cv.ts):

- `profile`: nombre, roles, ubicación, email, LinkedIn y textos de presentación. El teléfono está vacío a propósito para evitar spam; rellena `phone` si quieres mostrarlo.
- `terminal`: comandos y salidas de la terminal de la cabecera.
- `marquee`: tecnologías de la cinta animada.
- `experience` y `otherExperience`: puestos de trabajo.
- `projects`: proyectos destacados.
- `skills`, `education`, `languages` y `achievements`.

La foto está en `src/assets/foto.jpg` y la imagen para redes sociales en `public/og.jpg`.

## Despliegue

### GitHub Pages (automático)

Cada push a `main` ejecuta [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que compila la web y la publica en **https://jldomingo17.github.io/portfolio/**. También se puede lanzar a mano desde la pestaña *Actions* → *Desplegar en GitHub Pages* → *Run workflow*.

Configuración necesaria (solo una vez): en el repositorio, *Settings* → *Pages* → *Build and deployment* → *Source*: **GitHub Actions**.

### Variable `BASE_PATH`

Subcarpeta donde se publica la web. En GitHub Pages es `/portfolio` y el workflow la rellena solo. Si no se define, la web se sirve desde la raíz (`/`), que es lo que necesitan Docker y Coolify.

### Variable `SITE_URL`

Define la URL pública del sitio en el momento del build (por ejemplo `https://sergiobatres.dev`). Con ella se generan la URL canónica y las URLs absolutas de Open Graph. Si no se define, la web funciona igual pero sin esas etiquetas.

```bash
SITE_URL=https://tu-dominio.com npm run build
```

### Docker

El `Dockerfile` compila el sitio con Node y lo sirve con nginx en el puerto 80, con healthcheck incluido.

```bash
docker build --build-arg SITE_URL=https://tu-dominio.com -t portfolio .
```

```bash
docker run -d -p 8080:80 portfolio
```

### Coolify

1. Crea un recurso nuevo a partir de este repositorio con el build pack **Dockerfile**.
2. Añade `SITE_URL` como *build variable*.
3. Asigna el dominio. El certificado TLS lo gestiona el proxy de Coolify (Traefik/Caddy), por eso nginx solo escucha en HTTP.

nginx aplica caché de un año a los assets con hash (`/_astro/`) y `no-cache` al HTML, así cada despliegue se ve al momento.

## Contacto

- Email: [sergiobatreslopez@gmail.com](mailto:sergiobatreslopez@gmail.com)
- LinkedIn: [linkedin.com/in/sbatres](https://www.linkedin.com/in/sbatres/)
