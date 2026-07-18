import { lazy, Suspense, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowRight, ChevronDown, Sparkles, Github, Download, Award, Zap, MapPin } from "lucide-react";
import { AnimatedCounter, GlowButton, GlassCard, Typewriter, SkillsMarquee } from "./ui";
import { TiltCard } from "./ui/TiltCard";
import { triggerSimpleConfetti } from "../lib/confetti";
import { personal } from "../data/personal";

// Lazy load de componentes below-the-fold para reducir bundle inicial
const AboutSectionLazy = lazy(() => import("./AboutSection"));
const CertificadoSection = lazy(() => import("./Certificado"));
const ContactoSection = lazy(() => import("./Contacto"));
const PortafolioSection = lazy(() => import("./Portafolio"));

// ═══════════════════════════════════════════════════════════════
// Animation Variants
// ═══════════════════════════════════════════════════════════════

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easing },
  },
};

const MotionLink = motion.create(Link);

// ═══════════════════════════════════════════════════════════════
// Highlight Cards Data
// ═══════════════════════════════════════════════════════════════

const highlightCards = [
  {
    value: 30,
    prefix: "+",
    suffix: "",
    label: "Proyectos",
    description: "Aplicaciones web y APIs",
    Icon: Sparkles,
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    shadowColor: "shadow-blue-500/20",
    borderColor: "border-blue-500/20",
  },
  {
    value: 8,
    prefix: "",
    suffix: "",
    label: "Certificaciones",
    description: "React, Laravel y más",
    Icon: Award,
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400",
    shadowColor: "shadow-violet-500/20",
    borderColor: "border-violet-500/20",
  },
  {
    value: 20,
    prefix: "+",
    suffix: "",
    label: "Tecnologías",
    description: "Stack moderno full stack",
    Icon: Zap,
    gradient: "from-rose-600 via-pink-500 to-orange-400",
    shadowColor: "shadow-rose-500/20",
    borderColor: "border-rose-500/20",
  },
];

const workflowHighlights = [
  {
    tag: "Discovery",
    heading: "Análisis y planificación",
    body: "Entiendo tus necesidades y diseño la arquitectura óptima para tu proyecto.",
  },
  {
    tag: "Build",
    heading: "Desarrollo iterativo",
    body: "Código limpio, buenas prácticas y entregas incrementales.",
  },
  {
    tag: "Deploy",
    heading: "Despliegue y soporte",
    body: "CI/CD, monitoreo y optimización continua en producción.",
  },
];

// ═══════════════════════════════════════════════════════════════
// Helper Components
// ═══════════════════════════════════════════════════════════════

function SectionFallback({ label }: { label: string }) {
  return (
    <div className="py-20 text-center text-sm text-slate-500 dark:text-slate-400 animate-pulse">
      Cargando {label}...
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Aurora Background Component
// ═══════════════════════════════════════════════════════════════

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900/80 dark:to-slate-950" />

      {/* Blob 1 — blue, top-left */}
      <motion.div
        className="aurora-blob aurora-blob-1 w-[700px] h-[700px] -top-40 -left-32"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Blob 2 — violet, top-right */}
      <motion.div
        className="aurora-blob aurora-blob-2 w-[600px] h-[600px] -top-20 -right-40"
        animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      {/* Blob 3 — pink, bottom-center */}
      <motion.div
        className="aurora-blob aurora-blob-3 w-[500px] h-[500px] -bottom-20 left-[35%]"
        animate={{ x: [0, 40, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* Mesh grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Radial vignette to fade out edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_60%,var(--tw-gradient-from))] from-slate-50 dark:from-slate-950" />
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
      <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-blue-500/15 via-violet-500/15 to-cyan-500/15 blur-3xl animate-pulse-glow" />

      {/* Animated gradient border ring */}
      <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-50 blur-[3px] animate-spin-slow" />

      {/* Inner shadow ring for depth */}
      <div className="absolute -inset-[3px] rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-30 animate-spin-slow" />

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

      {/* Orbiting tech icons — outer ring rotates, icons counter-rotate to stay upright */}
      <div className="absolute inset-[-48px] animate-spin-slower" style={{ transformOrigin: "center center" }}>
        {personal.orbitingTech.map((tech, i) => (
          <div
            key={tech.name}
            className={`absolute ${ORBIT_POSITIONS[i % ORBIT_POSITIONS.length]} w-11 h-11 rounded-xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-center animate-spin-slower-reverse`}
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
// Hero Section Component
// ═══════════════════════════════════════════════════════════════

function HeroSection() {
  const lenis = useLenis();

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) lenis?.scrollTo(el, { offset: -80, duration: 1.4 });
  }, [lenis]);

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      id="sobre-mi"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-28 overflow-hidden"
    >
      <AuroraBackground />

      <div className="container-apple relative z-10 w-full">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] lg:gap-20">

          {/* ── Left: Text content ─────────────────────────────── */}
          <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">

            {/* Available badge */}
            <motion.div
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
            </motion.div>

            {/* Name — word-by-word curtain reveal */}
            <h1 className="space-y-1 leading-none">
              {/* "Hola, soy" */}
              <div className="overflow-hidden">
                <motion.span
                  className="block text-lg md:text-xl font-medium text-slate-400 dark:text-slate-500 tracking-widest uppercase"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.55, delay: 0.12, ease }}
                >
                  Hola, soy
                </motion.span>
              </div>

              {/* First name */}
              <div className="overflow-hidden">
                <motion.span
                  className="block text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-slate-900 dark:text-white"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.55, delay: 0.22, ease }}
                >
                  {personal.name}
                </motion.span>
              </div>

              {/* Last name — animated gradient */}
              <div className="overflow-hidden">
                <motion.span
                  className="block text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 dark:from-blue-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent"
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
                </motion.span>
              </div>
            </h1>

            {/* Location tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="flex items-center justify-center lg:justify-start gap-1.5 text-sm text-slate-400 dark:text-slate-500"
            >
              <MapPin size={13} />
              {personal.location}
            </motion.div>

            {/* Typewriter subtitle */}
            <motion.div
              className="text-xl md:text-2xl font-semibold text-slate-600 dark:text-slate-300 min-h-[2rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.52 }}
            >
              <Typewriter
                words={personal.roles}
                typingSpeed={75}
                deletingSpeed={35}
                delayBetweenWords={2500}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              className="max-w-lg mx-auto lg:mx-0 text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62, ease }}
            >
              {personal.bioshort}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
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
            </motion.div>

            {/* Stats row */}
            <motion.div
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
            </motion.div>
          </div>

          {/* ── Right: Profile photo ─────────────────────────── */}
          <motion.div
            className="relative order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            <ProfilePhoto />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("stats-section")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        aria-label="Scroll hacia abajo"
      >
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Stats Cards Section
// ═══════════════════════════════════════════════════════════════

function StatsSection() {
  return (
    <section id="stats-section" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="container-apple relative z-10">
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {highlightCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow effect behind card */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${card.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />

              {/* Card */}
              <TiltCard className={`relative p-8 rounded-2xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl border ${card.borderColor} shadow-2xl ${card.shadowColor} transition-all duration-300 h-full`}>
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                    <card.Icon size={24} className="text-white" />
                  </div>
                </div>

                {/* Counter */}
                <div className="mb-4">
                  <span className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                    <AnimatedCounter
                      value={card.value}
                      prefix={card.prefix}
                      suffix={card.suffix}
                    />
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {card.label}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {card.description}
                </p>

                {/* Decorative line */}
                <div className={`absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r ${card.gradient} rounded-full opacity-50`} />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Skills Overview Section
// ═══════════════════════════════════════════════════════════════

function SkillsOverviewSection() {

  return (
    <motion.section
      id="skills-overview"
      className="relative section-padding overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {/* Gradient background - responsive to theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      {/* Decorative blurs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container-apple relative z-10">
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <Sparkles size={14} />
            Stack Tecnológico
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Habilidades que convierten
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 dark:from-violet-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              ideas en productos reales
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Combino tecnología moderna con procesos colaborativos para crear experiencias digitales excepcionales.
          </p>
        </motion.div>

        {/* Skills Marquee - Full Width with Two Rows */}
        <motion.div variants={fadeInUp} className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full" />
            Mis Tecnologías
          </h3>
          <div className="space-y-4">
            {/* First row - moves left */}
            <SkillsMarquee speed={35} pauseOnHover={true} reverse={false} />
            {/* Second row - moves right */}
            <SkillsMarquee speed={40} pauseOnHover={true} reverse={true} />
          </div>
        </motion.div>

        {/* Workflow Cards - Horizontal Grid */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full" />
            Cómo Trabajo
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {workflowHighlights.map((item, index) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-5 rounded-xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 hover:border-violet-500/50 transition-all duration-300"
              >
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-md mb-3">
                  {item.tag}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.heading}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center mt-12" variants={fadeInUp}>
          <MotionLink
            to="/skills"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-shadow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver todas las habilidades
            <ArrowRight size={18} />
          </MotionLink>
        </motion.div>
      </div>
    </motion.section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CTA Section
// ═══════════════════════════════════════════════════════════════

function CTASection() {
  const lenis = useLenis();

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) lenis?.scrollTo(el, { offset: -80, duration: 1.4 });
  }, [lenis]);

  return (
    <section className="py-16">
      <div className="container-apple">
        <GlassCard className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
          <div className="text-center md:text-left">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Disponibilidad
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-2">
              ¿Listo para tu siguiente proyecto?
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-lg">
              Aporto visión estratégica, ejecución técnica y atención al detalle para construir productos que generan resultados.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <GlowButton onClick={() => scrollTo("contacto")} variant="primary">
              Contáctame
              <ArrowRight size={18} />
            </GlowButton>
            <GlowButton href="/cv.pdf" target="_blank" variant="secondary" onClick={triggerSimpleConfetti}>
              <Download size={18} />
              Descargar CV
            </GlowButton>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Dashboard View
// ═══════════════════════════════════════════════════════════════

export default function DashboardView() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* About Me Section */}
      <Suspense fallback={<SectionFallback label="sobre mí" />}>
        <AboutSectionLazy />
      </Suspense>

      {/* Skills Overview */}
      <SkillsOverviewSection />

      {/* CTA Section */}
      <CTASection />

      {/* Portfolio Section */}
      <motion.section
        id="portafolio"
        className="section-padding bg-slate-50 dark:bg-slate-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <Suspense fallback={<SectionFallback label="proyectos" />}>
          <PortafolioSection />
        </Suspense>
      </motion.section>

      {/* Certificates Section */}
      <motion.section
        id="certificados"
        className="section-padding bg-gradient-to-b from-white via-violet-50/30 to-blue-50/30 dark:from-slate-950 dark:via-violet-950/10 dark:to-slate-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <div className="container-apple text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-900/30 border border-amber-200/50 dark:border-amber-700/50 text-amber-700 dark:text-amber-300 text-sm font-medium mb-6">
            🏆 Formación Continua
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 dark:from-amber-400 dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent">
            Certificaciones
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400 mt-4">
            Certificaciones que respaldan mi experiencia técnica y compromiso con la excelencia.
          </p>
        </div>
        <Suspense fallback={<SectionFallback label="certificados" />}>
          <CertificadoSection />
        </Suspense>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contacto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <Suspense fallback={<SectionFallback label="contacto" />}>
          <ContactoSection />
        </Suspense>
      </motion.section>
    </>
  );
}
