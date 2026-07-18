// ─── Datos personales centralizados ───────────────────────────────────────────
// Edita este archivo para actualizar toda la info del portfolio de una sola vez.

import { z } from "zod";
import { timelineEntrySchema } from "@/types";
import { validateData } from "@/lib/validateData";

export const personal = {
  // Identidad
  name: "Alessandro",
  lastName: "Poves",
  fullName: "Alessandro Poves",
  title: "Full Stack Developer",
  specialties: ["React", "Laravel", "NestJS", "Ciberseguridad"],

  // Bio corta (hero) y larga (about)
  bioshort:
    "Construyo productos digitales centrados en diseño, rendimiento y seguridad.",
  bio: "Desarrollador Full Stack con más de 3 años de experiencia construyendo aplicaciones web modernas. Me especializo en crear experiencias de usuario excepcionales combinando React en el frontend con Laravel y NestJS en el backend. Apasionado por la ciberseguridad y el desarrollo de software de calidad.",

  // Contacto & ubicación
  location: "Huancayo, Perú",
  email: "apovesmartinez@gmail.com",
  phone: "+51 977 776 058",
  whatsapp: "51977776058",
  cv: "/cv.pdf",

  // Disponibilidad
  available: true,
  availableText: "Disponible para proyectos",

  // Typewriter en el Hero
  roles: [
    "Desarrollador Full Stack",
    "Especialista en React & Angular",
    "Experto en Laravel & NestJS",
    "Apasionado por la Ciberseguridad",
  ],

  // Estadísticas del Hero
  stats: [
    {
      value: 30,
      prefix: "+",
      suffix: "",
      label: "Proyectos",
      sub: "Apps web y APIs",
    },
    {
      value: 8,
      prefix: "",
      suffix: "",
      label: "Certificaciones",
      sub: "React, Laravel y más",
    },
    {
      value: 3,
      prefix: "+",
      suffix: "",
      label: "Años de exp.",
      sub: "Desarrollo profesional",
    },
  ],

  // Redes sociales
  social: {
    github: "https://github.com/SwodLore",
    linkedin:
      "https://www.linkedin.com/in/alessandro-piero-poves-martinez-524467318/",
    instagram: "https://www.instagram.com/alepoves/",
  },

  // Timeline de experiencia (para sección About — FASE 4)
  timeline: [
    {
      year: "2022",
      title: "Inicio en Desarrollo Web",
      description:
        "HTML, CSS, JavaScript y PHP — primeros pasos construyendo sitios web desde cero.",
      type: "education" as const,
    },
    {
      year: "2023",
      title: "Full Stack con React & Laravel",
      description:
        "Adopción de React, TailwindCSS y Laravel. Primeros proyectos con APIs REST y MySQL.",
      type: "education" as const,
    },
    {
      year: "2024",
      title: "DevOps & Ciberseguridad",
      description:
        "Docker, AWS, Hacking Ético y Redes (Cisco CCNA). Ampliación del stack con NestJS y Angular.",
      type: "milestone" as const,
    },
    {
      year: "2025",
      title: "Proyectos de Producción",
      description:
        "Consultoría técnica, proyectos fullstack en producción y contribuciones open source.",
      type: "work" as const,
    },
  ],

  // Tech stack que orbita la foto en el Hero
  orbitingTech: [
    {
      name: "React",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Laravel",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    },
    {
      name: "NestJS",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    },
    {
      name: "TypeScript",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Docker",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "PostgreSQL",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "Next.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      invert: true,
    },
    {
      name: "AWS",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    },
  ],
} as const;

validateData(z.array(timelineEntrySchema), personal.timeline, "data/personal.ts (timeline)");
