import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ChevronDown, ChevronUp, ExternalLink, Building, User } from "lucide-react";
import { certificados } from "../data/certificados";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easing },
  },
};

interface Certificate {
  name: string;
  teacher: string;
  institution: string;
  imgInstitution: string;
  urlCertificate: string;
  dateCertificate: string;
}

export default function Certificado() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = (source: MediaQueryList | MediaQueryListEvent) => {
      setIsMobile(Boolean(source.matches));
    };

    updateIsMobile(mediaQuery);

    const listener = (event: MediaQueryListEvent) => updateIsMobile(event);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", listener);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(listener);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", listener);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  const baseCount = isMobile ? 2 : 6;
  const displayed = showAll ? certificados : certificados.slice(0, baseCount);
  const hasMore = certificados.length > baseCount;

  const ToggleButton = ({ className = "" }: { className?: string }) => (
    <motion.button
      onClick={() => setShowAll((prev) => !prev)}
      className={`inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:shadow-2xl ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {showAll ? (
        <>
          Ver menos
          <ChevronUp size={20} />
        </>
      ) : (
        <>
          Ver todos ({certificados.length})
          <ChevronDown size={20} />
        </>
      )}
    </motion.button>
  );

  return (
    <motion.div
      className="container-apple flex flex-col gap-16 lg:gap-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } } }}
    >
      <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" variants={gridVariants}>
        {displayed.map((cert: Certificate) => (
          <motion.div
            key={cert.name}
            className="group rounded-3xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            variants={cardVariants}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-600">
              <div className="flex h-full w-full items-center justify-center">
                <div className="rounded-2xl border border-blue-200 bg-white px-6 py-4 text-center shadow-md dark:border-blue-800/50 dark:bg-slate-900/70">
                  <Award size={32} className="mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">Certificado</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-6">
              <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-300">
                {cert.name}
              </h3>
              <div className="space-y-3 text-sm text-slate-500 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <Building size={16} className="text-blue-500 dark:text-blue-400" />
                  <span className="font-medium">{cert.institution}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User size={16} className="text-purple-500 dark:text-purple-300" />
                  <span>{cert.teacher}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-slate-500 dark:text-slate-300" />
                  <span>{cert.dateCertificate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                  Verificado
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                  Certificacion
                </span>
              </div>

              <a
                href={cert.urlCertificate}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <ExternalLink size={14} />
                Ver certificado
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {hasMore && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: easing }}
        >
          <ToggleButton className="w-full justify-center" />
        </motion.div>
      )}

      {hasMore && (
        <motion.div
          className="hidden text-center md:block"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: easing }}
        >
          <ToggleButton />
        </motion.div>
      )}

      <motion.div
        className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-12 text-center shadow-2xl dark:border-blue-500/30"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: easing }}
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-white">
          <h3 className="text-2xl md:text-3xl font-semibold">Competencias certificadas</h3>
          <p className="text-blue-50 text-lg">
            {certificados.length} certificaciones que avalan mi experiencia en desarrollo web, seguridad, redes y metodologias modernas.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
