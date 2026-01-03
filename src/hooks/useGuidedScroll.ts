import { useEffect, useRef, useCallback } from "react";

/**
 * useGuidedScroll - Scroll guiado automático al cargar la página
 * 
 * Características:
 * - Solo ejecuta en primera visita de la sesión
 * - Se cancela si el usuario interactúa (scroll/touch/wheel)
 * - Respeta prefers-reduced-motion
 * - Optimizado para desktop y mobile
 */
export function useGuidedScroll(
    targetId: string,
    options: {
        delay?: number;
        offset?: number;
        enabled?: boolean;
    } = {}
) {
    const {
        delay = 2500,
        offset = -80, // Compensar header fijo
        enabled = true,
    } = options;

    const hasScrolledRef = useRef(false);
    const timeoutRef = useRef<number | null>(null);

    const cancelGuidedScroll = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        hasScrolledRef.current = true;
    }, []);

    useEffect(() => {
        if (!enabled) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefersReducedMotion) return;

        // Check if already scrolled in this session
        const sessionKey = `guided-scroll-${targetId}`;
        if (sessionStorage.getItem(sessionKey)) return;

        // Check if user has already scrolled
        if (window.scrollY > 100) {
            sessionStorage.setItem(sessionKey, "done");
            return;
        }

        // Cancel scroll on any user interaction
        const interactionEvents = ["wheel", "touchstart", "mousedown", "keydown"];

        const handleInteraction = () => {
            cancelGuidedScroll();
            // Mark as done so we don't try again
            sessionStorage.setItem(sessionKey, "done");
        };

        interactionEvents.forEach((event) => {
            window.addEventListener(event, handleInteraction, { passive: true, once: true });
        });

        // Set up the guided scroll
        timeoutRef.current = window.setTimeout(() => {
            if (hasScrolledRef.current) return;

            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });

            // Mark as done
            sessionStorage.setItem(sessionKey, "done");
            hasScrolledRef.current = true;
        }, delay);

        return () => {
            cancelGuidedScroll();
            interactionEvents.forEach((event) => {
                window.removeEventListener(event, handleInteraction);
            });
        };
    }, [targetId, delay, offset, enabled, cancelGuidedScroll]);

    return { cancelGuidedScroll };
}
