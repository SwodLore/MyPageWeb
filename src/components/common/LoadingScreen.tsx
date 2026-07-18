import { useEffect } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// Intro loader "Ale Poves" — el nombre se dibuja trazo a trazo:
//   1. La retícula de construcción se traza (pathLength, tenue).
//   2. Cada letra monolínea se dibuja en secuencia, como a mano.
//   3. La bolita blanca cae, rebota y firma como punto final.
//   4. El logo viaja al Header (layoutId "brand-mark" compartido).
// Corre en CADA entrada al sitio — pausa intencional (~3.5s),
// parte de la identidad. Siempre oscuro (se renderiza antes de
// conocer el tema del usuario).
// ═══════════════════════════════════════════════════════════════

const INTRO_MS = 3500;
const INTRO_REDUCED_MS = 900;

/* Cada letra: trazo monolínea + tono de la familia accent + momento
   en que empieza a dibujarse. Baseline y=110, altura-x y=58, cap y=20. */
const GLYPHS = [
  // A
  { d: "M20 110 L46 20 L72 110 M31 78 L61 78", color: "var(--color-accent-600)", delay: 0.35, dur: 0.5 },
  // l
  { d: "M88 20 L88 110", color: "var(--color-accent-400)", delay: 0.7, dur: 0.3 },
  // e
  { d: "M106 90 H146 A20 20 0 1 0 140 107", color: "var(--color-accent-500)", delay: 0.95, dur: 0.5 },
  // P
  { d: "M196 110 L196 20 H214 A24 24 0 0 1 214 68 H196", color: "var(--color-accent-600)", delay: 1.4, dur: 0.55 },
  // o
  { d: "M288 84 A26 26 0 1 0 236 84 A26 26 0 1 0 288 84", color: "var(--color-accent-400)", delay: 1.85, dur: 0.5 },
  // v
  { d: "M310 58 L328 110 L346 58", color: "var(--color-accent-500)", delay: 2.2, dur: 0.4 },
  // e
  { d: "M364 90 H404 A20 20 0 1 0 398 107", color: "var(--color-accent-600)", delay: 2.5, dur: 0.45 },
  // s
  { d: "M446 64 C446 54 414 54 414 68 C414 82 446 78 446 92 C446 106 412 106 412 96", color: "var(--color-accent-400)", delay: 2.8, dur: 0.45 },
] as const;

/* ── El logotipo — "Ale Poves" dibujado, colores del sistema ── */
function WordMark({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 520 140"
      className="w-[19rem] sm:w-96 md:w-[30rem]"
      role="img"
      aria-label="Ale Poves"
    >
      {/* ── Retícula de construcción — se traza y luego se va ── */}
      {!reduced && (
        <m.g
          stroke="var(--color-accent-300)"
          strokeWidth="1"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.13, 0.13, 0] }}
          transition={{ duration: 3.2, times: [0, 0.1, 0.82, 1] }}
        >
          {[20, 126, 196, 262, 346, 446].map((x, i) => (
            <m.line
              key={`v${x}`}
              x1={x} y1={8} x2={x} y2={128}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            />
          ))}
          {[20, 58, 110].map((y, i) => (
            <m.line
              key={`h${y}`}
              x1={8} y1={y} x2={512} y2={y}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.05 }}
            />
          ))}
          {[{ cx: 126, cy: 90, r: 26 }, { cx: 262, cy: 84, r: 32 }].map((c, i) => (
            <m.circle
              key={`c${c.cx}`}
              cx={c.cx} cy={c.cy} r={c.r}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            />
          ))}
        </m.g>
      )}

      {/* ── Las letras se dibujan en secuencia, como a mano ── */}
      <g fill="none" strokeWidth={12} strokeLinecap="round" strokeLinejoin="round">
        {GLYPHS.map((glyph, i) =>
          reduced ? (
            <path key={i} d={glyph.d} stroke={glyph.color} />
          ) : (
            <m.path
              key={i}
              d={glyph.d}
              stroke={glyph.color}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: glyph.dur, delay: glyph.delay, ease: "easeInOut" },
                opacity: { duration: 0.01, delay: glyph.delay },
              }}
            />
          )
        )}
      </g>

      {/* ── La bolita blanca: cae, rebota dos veces y es el punto final ── */}
      {reduced ? (
        <circle cx={484} cy={98} r={12} fill="#fff" />
      ) : (
        <m.g
          initial={{ y: -160, opacity: 0 }}
          animate={{ y: [-160, 0, -46, 0, -14, 0], opacity: 1 }}
          transition={{
            delay: 3.0,
            duration: 0.66,
            times: [0, 0.34, 0.55, 0.74, 0.88, 1],
            ease: ["easeIn", "easeOut", "easeIn", "easeOut", "easeIn"],
            opacity: { duration: 0.1, delay: 3.0 },
          }}
        >
          <circle cx={484} cy={98} r={12} fill="#fff" />
        </m.g>
      )}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// LoadingScreen — coordinado por AppLayout para el morph al Header
// ═══════════════════════════════════════════════════════════════

interface LoadingScreenProps {
  done: boolean;
  onFinish: () => void;
}

export default function LoadingScreen({ done, onFinish }: LoadingScreenProps) {
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    if (done) return;
    const t = setTimeout(onFinish, reduced ? INTRO_REDUCED_MS : INTRO_MS);
    return () => clearTimeout(t);
  }, [done, onFinish, reduced]);

  return (
    <>
      {/* Telón de fondo — se desvanece al terminar */}
      <AnimatePresence>
        {!done && (
          <m.div
            className="fixed inset-0 z-[300] bg-night-950 select-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Firma — aparece cuando el nombre ya está escrito */}
            <m.p
              className="absolute bottom-14 left-1/2 -translate-x-1/2 text-slate-500 text-sm tracking-[0.25em] lowercase"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0.1 : 3.05, duration: 0.4 }}
            >
              full stack developer
            </m.p>
          </m.div>
        )}
      </AnimatePresence>

      {/* El logo vive FUERA del telón: al desmontarse aquí, reaparece
          en el Header vía layoutId y framer anima el viaje. */}
      {!done && (
        <div className="fixed inset-0 z-[301] grid place-items-center pointer-events-none px-6">
          <m.div
            layoutId="brand-mark"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <WordMark reduced={reduced} />
          </m.div>
        </div>
      )}
    </>
  );
}
