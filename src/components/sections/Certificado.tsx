import { useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Building, Calendar, ExternalLink, Folder, FolderOpen, User } from "lucide-react";
import { certificados } from "@/data/certificados";
import type { Certificate } from "@/types";
import { EASE_OUT } from "@/lib/animations";

// ═══════════════════════════════════════════════════════════════
// Finder de certificados — una ventana macOS con sidebar de
// categorías, los certificados como "archivos" (icono = logo real
// de la institución) y un panel de detalles al seleccionar.
// Siempre oscura, como toda ventana del sitio.
// ═══════════════════════════════════════════════════════════════

/* Logos claros (blancos) necesitan tile oscuro para no desaparecer */
const LIGHT_LOGOS = /udemy/i;

function tileClassFor(cert: Certificate) {
  return LIGHT_LOGOS.test(cert.institution)
    ? "bg-night-800 ring-1 ring-night-600"
    : "bg-white";
}

/* Categoría derivada del nombre — solo para agrupar en el sidebar */
function categoryFor(cert: Certificate): string {
  const n = cert.name.toLowerCase();
  if (/hack|ciber|segur|pentest|security/.test(n)) return "Ciberseguridad";
  if (/cisco|ccna|red(es)?\b|network|ip\b/.test(n)) return "Redes";
  if (/react|typescript|javascript|web|front|laravel|php|css|html/.test(n)) return "Web";
  if (/java\b|python|backend|nest|api|sql/.test(n)) return "Backend";
  return "Otros";
}

export default function Certificado() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selected, setSelected] = useState<Certificate | null>(null);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const cert of certificados) {
      const cat = categoryFor(cert);
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
    return [["Todos", certificados.length] as const, ...counts.entries()];
  }, []);

  const visible =
    activeCategory === "Todos"
      ? certificados
      : certificados.filter((c) => categoryFor(c) === activeCategory);

  const selectCategory = (cat: string) => {
    setActiveCategory(cat);
    setSelected(null);
  };

  return (
    <div className="container-page">
      <m.div
        className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-night-700 bg-night-900 shadow-2xl shadow-accent-500/10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        {/* ── Barra de título ─────────────────────────────────── */}
        <div className="relative flex items-center border-b border-night-700 bg-night-950/70 px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </span>
          <span className="absolute left-1/2 -translate-x-1/2 font-mono text-xs text-slate-500 select-none">
            ~/certificados
          </span>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* ── Sidebar (md+) / chips (móvil) ─────────────────── */}
          <nav
            className="flex gap-1.5 overflow-x-auto border-b border-night-700 bg-night-950/40 p-3 md:w-48 md:shrink-0 md:flex-col md:gap-1 md:border-b-0 md:border-r md:p-4"
            aria-label="Categorías de certificados"
          >
            {categories.map(([cat, count]) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => selectCategory(cat)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors cursor-pointer ${
                    active
                      ? "bg-accent-600 text-white"
                      : "text-slate-400 hover:bg-night-800 hover:text-white"
                  }`}
                >
                  {active ? <FolderOpen size={14} /> : <Folder size={14} />}
                  <span className="whitespace-nowrap">{cat}</span>
                  <span className={`ml-auto font-mono text-[10px] ${active ? "text-white/70" : "text-slate-600"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* ── Grilla de "archivos" ──────────────────────────── */}
          <div className="min-h-[280px] flex-1 p-4 md:p-5">
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {visible.map((cert, i) => {
                  const isSelected = selected?.name === cert.name;
                  return (
                    <m.button
                      key={cert.name}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25, delay: i * 0.03 }}
                      onClick={() => setSelected(isSelected ? null : cert)}
                      aria-pressed={isSelected}
                      className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors ${
                        isSelected
                          ? "bg-accent-500/15 ring-2 ring-accent-500"
                          : "hover:bg-night-800/70"
                      }`}
                    >
                      {/* Icono del archivo = logo real de la institución */}
                      <span className={`grid h-14 w-14 place-items-center rounded-xl p-2 shadow-md ${tileClassFor(cert)}`}>
                        <img
                          src={cert.imgInstitution}
                          alt={cert.institution}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      </span>
                      <span className="line-clamp-2 text-xs font-medium leading-snug text-slate-200">
                        {cert.name}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">.pdf</span>
                    </m.button>
                  );
                })}
              </div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Barra de estado / panel de detalles ─────────────── */}
        <div className="min-h-[72px] border-t border-night-700 bg-night-950/70 px-4 py-3 md:px-5">
          <AnimatePresence mode="wait">
            {selected ? (
              <m.div
                key={selected.name}
                className="flex flex-wrap items-center gap-x-5 gap-y-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">{selected.name}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Building size={11} className="text-accent-400" />
                      {selected.institution}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User size={11} className="text-accent-400" />
                      {selected.teacher}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={11} className="text-accent-400" />
                      {selected.dateCertificate}
                    </span>
                  </p>
                </div>
                <a
                  href={selected.urlCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-accent-500"
                >
                  <ExternalLink size={13} />
                  Ver certificado
                </a>
              </m.div>
            ) : (
              <m.p
                key="status"
                className="py-2 font-mono text-xs text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {visible.length} {visible.length === 1 ? "elemento" : "elementos"} · selecciona un
                certificado para ver sus detalles
              </m.p>
            )}
          </AnimatePresence>
        </div>
      </m.div>
    </div>
  );
}
