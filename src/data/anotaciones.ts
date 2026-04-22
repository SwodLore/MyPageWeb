// ─── Anotaciones por semana — IS093A Desarrollo de Aplicaciones Web ──────────
// Curso: 2026-I  |  Docente: Dr. Jaime Suasnabar Terrel  |  UNCP

export interface Anotacion {
  semana: number;
  titulo: string;
  fecha: string;
  content: string;
  temas: string[];
  estado: "completado" | "en-curso" | "pendiente";
  unidad: "I" | "II";
  avance: number;
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
  },

  {
    semana: 2,
    titulo: "HTML5, XML y CSS3",
    fecha: "13 – 19 abr 2026",
    unidad: "I",
    avance: 12,
    estado: "completado",
    temas: ["Open Web Platform", "HTML5 y XML", "Árbol DOM", "SEO", "CSS3", "Flexbox", "Grid", "Diseño responsivo"],
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
  },

  {
    semana: 3,
    titulo: "Bootstrap y Tailwind CSS",
    fecha: "20 – 26 abr 2026",
    unidad: "I",
    avance: 18,
    estado: "en-curso",
    temas: ["Bootstrap", "Tailwind CSS", "Tipografía", "Flexbox Tailwind", "Application UI"],
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
  },

  {
    semana: 4,
    titulo: "JavaScript, TypeScript y DOM",
    fecha: "27 abr – 03 may 2026",
    unidad: "I",
    avance: 24,
    estado: "pendiente",
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
  },

  {
    semana: 5,
    titulo: "React — Componentes, Props y Estilos",
    fecha: "04 – 10 may 2026",
    unidad: "I",
    avance: 30,
    estado: "pendiente",
    temas: ["Client Side Rendering", "Gestión de dependencias", "JSX", "Props", "Children", "CSS Modules", "Styled Components"],
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
  },

  {
    semana: 6,
    titulo: "React — Eventos, Routing y Consumo de APIs",
    fecha: "11 – 17 may 2026",
    unidad: "I",
    avance: 30,
    estado: "pendiente",
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
  },

  {
    semana: 7,
    titulo: "React Hooks y Evaluación de Logro 1",
    fecha: "18 – 24 may 2026",
    unidad: "I",
    avance: 30,
    estado: "pendiente",
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
  },

  {
    semana: 8,
    titulo: "Retroalimentación — 1er Consolidado",
    fecha: "25 – 29 may 2026",
    unidad: "I",
    avance: 36,
    estado: "pendiente",
    temas: ["Revisión Evaluación de Logro 1", "Reforzamiento Unidad I", "1er Consolidado"],
    content: `REVISIÓN Y RETROALIMENTACIÓN
Revisión detallada de los resultados de la Evaluación de Logro 01. El docente presenta los errores más comunes encontrados en los proyectos SPA entregados y da retroalimentación individual y grupal.

PRIMER CONSOLIDADO DE EVALUACIÓN CONTINUA
Fecha: 25 al 29 de mayo de 2026.

Fórmula de cálculo:
PP1 = EL × 0.5 + PLP × 0.25 + TI × 0.25

Donde:
• EL  = Evaluación de Logro 01 (50%)
• PLP = Promedio de Laboratorios y Prácticas (25%)
• TI  = Promedio de Trabajo de Investigación y Portafolio (25%)

REFORZAMIENTO UNIDAD I
Repaso de los temas con mayor dificultad:
• Hooks de React (especialmente useEffect y useContext).
• Consumo de APIs con manejo correcto de errores.
• Diseño responsivo con Tailwind CSS.
• Routing con React Router DOM.

REQUISITOS DE APROBACIÓN (recordatorio)
• Asistencia mínima: 70% de clases teóricas y prácticas.
• Nota mínima aprobatoria: 10.5 (sistema vigesimal).
• Entrega puntual de laboratorios y prácticas en la plataforma virtual.`,
  },

  // ── UNIDAD II ──────────────────────────────────────────────────────────────

  {
    semana: 9,
    titulo: "Tecnología Backend: PHP y JSP",
    fecha: "01 – 07 jun 2026",
    unidad: "II",
    avance: 36,
    estado: "pendiente",
    temas: ["Arquitectura backend", "Servidores web", "Server-side rendering", "PHP", "JSP"],
    content: `ARQUITECTURA DE APLICACIONES WEB BACKEND
• El backend es la capa del servidor que procesa la lógica de negocio, gestiona la base de datos y expone APIs o genera HTML.
• Flujo: Cliente (navegador) → Petición HTTP → Servidor → Procesa lógica → Base de datos → Respuesta → Cliente.

SERVIDORES WEB
• Apache HTTP Server: servidor web maduro, configurable con .htaccess, ampliamente usado con PHP.
• Nginx: servidor web de alto rendimiento, excelente para proxies inversos y carga estática.
• Tomcat: servidor de aplicaciones Java, necesario para ejecutar JSP/Servlets.

SERVER-SIDE RENDERING (SSR)
• El servidor genera el HTML completo antes de enviarlo al navegador.
• Ventaja: mejor SEO (el contenido ya está en el HTML) y carga inicial más rápida para el usuario.
• Desventaja: más carga en el servidor y navegación con recarga completa de página.

PHP (Hypertext Preprocessor)
• Lenguaje de scripting del lado servidor, embebido en HTML.
• Sintaxis básica: <?php echo "Hola"; ?>
• Variables: $nombre = "Alessandro";
• Funciones de cadena: strlen(), strtoupper(), substr(), str_replace()
• Conexión a BD: PDO o mysqli para conectar con MySQL.
• Superglobales: $_GET, $_POST, $_SESSION, $_COOKIE, $_SERVER
• Incluir archivos: include, require, include_once, require_once
• Frameworks populares: Laravel, Symfony, CodeIgniter.

JSP (JavaServer Pages)
• Tecnología Java para generar HTML dinámico en el servidor.
• Se ejecuta en un contenedor de Servlets como Apache Tomcat.
• Sintaxis: <% código Java %> para scriptlets, <%= expresión %> para imprimir.
• JSP se compila a un Servlet (clase Java) la primera vez que se llama.
• Acceso a BD con JDBC (Java Database Connectivity).
• Actualmente reemplazado por frameworks como Spring MVC o Spring Boot.

Lab 09: Despliegue de aplicaciones web backend con PHP y JSP en servidor local (Apache/Tomcat).`,
  },

  {
    semana: 10,
    titulo: "Python — Fundamentos y POO",
    fecha: "08 – 14 jun 2026",
    unidad: "II",
    avance: 36,
    estado: "pendiente",
    temas: ["Sintaxis Python", "Tipos de datos", "Listas y tuplas", "Diccionarios", "Funciones", "POO: clases y herencia", "Excepciones", "Módulos"],
    content: `INTRODUCCIÓN A PYTHON
• Lenguaje interpretado, de tipado dinámico, multiparadigma (imperativo, OOP, funcional).
• Indentación es obligatoria (define bloques de código, no las llaves {}).
• Comentarios: # comentario de línea | """ docstring multilínea """

VARIABLES Y TIPOS DE DATOS
• No se declara el tipo: nombre = "Alessandro", edad = 22, pi = 3.14
• Tipos primitivos: int, float, str, bool, NoneType.
• Tipado dinámico: la variable puede cambiar de tipo.
• Type hints (Python 3.5+): nombre: str = "Alessandro"

CADENAS (str)
• Inmutables. Operaciones: len(), .upper(), .lower(), .strip(), .split(), .join(), .replace()
• F-strings: f"Hola {nombre}, tienes {edad} años"

LISTAS Y TUPLAS
• Lista []: mutable, ordenada. lista.append(), lista.pop(), lista.sort(), lista[1:3]
• Tupla (): inmutable, ordenada. Más rápida que lista para datos fijos.
• List comprehension: [x*2 for x in lista if x > 0]

DICCIONARIOS
• Colección de pares clave-valor. d = {"nombre": "Alex", "edad": 22}
• Acceso: d["nombre"] | d.get("clave", "default")
• Métodos: .keys(), .values(), .items(), .update()

ESTRUCTURAS DE CONTROL
• if / elif / else | for x in iterable: | while condición:
• break, continue, pass
• range(inicio, fin, paso) para iterar números.

FUNCIONES
• def nombre(parametro, *args, **kwargs): return valor
• Parámetros por defecto: def saludar(nombre="Mundo"):
• *args: argumentos posicionales variables (tupla). **kwargs: argumentos nombrados variables (dict).
• Lambda: funcion_corta = lambda x: x * 2

POO EN PYTHON
• Clases: class Persona: | Instancias: persona = Persona()
• Constructor: def __init__(self, nombre): self.nombre = nombre
• Métodos: funciones dentro de la clase, primer parámetro siempre es self.
• Encapsulamiento: _atributo (protegido), __atributo (privado por convención).
• Herencia: class Estudiante(Persona): — hereda todos los métodos de Persona.
• Herencia múltiple: class C(A, B): — Python usa MRO (Method Resolution Order).
• Polimorfismo: distintas clases implementan el mismo método con comportamiento diferente.
• Métodos especiales (dunder): __str__, __repr__, __len__, __eq__

EXCEPCIONES
• try: | except TipoError as e: | else: | finally:
• Excepciones comunes: ValueError, TypeError, KeyError, IndexError, FileNotFoundError.
• Lanzar excepción: raise ValueError("Mensaje de error")

MÓDULOS
• Un módulo es un archivo .py. Se importa con: import math | from os import path
• Módulos de la stdlib útiles: os, sys, datetime, json, re, math, random.
• Paquetes: carpetas con __init__.py que agrupan módulos.

Lab 10: Aplicación con Python (manejo de datos, POO y funciones).`,
  },

  {
    semana: 11,
    titulo: "Django — Vistas, Plantillas y Modelos",
    fecha: "15 – 21 jun 2026",
    unidad: "II",
    avance: 36,
    estado: "pendiente",
    temas: ["Patrón MVC / MTV", "Instalación Django", "URLs", "Vistas en clases y funciones", "Plantillas", "ORM y Modelos"],
    content: `INTRODUCCIÓN A DJANGO
• Framework web de Python de alto nivel. Filosofía "batteries included" (todo incluido).
• Muy usado para backends robustos, CMSs y APIs REST.
• Instalación: pip install django | Crear proyecto: django-admin startproject nombre

PATRÓN MVC vs MTV
• MVC (Model-View-Controller): patrón clásico.
• MTV (Model-Template-View): adaptación de Django.
  - Model     → gestiona datos y lógica de negocio (igual que en MVC)
  - Template  → capa de presentación HTML (equivale a View en MVC)
  - View      → lógica de petición/respuesta (equivale a Controller en MVC)

ESTRUCTURA DE UN PROYECTO DJANGO
  manage.py         → utilidad de línea de comandos
  settings.py       → configuración del proyecto (BD, apps, static files)
  urls.py           → mapa de URLs del proyecto
  wsgi.py / asgi.py → interfaz con el servidor web

GESTIÓN DE URLS
• urls.py define el mapeo entre URLs y vistas.
  path('inicio/', views.inicio, name='inicio')
  path('usuario/<int:id>/', views.usuario_detalle, name='usuario-detalle')
• include() para delegar URLs a una app específica.

VISTAS BASADAS EN FUNCIONES (FBV)
• Función Python que recibe un request y retorna un response.
  def inicio(request): return render(request, 'inicio.html', {'titulo': 'Hola'})

VISTAS BASADAS EN CLASES (CBV)
• Clases que heredan de View o vistas genéricas de Django.
• ListView, DetailView, CreateView, UpdateView, DeleteView — reducen código repetitivo.
  class ProductoList(ListView): model = Producto; template_name = 'lista.html'

PLANTILLAS (Templates)
• Archivos HTML con sintaxis de Django Template Language (DTL).
• Variables: {{ variable }} | Tags: {% if %} {% for %} {% block %} {% url %}
• Herencia: {% extends 'base.html' %} + {% block contenido %} ... {% endblock %}
• Filtros: {{ fecha|date:"d/m/Y" }} | {{ texto|upper }} | {{ lista|length }}

MODELOS Y ORM
• Un modelo es una clase Python que representa una tabla en la base de datos.
  class Producto(models.Model):
      nombre = models.CharField(max_length=200)
      precio = models.DecimalField(max_digits=10, decimal_places=2)
      activo  = models.BooleanField(default=True)
• Migraciones: python manage.py makemigrations → python manage.py migrate
• Tipos de campos: CharField, IntegerField, TextField, DateField, ForeignKey, ManyToManyField.
• Consultas ORM: Producto.objects.all() | .filter(activo=True) | .get(id=1) | .create() | .delete()
• Relaciones: ForeignKey (uno a muchos), ManyToManyField (muchos a muchos), OneToOneField.

Lab 11: Desarrollo de vistas, plantillas y modelos en Django.`,
  },

  {
    semana: 12,
    titulo: "Django — Formularios, Admin y Sesiones",
    fecha: "22 – 28 jun 2026",
    unidad: "II",
    avance: 78,
    estado: "pendiente",
    temas: ["Formularios Django", "Validación", "Django Admin", "Middleware", "Sesiones", "Autenticación"],
    content: `GESTIÓN DE FORMULARIOS EN DJANGO
• Django tiene un sistema de formularios que maneja renderizado, validación y sanitización.
• Clases Form: heredan de forms.Form — formulario independiente del modelo.
  class ContactoForm(forms.Form):
      nombre  = forms.CharField(max_length=100)
      email   = forms.EmailField()
      mensaje = forms.Textarea()
• ModelForm: hereda de forms.ModelForm — genera el formulario desde un modelo automáticamente.
  class ProductoForm(forms.ModelForm):
      class Meta: model = Producto; fields = ['nombre', 'precio']

VALIDACIÓN Y SANITIZACIÓN
• is_valid(): valida los datos del formulario. Retorna True/False.
• cleaned_data: diccionario con los datos validados y limpios.
• Validadores personalizados: def clean_email(self): — método por campo.
• Sanitización: Django escapa caracteres peligrosos por defecto (previene XSS).

DJANGO ADMIN
• Panel de administración automático generado por Django.
• Registro: admin.site.register(Producto)
• Personalización básica:
  @admin.register(Producto)
  class ProductoAdmin(admin.ModelAdmin):
      list_display = ['nombre', 'precio', 'activo']
      search_fields = ['nombre']
      list_filter  = ['activo']
• Campos calculados: métodos en el ModelAdmin que devuelven un valor calculado.
• Formularios personalizados en Admin: form = ProductoForm

MIDDLEWARE
• Capa que procesa las peticiones y respuestas globalmente antes/después de las vistas.
• Se configura en settings.py en la lista MIDDLEWARE (orden importa).
• Middlewares incluidos: SecurityMiddleware, SessionMiddleware, CsrfViewMiddleware, AuthenticationMiddleware.
• Middleware personalizado: clase con métodos __call__, process_request, process_response.

SESIONES
• Permiten almacenar datos del usuario entre peticiones HTTP (que es stateless).
• Django almacena la sesión en BD por defecto (SESSION_ENGINE configurable: caché, archivo, cookie).
• Uso: request.session['clave'] = 'valor' | request.session.get('clave')
• Expiración: SESSION_COOKIE_AGE (segundos), SESSION_EXPIRE_AT_BROWSER_CLOSE.

AUTENTICACIÓN Y AUTORIZACIÓN
• Django incluye sistema completo de usuarios: User model, login, logout, register.
• Autenticación: from django.contrib.auth import authenticate, login, logout
• Decoradores: @login_required para proteger vistas. @permission_required para permisos.
• Grupos y permisos: sistema granular para controlar acceso a modelos (add, change, delete, view).
• Contraseñas: Django las hashea con PBKDF2 (nunca se guardan en texto plano).

Lab 12: Desarrollo de un sistema web backend con formularios, admin personalizado y autenticación.`,
  },

  {
    semana: 13,
    titulo: "Diseño de APIs RESTful con Django",
    fecha: "29 jun – 05 jul 2026",
    unidad: "II",
    avance: 84,
    estado: "pendiente",
    temas: ["REST y HATEOAS", "Django REST Framework", "Serialización", "Filtrado y paginación", "ViewSets", "AJAX / CSRF / CORS"],
    content: `INTRODUCCIÓN A REST
• REST (Representational State Transfer): estilo de arquitectura para APIs web.
• Principios REST:
  1. Interfaz uniforme: URLs predecibles y verbos HTTP semánticos.
  2. Sin estado (stateless): cada petición contiene toda la información necesaria.
  3. Cacheable: las respuestas pueden ser cacheadas.
  4. Sistema en capas: el cliente no sabe si habla con el servidor final o un intermediario.
• Verbos HTTP: GET (leer), POST (crear), PUT/PATCH (actualizar), DELETE (eliminar).
• Códigos de respuesta: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error.

HATEOAS (Hypermedia As The Engine Of Application State)
• Nivel avanzado de REST donde la respuesta incluye enlaces a acciones relacionadas.
• Permite que el cliente descubra la API dinámicamente sin documentación.

DJANGO REST FRAMEWORK (DRF)
• Librería para construir APIs REST con Django. Instalación: pip install djangorestframework
• Serialización: convierte modelos Python a JSON (y viceversa).
  class ProductoSerializer(serializers.ModelSerializer):
      class Meta: model = Producto; fields = '__all__'

SERIALIZACIÓN DE MODELOS
• Serializers validan datos entrantes y convierten modelos a representaciones JSON.
• Serializers anidados: para relaciones entre modelos (ForeignKey, ManyToMany).
• HyperlinkedModelSerializer: incluye URLs en vez de IDs para HATEOAS.

FILTRADO, PAGINACIÓN Y LÍMITES
• Filtros: django-filter permite filtrar querysets por parámetros en la URL. ?precio_min=100&activo=true
• Paginación: divide grandes conjuntos de datos en páginas. PageNumberPagination, LimitOffsetPagination.
• Límites temporales (throttling): limita peticiones por tiempo. AnonRateThrottle, UserRateThrottle.

ROUTERS Y VIEWSETS
• ViewSet: clase que agrupa las operaciones CRUD de un modelo (list, create, retrieve, update, destroy).
  class ProductoViewSet(viewsets.ModelViewSet):
      queryset = Producto.objects.all()
      serializer_class = ProductoSerializer
• Router: genera automáticamente las URLs para un ViewSet.
  router = DefaultRouter(); router.register('productos', ProductoViewSet)

AJAX
• Técnica para hacer peticiones HTTP desde JavaScript sin recargar la página.
• Fetch API o Axios en el frontend para consumir la API REST del backend.

CSRF (Cross-Site Request Forgery)
• Ataque donde un sitio malicioso hace peticiones en nombre del usuario autenticado.
• Django protege con CSRF token. Para APIs: usar SessionAuthentication o deshabilitar con @csrf_exempt (solo si se usa TokenAuth).
• DRF maneja esto automáticamente con sus clases de autenticación.

CORS (Cross-Origin Resource Sharing)
• Mecanismo del navegador que bloquea peticiones a dominios distintos al de la página.
• Solución: django-cors-headers. Configurar CORS_ALLOWED_ORIGINS en settings.py.
• Headers importantes: Access-Control-Allow-Origin, Access-Control-Allow-Methods.

Lab 13: Desarrollo de un sistema web backend con API REST completa (CRUD).`,
  },

  {
    semana: 14,
    titulo: "Microservicios con Django",
    fecha: "06 – 12 jul 2026",
    unidad: "II",
    avance: 90,
    estado: "pendiente",
    temas: ["Arquitectura de microservicios", "Primer microservicio", "Comunicación entre servicios", "Docker", "Kubernetes", "Protección y monitoreo"],
    content: `INTRODUCCIÓN A LOS MICROSERVICIOS
• Arquitectura donde la aplicación se divide en servicios pequeños e independientes, cada uno con su propia responsabilidad y base de datos.
• Contraste con Monolito: un solo deployment vs múltiples servicios desplegados independientemente.
• Ventajas: escalabilidad independiente, tecnología heterogénea, fallos aislados, equipos autónomos.
• Desventajas: complejidad de red, consistencia eventual, mayor overhead operacional.

CONFIGURACIÓN DE LA ARQUITECTURA
• Cada microservicio es un proyecto Django independiente con su propia BD y API REST.
• API Gateway: punto de entrada único que enruta las peticiones al microservicio correcto (Nginx, Kong).
• Servicios de ejemplo: auth-service, product-service, order-service, notification-service.

DISEÑO Y CONSTRUCCIÓN DEL PRIMER MICROSERVICIO
• Crear proyecto Django mínimo: solo las apps necesarias para esa responsabilidad.
• Exponer una API REST con DRF (Django REST Framework).
• Cada servicio tiene su propio requirements.txt, settings.py y base de datos.
• Principio de responsabilidad única: un servicio hace una sola cosa bien.

COMUNICACIÓN ENTRE MICROSERVICIOS
• Síncrona (HTTP/REST): un servicio llama directamente al API de otro. Simple pero acoplado.
  requests.get('http://auth-service/api/verify-token/')
• Asíncrona (Message Broker): los servicios se comunican por mensajes (RabbitMQ, Kafka, Redis Pub/Sub).
  Ventaja: desacoplamiento. Desventaja: consistencia eventual.
• gRPC: protocolo de comunicación binario y eficiente para microservicios (alternativa a REST).

GESTIÓN DE BASE DE DATOS EN MICROSERVICIOS
• Cada microservicio tiene su propia base de datos (Database per Service pattern).
• Evita queries entre bases de datos de distintos servicios.
• Saga Pattern: gestión de transacciones distribuidas entre servicios.

DOCKER
• Herramienta de contenedorización. Empaqueta la aplicación con todas sus dependencias.
• Dockerfile: instrucciones para construir la imagen.
  FROM python:3.11; WORKDIR /app; COPY . .; RUN pip install -r requirements.txt; CMD ["python","manage.py","runserver"]
• docker build -t mi-servicio . | docker run -p 8000:8000 mi-servicio
• docker-compose.yml: define y orquesta múltiples contenedores (app + DB + Redis) en desarrollo.

KUBERNETES (K8s)
• Orquestador de contenedores para producción. Gestiona despliegue, escalado y disponibilidad.
• Conceptos clave: Pod (unidad mínima), Deployment (gestiona réplicas), Service (red interna), Ingress (tráfico externo).
• Escalado automático: HorizontalPodAutoscaler según métricas de CPU/memoria.
• kubectl apply -f deployment.yaml para desplegar.

PROTECCIÓN DE MICROSERVICIOS
• Autenticación entre servicios: JWT (JSON Web Token), API Keys o mTLS.
• Rate limiting en el API Gateway para prevenir abuso.
• HTTPS obligatorio en todos los endpoints.

MONITOREO Y ESCALADO
• Logs centralizados: ELK Stack (Elasticsearch + Logstash + Kibana) o Grafana Loki.
• Métricas: Prometheus + Grafana para monitorear CPU, memoria, latencia y errores.
• Health checks: endpoint /health/ que responde si el servicio está operativo.
• Alertas automáticas cuando métricas superan umbrales críticos.

CONSUMO DEL MICROSERVICIO
• El frontend consume los microservicios a través del API Gateway con peticiones HTTP normales.
• El Gateway agrega autenticación, enrutamiento y balanceo de carga.`,
  },

  {
    semana: 15,
    titulo: "Exposición de Proyecto y Evaluación de Logro 2",
    fecha: "13 – 19 jul 2026",
    unidad: "II",
    avance: 96,
    estado: "pendiente",
    temas: ["Exposición proyecto", "RSU", "Evaluación de Logro 02"],
    content: `EXPOSICIÓN DE PROYECTO DE INVESTIGACIÓN
• Presentación final del proyecto fullstack desarrollado durante la Unidad II.
• El proyecto debe demostrar: API REST con Django, consumo desde frontend React, despliegue básico.
• Criterios de evaluación: funcionalidad, arquitectura, calidad del código, presentación y documentación.
• Duración aproximada por grupo: 15-20 minutos de exposición + preguntas del docente.

RESPONSABILIDAD SOCIAL UNIVERSITARIA (RSU)
• El proyecto debe estar orientado a resolver un problema real de la comunidad huancaína o universitaria.
• Alineado con los Objetivos de Desarrollo Sostenible (ODS) de la ONU.
• Se evalúa el impacto social del producto desarrollado, no solo el aspecto técnico.
• Actividad de tutoría RSU: comunidad beneficiaria de Huancayo.

EVALUACIÓN DE LOGRO 02
• Evaluación de la solución web fullstack (API REST + consumo frontend).
• Instrumentos: API web operativa demostrada en vivo.
• Se evalúa: diseño de la API, manejo de errores, autenticación, documentación y despliegue.

FÓRMULA PP2
PP2 = EL × 0.5 + PLP × 0.25 + TI × 0.25
• EL  = Evaluación de Logro 02 (50%)
• PLP = Promedio de Laboratorios y Prácticas Unidad II (25%)
• TI  = Trabajo de Investigación y Portafolio Unidad II (25%)`,
  },

  {
    semana: 16,
    titulo: "Retroalimentación — 2do Consolidado Final",
    fecha: "20 – 24 jul 2026",
    unidad: "II",
    avance: 100,
    estado: "pendiente",
    temas: ["Revisión Evaluación de Logro 2", "Reforzamiento Unidad II", "2do Consolidado", "Promedio Final"],
    content: `REVISIÓN Y RETROALIMENTACIÓN FINAL
Revisión de los resultados de la Evaluación de Logro 02. Retroalimentación sobre los proyectos expuestos: puntos fuertes, áreas de mejora y recomendaciones para seguir creciendo profesionalmente.

SEGUNDO CONSOLIDADO DE EVALUACIÓN CONTINUA
Fecha: 20 al 24 de julio de 2026.

CÁLCULO DEL PROMEDIO FINAL
PF = (PP1 + PP2) / 2

Donde:
• PP1 = EL1×0.5 + PLP1×0.25 + TI1×0.25  (Unidad I)
• PP2 = EL2×0.5 + PLP2×0.25 + TI2×0.25  (Unidad II)

Requisitos para aprobar:
• Nota mínima: 10.5 sobre 20 en el promedio de consolidados.
• Asistencia mínima: 70% de clases teóricas y prácticas.
• Haber entregado los trabajos y laboratorios en la plataforma virtual.

RESUMEN DE COMPETENCIAS ALCANZADAS (si todo sale bien)
✓ Desarrollar aplicaciones web frontend SPA con React, Hooks y consumo de APIs.
✓ Diseñar e implementar un backend con Django y exponer APIs REST.
✓ Aplicar conceptos de microservicios, Docker y despliegue.
✓ Trabajar con control de versiones Git y GitHub de forma profesional.
✓ Construir soluciones con impacto social alineadas con los ODS.

BIBLIOGRAFÍA DE REFERENCIA DEL CURSO
Unidad I: (1), (2), (5), (7), (8), (9)
Unidad II: (2), (3), (4), (5), (10), (11), (12)

Docentes:
• Dr. Jaime Suasnabar Terrel — jsuasnabar@uncp.edu.pe
• Mg. Miguel Aguilar Coronación — Jefe de Práctica`,
  },
];
