import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// Custom cursor — desktop (pointer: fine) only.
// Dot follows instantly; ring follows with spring physics.
// Hover state detected via event delegation (works with dynamic DOM).
// ═══════════════════════════════════════════════════════════════

const SPRING = { stiffness: 220, damping: 24, mass: 0.4 };

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

export default function CustomCursor() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);
  const ringX = useSpring(dotX, SPRING);
  const ringY = useSpring(dotY, SPRING);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setIsPointerFine(true);

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovered(!!target?.closest(INTERACTIVE));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, [dotX, dotY]);

  if (!isPointerFine) return null;

  return (
    <>
      {/* ── Dot — instant ──────────────────────────────────────── */}
      <m.div
        className="fixed top-0 left-0 z-[999] pointer-events-none will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicked ? 0.4 : 1,
        }}
        transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.08 } }}
      >
        <div
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-150 ${
            hovered ? "bg-cyan-400" : "bg-blue-500"
          }`}
        />
      </m.div>

      {/* ── Ring — spring lag ──────────────────────────────────── */}
      <m.div
        className="fixed top-0 left-0 z-[998] pointer-events-none will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 0.65 : 0,
          scale: clicked ? 0.6 : hovered ? 1.7 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <div
          className={`w-9 h-9 rounded-full border-2 transition-colors duration-150 ${
            hovered
              ? "border-cyan-400 bg-cyan-400/8"
              : "border-blue-400/50 bg-transparent"
          }`}
        />
      </m.div>
    </>
  );
}
