import { useRef, useState } from "react";
import { m, useSpring, useTransform } from "framer-motion";
import { skills } from "@/data/skills";
import type { Skill } from "@/types";

// ═══════════════════════════════════════════════════════════════
// Marquee infinito de skills con tilt 3D al hover.
// El desplazamiento es CSS puro (.animate-marquee): el compositor
// lo mueve sin JS, y pausar con hover congela la posición exacta
// — sin el salto que producía reiniciar keyframes de framer.
// ═══════════════════════════════════════════════════════════════

/* Niveles tipados directo del dato — sin toLowerCase() frágil
   (el bug: "Básico" con tilde nunca coincidía con "basico"). */
const LEVEL_STYLE: Record<Skill["level"], string> = {
  Avanzado: "bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border-emerald-500/30",
  Intermedio: "bg-accent-500/20 text-accent-600 dark:text-accent-400 border-accent-500/30",
  Básico: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
};

function SkillCard({ skill }: { skill: Skill }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D effect
  const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

  // Transform mouse position to rotation (15 degrees max)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <m.div
      ref={cardRef}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1, z: 50 }}
      className="group/card relative cursor-pointer flex-shrink-0"
    >
      {/* Glow morado al hover */}
      <div className="absolute -inset-1 bg-accent-500 rounded-2xl opacity-0 group-hover/card:opacity-40 blur-lg transition-opacity duration-500" />

      {/* Card */}
      <div className="relative flex flex-col items-center gap-3 p-5 md:p-6 w-28 md:w-32 rounded-xl md:rounded-2xl bg-white dark:bg-night-800 border border-slate-200 dark:border-night-700 shadow-sm transition-all duration-300 group-hover/card:border-accent-500/50">
        {/* Icon */}
        <div
          className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center"
          style={{ transform: "translateZ(30px)" }}
        >
          <m.img
            src={skill.img}
            alt={skill.name}
            className="w-full h-full object-contain drop-shadow-lg"
            loading="lazy"
            animate={isHovered ? { rotate: [0, -8, 8, 0], scale: 1.15 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Name */}
        <span
          className="text-sm font-semibold text-slate-900 dark:text-white text-center leading-tight"
          style={{ transform: "translateZ(20px)" }}
        >
          {skill.name}
        </span>

        {/* Level Badge */}
        <span
          className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${LEVEL_STYLE[skill.level]}`}
          style={{ transform: "translateZ(10px)" }}
        >
          {skill.level}
        </span>
      </div>
    </m.div>
  );
}

/* Una copia de la fila; el marquee necesita dos idénticas para que
   translateX(-50%) cierre el loop sin costura. */
function MarqueeRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex gap-4 md:gap-5 pr-4 md:pr-5" aria-hidden={hidden || undefined}>
      {skills.map((skill) => (
        <SkillCard key={skill.name} skill={skill} />
      ))}
    </div>
  );
}

interface SkillsMarqueeProps {
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
}

export function SkillsMarquee({
  className = "",
  speed = 30,
  pauseOnHover = true,
  reverse = false,
}: SkillsMarqueeProps) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      {/* Fades laterales — mismo tono que el fondo de la sección */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-slate-50 dark:from-night-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-slate-50 dark:from-night-900 to-transparent z-10 pointer-events-none" />

      {/* Pista: dos filas idénticas desplazándose -50% en loop */}
      <div
        className={`flex w-max py-3 animate-marquee ${reverse ? "[animation-direction:reverse]" : ""} ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        <MarqueeRow />
        <MarqueeRow hidden />
      </div>
    </div>
  );
}

export default SkillsMarquee;
