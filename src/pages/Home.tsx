import { lazy, Suspense } from "react";
import { m } from "framer-motion";
import HomeHero from "@/components/sections/HomeHero";
import HomeStats from "@/components/sections/HomeStats";
import SkillsOverview from "@/components/sections/SkillsOverview";
import HomeCTA from "@/components/sections/HomeCTA";
import { fadeInUp } from "@/lib/animations";

// Lazy load de componentes below-the-fold para reducir bundle inicial
const AboutSection = lazy(() => import("@/components/sections/AboutSection"));
const CertificadoSection = lazy(() => import("@/components/sections/Certificado"));
const ContactoSection = lazy(() => import("@/components/sections/Contacto"));
const PortafolioSection = lazy(() => import("@/components/sections/Portafolio"));

function SectionFallback({ label }: { label: string }) {
  return (
    <div className="py-20 text-center text-sm text-slate-500 dark:text-slate-400 animate-pulse">
      Cargando {label}...
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HomeHero />

      <HomeStats />

      {/* About Me */}
      <Suspense fallback={<SectionFallback label="sobre mí" />}>
        <AboutSection />
      </Suspense>

      <SkillsOverview />

      <HomeCTA />

      {/* Portfolio */}
      <m.section
        id="portafolio"
        className="section-padding bg-slate-50 dark:bg-night-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <Suspense fallback={<SectionFallback label="proyectos" />}>
          <PortafolioSection />
        </Suspense>
      </m.section>

      {/* Certificados */}
      <m.section
        id="certificados"
        className="section-padding bg-gradient-to-b from-white via-accent-50/30 to-accent-50/30 dark:from-night-950 dark:via-accent-950/10 dark:to-night-950"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <div className="container-page text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-900/30 border border-amber-200/50 dark:border-amber-700/50 text-amber-700 dark:text-amber-300 text-sm font-medium mb-6">
            🏆 Formación Continua
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-600 via-accent-600 to-accent-600 dark:from-amber-400 dark:via-accent-400 dark:to-accent-400 bg-clip-text text-transparent">
            Certificaciones
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400 mt-4">
            Certificaciones que respaldan mi experiencia técnica y compromiso con la excelencia.
          </p>
        </div>
        <Suspense fallback={<SectionFallback label="certificados" />}>
          <CertificadoSection />
        </Suspense>
      </m.section>

      {/* Contacto */}
      <m.section
        id="contacto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <Suspense fallback={<SectionFallback label="contacto" />}>
          <ContactoSection />
        </Suspense>
      </m.section>
    </>
  );
}
