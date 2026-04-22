import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  Building,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  User,
} from "lucide-react";
import { certificados } from "../data/certificados";
import { GlowButton } from "./ui";

// ═══════════════════════════════════════════════════════════════
// Category color resolver
// ═══════════════════════════════════════════════════════════════

type CertColor = {
  gradient: string;
  medalFrom: string;
  medalTo: string;
  badge: string;
};

function getCertColor(name: string): CertColor {
  const n = name.toLowerCase();

  if (
    n.includes("hack") ||
    n.includes("ciber") ||
    n.includes("security") ||
    n.includes("segur") ||
    n.includes("pentest")
  )
    return {
      gradient: "from-red-500 to-orange-500",
      medalFrom: "#ef4444",
      medalTo: "#f97316",
      badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    };

  if (n.includes("react") || n.includes("typescript") || n.includes("web"))
    return {
      gradient: "from-blue-500 to-cyan-500",
      medalFrom: "#3b82f6",
      medalTo: "#06b6d4",
      badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    };

  if (n.includes("laravel") || n.includes("php"))
    return {
      gradient: "from-rose-500 to-pink-500",
      medalFrom: "#f43f5e",
      medalTo: "#ec4899",
      badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    };

  if (
    n.includes("cisco") ||
    n.includes("network") ||
    n.includes("ccna") ||
    n.includes("ip")
  )
    return {
      gradient: "from-emerald-500 to-teal-500",
      medalFrom: "#10b981",
      medalTo: "#14b8a6",
      badge:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    };

  if (n.includes("java") || n.includes("python") || n.includes("backend"))
    return {
      gradient: "from-amber-500 to-yellow-500",
      medalFrom: "#f59e0b",
      medalTo: "#eab308",
      badge:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    };

  return {
    gradient: "from-violet-500 to-purple-500",
    medalFrom: "#8b5cf6",
    medalTo: "#a855f7",
    badge:
      "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  };
}

// ═══════════════════════════════════════════════════════════════
// Flip Card
// ═══════════════════════════════════════════════════════════════

interface Certificate {
  name: string;
  teacher: string;
  institution: string;
  imgInstitution: string;
  urlCertificate: string;
  dateCertificate: string;
}

interface CertificateCardProps {
  cert: Certificate;
  index: number;
}

function CertificateCard({ cert, index }: CertificateCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [flipped, setFlipped] = useState(false);
  const colors = getCertColor(cert.name);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: (index % 6) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => setFlipped((f) => !f)}
      style={{ perspective: "1200px" }}
      className="h-[280px] cursor-pointer select-none"
      aria-label={`Certificado: ${cert.name} — clic para voltear`}
    >
      {/* Inner wrapper — rotates */}
      <div
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* ── FRONT ─────────────────────────────────────────── */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 shadow-lg overflow-hidden"
        >
          {/* Header gradient */}
          <div
            className={`relative h-[88px] bg-gradient-to-br ${colors.gradient} flex-shrink-0 overflow-hidden`}
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-2 left-3 w-14 h-14 border border-white/50 rounded-full" />
              <div className="absolute bottom-0 right-3 w-20 h-20 border border-white/30 rounded-full" />
            </div>

            {/* Medal — bottom-centered, overflow onto content */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
              <div
                className="w-14 h-14 rounded-full border-[3px] border-white dark:border-slate-900 shadow-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.medalFrom}, ${colors.medalTo})`,
                }}
              >
                <Award size={22} className="text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col items-center gap-2 pt-10 px-4 pb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white text-center leading-snug line-clamp-2">
              {cert.name}
            </h3>

            <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Building size={11} className="flex-shrink-0" />
              <span className="truncate max-w-[160px]">{cert.institution}</span>
            </span>

            <span
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${colors.badge}`}
            >
              Verificado
            </span>

            <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-auto">
              Toca para ver detalles
            </p>
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────────────── */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 flex flex-col rounded-2xl border border-slate-700/60 bg-slate-900 shadow-lg overflow-hidden p-5 gap-4"
        >
          {/* Top: gradient strip + title */}
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${colors.medalFrom}, ${colors.medalTo})`,
              }}
            >
              <Award size={18} className="text-white" />
            </div>
            <p className="text-xs font-bold text-white leading-snug line-clamp-3 flex-1">
              {cert.name}
            </p>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2.5">
            <div className="flex items-center gap-2 text-xs">
              <Building size={12} className="text-blue-400 flex-shrink-0" />
              <span className="text-slate-200 font-medium truncate">
                {cert.institution}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <User size={12} className="text-violet-400 flex-shrink-0" />
              <span className="text-slate-400 truncate">{cert.teacher}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Calendar size={12} className="text-slate-500 flex-shrink-0" />
              <span className="text-slate-500">{cert.dateCertificate}</span>
            </div>
          </div>

          {/* Link — stops propagation so clicking doesn't flip back */}
          <a
            href={cert.urlCertificate}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-white text-xs font-bold shadow-lg hover:opacity-90 transition-opacity"
            style={{
              background: `linear-gradient(90deg, ${colors.medalFrom}, ${colors.medalTo})`,
            }}
          >
            <ExternalLink size={13} />
            Ver Certificado
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════

const INITIAL_COUNT = 6;
const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Certificado() {
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll
    ? certificados
    : certificados.slice(0, INITIAL_COUNT);
  const hasMore = certificados.length > INITIAL_COUNT;

  return (
    <div className="container-apple flex flex-col gap-12 md:gap-16">

      {/* Hint */}
      <motion.p
        className="text-center text-sm text-slate-400 dark:text-slate-500 -mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Toca o pasa el cursor sobre una card para ver los detalles
      </motion.p>

      {/* Grid */}
      <div className="grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((cert: Certificate, index: number) => (
          <CertificateCard key={cert.name} cert={cert} index={index} />
        ))}
      </div>

      {/* Expand / collapse */}
      {hasMore && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <GlowButton onClick={() => setShowAll(!showAll)} variant="primary">
            {showAll ? (
              <>
                Ver menos certificados
                <ChevronUp size={18} />
              </>
            ) : (
              <>
                Ver todos ({certificados.length})
                <ChevronDown size={18} />
              </>
            )}
          </GlowButton>
        </motion.div>
      )}

      {/* Stats banner */}
      <motion.div
        className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 p-8 md:p-10 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easing }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Award size={28} />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Competencias Certificadas
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            <span className="font-bold text-white">{certificados.length}</span>{" "}
            certificaciones que avalan mi experiencia en desarrollo web,
            ciberseguridad, redes y metodologías modernas.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
