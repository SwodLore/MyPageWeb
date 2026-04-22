// ─── Anotaciones por semana — IS093A Desarrollo de Aplicaciones Web ──────────
// Curso: 2026-I  |  Docente: Dr. Jaime Suasnabar Terrel  |  UNCP
// Edita `content` con tus apuntes personales de cada semana.

export interface Anotacion {
  semana: number;
  titulo: string;
  fecha: string;
  content: string;
  temas: string[];
  estado: "completado" | "en-curso" | "pendiente";
  unidad: "I" | "II";
  avance: number; // % de avance del curso según sílabo
}

export const anotaciones: Anotacion[] = [
  // ── UNIDAD I: Desarrollo Web Frontend ──────────────────────────────────────
  {
    semana: 1,
    titulo: "Fundamentos de la Web y Herramientas",
    fecha: "06 – 12 abr 2026",
    unidad: "I",
    avance: 6,
    estado: "completado",
    temas: [
      "Soluciones web",
      "DNS / TCP-IP / HTTP",
      "Roles: Frontend · Backend · Fullstack",
      "Visual Studio Code",
      "Git y GitHub",
    ],
    content:
      "Presentación del sílabo y prueba de diagnóstico. Se explicaron los tipos de soluciones web: sistema web, aplicación web, sitio web y página web. Funcionamiento de la web: DNS, Protocolo TCP/IP, Protocolo HTTP.\n\nRoles en el desarrollo: desarrollador frontend, backend y fullstack.\n\nHerramientas de desarrollo:\n• Visual Studio Code — interfaz, extensiones recomendadas y atajos de teclado (Lab 01A).\n• Git y GitHub — control de versiones, creación de repositorios, comandos básicos (init, clone, add, commit, push, pull) y flujo de trabajo con ramas.",
  },
  {
    semana: 2,
    titulo: "HTML5, XML y CSS3",
    fecha: "13 – 19 abr 2026",
    unidad: "I",
    avance: 12,
    estado: "completado",
    temas: [
      "Estándar Open Web Platform",
      "Estructura HTML5 y XML",
      "Árbol DOM",
      "SEO",
      "CSS3: Flexbox y Grid",
      "Diseño responsivo",
    ],
    content:
      "Estándar Open Web Platform. Estructura HTML y XML — etiquetas principales de HTML5. Árbol DOM: árbol de nodos, renderizado y ciclo de vida de una página web. Optimización en motores de búsqueda (SEO) y compatibilidad entre navegadores.\n\nCSS3: sintaxis, modelos block / inline / inline-block, unidades de medida absolutas y relativas. Flexbox, Grid Layout, tipos de position. Diseño fluido y diseño web responsivo.\n\nLab 02A: Diseño flexbox, diseño fluido y diseño responsivo.",
  },
  {
    semana: 3,
    titulo: "Bootstrap y Tailwind CSS",
    fecha: "20 – 26 abr 2026",
    unidad: "I",
    avance: 18,
    estado: "en-curso",
    temas: [
      "Bootstrap: Layout y Components",
      "Tailwind CSS",
      "Tipografía y Espaciado",
      "Flexbox en Tailwind",
      "Application UI Components",
    ],
    content:
      "Desarrollo de páginas web Front-End con Bootstrap — layout y componentes principales.\n\nTailwind CSS: tipografía (Font, Line, Text), Background, Borders, Effects, Tables, Spacing. Layout: container, columns, break, box, display, position. Flexbox: flex básico, direction, wrap, grow, shrink. Application UI: Avatars, Badges, Dropdowns, Buttons, Shells, Heading, Data Display, Navigation, Overlays.\n\nPráctica Calificada 03: desarrollo de un sitio web con CSS.",
  },
  {
    semana: 4,
    titulo: "JavaScript, TypeScript y DOM",
    fecha: "27 abr – 03 may 2026",
    unidad: "I",
    avance: 24,
    estado: "pendiente",
    temas: [
      "Motores JavaScript",
      "Variables y tipos de datos",
      "Estructuras de control",
      "Funciones: arrow, closures, IIFE",
      "TypeScript",
      "Manipulación del DOM",
      "Canvas: animaciones y gráficos",
    ],
    content: "",
  },
  {
    semana: 5,
    titulo: "React — Componentes, Props y Estilos",
    fecha: "04 – 10 may 2026",
    unidad: "I",
    avance: 30,
    estado: "pendiente",
    temas: [
      "Client Side Rendering",
      "Gestión de dependencias",
      "JSX",
      "Props y Children",
      "CSS Modules",
      "Styled Components",
    ],
    content: "",
  },
  {
    semana: 6,
    titulo: "React — Eventos, Routing y Consumo de APIs",
    fecha: "11 – 17 may 2026",
    unidad: "I",
    avance: 30,
    estado: "pendiente",
    temas: [
      "Eventos",
      "Renderizado condicional e iterativo",
      "Formularios",
      "Routing",
      "Promesas / Async Await",
      "Axios",
    ],
    content: "",
  },
  {
    semana: 7,
    titulo: "React Hooks y Evaluación de Logro 1",
    fecha: "18 – 24 may 2026",
    unidad: "I",
    avance: 30,
    estado: "pendiente",
    temas: [
      "useState",
      "useEffect",
      "useContext",
      "useRef",
      "useReducer",
      "useCallback",
      "useMemo",
      "Hooks personalizados",
    ],
    content: "",
  },
  {
    semana: 8,
    titulo: "Retroalimentación — 1er Consolidado",
    fecha: "25 – 29 may 2026",
    unidad: "I",
    avance: 36,
    estado: "pendiente",
    temas: [
      "Revisión Evaluación de Logro 1",
      "Reforzamiento Unidad I",
      "1er Consolidado de notas",
    ],
    content:
      "Semana de revisión y retroalimentación de la Evaluación de Logro 01. Primer consolidado de evaluación continua.\n\nFórmula PP1 = EL×0.5 + PLP×0.25 + TI×0.25",
  },

  // ── UNIDAD II: Desarrollo Web Fullstack ────────────────────────────────────
  {
    semana: 9,
    titulo: "Tecnología Backend: PHP y JSP",
    fecha: "01 – 07 jun 2026",
    unidad: "II",
    avance: 36,
    estado: "pendiente",
    temas: [
      "Arquitectura backend",
      "Servidores web",
      "Server-side rendering",
      "PHP",
      "JSP",
    ],
    content: "",
  },
  {
    semana: 10,
    titulo: "Python — Fundamentos y POO",
    fecha: "08 – 14 jun 2026",
    unidad: "II",
    avance: 36,
    estado: "pendiente",
    temas: [
      "Sintaxis Python",
      "Variables y tipos de datos",
      "Listas, tuplas y diccionarios",
      "Funciones",
      "Clases y objetos",
      "Herencia y polimorfismo",
      "Excepciones y módulos",
    ],
    content: "",
  },
  {
    semana: 11,
    titulo: "Django — Vistas, Plantillas y Modelos",
    fecha: "15 – 21 jun 2026",
    unidad: "II",
    avance: 36,
    estado: "pendiente",
    temas: [
      "Patrón MVC / MTV",
      "Instalación y estructura de proyectos",
      "Gestión de URLs",
      "Vistas basadas en clases y funciones",
      "Plantillas: bloques y herencia",
      "Modelos y ORM",
    ],
    content: "",
  },
  {
    semana: 12,
    titulo: "Django — Formularios, Admin y Sesiones",
    fecha: "22 – 28 jun 2026",
    unidad: "II",
    avance: 78,
    estado: "pendiente",
    temas: [
      "Formularios: validación y sanitización",
      "Django Admin personalizado",
      "Middleware",
      "Sesiones",
      "Autenticación y autorización",
    ],
    content: "",
  },
  {
    semana: 13,
    titulo: "Diseño de APIs RESTful",
    fecha: "29 jun – 05 jul 2026",
    unidad: "II",
    avance: 84,
    estado: "pendiente",
    temas: [
      "REST y HATEOAS",
      "Serialización de modelos",
      "Filtrado y paginación",
      "ViewSets y Routers",
      "AJAX / CSRF / CORS",
    ],
    content: "",
  },
  {
    semana: 14,
    titulo: "Microservicios con Django",
    fecha: "06 – 12 jul 2026",
    unidad: "II",
    avance: 90,
    estado: "pendiente",
    temas: [
      "Arquitectura de microservicios",
      "Construcción del primer microservicio",
      "Comunicación entre microservicios",
      "Docker y Kubernetes",
      "Protección y monitoreo",
      "Consumo del microservicio",
    ],
    content: "",
  },
  {
    semana: 15,
    titulo: "Exposición de Proyecto y Evaluación de Logro 2",
    fecha: "13 – 19 jul 2026",
    unidad: "II",
    avance: 96,
    estado: "pendiente",
    temas: [
      "Exposición proyecto de investigación",
      "RSU — Responsabilidad Social Universitaria",
      "Evaluación de Logro 02",
    ],
    content: "",
  },
  {
    semana: 16,
    titulo: "Retroalimentación — 2do Consolidado",
    fecha: "20 – 24 jul 2026",
    unidad: "II",
    avance: 100,
    estado: "pendiente",
    temas: [
      "Revisión Evaluación de Logro 2",
      "Reforzamiento Unidad II",
      "2do Consolidado de notas",
    ],
    content:
      "Semana de revisión y retroalimentación de la Evaluación de Logro 02. Segundo consolidado de evaluación continua.\n\nFórmula PF = (PP1 + PP2) / 2\nNota mínima aprobatoria: 10.5 (sistema vigesimal)",
  },
];
