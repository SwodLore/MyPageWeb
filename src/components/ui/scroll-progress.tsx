import { cn } from "@/lib/utils";
import { motion, MotionProps, useScroll } from "framer-motion";
import React from "react";

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string;
}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Track line */}
      <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-slate-200/20 dark:bg-slate-700/20" />

      {/* Progress fill */}
      <motion.div
        ref={ref}
        className={cn(
          "fixed inset-x-0 top-0 z-[71] h-[3px] origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400",
          className,
        )}
        style={{ scaleX: scrollYProgress }}
        {...props}
      />

      {/* Glow beneath the bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[6px] origin-left bg-gradient-to-r from-blue-500/40 via-violet-500/40 to-cyan-400/40 blur-[4px]"
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
});

ScrollProgress.displayName = "ScrollProgress";
