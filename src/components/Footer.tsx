import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, MapPin, Heart, ArrowUp, Code2 } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/alessandro-piero-poves-martinez-524467318/",
    icon: Linkedin,
    color: "hover:bg-blue-100 hover:text-blue-600 hover:border-blue-200 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
  },
  {
    name: "GitHub",
    href: "https://github.com/SwodLore",
    icon: Github,
    color: "hover:bg-slate-200 hover:text-slate-900 hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/alepoves/",
    icon: Instagram,
    color: "hover:bg-pink-100 hover:text-pink-600 hover:border-pink-200 dark:hover:bg-pink-900/30 dark:hover:text-pink-400"
  },
];

const techStack = ["React", "Laravel", "NestJS", "TypeScript", "Docker", "AWS"];

const navLinks = [
  { label: "Inicio", href: "#sobre-mi" },
  { label: "Skills", href: "#skills-overview" },
  { label: "Proyectos", href: "#portafolio" },
  { label: "Certificados", href: "#certificados" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Decorative gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="container-apple py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 shadow-lg shadow-blue-500/25">
                <img
                  src="/logo.webp"
                  alt="AP"
                  className="h-6 w-6 object-contain brightness-0 invert"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Alessandro Poves
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Full Stack Developer
                </p>
              </div>
            </motion.div>

            <p className="max-w-md text-slate-500 dark:text-slate-400 leading-relaxed">
              Desarrollador full stack que construye experiencias digitales elegantes,
              accesibles y enfocadas en el valor de negocio.
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Navegación
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Contacto
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:apovesmartinez@gmail.com"
                className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail size={16} className="text-blue-500" />
                apovesmartinez@gmail.com
              </a>
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <MapPin size={16} className="text-rose-500" />
                Huancayo, Perú
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 pt-2">
              {socialLinks.map(({ name, href, icon: Icon, color }) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all ${color}`}
                  aria-label={name}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
            © {currentYear} Alessandro Poves. Hecho con
            <Heart size={14} className="text-rose-500 fill-rose-500 mx-1" />
            y mucho
            <Code2 size={14} className="text-blue-500 mx-1" />
          </p>

          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Volver arriba
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
