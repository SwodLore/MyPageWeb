import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TARGET_SELECTORS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "li",
  "dt",
  "dd",
  "blockquote",
  "figcaption",
  "strong",
  "em",
  "a",
  "[data-animate]",
];

export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const targets = Array.from(
      main.querySelectorAll<HTMLElement>(TARGET_SELECTORS.join(", ")),
    );

    if (prefersReducedMotion.matches) {
      targets.forEach((element) => {
        element.classList.remove("scroll-reveal", "revealed");
        element.style.removeProperty("--reveal-delay");
        element.style.removeProperty("--sr-distance");
      });
      return;
    }

    const filteredTargets = targets.filter(
      (element) => !element.classList.contains("no-scroll-reveal"),
    );

    filteredTargets.forEach((element, index) => {
      element.classList.add("scroll-reveal");
      element.classList.remove("revealed");

      // Faster stagger: 8ms per element, max 80ms delay
      const delay = Math.min(index * 8, 80);
      // Smaller distance for subtler effect
      const distance = 16 + (index % 3) * 2;

      element.style.setProperty("--reveal-delay", `${delay}ms`);
      element.style.setProperty("--sr-distance", `${distance}px`);
    });

    const elements = Array.from(
      main.querySelectorAll<HTMLElement>(".scroll-reveal"),
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        // Trigger earlier: -100px means element reveals when 100px below viewport
        rootMargin: "0px 0px -100px 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      elements.forEach((element) => {
        element.style.removeProperty("--reveal-delay");
        element.style.removeProperty("--sr-distance");
      });
    };
  }, [pathname]);
}
