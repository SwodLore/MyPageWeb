import { useEffect } from "react";

const DEFAULT_TITLE =
  "Alessandro Poves - Desarrollador Full Stack | Portfolio Profesional";

/**
 * Actualiza el <title> y la meta description de la pestaña por ruta.
 * En un SPA todas las rutas comparten el index.html, así que sin esto
 * /skills o /anotaciones mostrarían el título de la home en Google
 * y al compartir el enlace. Al desmontar restaura los valores por defecto.
 */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Alessandro Poves` : DEFAULT_TITLE;
    document.title = fullTitle;

    const metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    const previousDescription = metaDescription?.content;
    if (description && metaDescription) {
      metaDescription.content = description;
    }

    return () => {
      document.title = DEFAULT_TITLE;
      if (metaDescription && previousDescription) {
        metaDescription.content = previousDescription;
      }
    };
  }, [title, description]);
}
