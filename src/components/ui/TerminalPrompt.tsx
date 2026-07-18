import { Apple, Clock, GitBranch } from "lucide-react";

import { TERMINAL_COLORS } from "@/lib/terminalTheme";

/* Prompt segmentado estilo powerlevel10k — los colores viven en
   lib/terminalTheme.ts (cita visual del terminal real del usuario). */

/* Hora fija al cargar — decorativa, como un screenshot vivo */
const NOW = new Date().toTimeString().slice(0, 5);

/* Flecha powerline: el borde derecho del segmento apunta al siguiente */
const ARROW_CLIP = "polygon(0 0, calc(100% - 9px) 0, 100% 50%, calc(100% - 9px) 100%, 0 100%)";

interface SegmentProps {
  bg: string;
  z: number;
  inset?: boolean;
  arrow?: boolean;
  children: React.ReactNode;
}

function Segment({ bg, z, inset = false, arrow = true, children }: SegmentProps) {
  return (
    <span
      className={`relative flex items-center gap-1 py-1 pr-4 text-[11px] font-bold ${inset ? "pl-4 -ml-[9px]" : "pl-3"}`}
      style={{
        backgroundColor: bg,
        color: TERMINAL_COLORS.ink,
        zIndex: z,
        clipPath: arrow ? ARROW_CLIP : undefined,
      }}
    >
      {children}
    </span>
  );
}

interface PromptLineProps {
  path: string;
  branch?: string;
  children?: React.ReactNode;
}

export function PromptLine({ path, branch, children }: PromptLineProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono">
      <span className="inline-flex overflow-hidden rounded-full leading-none select-none" aria-hidden="true">
        <Segment bg={TERMINAL_COLORS.user} z={40}>
          <Apple size={10} fill={TERMINAL_COLORS.ink} strokeWidth={0} />
          alessandro
        </Segment>
        <Segment bg={TERMINAL_COLORS.path} z={30} inset>
          {path}
        </Segment>
        {branch && (
          <Segment bg={TERMINAL_COLORS.branch} z={20} inset>
            <GitBranch size={10} strokeWidth={2.5} />
            {branch}
          </Segment>
        )}
        <Segment bg={TERMINAL_COLORS.time} z={10} inset arrow={false}>
          <Clock size={10} strokeWidth={2.5} />
          {NOW}
        </Segment>
      </span>
      <span className="font-bold select-none" style={{ color: TERMINAL_COLORS.prompt }}>
        ❯
      </span>
      {children}
    </div>
  );
}
