import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SkillsMarquee } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const MotionLink = m.create(Link);

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

export default function SkillsOverview() {
  return (
    <m.section
      id="skills-overview"
      className="relative section-padding overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {/* Gradient background - responsive to theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-night-950 dark:via-night-900 dark:to-night-950" />

      {/* Decorative blurs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="container-page relative z-10">
        {/* Section Header */}
        <m.div className="text-center mb-16" variants={fadeInUp}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-6">
            <Sparkles size={14} />
            Stack Tecnológico
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Habilidades que convierten
            <br />
            <span className="bg-gradient-to-r from-accent-600 via-accent-600 to-accent-500 dark:from-accent-400 dark:via-accent-400 dark:to-accent-400 bg-clip-text text-transparent">
              ideas en productos reales
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Combino tecnología moderna con procesos colaborativos para crear experiencias digitales excepcionales.
          </p>
        </m.div>

        {/* Skills Marquee - Full Width with Two Rows */}
        <m.div variants={fadeInUp} className="mb-12">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-gradient-to-r from-accent-500 to-accent-500 rounded-full" />
            Mis Tecnologías
          </h3>
          <div className="space-y-4">
            {/* First row - moves left */}
            <SkillsMarquee speed={35} pauseOnHover={true} reverse={false} />
            {/* Second row - moves right */}
            <SkillsMarquee speed={40} pauseOnHover={true} reverse={true} />
          </div>
        </m.div>

        {/* Workflow Cards - Horizontal Grid */}
        <m.div variants={fadeInUp}>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-gradient-to-r from-accent-500 to-accent-500 rounded-full" />
            Cómo Trabajo
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {workflowHighlights.map((item, index) => (
              <m.div
                key={item.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-5 rounded-xl bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 hover:border-accent-500/50 transition-all duration-300"
              >
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-accent-500 to-accent-500 text-white rounded-md mb-3">
                  {item.tag}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.heading}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {item.body}
                </p>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* CTA */}
        <m.div className="text-center mt-12" variants={fadeInUp}>
          <MotionLink
            to="/skills"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-accent-600 to-accent-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-shadow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver todas las habilidades
            <ArrowRight size={18} />
          </MotionLink>
        </m.div>
      </div>
    </m.section>
  );
}
