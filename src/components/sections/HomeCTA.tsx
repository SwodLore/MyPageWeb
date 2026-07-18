import { useCallback } from "react";
import { useLenis } from "lenis/react";
import { ArrowRight, Download } from "lucide-react";
import { GlassCard, GlowButton } from "@/components/ui";
import { triggerSimpleConfetti } from "@/lib/confetti";

export default function HomeCTA() {
  const lenis = useLenis();

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) lenis?.scrollTo(el, { offset: -80, duration: 1.4 });
  }, [lenis]);

  return (
    <section className="py-16">
      <div className="container-page">
        <GlassCard className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
          <div className="text-center md:text-left">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
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
