import { m } from "framer-motion";
import { Sparkles, Award, Zap } from "lucide-react";
import { AnimatedCounter, TiltCard } from "@/components/ui";
import { EASE_OUT } from "@/lib/animations";

const highlightCards = [
  {
    value: 30,
    prefix: "+",
    suffix: "",
    label: "Proyectos",
    description: "Aplicaciones web y APIs",
    Icon: Sparkles,
    gradient: "from-accent-600 via-accent-500 to-accent-400",
    shadowColor: "shadow-accent-500/20",
    borderColor: "border-accent-500/20",
  },
  {
    value: 8,
    prefix: "",
    suffix: "",
    label: "Certificaciones",
    description: "React, Laravel y más",
    Icon: Award,
    gradient: "from-accent-600 via-accent-500 to-accent-400",
    shadowColor: "shadow-accent-500/20",
    borderColor: "border-accent-500/20",
  },
  {
    value: 20,
    prefix: "+",
    suffix: "",
    label: "Tecnologías",
    description: "Stack moderno full stack",
    Icon: Zap,
    gradient: "from-accent-600 via-accent-500 to-accent-400",
    shadowColor: "shadow-accent-500/20",
    borderColor: "border-accent-500/20",
  },
];

export default function HomeStats() {
  return (
    <section id="stats-section" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200 dark:from-night-900 dark:via-night-900 dark:to-night-950" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="container-page relative z-10">
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {highlightCards.map((card, index) => (
            <m.div
              key={card.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: EASE_OUT }}
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
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
