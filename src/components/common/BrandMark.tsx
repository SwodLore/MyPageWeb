/* Monograma <ap> — versión compacta de la marca (header, footer).
   Conectado al design system: los trazos usan los tokens accent-*,
   así que cambiar la paleta en index.css recolorea el logo solo.
   La versión blueprint (con retícula) vive en el loader y momentos
   grandes; esta es la de uso diario. */

interface BrandMarkProps {
  className?: string;
  title?: string;
}

export default function BrandMark({ className, title = "Ale Poves" }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 340 210"
      className={className}
      style={{ isolation: "isolate" }}
      role="img"
      aria-label={title}
    >
      {/* Letras translúcidas — el overlap se enciende en lavanda */}
      <g
        fill="none"
        strokeLinecap="round"
        opacity="0.92"
        style={{ mixBlendMode: "screen" }}
      >
        <circle cx="120" cy="110" r="40" stroke="var(--color-accent-600)" strokeWidth="34" />
        <line x1="160" y1="76" x2="160" y2="150" stroke="var(--color-accent-600)" strokeWidth="34" />
        <line x1="174" y1="76" x2="174" y2="196" stroke="var(--color-accent-400)" strokeWidth="34" />
        <circle cx="214" cy="110" r="40" stroke="var(--color-accent-400)" strokeWidth="34" />
      </g>

      {/* Brackets < > */}
      <g
        fill="none"
        stroke="var(--color-accent-300)"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="44,78 18,110 44,142" />
        <polyline points="298,78 324,110 298,142" />
      </g>

      {/* La bolita del loader, firmando dentro de la p.
          Oscura en modo claro, blanca en modo noche. */}
      <ellipse
        cx="197"
        cy="141"
        rx="19"
        ry="13"
        className="fill-accent-950 dark:fill-white"
        transform="rotate(-10 197 141)"
      />
    </svg>
  );
}
