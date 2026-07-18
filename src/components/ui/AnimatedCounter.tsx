import { useEffect, useRef, useState } from "react";
import { m, animate, useInView } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}

/**
 * AnimatedCounter - Counts from 0 to target value when entering viewport
 * Uses Framer Motion's animate function for smooth easing
 */
export function AnimatedCounter({
    value,
    duration = 2,
    prefix = "",
    suffix = "",
    className = "",
}: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (isInView && !hasAnimated.current) {
            hasAnimated.current = true;
            const controls = animate(0, value, {
                duration,
                ease: [0.16, 1, 0.3, 1],
                onUpdate: (latest) => setDisplayValue(Math.round(latest)),
            });

            return () => controls.stop();
        }
    }, [isInView, value, duration]);

    return (
        <m.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {prefix}
            {displayValue}
            {suffix}
        </m.span>
    );
}

export default AnimatedCounter;
