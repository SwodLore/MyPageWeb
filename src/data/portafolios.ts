import { Portfolio } from "../types";

export const portafolio: Portfolio[] = [
  // ── Proyectos destacados (featured: true) ─────────────────────────────────
  {
    name: "UpTask",
    img: "/img/portafolio/uptask.webp",
    urlPageWeb: "https://up-task-fronted.vercel.app",
    urlPageGithub: "https://github.com/SwodLore/UpTask_Backend",
    description:
      "Organizador de tareas colaborativo con autenticación JWT, roles y tiempo real. Login: apovesmartinez@gmail.com | Pass: 12345678",
    tecnologias: [
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TailwindCSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
      { name: "Next.js", img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
      { name: "MongoDB", img: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
      { name: "Vercel", img: "https://vercel.com/favicon.ico" },
      { name: "Render", img: "/render.svg" },
    ],
    category: ["Fullstack", "React"],
    featured: true,
  },
  {
    name: "DevJobs",
    img: "/img/portafolio/devjobs.webp",
    urlPageWeb: "",
    urlPageGithub: "https://github.com/SwodLore/DevJobs",
    description:
      "Plataforma de empleos para desarrolladores con Docker, MySQL y deploy en AWS. Autenticación, filtros avanzados y panel admin.",
    tecnologias: [
      { name: "Laravel", img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" },
      { name: "TailwindCSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
      { name: "MySQL", img: "https://upload.wikimedia.org/wikipedia/commons/0/0a/MySQL_textlogo.svg" },
      { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "AWS", img: "https://tesslogs.com/wp-content/uploads/2024/10/Amazon-Web-Services-AWS-Logo.png" },
    ],
    category: ["Fullstack", "Laravel"],
    featured: true,
  },
  {
    name: "HackTagram",
    img: "/img/portafolio/hacktagram.webp",
    urlPageWeb: "",
    urlPageGithub: "https://github.com/SwodLore/HackTagram",
    description:
      "Red social temática para la comunidad hacker. Posts, seguidores, likes y deploy en AWS con Docker.",
    tecnologias: [
      { name: "Laravel", img: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" },
      { name: "TailwindCSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
      { name: "MySQL", img: "https://upload.wikimedia.org/wikipedia/commons/0/0a/MySQL_textlogo.svg" },
      { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "AWS", img: "https://tesslogs.com/wp-content/uploads/2024/10/Amazon-Web-Services-AWS-Logo.png" },
    ],
    category: ["Fullstack", "Laravel"],
    featured: true,
  },
  {
    name: "Maquinas de Ciberseguridad",
    img: "/img/portafolio/h.webp",
    urlPageWeb: "",
    urlPageGithub: "https://github.com/SwodLore/Search-machines-of-s4vitar",
    description:
      "Herramienta CLI en Bash para buscar y filtrar máquinas de ciberseguridad de s4vitar. Colores, búsqueda interactiva y exportación.",
    tecnologias: [
      { name: "Bash", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bash_Logo_Colored.svg" },
      { name: "Linux", img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png" },
    ],
    category: ["Bash"],
    featured: true,
  },
  {
    name: "KeyLogger con Python",
    img: "/img/portafolio/prueba_key.webp",
    urlPageWeb: "",
    urlPageGithub: "https://github.com/SwodLore/keylogger_with_mail",
    description:
      "Keylogger educativo en Python que captura teclas y las envía por email configurable. Uso exclusivo en entornos controlados.",
    tecnologias: [
      { name: "Python", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/180px-Python-logo-notext.svg.png" },
      { name: "Linux", img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png" },
    ],
    category: ["Python"],
    featured: true,
  },
  {
    name: "Ransomware con Python",
    img: "/img/portafolio/ransonware.webp",
    urlPageWeb: "",
    urlPageGithub: "https://github.com/SwodLore/ransonware_with_python",
    description:
      "Ransomware educativo en Python con cifrado de archivos por llave pública y descifrado controlado. Uso en entornos de laboratorio.",
    tecnologias: [
      { name: "Python", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/180px-Python-logo-notext.svg.png" },
      { name: "Linux", img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png" },
    ],
    category: ["Python"],
    featured: true,
  },

  // ── Proyectos React ───────────────────────────────────────────────────────
  {
    name: "Bebidas API's",
    img: "/img/portafolio/bebidas.webp",
    urlPageWeb: "https://peaceful-horse-e7e396.netlify.app",
    urlPageGithub: "https://github.com/SwodLore/bebidas-react",
    description: "Búsqueda de bebidas por nombre y categoría consumiendo una API pública. Estado global con Zustand.",
    tecnologias: [
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TailwindCSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
    ],
    category: ["React"],
    featured: false,
  },
  {
    name: "Clima React y API's",
    img: "/img/portafolio/clima.webp",
    urlPageWeb: "https://deluxe-dusk-bd79c8.netlify.app",
    urlPageGithub: "https://github.com/SwodLore/Clima_API",
    description: "App del tiempo con búsqueda por ciudad y país usando OpenWeatherMap API.",
    tecnologias: [
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "CSS", img: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
    ],
    category: ["React"],
    featured: false,
  },
  {
    name: "Criptomonedas API's",
    img: "/img/portafolio/criptomoneda.webp",
    urlPageWeb: "https://celebrated-profiterole-93f37c.netlify.app",
    urlPageGithub: "https://github.com/SwodLore/CriptoApp",
    description: "Consulta de precios de criptomonedas en tiempo real usando CoinGecko API.",
    tecnologias: [
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TailwindCSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
    ],
    category: ["React"],
    featured: false,
  },
  {
    name: "Veterinaria React",
    img: "/img/portafolio/veterinaria.webp",
    urlPageWeb: "https://tubular-wisp-470736.netlify.app",
    urlPageGithub: "https://github.com/SwodLore/Pascientes-de-veterinaria-",
    description: "CRUD de pacientes de veterinaria con persistencia en localStorage. Context API y TypeScript.",
    tecnologias: [
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TailwindCSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
    ],
    category: ["React"],
    featured: false,
  },
  {
    name: "Planificador de Gastos",
    img: "/img/portafolio/gastos.webp",
    urlPageWeb: "https://chimerical-starburst-da72d3.netlify.app",
    urlPageGithub: "https://chimerical-starburst-da72d3.netlify.app",
    description: "Control de gastos con presupuesto, categorías y gráfico circular. useReducer y Context API.",
    tecnologias: [
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TailwindCSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
    ],
    category: ["React"],
    featured: false,
  },
  {
    name: "Contador de Calorías",
    img: "/img/portafolio/calorias.webp",
    urlPageWeb: "https://incandescent-malasada-912124.netlify.app",
    urlPageGithub: "https://github.com/SwodLore/Contador-de-Calorias-ContextAPI",
    description: "Contador de calorías con registro de comidas y ejercicio. Context API y useReducer.",
    tecnologias: [
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TailwindCSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
    ],
    category: ["React"],
    featured: false,
  },
  {
    name: "Calculadora de Propinas",
    img: "/img/portafolio/propinas.webp",
    urlPageWeb: "https://luxury-shortbread-48fa39.netlify.app",
    urlPageGithub: "https://github.com/SwodLore/Calculadora_propinas",
    description: "Calculadora de propinas y consumo por mesa para restaurantes. Custom hooks y TypeScript.",
    tecnologias: [
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TailwindCSS", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
    ],
    category: ["React"],
    featured: false,
  },
  {
    name: "Guitarra React",
    img: "/img/portafolio/guitarra.webp",
    urlPageWeb: "https://teal-scone-36fe35.netlify.app",
    urlPageGithub: "https://github.com/SwodLore/Carrito-de-compras-en-una-tienda-de-guitarras",
    description: "Carrito de compras para tienda de guitarras con persistencia en localStorage.",
    tecnologias: [
      { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "CSS", img: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
    ],
    category: ["React"],
    featured: false,
  },

  // ── Proyectos Bash / Scripting ────────────────────────────────────────────
  {
    name: "Ruleta con Bash",
    img: "/img/portafolio/help.webp",
    urlPageWeb: "",
    urlPageGithub: "https://github.com/SwodLore/Ruleta_bash_tecnicas",
    description:
      "Simulador de ruleta en Bash con estrategias matemáticas: Martingala e Inverse Labouchère.",
    tecnologias: [
      { name: "Bash", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Bash_Logo_Colored.svg" },
      { name: "Linux", img: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png" },
    ],
    category: ["Bash"],
    featured: false,
  },

  // ── Proyectos Frontend puro ───────────────────────────────────────────────
  {
    name: "Festival de Música",
    img: "/img/portafolio/musica.webp",
    urlPageWeb: "https://festival-poves.netlify.app",
    urlPageGithub: "https://github.com/SwodLore/Carnaval_Music",
    description: "Landing page de festival de música con diseño responsive y animaciones CSS.",
    tecnologias: [
      { name: "HTML5", img: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
      { name: "CSS3", img: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
      { name: "JavaScript", img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
    ],
    category: ["Frontend"],
    featured: false,
  },
  {
    name: "BlogDeCafé",
    img: "/img/portafolio/cafe.webp",
    urlPageWeb: "https://fabulous-bunny-78e2fe.netlify.app",
    urlPageGithub: "https://github.com/SwodLore/Web_coffe",
    description: "Blog de café con diseño editorial, grid layout y animaciones CSS.",
    tecnologias: [
      { name: "HTML5", img: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
      { name: "CSS3", img: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
    ],
    category: ["Frontend"],
    featured: false,
  },
  {
    name: "Mini Tienda de Polos",
    img: "/img/portafolio/polos.webp",
    urlPageWeb: "https://splendid-arithmetic-90c730.netlify.app",
    urlPageGithub: "https://github.com/SwodLore/My_Frist_Store_simple",
    description: "Tienda online de ropa con carrito de compras básico en HTML, CSS y JS vanilla.",
    tecnologias: [
      { name: "HTML5", img: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
      { name: "CSS3", img: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
    ],
    category: ["Frontend"],
    featured: false,
  },
  {
    name: "Primer Sitio Web",
    img: "/img/portafolio/first.webp",
    urlPageWeb: "https://benevolent-cuchufli-6123b3.netlify.app",
    urlPageGithub: "https://github.com/SwodLore/My_first_web_page",
    description: "Mi primer sitio web — los orígenes. HTML y CSS desde cero.",
    tecnologias: [
      { name: "HTML5", img: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
      { name: "CSS3", img: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" },
    ],
    category: ["Frontend"],
    featured: false,
  },
];
