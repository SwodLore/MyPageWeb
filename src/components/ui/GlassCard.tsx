import { ReactNode } from "react";
import { m, useInView } from "framer-motion";
import { useRef } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    hover?: boolean;
    glow?: boolean;
}

/**
 * GlassCard - Card with glassmorphism effect
 * Includes reveal animation and optional hover glow
 */
export function GlassCard({
    children,
    className = "",
    delay = 0,
    hover = true,
    glow = true,
}: GlassCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <m.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={
                hover
                    ? {
                        y: -8,
                        scale: 1.02,
                        transition: { duration: 0.3 },
                    }
                    : {}
            }
            className={`
        relative rounded-3xl p-6
        bg-white/70 dark:bg-slate-900/70
        backdrop-blur-xl
        border border-white/30 dark:border-slate-700/50
        shadow-xl
        transition-shadow duration-300
        ${glow ? "hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_40px_rgba(96,165,250,0.2)]" : ""}
        ${className}
      `}
        >
            {children}
        </m.div>
    );
}

export default GlassCard;
