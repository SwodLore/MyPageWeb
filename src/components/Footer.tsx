import { Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/alessandro-piero-poves-martinez-524467318/", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/SwodLore", icon: Github },
  { name: "Instagram", href: "https://www.instagram.com/alepoves/", icon: Instagram },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50/70 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="container-apple py-20 space-y-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Alessandro Poves</h3>
            <p className="text-slate-500 dark:text-slate-300">
              Desarrollador full stack que construye experiencias digitales elegantes, accesibles y enfocadas en el valor de negocio.
            </p>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Contacto</h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:apovesmartinez@gmail.com"
                className="flex items-center justify-center gap-3 transition hover:text-blue-600 md:justify-start dark:hover:text-blue-300"
              >
                <Mail size={18} className="text-blue-600 dark:text-blue-400" />
                apovesmartinez@gmail.com
              </a>
              <div className="flex items-center justify-center gap-3 text-slate-600 md:justify-start dark:text-slate-300">
                <MapPin size={18} className="text-blue-600 dark:text-blue-400" />
                Huancayo, Peru
              </div>
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Stack destacado</h4>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {["Laravel", "Spring Boot", "React", "Angular", "TypeScript", "Python"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              aria-label={name}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex md:items-center md:justify-between">
          <p>© {currentYear} Alessandro Poves. Todos los derechos reservados.</p>
          <div className="mt-4 flex justify-center gap-6 md:mt-0">
            <a href="#sobre-mi" className="transition hover:text-blue-600 dark:hover:text-blue-300">
              Inicio
            </a>
            <a href="#portafolio" className="transition hover:text-blue-600 dark:hover:text-blue-300">
              Proyectos
            </a>
            <a href="#contacto" className="transition hover:text-blue-600 dark:hover:text-blue-300">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
