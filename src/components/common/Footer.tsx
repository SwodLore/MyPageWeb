import { m } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  Github, Mail, MapPin,
  ArrowUp, Clock, Briefcase, Sparkles, ExternalLink,
} from "lucide-react";
import { personal } from "@/data/personal";
import { SECTION_NAV, SOCIAL_LINKS } from "@/data/navigation";
import BrandMark from "./BrandMark";

// ═══════════════════════════════════════════════════════════════
// Presentación local — clases hover por red social
// ═══════════════════════════════════════════════════════════════

const SOCIAL_HOVER: Record<string, string> = {
  LinkedIn: "hover:bg-accent-50 hover:text-accent-600 hover:border-accent-200 dark:hover:bg-accent-900/20 dark:hover:text-accent-400 dark:hover:border-accent-700/50",
  GitHub: "hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 dark:hover:bg-slate-700 dark:hover:text-white dark:hover:border-slate-600",
  Instagram: "hover:bg-accent-50 hover:text-accent-600 hover:border-accent-200 dark:hover:bg-accent-900/20 dark:hover:text-accent-400 dark:hover:border-accent-700/50",
};

const SOCIAL = SOCIAL_LINKS.map((link) => ({
  ...link,
  color: SOCIAL_HOVER[link.name] ?? "",
}));

const STATUS_ITEMS = [
  { icon: MapPin,    label: "Ubicación",    value: personal.location },
  { icon: Clock,     label: "Zona horaria", value: "UTC−5 (Perú)" },
  { icon: Briefcase, label: "Modalidad",    value: "Remoto / Híbrido" },
];

// ═══════════════════════════════════════════════════════════════
// Footer
// ═══════════════════════════════════════════════════════════════

export default function Footer() {
  const lenis = useLenis();
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) lenis?.scrollTo(el, { offset: -80, duration: 1.4 });
  };

  const scrollToTop = () => lenis?.scrollTo(0, { duration: 1.6 });

  return (
    <footer className="relative border-t border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-b from-slate-100 to-slate-50 dark:from-night-900 dark:to-night-950">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent" />

      {/* ── CTA block ──────────────────────────────────────────── */}
      <div className="container-page pt-16 pb-12">
        <m.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-600 via-accent-700 to-accent-600 p-8 md:p-10 text-white"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background decoration */}
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-8 -bottom-8 h-36 w-36 rounded-full bg-accent-400/20 blur-2xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-accent-200">{personal.availableText}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">¿Tienes un proyecto en mente?</h3>
              <p className="mt-1.5 text-accent-200 max-w-md">
                Cuéntame tu idea — construyamos algo que valga la pena.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <m.button
                onClick={() => scrollTo("contacto")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-accent-700 font-semibold text-sm hover:bg-accent-50 transition-colors shadow-md cursor-pointer"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <Sparkles size={15} />
                Hablemos
              </m.button>
              <m.a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <Github size={15} />
                GitHub
                <ExternalLink size={12} className="opacity-60" />
              </m.a>
            </div>
          </div>
        </m.div>
      </div>

      {/* ── Main grid ──────────────────────────────────────────── */}
      <div className="container-page pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <m.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <BrandMark className="h-11 w-auto" />
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {personal.fullName}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{personal.title}</p>
              </div>
            </m.div>

            <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {personal.bioshort}
            </p>

            {/* Social */}
            <div className="flex gap-2">
              {SOCIAL.map(({ name, href, icon: Icon, color }) => (
                <m.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all ${color}`}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                >
                  <Icon size={16} />
                </m.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Navegación
            </h4>
            <nav className="flex flex-col gap-1.5">
              {SECTION_NAV.map((item) => (
                <m.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-fit text-sm text-slate-500 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors cursor-pointer text-left"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {item.label}
                </m.button>
              ))}
            </nav>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Estado
            </h4>
            <div className="space-y-3">
              {/* Availability pill */}
              {personal.available && (
                <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/60 dark:border-emerald-700/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  {personal.availableText}
                </div>
              )}

              {STATUS_ITEMS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                  <Icon size={14} className="mt-0.5 shrink-0 text-slate-400 dark:text-slate-500" />
                  <div>
                    <span className="block text-xs text-slate-400 dark:text-slate-500">{label}</span>
                    <span>{value}</span>
                  </div>
                </div>
              ))}

              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                <Mail size={14} className="shrink-0" />
                {personal.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="container-page pb-8">
        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {currentYear} {personal.fullName} · Construido con React, TypeScript & Framer Motion
          </p>
          <m.button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors cursor-pointer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Volver arriba
            <ArrowUp size={13} />
          </m.button>
        </div>
      </div>
    </footer>
  );
}
