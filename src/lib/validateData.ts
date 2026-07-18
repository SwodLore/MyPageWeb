import type { z } from "zod";

/**
 * Valida un archivo de data/ contra su schema zod, solo en desarrollo.
 * En producción no hace nada (los datos son estáticos y ya fueron
 * validados durante el desarrollo), así que no cuesta rendimiento.
 */
export function validateData(schema: z.ZodTypeAny, data: unknown, source: string) {
  if (!import.meta.env.DEV) return;
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[validateData] Datos inválidos en ${source}:`, result.error.format());
  }
}
