import { ReactNode } from "react";
import { m } from "framer-motion";

interface GlowButtonProps {
    children: ReactNode;
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
    type?: "button" | "submit";
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
    disabled?: boolean;
}

/**
 * GlowButton - Button with animated glow/shimmer effect
 * Supports both button and anchor tag modes
 */
export function GlowButton({
    children,
    onClick,
    href,
    target,
    rel,
    type = "button",
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
}: GlowButtonProps) {
    const baseStyles = `
    relative overflow-hidden rounded-2xl font-semibold
    transition-all duration-300 ease-out
    inline-flex items-center justify-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

    const sizeStyles = {
        sm: "px-5 py-2.5 text-sm",
        md: "px-8 py-4 text-base",
        lg: "px-10 py-5 text-lg",
    };

    const variantStyles = {
        primary: `
      bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500
      text-white shadow-xl
      hover:shadow-[0_0_40px_rgba(59,130,246,0.5),0_0_60px_rgba(139,92,246,0.3)]
    `,
        secondary: `
      bg-white/80 dark:bg-slate-900/80
      text-slate-900 dark:text-white
      border border-slate-200 dark:border-slate-700
      backdrop-blur-lg
      hover:bg-white dark:hover:bg-slate-800
      shadow-lg hover:shadow-xl
    `,
        ghost: `
      bg-transparent
      text-slate-700 dark:text-slate-300
      hover:bg-slate-100 dark:hover:bg-slate-800
    `,
    };

    const combinedClassName = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `;

    const motionProps = {
        whileHover: disabled ? {} : { scale: 1.05, y: -2 },
        whileTap: disabled ? {} : { scale: 0.98 },
    };

    const shimmerOverlay = variant === "primary" && (
        <span
            className="absolute inset-0 pointer-events-none"
            style={{
                background:
                    "linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s linear infinite",
            }}
        />
    );

    if (href) {
        return (
            <m.a
                href={href}
                target={target}
                rel={rel}
                onClick={onClick}
                className={combinedClassName}
                {...motionProps}
            >
                {shimmerOverlay}
                <span className="relative z-10 flex items-center gap-2">{children}</span>
            </m.a>
        );
    }

    return (
        <m.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedClassName}
            {...motionProps}
        >
            {shimmerOverlay}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </m.button>
    );
}

export default GlowButton;
