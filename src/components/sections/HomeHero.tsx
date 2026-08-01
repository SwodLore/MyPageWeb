import { useCallback, useEffect, useRef } from "react";
import { m } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { useLenis } from "lenis/react";
import { ArrowRight, ChevronDown, Github, Download, MapPin } from "lucide-react";
import { AnimatedCounter, GlowButton, Typewriter } from "@/components/ui";
import { triggerSimpleConfetti } from "@/lib/confetti";
import { EASE_OUT as ease } from "@/lib/animations";
import { personal } from "@/data/personal";
import { EDUCATION } from "@/data/aboutMe";
import type { PageOutletContext } from "@/layouts/AppLayout";

// ═══════════════════════════════════════════════════════════════
// Aurora Background
// ═══════════════════════════════════════════════════════════════

function AuroraBackground({ introDone }: { introDone: boolean }) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  /* Un solo listener en la sección, sin estado de React: el foco
     sigue al cursor a coste de dos custom properties por frame. */
  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;
    const section = el.closest("section");
    if (!section) return;

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
      el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    return () => section.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-accent-50/30 to-slate-50 dark:from-night-950 dark:via-night-900/80 dark:to-night-950" />

      {/* Blob 1 — blue, top-left */}
      <m.div
        className="aurora-blob aurora-blob-1 w-[700px] h-[700px] -top-40 -left-32"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Blob 2 — violet, top-right */}
      <m.div
        className="aurora-blob aurora-blob-2 w-[600px] h-[600px] -top-20 -right-40"
        animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      {/* Blob 3 — pink, bottom-center */}
      <m.div
        className="aurora-blob aurora-blob-3 w-[500px] h-[500px] -bottom-20 left-[35%]"
        animate={{ x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* Retícula blueprint — el mismo plano de construcción del logo.
          SVG estático con <pattern>: se pinta una vez, cero costo de runtime. */}
      <svg
        className="absolute inset-0 h-full w-full text-accent-500/[0.05] dark:text-accent-300/[0.05]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-blueprint" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M72 0H0V72" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-blueprint)" />
        {/* Líneas base horizontales — como las guías del logotipo.
            Se extienden de izquierda a derecha al caer el telón, igual
            que las guías del intro: el plano continúa donde lo dejó. */}
        {[38, 62].map((y, i) => (
          <m.line
            key={y}
            x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`}
            stroke="currentColor"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={introDone ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Foco del plano — la retícula se ilumina alrededor del cursor.
          La posición viaja por variables CSS, así que mover el mouse
          no re-renderiza React: solo recompone la máscara en la GPU. */}
      <div
        className="absolute inset-0 hidden md:block opacity-0 transition-opacity duration-700 [--spot-x:50%] [--spot-y:40%] group-hover/hero:opacity-100"
        style={{
          maskImage:
            "radial-gradient(220px circle at var(--spot-x) var(--spot-y), #000 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(220px circle at var(--spot-x) var(--spot-y), #000 0%, transparent 70%)",
        }}
        ref={spotlightRef}
        aria-hidden="true"
      >
        <svg className="h-full w-full text-accent-500/40 dark:text-accent-300/30">
          <rect width="100%" height="100%" fill="url(#hero-blueprint)" />
        </svg>
      </div>

      {/* Radial vignette to fade out edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_60%,var(--tw-gradient-from))] from-slate-50 dark:from-night-950" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Profile Photo with orbiting tech icons
// ═══════════════════════════════════════════════════════════════

/* Reparte N iconos por igual sobre la circunferencia, empezando arriba
   y girando en sentido horario. Antes eran 8 posiciones escritas a mano:
   al pasar de 8 tecnologías, las extra se apilaban sobre las primeras. */
function orbitPosition(index: number, total: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    left: `${50 + 50 * Math.cos(angle)}%`,
    top: `${50 + 50 * Math.sin(angle)}%`,
  };
}

function ProfilePhoto({ introDone }: { introDone: boolean }) {
  return (
    <div className="relative select-none">
      {/* Large ambient glow */}
      <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-accent-500/15 via-accent-500/15 to-accent-500/15 blur-3xl animate-pulse-glow" />

      {/* Animated gradient border ring */}
      <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-accent-500 via-accent-500 to-accent-400 opacity-50 blur-[3px] animate-spin-slow" />

      {/* Inner shadow ring for depth */}
      <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-accent-500 via-accent-500 to-accent-400 opacity-30 animate-spin-slow" />

      {/* Photo */}
      <div className="relative rounded-full overflow-hidden border-[3px] border-white/40 dark:border-slate-900/60 shadow-2xl animate-float-slow">
        <div className="w-60 h-60 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px]">
          <img
            src="/profile.webp"
            alt="Alessandro Poves — Full Stack Developer"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Círculo guía blueprint — la órbita "planificada en el plano".
          Punteado estático (coste cero); aparece al caer el telón. */}
      <m.div
        className="absolute inset-[-66px] rounded-full border border-dashed border-accent-500/25 dark:border-accent-300/20"
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.55 }}
        aria-hidden="true"
      />

      {/* Trazo de compás — una vuelta sólida que recorre esa guía y se
          apaga, como el compás levantándose del papel. Va en su propio
          elemento: framer calcula strokeDasharray para animar pathLength
          y machacaría el punteado del círculo de arriba. */}
      <svg
        className="absolute inset-[-66px] -rotate-90"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <m.circle
          cx="50" cy="50" r="49.6"
          strokeWidth="0.4"
          strokeLinecap="round"
          className="stroke-accent-500 dark:stroke-accent-300"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={introDone ? { pathLength: 1, opacity: [0, 0.9, 0.9, 0] } : {}}
          transition={{
            pathLength: { duration: 1.5, delay: 0.15, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 2.1, delay: 0.15, times: [0, 0.1, 0.72, 1] },
          }}
        />
      </svg>

      {/* Orbiting tech icons — outer ring rotates, icons counter-rotate to stay upright.
          Dos divs por icono a propósito: el de fuera coloca (transform: translate)
          y el de dentro contra-gira (transform: rotate). En uno solo, la animación
          CSS del giro pisaría al translate del centrado. */}
      <div className="absolute inset-[-48px] animate-spin-slower" style={{ transformOrigin: "center center" }}>
        {personal.orbitingTech.map((tech, i) => (
          <div
            key={tech.name}
            className="absolute"
            style={{
              ...orbitPosition(i, personal.orbitingTech.length),
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-white dark:bg-night-900 shadow-lg border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center animate-spin-slower-reverse">
              <img
                src={tech.img}
                alt={tech.name}
                title={tech.name}
                width={24}
                height={24}
                loading="lazy"
                decoding="async"
                className={`w-6 h-6 ${'invert' in tech && tech.invert ? 'dark:invert' : ''}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Hero Section
// ═══════════════════════════════════════════════════════════════

export default function HomeHero() {
  const lenis = useLenis();
  // El telón del intro avisa cuándo cayó: el plano se traza justo ahí.
  const { introDone } = useOutletContext<PageOutletContext>();

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) lenis?.scrollTo(el, { offset: -80, duration: 1.4 });
  }, [lenis]);

  return (
    <section
      id="sobre-mi"
      className="group/hero relative min-h-screen flex flex-col items-center justify-center pt-20 pb-28 overflow-hidden"
    >
      <AuroraBackground introDone={introDone} />

      <div className="container-page relative z-10 w-full">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] lg:gap-20">

          {/* ── Left: Text content ─────────────────────────────── */}
          <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">

            {/* Available badge */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease }}
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-100/70 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-700/40 text-emerald-700 dark:text-emerald-400 text-sm font-medium backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {personal.availableText}
              </span>
            </m.div>

            {/* Name — word-by-word curtain reveal */}
            <h1 className="space-y-1 leading-none">
              {/* "Hola, soy" */}
              <div className="overflow-hidden">
                <m.span
                  className="block text-lg md:text-xl font-medium text-slate-400 dark:text-slate-500 tracking-widest uppercase"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.55, delay: 0.12, ease }}
                >
                  Hola, soy
                </m.span>
              </div>

              {/* First name */}
              <div className="overflow-hidden">
                <m.span
                  className="block text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-slate-900 dark:text-white"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.55, delay: 0.22, ease }}
                >
                  {personal.name}
                </m.span>
              </div>

              {/* Last name — animated gradient */}
              <div className="overflow-hidden">
                <m.span
                  className="block text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-accent-600 dark:text-accent-400"
                  initial={{ y: "110%" }}
                  animate={{
                    y: 0,
                    backgroundPosition: ["0% center", "100% center", "0% center"],
                  }}
                  transition={{
                    y: { duration: 0.55, delay: 0.32, ease },
                    backgroundPosition: {
                      duration: 8,
                      delay: 0.32,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  {personal.lastName}
                </m.span>
              </div>
            </h1>

            {/* Location tag */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="flex items-center justify-center lg:justify-start gap-1.5 text-sm text-slate-400 dark:text-slate-500"
            >
              <MapPin size={13} />
              {personal.location}
            </m.div>

            {/* Typewriter dentro de una mini-ventana de terminal.
                Los tres puntos son los semáforos de macOS — colores
                literales de Apple, cita visual fuera de la paleta. */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.52 }}
            >
              <div className="inline-flex items-center gap-3 rounded-xl px-4 py-2.5 bg-white/70 border border-slate-200/80 shadow-sm backdrop-blur-sm dark:bg-night-900/70 dark:border-night-700">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="font-mono text-sm text-accent-600 dark:text-accent-400 select-none">
                  ~$
                </span>
                <span className="text-lg md:text-xl font-semibold text-slate-600 dark:text-slate-300 min-h-[1.75rem]">
                  <Typewriter
                    words={personal.roles}
                    typingSpeed={75}
                    deletingSpeed={35}
                    delayBetweenWords={2500}
                  />
                </span>
              </div>
            </m.div>

            {/* Bio */}
            <m.p
              className="max-w-lg mx-auto lg:mx-0 text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62, ease }}
            >
              {personal.bioshort}
            </m.p>

            {/* CTA buttons */}
            <m.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.72, ease }}
            >
              <GlowButton onClick={() => scrollTo("portafolio")} variant="primary">
                Ver proyectos
                <ArrowRight size={16} />
              </GlowButton>
              <GlowButton
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <Github size={16} />
                GitHub
              </GlowButton>
              <GlowButton
                href={personal.cv}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                onClick={triggerSimpleConfetti}
              >
                <Download size={16} />
                Descargar CV
              </GlowButton>
            </m.div>

            {/* Stats row */}
            <m.div
              className="flex items-center justify-center lg:justify-start gap-6 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.82 }}
            >
              {personal.stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6">
                  {i > 0 && (
                    <div className="w-px h-10 bg-slate-200 dark:bg-slate-700/60" />
                  )}
                  <div className="text-center lg:text-left">
                    <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </m.div>

            {/* Formación — misma fuente que la página Skills (EDUCATION).
                Escudos en gris que se colorean al pasar el mouse: leen
                como credencial de un vistazo, sin robarle peso al nombre. */}
            <m.ul
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 pt-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.92, ease }}
            >
              {EDUCATION.map((edu) => (
                <li key={edu.institution} className="flex items-center gap-2.5 group/edu">
                  <img
                    src={edu.heroLogo}
                    alt=""
                    width={28}
                    height={28}
                    loading="lazy"
                    decoding="async"
                    className="h-7 w-7 object-contain grayscale opacity-60 transition duration-300 group-hover/edu:grayscale-0 group-hover/edu:opacity-100"
                  />
                  <div className="text-left leading-tight">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {edu.heroLabel}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      {edu.heroDetail}
                    </p>
                  </div>
                </li>
              ))}
            </m.ul>
          </div>

          {/* ── Right: Profile photo ─────────────────────────── */}
          <m.div
            className="relative order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <ProfilePhoto introDone={introDone} />
          </m.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <m.button
        onClick={() => scrollTo("stats-section")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors duration-300 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        aria-label="Scroll hacia abajo"
      >
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase">Scroll</span>
        <m.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </m.div>
      </m.button>
    </section>
  );
}
