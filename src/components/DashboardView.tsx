import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, animate } from "framer-motion";
import { slugs } from "../data/slugs";
import { ScrollProgress } from "./magicui/scroll-progress";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import CertificadoSection from "./Certificado";
import ContactoSection from "./Contacto";
const PortafolioSection = lazy(() => import("./Portafolio"));
const IconCloudCanvas = lazy(() =>
  import("./magicui/icon-cloud").then((module) => ({ default: module.IconCloud })),
);

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const heroContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const heroItem = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing },
  },
};

const heroContent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.12 },
  },
};

const photoVariants = {
  hidden: { opacity: 1, scale: 1, rotate: 0, y: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    y: 0,
    transition: { duration: 0.7, ease: easing, delay: 0.2 },
  },
};

const sectionVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easing },
  },
};

const cardsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easing },
  },
};

const MotionLink = motion.create(Link);

const highlightCards = [
  {
    title: "+30",
    subtitle: "Proyectos integrales",
    badge: "Experiencia",
    description:
      "Soluciones completas con foco en calidad, accesibilidad y resultados de negocio.",
    count: 30,
    prefix: "+",
  },
  {
    title: "Stack moderno",
    subtitle: "End-to-end",
    badge: "Tecnologia",
    description:
      "React, Laravel, Spring Boot, Tailwind CSS, Docker, AWS y metodologias agiles.",
  },
  {
    title: "Experiencia full stack",
    subtitle: "Arquitectura & UI",
    badge: "Colaboracion",
    description:
      "Arquitecturas escalables, interfaces elegantes y procesos colaborativos.",
  },
];

const workflowHighlights = [
  {
    tag: "Discovery",
    heading: "Kick-off y roadmap compartido",
    body: "Workshops de descubrimiento, mapeo de usuarios y priorizacion de valor junto al equipo del proyecto.",
  },
  {
    tag: "Iteracion",
    heading: "Entrega continua y feedback real",
    body: "Sprints con demos, documentacion viva, QA automatizado y mejoras acordadas en cada release.",
  },
  {
    tag: "Escala",
    heading: "Observabilidad y evolucion guiada por datos",
    body: "Metricas, pipelines CI/CD y decisiones informadas para seguir optimizando el producto una vez en produccion.",
  },
];

function IconCloudSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-slate-200/80 bg-slate-50/80 text-slate-400 dark:border-slate-700/70 dark:bg-slate-900/40 dark:text-slate-500">
      <Sparkles className="h-7 w-7 animate-spin" aria-hidden="true" />
      <span className="sr-only">Cargando nube de tecnologías</span>
    </div>
  );
}

function DeferredIconCloud({ images, className }: { images: string[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;
    const node = containerRef.current;

    if (!node) {
      return;
    }

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={containerRef} className={className}>
      {shouldRender ? (
        <Suspense fallback={<IconCloudSkeleton />}>
          <IconCloudCanvas images={images} />
        </Suspense>
      ) : (
        <IconCloudSkeleton />
      )}
    </div>
  );
}

function AnimatedCounter({ value, duration = 1.1 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: easing,
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [value, duration]);

  return <span>{displayValue}</span>;
}

function SectionFallback({ label }: { label: string }) {
  return (
    <div className="py-20 text-center text-sm text-slate-500 dark:text-slate-400 animate-pulse">
      Cargando {label}...
    </div>
  );
}

export default function DashboardView() {
  const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}`);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ScrollProgress className="fixed top-0 left-0 right-0 z-40 h-0.5 bg-blue-600" />

      <motion.section
        id="sobre-mi"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50 to-sky-100 py-28 sm:py-32 lg:py-40 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950"
        initial="hidden"
        animate="visible"
        variants={heroContainer}
      >
        <div className="absolute inset-0 opacity-40 dark:opacity-20">
          <motion.div
            className="absolute top-16 left-10 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200 via-sky-100 to-cyan-100 blur-[110px]"
            animate={{ y: [-12, 12, -12], scale: [1, 1.05, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-24 right-12 h-72 w-72 rounded-full bg-gradient-to-br from-purple-200 via-fuchsia-100 to-pink-100 blur-[130px]"
            animate={{ y: [10, -10, 10], scale: [1, 1.08, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        <div className="container-apple relative z-10">
          <motion.div
            className="grid items-center gap-12 lg:grid-cols-[1.1fr_minmax(0,0.9fr)]"
            variants={heroContent}
          >
            <motion.div
              className="mx-auto max-w-2xl space-y-6 text-center lg:mx-0 lg:text-left"
              variants={heroItem}
            >
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-slate-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                Alessandro Poves
              </motion.h1>
              <motion.p className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300" variants={heroItem}>
                Desarrollador full stack
              </motion.p>
              <motion.p className="mx-auto max-w-xl text-lg text-slate-600 dark:text-slate-300 lg:mx-0" variants={heroItem}>
                Especializado en <span className="font-semibold text-blue-600 dark:text-blue-400">Laravel</span>,{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">Spring Boot</span>,{" "}
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">React</span> y{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">Angular</span>. Construyo productos digitales centrados en diseno, rendimiento y seguridad.
              </motion.p>
              <motion.div
                className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row lg:justify-start"
                variants={heroItem}
              >
                <motion.button
                  onClick={() => scrollTo("portafolio")}
                  className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:shadow-2xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver portafolio
                  <ChevronDown size={18} className="transition group-hover:translate-y-1" />
                </motion.button>
                <motion.a
                  href="https://github.com/SwodLore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-8 py-4 font-semibold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver GitHub
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
              variants={photoVariants}
            >
              <div
                className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-blue-500/25 via-purple-500/15 to-cyan-500/25 blur-3xl"
                aria-hidden="true"
              />
              <motion.div
                className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-gradient-to-br from-white/70 via-slate-50/40 to-blue-100/40 shadow-2xl dark:border-slate-700/60 dark:from-slate-900/60 dark:via-slate-900/30 dark:to-slate-800/40"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/profile.webp"
                  alt="Alessandro Poves"
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={640}
                  height={640}
                />
              </motion.div>
              <div
                className="absolute -bottom-10 left-1/2 h-32 w-48 -translate-x-1/2 rounded-full bg-blue-500/25 blur-3xl dark:bg-blue-500/15"
                aria-hidden="true"
              />
            </motion.div>
          </motion.div>

          <motion.div className="mt-16 grid gap-6 lg:grid-cols-3" variants={cardsContainer}>
            {highlightCards.map((card, index) => (
              <motion.div
                key={card.title}
                className="rounded-3xl border border-slate-200 bg-white px-6 py-7 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.04 }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                  {card.badge}
                </span>
                <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                  {typeof card.count === "number" ? (
                    <span className="inline-flex items-baseline gap-1">
                      {card.prefix ? <span>{card.prefix}</span> : null}
                      <AnimatedCounter value={card.count} />
                    </span>
                  ) : (
                    card.title
                  )}
                </p>
                <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">{card.subtitle}</p>
                <p className="mt-4 text-slate-500 dark:text-slate-300">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-white px-8 py-10 text-slate-900 shadow-xl sm:flex-row dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            variants={heroItem}
          >
            <div className="space-y-3 text-center sm:text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">Disponibilidad</p>
              <h2 className="text-3xl font-semibold">Lista para colaborar en tu siguiente proyecto</h2>
              <p className="max-w-xl text-slate-500 dark:text-slate-300">
                Aporto vision estrategica, ejecucion tecnica y sensibilidad por el detalle para construir experiencias que generan resultados.
              </p>
            </div>
            <motion.button
              onClick={() => scrollTo("certificados")}
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver certificaciones
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="skills-overview"
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-blue-50/40 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container-apple flex flex-col gap-10 sm:gap-14 lg:gap-20">
          <motion.div className="space-y-4 sm:space-y-6 text-center" variants={heroItem}>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-[0.3em] text-blue-700 dark:border-blue-500/50 dark:bg-blue-500/15 dark:text-blue-200">
              <Sparkles size={12} className="sm:w-3.5 sm:h-3.5" />
              Skillset 360
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white px-4 leading-tight">
              Habilidades que convierten ideas en productos reales
            </h2>
            <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-slate-500 dark:text-slate-300 px-4 leading-relaxed">
              Orquesto cada etapa del desarrollo combinando tecnología moderna con procesos colaborativos que aceleran resultados y elevan la experiencia del usuario.
            </p>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 px-4 sm:px-0 pt-2">
              {[
                { title: "+30 proyectos", caption: "Fintech, retail, educación, impacto social" },
                { title: "Stack full stack", caption: "React + Laravel + Spring Boot + AWS" },
                { title: "Certificaciones", caption: "Arquitectura de software y ciberseguridad" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:py-5 text-sm shadow-sm hover:shadow-md transition-shadow dark:border-slate-800/60 dark:bg-slate-900/80"
                >
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{item.title}</p>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-300 leading-relaxed">{item.caption}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Grid Stack Visualizado y Cómo trabajo */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10" 
            variants={cardsContainer}
          >
            {/* Stack Visualizado */}
            <motion.div 
              className="w-full space-y-5"
              variants={cardVariants}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="no-scroll-reveal text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center lg:text-left">
                Stack visualizado
              </h3>
              <DeferredIconCloud
                images={images}
                className="relative w-full aspect-square max-w-md mx-auto lg:mx-0 lg:max-w-none rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900 overflow-hidden p-8"
              />
            </motion.div>

            {/* Cómo trabajo */}
            <motion.div 
              className="w-full space-y-5"
              variants={cardVariants}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="no-scroll-reveal text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center lg:text-left">
                Cómo trabajo
              </h3>
              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900/90 p-6 md:p-8">
                {workflowHighlights.map((item) => (
                  <div
                    key={item.tag}
                    className="rounded-xl border border-slate-200/70 bg-slate-50/50 dark:border-slate-700/60 dark:bg-slate-800/50 p-5 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                  >
                    <span className="no-scroll-reveal inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide bg-blue-500 text-white rounded-md">
                      {item.tag}
                    </span>
                    <h4 className="no-scroll-reveal mt-3 text-base md:text-lg font-bold text-slate-900 dark:text-white">
                      {item.heading}
                    </h4>
                    <p className="no-scroll-reveal mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="text-center px-4" variants={heroItem}>
            <MotionLink
              to="/skills"
              className="inline-flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-2xl transition hover:shadow-[0_25px_45px_-30px_rgba(59,130,246,0.8)]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver todas las habilidades
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </MotionLink>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="portafolio"
        className="section-padding bg-slate-50 dark:bg-slate-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Suspense fallback={<SectionFallback label="proyectos" />}>
          <PortafolioSection />
        </Suspense>
      </motion.section>

      <motion.section
        id="certificados"
        className="section-padding bg-gradient-to-b from-slate-50 via-indigo-50/50 to-purple-50/40 dark:bg-gradient-to-br dark:from-purple-950/20 dark:via-blue-950/20 dark:to-slate-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.div className="container-apple flex flex-col gap-6 text-center" variants={heroItem}>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400">
            Certificados
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-500 dark:text-slate-300">
            Certificaciones que respaldan mi experiencia tecnica, buenas practicas y compromiso con la excelencia.
          </p>
        </motion.div>
        <CertificadoSection />
      </motion.section>

      <motion.section
        id="contacto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <ContactoSection />
      </motion.section>
    </>
  );
}





