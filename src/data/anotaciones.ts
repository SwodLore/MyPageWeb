// ─── Anotaciones por semana ────────────────────────────────────────────────
// Edita el campo `content` de cada semana con las notas del sílabo.

export interface Anotacion {
  semana: number;
  titulo: string;
  fecha?: string;
  content: string;
  temas: string[];
  estado: "completado" | "en-curso" | "pendiente";
}

export const anotaciones: Anotacion[] = [
  {
    semana: 1,
    titulo: "Introducción al curso",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 2,
    titulo: "Semana 2",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 3,
    titulo: "Semana 3",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 4,
    titulo: "Semana 4",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 5,
    titulo: "Semana 5",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 6,
    titulo: "Semana 6",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 7,
    titulo: "Semana 7",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 8,
    titulo: "Semana 8 — Examen Parcial",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 9,
    titulo: "Semana 9",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 10,
    titulo: "Semana 10",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 11,
    titulo: "Semana 11",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 12,
    titulo: "Semana 12",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 13,
    titulo: "Semana 13",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 14,
    titulo: "Semana 14",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 15,
    titulo: "Semana 15",
    temas: [],
    content: "",
    estado: "pendiente",
  },
  {
    semana: 16,
    titulo: "Semana 16 — Examen Final",
    temas: [],
    content: "",
    estado: "pendiente",
  },
];
