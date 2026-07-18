import { useCallback } from "react";
import { m } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowRight, ChevronDown, Github, Download, MapPin } from "lucide-react";
import { AnimatedCounter, GlowButton, Typewriter } from "@/components/ui";
import { triggerSimpleConfetti } from "@/lib/confetti";
import { EASE_OUT as ease } from "@/lib/animations";
import { personal } from "@/data/personal";

// ═══════════════════════════════════════════════════════════════
// Aurora Background
// ═══════════════════════════════════════════════════════════════

function AuroraBackground() {
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
        {/* Líneas base horizontales — como las guías del logotipo */}
        <line x1="0" y1="38%" x2="100%" y2="38%" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="62%" x2="100%" y2="62%" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Radial vignette to fade out edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_60%,var(--tw-gradient-from))] from-slate-50 dark:from-night-950" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Profile Photo with orbiting tech icons
// ═══════════════════════════════════════════════════════════════

// Positions (clockwise from top) for 8 orbiting icons
const ORBIT_POSITIONS = [
  "left-1/2 -translate-x-1/2 -top-3",
  "right-0 top-10",
  "-right-3 top-1/2 -translate-y-1/2",
  "right-0 bottom-10",
  "left-1/2 -translate-x-1/2 -bottom-3",
  "left-0 bottom-10",
  "-left-3 top-1/2 -translate-y-1/2",
  "left-0 top-10",
] as const;

function ProfilePhoto() {
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
          Un borde punteado estático: cero costo, siempre alineado. */}
      <div
        className="absolute inset-[-66px] rounded-full border border-dashed border-accent-500/25 dark:border-accent-300/20"
        aria-hidden="true"
      />

      {/* Orbiting tech icons — outer ring rotates, icons counter-rotate to stay upright */}
      <div className="absolute inset-[-48px] animate-spin-slower" style={{ transformOrigin: "center center" }}>
        {personal.orbitingTech.map((tech, i) => (
          <div
            key={tech.name}
            className={`absolute ${ORBIT_POSITIONS[i % ORBIT_POSITIONS.length]} w-11 h-11 rounded-xl bg-white dark:bg-night-900 shadow-lg border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center animate-spin-slower-reverse`}
          >
            <img
              src={tech.img}
              alt={tech.name}
              className={`w-6 h-6 ${'invert' in tech && tech.invert ? 'dark:invert' : ''}`}
            />
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

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) lenis?.scrollTo(el, { offset: -80, duration: 1.4 });
  }, [lenis]);

  return (
    <section
      id="sobre-mi"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-28 overflow-hidden"
    >
      <AuroraBackground />

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
          </div>

          {/* ── Right: Profile photo ─────────────────────────── */}
          <m.div
            className="relative order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <ProfilePhoto />
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
