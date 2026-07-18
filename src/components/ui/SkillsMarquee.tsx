import { useRef, useState } from "react";
import { m, useSpring, useTransform } from "framer-motion";
import { skills } from "@/data/skills";

// ═══════════════════════════════════════════════════════════════
// Infinite Scrolling Skills Marquee with 3D Tilt on Hover
// ═══════════════════════════════════════════════════════════════

interface SkillCardProps {
    skill: { name: string; img: string; level: string };
}

function SkillCard({ skill }: SkillCardProps) {
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

    // Get level badge color
    const getLevelStyle = (level: string) => {
        switch (level.toLowerCase()) {
            case "avanzado":
                return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
            case "intermedio":
                return "bg-accent-500/20 text-accent-400 border-accent-500/30";
            case "basico":
                return "bg-amber-500/20 text-amber-400 border-amber-500/30";
            default:
                return "bg-slate-500/20 text-slate-400 border-slate-500/30";
        }
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
            className="group relative cursor-pointer flex-shrink-0"
        >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-500 via-accent-500 to-accent-500 rounded-2xl opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-500" />

            {/* Card */}
            <div className="relative flex flex-col items-center gap-3 p-5 md:p-6 w-28 md:w-32 rounded-xl md:rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 shadow-xl transition-all duration-300 group-hover:border-accent-500/50 group-hover:shadow-accent-500/20">
                {/* Glare effect */}
                <m.div
                    className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent" />
                </m.div>

                {/* Icon Container */}
                <m.div
                    className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center"
                    style={{ transform: "translateZ(30px)" }}
                >
                    <m.img
                        src={skill.img}
                        alt={skill.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                        loading="lazy"
                        animate={isHovered ? {
                            rotate: [0, -8, 8, 0],
                            scale: 1.15
                        } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    />
                </m.div>

                {/* Name */}
                <span
                    className="text-sm font-semibold text-slate-900 dark:text-white text-center leading-tight"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {skill.name}
                </span>

                {/* Level Badge */}
                <span
                    className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${getLevelStyle(skill.level)}`}
                    style={{ transform: "translateZ(10px)" }}
                >
                    {skill.level}
                </span>
            </div>
        </m.div>
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
    reverse = false
}: SkillsMarqueeProps) {
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate skills for seamless loop
    const duplicatedSkills = [...skills, ...skills];

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Gradient masks for smooth fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-slate-100 dark:from-night-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-slate-100 dark:from-night-950 to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <m.div
                className="flex gap-4 md:gap-5 py-3"
                animate={{
                    x: isPaused ? undefined : reverse ? [-50 * skills.length, 0] : [0, -50 * skills.length],
                }}
                transition={{
                    x: {
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                    },
                }}
                style={{ width: "fit-content" }}
            >
                {duplicatedSkills.map((skill, index) => (
                    <SkillCard key={`${skill.name}-${index}`} skill={skill} />
                ))}
            </m.div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════
// Also export the Grid version for other uses
// ═══════════════════════════════════════════════════════════════

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            type: "spring" as const,
            stiffness: 150,
            damping: 20,
        },
    },
};

interface SkillCardGridProps {
    skill: { name: string; img: string; level: string };
}

function SkillCardGrid({ skill }: SkillCardGridProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

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

    const getLevelStyle = (level: string) => {
        switch (level.toLowerCase()) {
            case "avanzado":
                return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
            case "intermedio":
                return "bg-accent-500/20 text-accent-400 border-accent-500/30";
            case "basico":
                return "bg-amber-500/20 text-amber-400 border-amber-500/30";
            default:
                return "bg-slate-500/20 text-slate-400 border-slate-500/30";
        }
    };

    return (
        <m.div
            ref={cardRef}
            variants={itemVariants}
            style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05, z: 50 }}
            className="group relative cursor-pointer"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-500 via-accent-500 to-accent-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />

            <div className="relative flex flex-col items-center gap-3 p-4 md:p-5 rounded-xl md:rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50 shadow-xl transition-all duration-300 group-hover:border-accent-500/50 group-hover:shadow-accent-500/10">
                <m.div
                    className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                </m.div>

                <m.div
                    className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-night-900/50 p-2 border border-slate-200 dark:border-slate-700/50"
                    style={{ transform: "translateZ(30px)" }}
                >
                    <m.img
                        src={skill.img}
                        alt={skill.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                        loading="lazy"
                        animate={isHovered ? { rotate: [0, -5, 5, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    />
                </m.div>

                <span className="text-sm md:text-base font-semibold text-slate-900 dark:text-white text-center leading-tight">
                    {skill.name}
                </span>

                <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getLevelStyle(skill.level)}`}>
                    {skill.level}
                </span>
            </div>
        </m.div>
    );
}

interface SkillsGridProps {
    className?: string;
    maxItems?: number;
}

export function SkillsGrid({ className = "", maxItems }: SkillsGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const displayedSkills = maxItems ? skills.slice(0, maxItems) : skills;

    return (
        <m.div
            ref={containerRef}
            className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4 ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            style={{ perspective: 1000 }}
        >
            {displayedSkills.map((skill) => (
                <SkillCardGrid key={skill.name} skill={skill} />
            ))}
        </m.div>
    );
}

export default SkillsMarquee;
