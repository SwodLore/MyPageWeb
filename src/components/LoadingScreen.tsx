import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// Initial loading screen — shown for DISPLAY_MS, then fades out.
// Always dark regardless of user theme (renders before theme loads).
// ═══════════════════════════════════════════════════════════════

const DISPLAY_MS = 1300;

export default function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), DISPLAY_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-slate-950 select-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo + name */}
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo mark */}
            <div className="relative">
              {/* Ambient glow */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 opacity-25 blur-xl" />
              {/* Logo tile */}
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-blue-500/40">
                <span className="text-2xl font-bold text-white tracking-tight">
                  AP
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="text-center space-y-1">
              <p className="text-white font-bold text-xl tracking-tight">
                Alessandro Poves
              </p>
              <p className="text-slate-500 text-sm">Full Stack Developer</p>
            </div>
          </motion.div>

          {/* Progress bar + label */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-44">
            <div className="w-full h-px bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: (DISPLAY_MS / 1000) * 0.82,
                  ease: "easeInOut",
                }}
              />
            </div>
            <p className="text-slate-600 text-[10px] tracking-[0.3em] uppercase font-medium">
              Loading
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
