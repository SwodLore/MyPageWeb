import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, Github, Download, Award, Zap } from "lucide-react";
import { AnimatedCounter, GlowButton, GlassCard, Typewriter, SkillsMarquee } from "./ui";
import { TiltCard } from "./ui/TiltCard";
import { triggerSimpleConfetti } from "../lib/confetti";
import { useGuidedScroll } from "../hooks/useGuidedScroll";

// Lazy load de componentes below-the-fold para reducir bundle inicial
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

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
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
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />

      {/* Animated aurora blobs */}
      <motion.div
        className="aurora-blob aurora-blob-1 w-[600px] h-[600px] top-[-200px] left-[-100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-blob aurora-blob-2 w-[500px] h-[500px] top-[100px] right-[-150px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="aurora-blob aurora-blob-3 w-[400px] h-[400px] bottom-[-100px] left-[30%]"
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Hero Section Component
// ═══════════════════════════════════════════════════════════════

function HeroSection() {

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      id="sobre-mi"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <AuroraBackground />

      <div className="container-apple relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Content */}
          <motion.div
            className="text-center lg:text-left space-y-6 order-2 lg:order-1"
            variants={fadeInUp}
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-medium backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Disponible para proyectos
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              variants={fadeInUp}
            >
              <span className="block text-slate-900 dark:text-white">
                Hola, soy
              </span>
              <motion.span
                className="block mt-2 bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 dark:from-blue-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                Alessandro Poves
              </motion.span>
            </motion.h1>

            {/* Subtitle with Typewriter */}
            <motion.div
              className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300"
              variants={fadeInUp}
            >
              <Typewriter
                words={[
                  "Desarrollador Full Stack",
                  "Especialista en React & Angular",
                  "Experto en Laravel & NestJS",
                  "Apasionado por la Ciberseguridad"
                ]}
                typingSpeed={80}
                deletingSpeed={40}
                delayBetweenWords={2500}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              className="max-w-xl mx-auto lg:mx-0 text-lg text-slate-500 dark:text-slate-400 leading-relaxed"
              variants={fadeInUp}
            >
              Especializado en{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">React</span>,{" "}
              <span className="font-semibold text-red-600 dark:text-red-400">Laravel</span>,{" "}
              <span className="font-semibold text-green-600 dark:text-green-400">NestJS</span> y{" "}
              <span className="font-semibold text-violet-600 dark:text-violet-400">Ciberseguridad</span>.
              Construyo productos digitales centrados en diseño, rendimiento y seguridad.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
              variants={fadeInUp}
            >
              <GlowButton onClick={() => scrollTo("portafolio")} variant="primary">
                Ver portafolio
                <ChevronDown size={18} className="animate-bounce" />
              </GlowButton>

              <GlowButton
                href="https://github.com/SwodLore"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                <Github size={18} />
                GitHub
                <ArrowRight size={16} />
              </GlowButton>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-8 pt-6"
              variants={fadeInUp}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  <AnimatedCounter value={30} prefix="+" />
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Proyectos</p>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  <AnimatedCounter value={8} />
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Certificados</p>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  <AnimatedCounter value={3} prefix="+" />
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Años exp.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Profile Image with Parallax */}
          <motion.div
            className="relative order-1 lg:order-2 flex justify-center"
            variants={fadeInScale}
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-cyan-500/30 blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Profile image container */}
            <motion.div
              className="relative"
            >
              {/* Decorative ring */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 opacity-20 blur-sm"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Image with glass border */}
              <div className="relative rounded-full overflow-hidden border-4 border-white/50 dark:border-slate-800/50 shadow-2xl">
                <motion.div
                  className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img
                    src="/profile.webp"
                    alt="Alessandro Poves - Desarrollador Full Stack"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                </motion.div>
              </div>

              {/* Orbiting Tech Icons */}
              <motion.div
                className="absolute inset-[-40px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center center" }}
              >
                {/* React - Top */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -top-2 w-10 h-10 rounded-xl bg-slate-900/90 shadow-lg backdrop-blur-sm border border-slate-700/50 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-6 h-6" />
                </motion.div>

                {/* Laravel - Top Right */}
                <motion.div
                  className="absolute right-4 top-4 w-10 h-10 rounded-xl bg-slate-900/90 shadow-lg backdrop-blur-sm border border-slate-700/50 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" alt="Laravel" className="w-6 h-6" />
                </motion.div>

                {/* NestJS - Right */}
                <motion.div
                  className="absolute -right-2 top-1/3 w-10 h-10 rounded-xl bg-slate-900/90 shadow-lg backdrop-blur-sm border border-slate-700/50 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" alt="NestJS" className="w-6 h-6" />
                </motion.div>

                {/* Angular - Right Bottom */}
                <motion.div
                  className="absolute -right-2 top-2/3 w-10 h-10 rounded-xl bg-slate-900/90 shadow-lg backdrop-blur-sm border border-slate-700/50 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular" className="w-6 h-6" />
                </motion.div>

                {/* Next.js - Bottom Right */}
                <motion.div
                  className="absolute right-8 bottom-0 w-10 h-10 rounded-xl bg-slate-900/90 shadow-lg backdrop-blur-sm border border-slate-700/50 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-6 h-6 invert" />
                </motion.div>

                {/* Docker - Bottom */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-10 h-10 rounded-xl bg-slate-900/90 shadow-lg backdrop-blur-sm border border-slate-700/50 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-6 h-6" />
                </motion.div>

                {/* PostgreSQL - Bottom Left */}
                <motion.div
                  className="absolute left-8 bottom-0 w-10 h-10 rounded-xl bg-slate-900/90 shadow-lg backdrop-blur-sm border border-slate-700/50 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-6 h-6" />
                </motion.div>

                {/* MongoDB - Left Bottom */}
                <motion.div
                  className="absolute -left-2 top-2/3 w-10 h-10 rounded-xl bg-slate-900/90 shadow-lg backdrop-blur-sm border border-slate-700/50 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-6 h-6" />
                </motion.div>

                {/* Vercel - Left */}
                <motion.div
                  className="absolute -left-2 top-1/3 w-10 h-10 rounded-xl bg-slate-900/90 shadow-lg backdrop-blur-sm border border-slate-700/50 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" alt="Vercel" className="w-6 h-6 invert" />
                </motion.div>

                {/* AWS - Top Left */}
                <motion.div
                  className="absolute left-4 top-4 w-10 h-10 rounded-xl bg-slate-900/90 shadow-lg backdrop-blur-sm border border-slate-700/50 flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" className="w-6 h-6" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
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
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
  // Scroll guiado automático hacia la sección de stats en primera visita
  useGuidedScroll("stats-section", { delay: 2500, offset: -60 });

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

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
