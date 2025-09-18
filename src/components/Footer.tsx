import { Linkedin, Github, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/alessandro-piero-poves-martinez-524467318/",
      icon: Linkedin
    },
    {
      name: "GitHub",
      href: "https://github.com/SwodLore",
      icon: Github
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/alepoves/",
      icon: Instagram
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-50 to-blue-50 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="container-apple py-20">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Alessandro Poves
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Desarrollador Full Stack especializado en crear experiencias digitales
              excepcionales con tecnologías modernas.
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              Contacto
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={18} className="text-blue-600" />
                <a
                  href="mailto:apovesmartinez@gmail.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  apovesmartinez@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={18} className="text-blue-600" />
                <span className="text-gray-600 dark:text-gray-400">
                  Huancayo, Perú
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              Especialidades
            </h4>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {['Laravel', 'Spring Boot', 'React', 'Angular', 'TypeScript', 'Python'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-12">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 group"
                aria-label={social.name}
              >
                <Icon
                  size={20}
                  className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
                />
              </a>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Alessandro Poves. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#sobre-mi"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                Inicio
              </a>
              <a
                href="#portafolio"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                Proyectos
              </a>
              <a
                href="#contacto"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
