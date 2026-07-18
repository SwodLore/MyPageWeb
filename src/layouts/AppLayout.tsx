import { useEffect } from "react";
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
    lenis?.scrollTo(0, { immediate: true });
  }, [location.pathname, lenis]);

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
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {/* Loading screen — fixed overlay, always on top */}
      <LoadingScreen />

      {/* Scroll-to-top on route change */}
      <ScrollReset />

      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <ScrollProgress />
        <Header />

        <main className="pt-16">
          <PageContent />
        </main>

        <Analytics />
        <Footer />
      </div>
    </ReactLenis>
  );
}
