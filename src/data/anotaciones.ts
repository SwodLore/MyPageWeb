// ─── Anotaciones por semana — IS093A Desarrollo de Aplicaciones Web ──────────
// Curso: 2026-I  |  Docente: Dr. Jaime Suasnabar Terrel  |  UNCP

const BASE = "https://portafolio-academico-two.vercel.app/assets/img";

export interface Anotacion {
  semana: number;
  titulo: string;
  fecha: string;
  content: string;
  temas: string[];
  estado: "completado" | "en-curso" | "pendiente";
  unidad: "I" | "II";
  avance: number;
  reflexion?: string;
  imagenes?: { src: string; caption: string }[];
}

export const anotaciones: Anotacion[] = [

  // ── UNIDAD I ───────────────────────────────────────────────────────────────

  {
    semana: 1,
    titulo: "Fundamentos de la Web y Herramientas",
    fecha: "06 – 12 abr 2026",
    unidad: "I",
    avance: 6,
    estado: "completado",
    temas: ["Soluciones web", "DNS / TCP-IP / HTTP", "Roles de desarrollo", "Visual Studio Code", "Git y GitHub"],
    imagenes: [
      { src: `${BASE}/HTML-CSS-JS.webp`, caption: "Tecnologías Web Básicas" },
    ],
    content: `Presentación del sílabo y prueba de diagnóstico.

SOLUCIONES WEB
• Sistema web: aplicación que corre en un servidor y se accede desde el navegador.
• Aplicación web: sistema interactivo con lógica de negocio (ej. Gmail, Trello).
• Sitio web: conjunto de páginas estáticas o dinámicas bajo un dominio.
• Página web: documento HTML individual dentro de un sitio.

FUNCIONAMIENTO DE LA WEB
• DNS (Domain Name System): traduce dominios (ej. google.com) a direcciones IP.
• Protocolo TCP/IP: base de la comunicación en internet. TCP garantiza entrega de paquetes; IP gestiona el direccionamiento.
• Protocolo HTTP/HTTPS: protocolo de transferencia de hipertexto. HTTP es sin cifrado, HTTPS usa TLS/SSL.
• Ciclo: el navegador hace una petición HTTP → el servidor responde con HTML/CSS/JS → el navegador renderiza.

ROLES EN EL DESARROLLO
• Frontend: construye la interfaz que ve el usuario (HTML, CSS, JS, React).
• Backend: gestiona la lógica del servidor, base de datos y APIs (PHP, Python, Node.js).
• Fullstack: domina ambos lados del desarrollo.

VISUAL STUDIO CODE (Lab 01A)
• Interfaz: Explorer, Source Control, Extensions, Terminal integrada.
• Extensiones clave: Prettier, ESLint, GitLens, Live Server, Tailwind IntelliSense.
• Atajos importantes: Ctrl+P (buscar archivo), Ctrl+Shift+P (paleta), Alt+↑↓ (mover línea), Ctrl+D (selección múltiple).

GIT Y GITHUB
• Git: sistema de control de versiones distribuido. Permite guardar el historial de cambios del código.
• Comandos básicos:
  git init          → inicializa repositorio local
  git clone <url>   → clona repositorio remoto
  git add .         → agrega cambios al staging
  git commit -m ""  → guarda snapshot con mensaje
  git push          → sube cambios al remoto
  git pull          → descarga cambios del remoto
  git branch        → lista ramas
  git checkout -b   → crea y cambia de rama
• GitHub: plataforma en la nube para alojar repositorios Git. Permite colaboración, pull requests y revisión de código.`,
    reflexion: `Esta semana sentó las bases del curso. Entender cómo funciona la web detrás de escena — desde el DNS hasta el ciclo HTTP — me ayudó a ver el desarrollo web no como magia, sino como un sistema de protocolos bien definidos. Configurar Git y VSCode desde el principio fue clave para trabajar de forma ordenada desde el primer día.`,
  },

  {
    semana: 2,
    titulo: "HTML5, XML y CSS3",
    fecha: "13 – 19 abr 2026",
    unidad: "I",
    avance: 12,
    estado: "completado",
    temas: ["Open Web Platform", "HTML5 y XML", "Árbol DOM", "SEO", "CSS3", "Flexbox", "Grid", "Diseño responsivo"],
    imagenes: [
      { src: `${BASE}/nivelesweb.webp`, caption: "Niveles de la Web" },
    ],
    content: `ESTÁNDAR OPEN WEB PLATFORM
Conjunto de tecnologías abiertas mantenidas por el W3C para construir la web: HTML, CSS, JavaScript, SVG, WebGL, etc.

HTML5
• Estructura básica: <!DOCTYPE html>, <html>, <head>, <body>.
• Etiquetas semánticas: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>.
• Etiquetas multimedia: <video>, <audio>, <canvas>, <svg>.
• Formularios HTML5: nuevos tipos de input (email, date, range, color).

XML
• Lenguaje de marcado extensible, autodescriptivo y estricto (todas las etiquetas deben cerrarse).
• Usado para configuración, intercambio de datos (APIs antiguas), RSS.

ÁRBOL DOM (Document Object Model)
• Representación en árbol del documento HTML. Cada etiqueta es un nodo.
• Tipos de nodos: Document, Element, Text, Attribute.
• Renderizado: el navegador parsea HTML → construye el DOM → aplica CSS (CSSOM) → pinta la pantalla.
• Ciclo de vida: DOMContentLoaded (DOM listo) → load (recursos cargados) → beforeunload / unload.

SEO (Search Engine Optimization)
• Usar etiquetas semánticas correctas.
• Meta tags: <title>, <meta name="description">, <meta name="robots">.
• Open Graph para redes sociales: og:title, og:image, og:description.
• Velocidad de carga, accesibilidad y mobile-first son factores de ranking.

CSS3
• Sintaxis: selector { propiedad: valor; }
• Modelos de caja: block (ocupa todo el ancho), inline (solo su contenido), inline-block (ambos).
• Unidades: px, em, rem, %, vw, vh.

FLEXBOX
• Contenedor: display: flex; flex-direction, justify-content, align-items, flex-wrap.
• Hijos: flex-grow, flex-shrink, flex-basis, align-self, order.
• Ideal para layouts en una dimensión (fila o columna).

GRID LAYOUT
• Contenedor: display: grid; grid-template-columns, grid-template-rows, gap.
• Hijos: grid-column, grid-row, grid-area.
• Ideal para layouts en dos dimensiones.

TIPOS DE POSITION
• static (default), relative, absolute, fixed, sticky.

DISEÑO RESPONSIVO
• Media queries: @media (max-width: 768px) { ... }
• Mobile-first: diseñar primero para móvil y luego escalar.
• Unidades fluidas (%, vw) y max-width para contenedores.

Lab 02A: Diseño flexbox, diseño fluido y responsivo.`,
    reflexion: `Esta semana consolidé mis bases en HTML y CSS. Comprender el árbol DOM me permitió entender por qué JavaScript puede modificar cualquier elemento de la página en tiempo real. El diseño responsivo fue un cambio de perspectiva importante: pensar primero en móvil y escalar hacia arriba es más eficiente que lo contrario.`,
  },

  {
    semana: 3,
    titulo: "Bootstrap y Tailwind CSS",
    fecha: "20 – 26 abr 2026",
    unidad: "I",
    avance: 18,
    estado: "completado",
    temas: ["Bootstrap", "Tailwind CSS", "Tipografía", "Flexbox Tailwind", "Application UI"],
    imagenes: [
      { src: `${BASE}/frontend_vs_backend.webp`, caption: "Frontend vs Backend" },
      { src: `${BASE}/ux-ui.webp`, caption: "UX / UI Design" },
    ],
    content: `BOOTSTRAP
• Framework CSS basado en clases predefinidas. Sistema de grid de 12 columnas.
• Layout: container, container-fluid, row, col-sm-*, col-md-*, col-lg-*.
• Componentes: Navbar, Card, Modal, Dropdown, Badge, Alert, Button, Form, Table.
• Incluye JavaScript para componentes interactivos (Modal, Collapse, Carousel).

TAILWIND CSS
• Framework CSS de utilidades atómicas. No tiene componentes predefinidos, se compone de clases pequeñas.
• No genera CSS no usado (purge en producción).

Tipografía:
  font-bold, font-semibold, text-xl, text-sm, leading-relaxed, tracking-wide, uppercase

Colores y Background:
  bg-blue-500, text-white, border-gray-200, shadow-md

Espaciado:
  p-4 (padding), m-2 (margin), px-6 (padding horizontal), gap-4

Layout:
  container mx-auto, columns-2, block, inline-flex, hidden

Position:
  relative, absolute, fixed, sticky, top-0, z-50

Flexbox en Tailwind:
  flex, flex-row, flex-col, justify-center, items-center, flex-wrap, flex-1, shrink-0

Application UI — Elements:
  • Avatars: imágenes circulares de usuario.
  • Badges: etiquetas de estado (ej. "Nuevo", "Online").
  • Dropdowns: menús desplegables.
  • Buttons y Button Groups: variantes de botones.

Application UI — Shells:
  Estructuras de página completa: sidebar + contenido, navbar + main, dashboard layouts.

Práctica Calificada 03: desarrollo de un sitio web completo con CSS (Bootstrap o Tailwind).`,
    reflexion: `Comparar Bootstrap con Tailwind fue muy revelador. Bootstrap acelera el prototipado con componentes listos, pero Tailwind da más control granular. Para proyectos personales como este portafolio, Tailwind es mucho más flexible. La práctica calificada me hizo aplicar todo bajo presión de tiempo, lo cual fue un buen entrenamiento.`,
  },

  {
    semana: 4,
    titulo: "JavaScript, TypeScript y DOM",
    fecha: "27 abr – 03 may 2026",
    unidad: "I",
    avance: 24,
    estado: "completado",
    temas: ["Motores JS", "Variables y tipos", "Funciones", "TypeScript", "DOM", "Canvas"],
    content: `JAVASCRIPT — FUNDAMENTOS
• Motor JS: V8 (Chrome/Node), SpiderMonkey (Firefox). Interpreta y ejecuta JS.
• Variables: var (función-scoped, evitar), let (bloque-scoped), const (inmutable).
• Tipos primitivos: number, string, boolean, null, undefined, symbol, bigint.
• Objetos: colecciones clave-valor. Arrays son objetos especiales.

OPERADORES
• Aritméticos: +, -, *, /, %, **
• Comparación: == (con coerción), === (estricto, preferido), !=, !==
• Lógicos: && (AND), || (OR), ! (NOT), ?? (nullish coalescing)

ESTRUCTURAS DE CONTROL
• if / else if / else
• switch / case
• Ternario: condición ? valorSiTrue : valorSiFalse
• Bucles: for, while, do-while, for...of (arrays), for...in (objetos)

FUNCIONES
• Declaración: function nombre(params) { return valor; }
• Anónima: const fn = function() {}
• Flecha (arrow): const fn = (params) => expresión
• Auto-invocada (IIFE): (function() { ... })()
• Closure: función que recuerda el scope donde fue creada, aunque ese scope ya no exista.
• Higher-order: funciones que reciben o retornan otras funciones (map, filter, reduce).

TYPESCRIPT
• Superset tipado de JavaScript. Añade tipos estáticos, interfaces, enums y generics.
• Tipos básicos: string, number, boolean, any, unknown, void, never.
• Interfaces: definen la forma de un objeto.
• Compilación: tsc convierte .ts → .js.

MANIPULACIÓN DEL DOM
• Selección: document.getElementById(), querySelector(), querySelectorAll()
• Modificación: element.textContent, element.innerHTML, element.style.color
• Eventos: element.addEventListener('click', handler)
• Creación: document.createElement(), appendChild(), removeChild()

CANVAS
• Elemento HTML para dibujar gráficos con JavaScript.
• Contexto 2D: const ctx = canvas.getContext('2d')
• Métodos: fillRect(), strokeRect(), arc(), beginPath(), moveTo(), lineTo(), fillText()
• Animaciones: requestAnimationFrame() para bucle de animación.

Lab 04: Desarrollo de una animación con JavaScript y Canvas.`,
    reflexion: `JavaScript tiene una curva de aprendizaje engañosa: parece simple al inicio pero esconde complejidades como closures y el manejo asíncrono. TypeScript resolvió varios problemas que ya había tenido en proyectos pequeños con errores de tipo en tiempo de ejecución. El laboratorio de Canvas fue el más divertido hasta ahora.`,
  },

  {
    semana: 5,
    titulo: "React — Componentes, Props y Estilos",
    fecha: "04 – 10 may 2026",
    unidad: "I",
    avance: 30,
    estado: "completado",
    temas: ["Client Side Rendering", "Gestión de dependencias", "JSX", "Props", "Children", "CSS Modules", "Styled Components"],
    imagenes: [
      { src: `${BASE}/ginkana.webp`, caption: "GINKANA — Actividad de clase" },
    ],
    content: `FRAMEWORKS JS Y CLIENT SIDE RENDERING (CSR)
• Framework JS: librería estructurada con convenciones para construir UIs (React, Vue, Angular).
• CSR: el servidor envía un HTML mínimo y JavaScript. El navegador renderiza todo el contenido.
  Ventaja: navegación fluida tipo SPA. Desventaja: SEO más complejo, carga inicial mayor.
• SSR (Server Side Rendering): el servidor genera el HTML completo (Next.js, Remix).

GESTIÓN DE DEPENDENCIAS
• npm (Node Package Manager): instala librerías desde el registro npm.
  npm install react react-dom
• Vite: herramienta de build ultrarrápida para crear proyectos React.
  npm create vite@latest mi-app -- --template react-ts
• package.json: define dependencias, scripts y metadatos del proyecto.
• node_modules: carpeta donde se instalan las dependencias (no se sube a Git).

JSX (JavaScript XML)
• Extensión de sintaxis que permite escribir HTML dentro de JavaScript.
• Reglas: una sola raíz (<> ... </> o Fragment), className en vez de class, {} para expresiones JS.
• Se compila a React.createElement() por Babel/SWC.

COMPONENTES
• Funciones de JavaScript que retornan JSX. Son la unidad básica de React.
• Nombre en PascalCase: function MiComponente() { return <div>...</div>; }
• Pueden ser reutilizados, anidados y compuestos.

PROPS (Properties)
• Datos que el componente padre pasa al componente hijo.
• Son de solo lectura (inmutables en el hijo).
• Ejemplo: <Boton color="blue" texto="Enviar" />
• Desestructuración: function Boton({ color, texto }) { ... }
• PropTypes o TypeScript para tipado.

CHILDREN
• Prop especial que representa el contenido entre las etiquetas del componente.
• <Tarjeta><p>Contenido aquí</p></Tarjeta>
• Acceso: function Tarjeta({ children }) { return <div>{children}</div>; }

ESTILOS EN REACT
• Inline styles: style={{ color: 'red', fontSize: '16px' }} (objeto JS, camelCase)
• Style Sheets: import './styles.css' — CSS global, puede causar colisiones de nombres.
• CSS Modules: import styles from './Button.module.css' — estilos con scope local automático.
• Styled Components: librería que usa template literals para definir estilos en JS.
• Framework CSS (Tailwind): clases de utilidad directamente en JSX.

Lab 05A: Pasar datos con props y children, mostrar en componente hijo.`,
    reflexion: `React cambió completamente mi forma de pensar en interfaces. La idea de que la UI es una función del estado es muy poderosa. La GINKANA fue una forma dinámica de poner a prueba los conceptos de JSX y componentes en tiempo real bajo presión grupal.`,
  },

  {
    semana: 6,
    titulo: "React — Eventos, Routing y Consumo de APIs",
    fecha: "11 – 17 may 2026",
    unidad: "I",
    avance: 36,
    estado: "completado",
    temas: ["Eventos", "Renderizado condicional", "Renderizado iterativo", "Formularios", "Routing", "Promesas", "Async/Await", "Axios"],
    content: `EVENTOS EN REACT
• Se escriben en camelCase: onClick, onChange, onSubmit, onMouseEnter.
• Reciben una función manejadora: <button onClick={handleClick}>
• El evento sintético de React envuelve el evento nativo del DOM.
• Evitar llamar la función directamente: onClick={handleClick} ✓ | onClick={handleClick()} ✗

RENDERIZADO CONDICIONAL
• Operador ternario: {condicion ? <ComponenteA /> : <ComponenteB />}
• AND lógico (short-circuit): {condicion && <Componente />}
• Variable JSX: const elemento = condicion ? <A /> : <B />
• Early return: if (loading) return <Spinner />;

RENDERIZADO ITERATIVO
• Array.map() para renderizar listas de elementos.
• Cada elemento debe tener una prop key única (preferir IDs, no índice del array).
• Ejemplo: {items.map(item => <Item key={item.id} data={item} />)}

FORMULARIOS EN REACT
• Componentes controlados: el estado de React controla el valor del input.
  const [valor, setValor] = useState('');
  <input value={valor} onChange={e => setValor(e.target.value)} />
• onSubmit con event.preventDefault() para evitar recarga de página.

ROUTING — React Router DOM
• Permite navegar entre páginas sin recargar el navegador (SPA).
• Componentes clave: BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useParams.
• Rutas dinámicas: <Route path="/user/:id" element={<User />} />
• Rutas anidadas: un Route dentro de otro (layouts compartidos).
• Parámetros: const { id } = useParams()

CONSUMO DE APIs
• API REST: interfaz que expone datos mediante URLs y verbos HTTP (GET, POST, PUT, DELETE).
• Fetch API (nativa): fetch(url).then(res => res.json()).then(data => ...)
• Promesas: objeto que representa un valor futuro. Estados: pending, fulfilled, rejected.
• Async/Await: sintaxis más legible para manejar promesas.
  const data = await fetch(url).then(res => res.json());
• Manejo de errores: try { ... } catch (error) { ... }

AXIOS
• Librería HTTP más popular para React. Más features que fetch nativo.
• Ventajas: interceptores, cancelación de peticiones, transformación automática de JSON.
• Instalación: npm install axios
• Uso: axios.get('/api/users').then(res => res.data)
• Instancia con baseURL: axios.create({ baseURL: 'https://api.ejemplo.com' })

Lab 06A: Eventos y Renderizado Condicional e iterativo con datos de una API real.`,
    reflexion: `El routing en React fue uno de los conceptos que más me costó al principio — entender por qué una SPA puede tener URLs distintas sin recargar la página fue un momento "ajá". Consumir una API real en el laboratorio y ver los datos apareciendo en pantalla en tiempo real fue muy satisfactorio.`,
  },

  {
    semana: 7,
    titulo: "React Hooks y Evaluación de Logro 1",
    fecha: "18 – 24 may 2026",
    unidad: "I",
    avance: 44,
    estado: "completado",
    temas: ["useState", "useEffect", "useContext", "useRef", "useReducer", "useCallback", "useMemo", "Hooks personalizados"],
    content: `HOOKS EN REACT
Los Hooks son funciones especiales que permiten usar estado y otras características de React en componentes funcionales. Solo se usan en el nivel superior del componente (no dentro de condicionales o bucles).

useState
• Almacena y actualiza estado local del componente.
• const [estado, setEstado] = useState(valorInicial)
• El componente se re-renderiza cada vez que el estado cambia.

useEffect
• Ejecuta efectos secundarios: peticiones API, suscripciones, manipulación del DOM.
• useEffect(() => { ... }, [dependencias])
• Array vacío []: se ejecuta solo al montar. Sin array: en cada render. Con deps: cuando cambian las deps.
• Función de limpieza (cleanup): return () => { ... } — se ejecuta al desmontar o antes del siguiente efecto.

useContext
• Permite consumir un Context sin necesidad de prop drilling.
• const valor = useContext(MiContext)
• Requiere un Provider en un componente padre: <MiContext.Provider value={datos}>

useRef
• Referencia mutable que persiste entre renders sin causar re-render.
• Dos usos principales:
  1. Acceder a elementos del DOM: <input ref={inputRef} /> → inputRef.current.focus()
  2. Guardar valores que no necesitan re-render (timers, valores previos).

useReducer
• Alternativa a useState para estado complejo con múltiples sub-valores o lógica compleja.
• const [estado, dispatch] = useReducer(reducer, estadoInicial)
• El reducer es una función pura: (estado, accion) => nuevoEstado
• Similar a Redux pero local al componente.

useCallback
• Memoriza una función para que no se recree en cada render.
• const fn = useCallback(() => { ... }, [dependencias])
• Útil cuando se pasa una función como prop a un componente hijo memoizado.

useMemo
• Memoriza el resultado de un cálculo costoso.
• const valor = useMemo(() => calcularAlgo(a, b), [a, b])
• Solo recalcula cuando cambian las dependencias.

HOOKS PERSONALIZADOS
• Función que empieza con "use" y puede usar otros Hooks internamente.
• Permiten extraer lógica reutilizable de los componentes.
• Ejemplo: useFetch(url) que maneja loading, data y error automáticamente.
• Ejemplo: useLocalStorage(key, initialValue) para persistir estado en localStorage.

EVALUACIÓN DE LOGRO 01
Desarrollo de una solución web de una sola página (SPA) para una empresa local, aplicando los conceptos de React: componentes, props, hooks y consumo de APIs.`,
    reflexion: `Los hooks transformaron mi forma de escribir React. useEffect en particular es poderoso pero requiere cuidado con las dependencias — fue la fuente de varios bugs en mi evaluación. Los hooks personalizados son una abstracción elegante que vale la pena dominar para mantener el código limpio y reutilizable.`,
  },

  {
    semana: 8,
    titulo: "Retroalimentación — 1er Consolidado",
    fecha: "25 – 29 may 2026",
    unidad: "I",
    avance: 50,
    estado: "en-curso",
    temas: ["Revisión Evaluación de Logro 1", "Reforzamiento Unidad I", "1er Consolidado"],
    content: `Semana de parciales — 1er Consolidado de Evaluación Continua.`,
    reflexion: `Semana de exámenes y entrega del primer consolidado. Nada de contenido nuevo por ahora.`,
  },

  // ── UNIDAD II ──────────────────────────────────────────────────────────────

  {
    semana: 9,
    titulo: "Tecnología Backend: PHP y JSP",
    fecha: "01 – 07 jun 2026",
    unidad: "II",
    avance: 56,
    estado: "pendiente",
    temas: [],
    content: ``,
  },

  {
    semana: 10,
    titulo: "Python — Fundamentos y POO",
    fecha: "08 – 14 jun 2026",
    unidad: "II",
    avance: 62,
    estado: "pendiente",
    temas: [],
    content: ``,
  },

  {
    semana: 11,
    titulo: "Django — Vistas, Plantillas y Modelos",
    fecha: "15 – 21 jun 2026",
    unidad: "II",
    avance: 68,
    estado: "pendiente",
    temas: [],
    content: ``,
  },

  {
    semana: 12,
    titulo: "Django — Formularios, Admin y Sesiones",
    fecha: "22 – 28 jun 2026",
    unidad: "II",
    avance: 75,
    estado: "pendiente",
    temas: [],
    content: ``,
  },

  {
    semana: 13,
    titulo: "Diseño de APIs RESTful con Django",
    fecha: "29 jun – 05 jul 2026",
    unidad: "II",
    avance: 81,
    estado: "pendiente",
    temas: [],
    content: ``,
  },

  {
    semana: 14,
    titulo: "Microservicios con Django",
    fecha: "06 – 12 jul 2026",
    unidad: "II",
    avance: 87,
    estado: "pendiente",
    temas: [],
    content: ``,
  },

  {
    semana: 15,
    titulo: "Exposición de Proyecto y Evaluación de Logro 2",
    fecha: "13 – 19 jul 2026",
    unidad: "II",
    avance: 93,
    estado: "pendiente",
    temas: [],
    content: ``,
  },

  {
    semana: 16,
    titulo: "Retroalimentación — 2do Consolidado Final",
    fecha: "20 – 24 jul 2026",
    unidad: "II",
    avance: 100,
    estado: "pendiente",
    temas: [],
    content: ``,
  },
];
