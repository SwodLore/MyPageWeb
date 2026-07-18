import { Github, Instagram, Linkedin } from "lucide-react";
import { personal } from "./personal";
import type { SocialLink } from "@/types";

/* Secciones de la home — id de la <section> destino + etiqueta visible.
   Única fuente de verdad para Header y Footer. */
export const SECTION_NAV = [
  { id: "sobre-mi",        label: "Inicio" },
  { id: "skills-overview", label: "Skills" },
  { id: "portafolio",      label: "Proyectos" },
  { id: "certificados",    label: "Certificados" },
  { id: "contacto",        label: "Contacto" },
] as const;

/* Navegación completa del header: secciones + rutas propias.
   id → scroll a sección en /  |  href → navegación de ruta */
export const HEADER_NAV = [
  ...SECTION_NAV,
  { href: "/anotaciones", label: "Anotaciones" },
] as const;

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "LinkedIn",  href: personal.social.linkedin,  icon: Linkedin },
  { name: "GitHub",    href: personal.social.github,    icon: Github },
  { name: "Instagram", href: personal.social.instagram, icon: Instagram },
];
