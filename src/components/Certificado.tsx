import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Calendar, ChevronDown, ChevronUp, ExternalLink, Building, User, BadgeCheck } from "lucide-react";
import { certificados } from "../data/certificados";
import { GlowButton } from "./ui";
import { TiltCard } from "./ui/TiltCard";

// ═══════════════════════════════════════════════════════════════
// Animation Variants
// ═══════════════════════════════════════════════════════════════

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};



// ═══════════════════════════════════════════════════════════════
// 3D Tilt Card Component
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
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Category color based on certificate name
  const getCategoryColor = () => {
    if (cert.name.toLowerCase().includes("hack") || cert.name.toLowerCase().includes("ciber") || cert.name.toLowerCase().includes("security")) {
      return { bg: "from-red-500 to-orange-500", badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" };
    }
    if (cert.name.toLowerCase().includes("react") || cert.name.toLowerCase().includes("typescript") || cert.name.toLowerCase().includes("web")) {
      return { bg: "from-blue-500 to-cyan-500", badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" };
    }
    if (cert.name.toLowerCase().includes("laravel") || cert.name.toLowerCase().includes("php")) {
      return { bg: "from-rose-500 to-pink-500", badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" };
    }
    if (cert.name.toLowerCase().includes("cisco") || cert.name.toLowerCase().includes("network") || cert.name.toLowerCase().includes("ip")) {
      return { bg: "from-emerald-500 to-teal-500", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" };
    }
    return { bg: "from-violet-500 to-purple-500", badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" };
  };

  const categoryColor = getCategoryColor();

  return (
    <TiltCard className="h-full">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: easing }}
        className="relative h-full overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-xl transition-shadow duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
      >
        {/* Header with Gradient */}
        <div className="relative h-24">
          {/* Background & Shapes Wrapper (Clipped) */}
          <div className={`absolute inset-0 bg-gradient-to-br ${categoryColor.bg} overflow-hidden`}>
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 left-2 w-16 h-16 border border-white/30 rounded-full" />
              <div className="absolute bottom-2 right-2 w-24 h-24 border border-white/20 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full" />
            </div>
          </div>

          {/* Medal Icon (Unclipped) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 filter drop-shadow-xl z-20 group-hover:scale-110 transition-transform duration-300">
            <svg width="68" height="68" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
              {/* Ribbon */}
              <path d="M16 4L16 28L32 16L48 28V4H16Z" fill="#3B82F6" className="dark:fill-blue-600" />
              <path d="M16 4H48V8H16V4Z" fill="#2563EB" className="dark:fill-blue-500" />

              {/* Medal Circle Background */}
              <circle cx="32" cy="42" r="18" fill="url(#medal_gradient)" stroke="white" strokeWidth="2" className="dark:stroke-slate-700" />

              {/* Medal Shine */}
              <circle cx="32" cy="42" r="14" stroke="white" strokeOpacity="0.3" strokeWidth="1" />

              {/* Star Icon in Medal */}
              <path d="M32 32L34.3511 36.7639L39.6085 37.5279L35.8042 41.2361L36.7023 46.4721L32 44L27.2977 46.4721L28.1958 41.2361L24.3915 37.5279L29.6489 36.7639L32 32Z" fill="white" className="dark:fill-slate-100" />

              {/* Gradients */}
              <defs>
                <linearGradient id="medal_gradient" x1="14" y1="24" x2="50" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="pt-12 p-6 space-y-4">
          {/* Title */}
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white text-center leading-snug line-clamp-2 min-h-[2.5rem] transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {cert.name}
          </h3>

          {/* Details */}
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <Building size={15} className="flex-shrink-0 text-blue-500" />
              <span className="truncate font-medium">{cert.institution}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <User size={15} className="flex-shrink-0 text-violet-500" />
              <span className="truncate">{cert.teacher}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <Calendar size={15} className="flex-shrink-0 text-slate-400" />
              <span>{cert.dateCertificate}</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${categoryColor.badge}`}>
              <BadgeCheck size={12} />
              Verificado
            </span>
          </div>

          {/* Action Button */}
          <motion.a
            href={cert.urlCertificate}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow-lg overflow-hidden transition-all hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s linear infinite",
              }}
            />
            <ExternalLink size={14} />
            Ver Certificado
          </motion.a>
        </div>
      </motion.div>
    </TiltCard>
  );
}

// ═══════════════════════════════════════════════════════════════
// Main Certificates Component
// ═══════════════════════════════════════════════════════════════

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
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", listener);
      }
    };
  }, []);

  const baseCount = isMobile ? 3 : 6;
  const displayed = showAll ? certificados : certificados.slice(0, baseCount);
  const hasMore = certificados.length > baseCount;

  return (
    <motion.div
      className="container-apple flex flex-col gap-12 md:gap-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={gridVariants}
    >
      {/* Certificates Grid */}
      <motion.div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" variants={gridVariants}>
        {displayed.map((cert: Certificate, index: number) => (
          <CertificateCard key={cert.name} cert={cert} index={index} />
        ))}
      </motion.div>

      {/* Toggle Button */}
      {hasMore && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
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

      {/* Stats Banner */}
      <motion.div
        className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 p-8 md:p-10 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: easing }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative text-center text-white">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Award size={32} />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Competencias Certificadas
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            <span className="font-bold text-white">{certificados.length}</span> certificaciones que avalan mi experiencia en desarrollo web, ciberseguridad, redes y metodologías modernas.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
