import { m } from "framer-motion";
import { AnimatedCounter } from "@/components/ui";
import { PromptLine } from "@/components/ui/TerminalPrompt";
import { TERMINAL_COLORS } from "@/lib/terminalTheme";
import { EASE_OUT } from "@/lib/animations";

/* Stats como salida de terminal — continúa la mini-ventana del hero.
   Siempre oscura (una terminal no tiene modo claro), igual que el
   loader y el modal. El prompt segmentado es la cita visual del
   powerlevel10k real del usuario (ver terminal.png): rosa=usuario,
   naranja=ruta, amarillo=rama git, lavanda=hora — colores literales
   de su terminal, fuera de la paleta igual que los semáforos macOS. */

const STATS = [
  { label: "proyectos", value: 30, prefix: "+", bar: 0.9, desc: "aplicaciones web y APIs" },
  { label: "certificaciones", value: 8, prefix: "", bar: 0.55, desc: "React, Laravel y más" },
  { label: "tecnologías", value: 20, prefix: "+", bar: 0.75, desc: "stack full stack moderno" },
] as const;

export default function HomeStats() {
  return (
    <section id="stats-section" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-100 to-slate-200 dark:from-night-900 dark:via-night-900 dark:to-night-950" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="container-page relative z-10">
        <m.div
          className="mx-auto max-w-2xl rounded-2xl border border-night-700 bg-night-950 shadow-2xl shadow-accent-500/10 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {/* ── Barra de título macOS ─────────────────────────── */}
          <div className="relative flex items-center px-4 py-3 bg-night-900 border-b border-night-700">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </span>
            <span className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-slate-500 select-none">
              …/Project/portfolio
            </span>
          </div>

          {/* ── Cuerpo de la terminal ─────────────────────────── */}
          <div className="p-6 md:p-8 font-mono text-sm">
            <PromptLine path="~/portfolio">
              <span className="text-slate-300">ale --stats</span>
            </PromptLine>

            <div className="mt-6 space-y-6">
              {STATS.map((stat, i) => (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.18, ease: EASE_OUT }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-slate-400">
                      <span className="text-accent-500 select-none">› </span>
                      {stat.label}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                      <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix="" />
                    </span>
                  </div>

                  {/* Barra de progreso */}
                  <div className="mt-2 h-1.5 rounded-full bg-night-700 overflow-hidden">
                    <m.div
                      className="h-full rounded-full bg-accent-500 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: stat.bar }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.18, ease: EASE_OUT }}
                    />
                  </div>

                  <p className="mt-1.5 text-xs text-slate-500">{stat.desc}</p>
                </m.div>
              ))}
            </div>

            {/* Prompt final con rama git y cursor vivo */}
            <div className="mt-7">
              <PromptLine path="…/portfolio" branch="main">
                <span
                  className="inline-block h-4 w-2 translate-y-0.5 animate-pulse"
                  style={{ backgroundColor: TERMINAL_COLORS.prompt }}
                  aria-hidden="true"
                />
              </PromptLine>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
