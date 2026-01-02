import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    containerClassName?: string;
    speed?: number; // 0.1 (subtle) to 0.5 (pronounced)
    direction?: "up" | "down";
}

/**
 * ParallaxImage - Image with scroll-based parallax effect
 * The image moves at a different rate than the scroll
 */
export function ParallaxImage({
    src,
    alt,
    className = "",
    containerClassName = "",
    speed = 0.2,
    direction = "up",
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Calculate the parallax offset
    const yRange = direction === "up" ? [50, -50] : [-50, 50];
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        yRange.map((v) => v * speed * 2)
    );

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${containerClassName}`}
        >
            <motion.img
                src={src}
                alt={alt}
                style={{ y }}
                className={`w-full h-[120%] object-cover ${className}`}
                loading="eager"
                decoding="async"
            />
        </div>
    );
}

export default ParallaxImage;
