import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { ReactLenis, useLenis } from "lenis/react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ScrollProgress } from "@/components/ui";
import LoadingScreen from "@/components/common/LoadingScreen";

// ═══════════════════════════════════════════════════════════════
// Lenis options
// ═══════════════════════════════════════════════════════════════

const LENIS_OPTIONS = {
  duration: 0.9,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.5,
};

// ═══════════════════════════════════════════════════════════════
// ScrollReset — must be inside <ReactLenis> to use useLenis()
// ═══════════════════════════════════════════════════════════════

function ScrollReset() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Si venimos de otra ruta con un destino (Header/Footer),
    // esperamos un tick a que la home monte y scrolleamos ahí.
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target && location.pathname === "/") {
      const t = setTimeout(() => {
        const el = document.getElementById(target);
        if (el) lenis?.scrollTo(el, { offset: -80, duration: 1.4 });
      }, 150);
      return () => clearTimeout(t);
    }
    lenis?.scrollTo(0, { immediate: true });
  }, [location.pathname, location.state, lenis]);

  return null;
}

// ═══════════════════════════════════════════════════════════════
// PageContent — AnimatePresence keyed by pathname
// ═══════════════════════════════════════════════════════════════

function PageContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      >
        <Outlet />
      </m.div>
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════
// AppLayout
// ═══════════════════════════════════════════════════════════════

export default function AppLayout() {
  // El intro corre en cada entrada al sitio (pausa intencional).
  // Cuando termina, su logo "viaja" al Header vía layoutId compartido.
  const [introDone, setIntroDone] = useState(false);
  const finishIntro = useCallback(() => setIntroDone(true), []);

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {/* Loading screen — fixed overlay, always on top */}
      <LoadingScreen done={introDone} onFinish={finishIntro} />

      {/* Scroll-to-top on route change */}
      <ScrollReset />

      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased transition-colors duration-300 dark:bg-night-950 dark:text-slate-100">
        <ScrollProgress />
        <Header brandReady={introDone} />

        <main className="pt-16">
          {/* Entrada tipo Canva: al caer el telón del intro, el contenido
              se asienta subiendo. Solo transform (sin opacity) para que
              el LCP se pinte detrás del telón y no se penalice. */}
          <m.div
            initial={{ y: 32 }}
            animate={introDone ? { y: 0 } : { y: 32 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <PageContent />
          </m.div>
        </main>

        <Analytics />
        <Footer />
      </div>
    </ReactLenis>
  );
}
