// Contenido del portfolio. Todo sale del CV: para actualizar la web basta con
// editar este archivo.

export const profile = {
  name: "Sergio Batres López-Bueno",
  firstLine: "Sergio Batres",
  secondLine: "López-Bueno",
  role: "Administrador DevOps",
  // Roles que rotan en la cabecera (el primero es el que ven buscadores y lectores de pantalla)
  roles: ["Administrador DevOps", "Sistemas y Redes", "CEO en Codivo"],
  location: "Pinto, Madrid",
  email: "sergiobatreslopez@gmail.com",
  // El teléfono del CV no se publica por defecto (spam). Para mostrarlo en
  // Contacto: phone: "666 20 86 33"
  phone: "",
  linkedin: {
    url: "https://www.linkedin.com/in/sbatres/",
    label: "linkedin.com/in/sbatres",
  },
  lead: "Despliego y mantengo la infraestructura que hay detrás de cada proyecto: servidores Linux, contenedores Docker, redes, DNS y Active Directory.",
  about: [
    "Soy Técnico en Sistemas Microinformáticos y Redes y actualmente curso el Grado Superior en Administración de Sistemas Informáticos en Red (ASIR). Me apasionan la administración de sistemas, las redes y la resolución de incidencias técnicas.",
    "Destaco por mi capacidad de trabajo en equipo, comunicación y orientación a la resolución de problemas, con experiencia en soporte técnico, redes y administración de Active Directory.",
  ],
};

export const site = {
  title: "Sergio Batres López-Bueno — Administrador DevOps",
  description:
    "Portfolio de Sergio Batres López-Bueno, Administrador DevOps en Madrid: servidores Linux, Docker, Coolify, redes, DNS y Active Directory.",
};

export const nav = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#stack", label: "Stack" },
  { href: "#formacion", label: "Formación" },
];

export type Tone = "ok" | "dim" | "accent";
export interface TermSegment {
  text: string;
  tone?: Tone;
}
export interface TermBlock {
  cmd: string;
  out: TermSegment[][];
}

// Sesión de terminal de la cabecera
export const terminal: TermBlock[] = [
  {
    cmd: "whoami",
    out: [[{ text: "sergio" }, { text: " · administrador devops · pinto, madrid", tone: "dim" }]],
  },
  {
    cmd: "ls ~/stack",
    out: [
      [{ text: "ubuntu/  debian/  windows-server/  docker/", tone: "accent" }],
      [{ text: "coolify/  active-directory/  dns/  mysql/", tone: "accent" }],
    ],
  },
  {
    cmd: "systemctl status carrera",
    out: [
      [{ text: "● ", tone: "ok" }, { text: "carrera.service — DevOps @ Reyes Legal Perito" }],
      [
        { text: "  Active: ", tone: "dim" },
        { text: "active (running)", tone: "ok" },
        { text: " since feb 2026", tone: "dim" },
      ],
    ],
  },
  {
    cmd: "tail -1 formacion.log",
    out: [[{ text: "[2025 – hoy] ", tone: "dim" }, { text: "ASIR · IES Calderón de la Barca" }]],
  },
];

// Cinta de tecnologías
export const marquee = [
  "Ubuntu",
  "Debian",
  "Windows Server",
  "Docker",
  "Coolify",
  "Active Directory",
  "GPO",
  "DNS",
  "TCP/IP",
  "SNMP",
  "MySQL",
  "Oracle",
  "Bitrix24",
  "SiteGround",
  "HTML",
  "CSS",
  "JavaScript",
  "PHP",
];

export interface Bullet {
  label?: string;
  text: string;
}
export interface Job {
  role: string;
  company: string;
  link?: { href: string; label: string };
  dates: string[];
  location?: string;
  current?: boolean;
  bullets: Bullet[];
}

export const experience: Job[] = [
  {
    role: "CEO",
    company: "Codivo",
    link: { href: "https://codivo.es", label: "codivo.es" },
    // Fecha pendiente en el CV: al añadirla aquí aparece en la línea de tiempo
    dates: [],
    bullets: [
      {
        label: "Infraestructura y servidores",
        text: "puesta en marcha y administración de un servidor Ubuntu con Coolify como plataforma de despliegue autoalojada (PaaS) para los proyectos de la empresa y de clientes.",
      },
      {
        label: "Despliegue de aplicaciones",
        text: "publicación de aplicaciones y servicios en contenedores Docker a través de Coolify, con certificados SSL y gestión de entornos.",
      },
      {
        label: "Dominios y DNS",
        text: "registro y configuración de dominios y zonas DNS para los servicios web y de correo.",
      },
      {
        label: "Atención al cliente",
        text: "trato directo con clientes, recogida de requisitos, seguimiento de proyectos y soporte tras la entrega.",
      },
      {
        label: "Marketing",
        text: "planificación y realización de campañas de marketing para la captación de clientes y la promoción de la marca.",
      },
      {
        label: "Dirección del negocio",
        text: "definición de servicios, elaboración de presupuestos y coordinación de los proyectos de principio a fin.",
      },
    ],
  },
  {
    role: "Administrador DevOps",
    company: "Reyes Legal Perito S.L.",
    dates: ["Febrero 2026 – Actualidad"],
    location: "Madrid",
    current: true,
    bullets: [
      {
        label: "Desarrollo de CRM propio",
        text: "diseño, desarrollo e implantación de un CRM a medida orientado a las necesidades de la empresa, asumiendo su gestión, mantenimiento y evolución.",
      },
      {
        label: "ERP/CRM",
        text: "administración de Bitrix24: usuarios, control de accesos, flujos de trabajo y automatización de procesos corporativos.",
      },
      {
        label: "Infraestructura y migraciones",
        text: "migración de servicios web, bases de datos y correo corporativo a entornos cloud (SiteGround).",
      },
      {
        label: "Desarrollo y despliegue web",
        text: "diseño, estructuración y mantenimiento de sitios corporativos; optimización y resolución de incidencias en producción.",
      },
      {
        label: "Redes y DNS",
        text: "configuración y auditoría de zonas DNS (A, CNAME, MX, autodiscover) y administración de bases de datos MySQL y Oracle.",
      },
      {
        label: "Soporte L2",
        text: "resolución de incidencias críticas e importación/depuración masiva de datos (CSV) para el equipo interno.",
      },
    ],
  },
  {
    role: "Técnico Informático (FCT)",
    company: "C.E.I.P. Isabel la Católica",
    dates: ["Marzo 2025 – Junio 2025", "Mayo 2026 – Junio 2026"],
    location: "Pinto, Madrid",
    bullets: [
      { text: "Reparación, configuración e instalación de equipos informáticos." },
      { text: "Administración y control de Active Directory: usuarios, grupos y permisos." },
      { text: "Montaje de cableado estructurado y configuración de la red local." },
      { text: "Edición de vídeo y audio para proyectos del centro." },
      { text: "Atención al usuario y resolución de incidencias técnicas." },
    ],
  },
  {
    role: "Soporte Técnico de Atención y Vigilancia de Equipos (FCT)",
    company: "Axians",
    dates: ["Mayo 2023 – Junio 2023"],
    location: "Madrid",
    bullets: [
      { text: "Monitorización y vigilancia de equipos de red en entorno empresarial." },
      { text: "Escalado y resolución de incidencias técnicas." },
      { text: "Mapeado y configuración de equipos mediante el protocolo SNMP." },
      { text: "Atención al cliente y trabajo coordinado en equipo." },
    ],
  },
];

export const otherExperience = [
  {
    role: "Personal de Tienda",
    company: "Centros Comerciales Carrefour, S.A.",
    desc: "Atención al cliente y reposición de productos en entorno de alta afluencia.",
    dates: "Jul 2025 – Ago 2025",
    location: "Madrid",
  },
  {
    role: "Auxiliar de Servicios",
    company: "ZEG Servicios Auxiliares, S.L.",
    desc: "Apoyo logístico y atención en eventos. Trabajo en equipo y orientación al cliente.",
    dates: "Ago 2022 – Mar 2025",
    location: "Madrid",
  },
  {
    role: "Conserje",
    company: "Comunidad de Propietarios Los Altos del Retiro",
    desc: "Limpieza y cuidado del edificio. Atención y acompañamiento a personas mayores.",
    dates: "Jul 2024 – Ago 2024",
    location: "Valdemoro",
  },
  {
    role: "Auxiliar en Conciertos y Eventos",
    company: "Liconsur Servicios Auxiliares, S.L.",
    desc: "Apoyo en la organización de eventos. Atención al público y control de accesos.",
    dates: "Sep 2022 – Jul 2024",
    location: "Madrid",
  },
];

export type IconName =
  | "server"
  | "network"
  | "users"
  | "cpu"
  | "monitor"
  | "code"
  | "box"
  | "layout"
  | "cloud"
  | "workflow";

export interface Project {
  icon: IconName;
  context: string;
  title: string;
  desc: string;
  tags: string[];
  link?: { href: string; label: string };
}

// Trabajo destacado, extraído de la experiencia en Codivo y Reyes Legal Perito
export const projects: Project[] = [
  {
    icon: "box",
    context: "Codivo",
    title: "Plataforma de despliegue autoalojada",
    desc: "Servidor Ubuntu con Coolify como PaaS propio: aplicaciones y servicios en contenedores Docker, con certificados SSL y gestión de entornos para proyectos de la empresa y de clientes.",
    tags: ["Ubuntu", "Coolify", "Docker", "SSL"],
    link: { href: "https://codivo.es", label: "codivo.es" },
  },
  {
    icon: "layout",
    context: "Reyes Legal Perito",
    title: "CRM a medida",
    desc: "Diseño, desarrollo e implantación de un CRM propio orientado a las necesidades de la empresa, asumiendo su gestión, mantenimiento y evolución.",
    tags: ["Desarrollo a medida", "Implantación", "Mantenimiento"],
  },
  {
    icon: "cloud",
    context: "Reyes Legal Perito",
    title: "Migración a cloud",
    desc: "Traslado de servicios web, bases de datos y correo corporativo a SiteGround, con configuración y auditoría de las zonas DNS (A, CNAME, MX, autodiscover).",
    tags: ["SiteGround", "DNS", "Correo", "Bases de datos"],
  },
  {
    icon: "workflow",
    context: "Reyes Legal Perito",
    title: "Automatización con Bitrix24",
    desc: "Administración del ERP/CRM corporativo: usuarios, control de accesos, flujos de trabajo y automatización de procesos internos.",
    tags: ["Bitrix24", "Flujos de trabajo", "Control de accesos"],
  },
];

export interface SkillGroup {
  icon: IconName;
  title: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    icon: "server",
    title: "Sistemas Operativos",
    items: ["Windows Server", "Windows 10/11", "Linux (Ubuntu, Debian)"],
  },
  {
    icon: "network",
    title: "Redes",
    items: ["Configuración LAN/WAN", "SNMP", "Cableado estructurado", "TCP/IP"],
  },
  {
    icon: "users",
    title: "Administración",
    items: ["Active Directory", "Gestión de usuarios y permisos", "GPO"],
  },
  {
    icon: "cpu",
    title: "Hardware",
    items: ["Montaje de equipos", "Reparación", "Instalación"],
  },
  {
    icon: "monitor",
    title: "Software",
    items: ["Microsoft Office", "Edición de vídeo y audio", "Herramientas de monitorización"],
  },
  {
    icon: "code",
    title: "Desarrollo Web",
    items: ["HTML", "CSS", "JavaScript", "PHP", "Mantenimiento de sitios web"],
  },
];

export const education = [
  {
    title: "Grado Superior en Administración de Sistemas Informáticos en Red (ASIR)",
    center: "IES Calderón de la Barca",
    dates: "2025 – Actualidad",
    current: true,
  },
  {
    title: "Grado Medio en Sistemas Microinformáticos y Redes",
    center: "IES Calderón de la Barca",
    dates: "Septiembre 2023 – Junio 2025",
    current: false,
  },
  {
    title: "FP Básica en Informática y Comunicaciones",
    center: "Valle del Miro",
    dates: "Septiembre 2021 – Junio 2023",
    current: false,
  },
];

export const languages = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "Intermedio-Alto (B2)" },
];

export const achievements = [
  { title: "Subcampeón Nacional de Debate", place: "Alcalá de Henares" },
  { title: "Finalista Soft Skills de Emprendimiento", place: "IFEMA, Madrid" },
];
