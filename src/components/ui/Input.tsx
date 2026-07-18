import { cn } from "@/lib/utils";

/* Estilo base compartido por Input y Textarea.
   El foco se resuelve con CSS puro (:focus), sin estado de React. */
export const fieldStyles = `
  w-full px-5 py-4 rounded-2xl
  bg-white dark:bg-slate-800
  border-2 border-slate-200 dark:border-slate-700
  transition-all duration-300
  text-slate-900 dark:text-white
  placeholder:text-slate-400 dark:placeholder:text-slate-500
  hover:border-slate-300 dark:hover:border-slate-600
  focus:outline-none focus:border-blue-500 dark:focus:border-blue-400
  focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]
`;

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldStyles, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(fieldStyles, "resize-none", className)} {...props} />;
}
