import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "block text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
}
