"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, useScroll } from "motion/react";
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
      {/* Background line */}
      <div className="fixed inset-x-0 top-0 z-40 h-0.5 bg-slate-200/30 dark:bg-slate-700/30 backdrop-blur-sm" />

      {/* Progress line with Apple-style gradient */}
      <motion.div
        ref={ref}
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 shadow-lg",
          className,
        )}
        style={{
          scaleX: scrollYProgress,
        }}
        {...props}
      />

      {/* Glow effect */}
      <motion.div
        className="fixed inset-x-0 top-0 z-40 h-1 origin-left bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 blur-sm"
        style={{
          scaleX: scrollYProgress,
        }}
      />
    </>
  );
});

ScrollProgress.displayName = "ScrollProgress";
