import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Contacto() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isMobile, setIsMobile] = useState(false);
  const [showAllBenefits, setShowAllBenefits] = useState(false);

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/alessandro-piero-poves-martinez-524467318/", icon: Linkedin },
    { label: "GitHub", href: "https://github.com/SwodLore", icon: Github },
  ];
  const collaborationBenefits = useMemo(
    () => [
      "Reuniones estratégicas sin costo para definir alcance.",
      "Entrega en sprints con demos y documentación viva.",
      "Seguimiento post-lanzamiento y optimización continua.",
    ],
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowAllBenefits((prev) => (mobile ? prev : true));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedBenefits =
    !isMobile || showAllBenefits ? collaborationBenefits : collaborationBenefits.slice(0, 2);
  const hiddenBenefitsCount = Math.max(collaborationBenefits.length - displayedBenefits.length, 0);
  const canToggleBenefits = isMobile && collaborationBenefits.length > 2;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { name, email, message } = formData;
    const whatsappNumber = "51977776058";
    const text = [
      "Hola Alessandro 👋",
      "",
      "Quiero conversar sobre un proyecto:",
      `Nombre: ${name}`,
      `Correo: ${email}`,
      "Mensaje:",
      message,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-950">
      <div className="container-apple flex flex-col gap-16 lg:gap-20">
        <motion.div
          className="rounded-3xl border border-slate-200 bg-white px-8 py-12 text-center shadow-xl backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/80 dark:shadow-[0_25px_45px_-20px_rgba(15,23,42,0.6)] sm:px-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: easing }}
        >
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700 dark:border-blue-500/50 dark:bg-blue-500/15 dark:text-blue-200">
              <Sparkles size={14} />
              Contacto
            </span>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
                Trabajemos Juntos
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Cuéntame tu idea y alineemos roadmap, tecnología y objetivos comerciales. Diseñamos soluciones precisas,
                medibles y con un look & feel impecable para tus usuarios.
              </p>
            </div>
            <div className="grid w-full gap-3 text-left text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
              {displayedBenefits.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-start gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/70"
                >
                  <CheckCircle2 size={18} className="mt-0.5 text-emerald-500 dark:text-emerald-300" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
            {canToggleBenefits && (
              <motion.button
                onClick={() => setShowAllBenefits((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {showAllBenefits
                  ? "Ver menos"
                  : hiddenBenefitsCount > 0
                    ? `Ver más (+${hiddenBenefitsCount})`
                    : "Ver más"}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${showAllBenefits ? "rotate-180" : ""}`}
                />
              </motion.button>
            )}
          </div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
          <motion.div
            className="rounded-3xl border border-slate-100 bg-white p-10 shadow-xl dark:border-gray-700 dark:bg-gray-800"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: easing }}
          >
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Envíame un mensaje</h3>
            <p className="text-slate-500 dark:text-slate-300 mb-8">
              Completa el formulario y me pondré en contacto cuanto antes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white resize-none"
                  placeholder="Cuéntame sobre tu proyecto, tiempos y objetivos..."
                />
              </div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Enviar mensaje
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: easing }}
          >
            <motion.div
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Información de contacto</h3>
              <p className="text-slate-500 dark:text-slate-300 mb-6">
                También puedes escribirme directamente a mis canales habituales.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, title: "Email", value: "apovesmartinez@gmail.com", href: "mailto:apovesmartinez@gmail.com" },
                  { icon: MapPin, title: "Ubicación", value: "Huancayo, Perú" },
                  { icon: Phone, title: "WhatsApp", value: "+51 977 776 058", href: "https://wa.me/51977776058" },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    className="flex items-center gap-4"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center dark:bg-blue-900/30">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {item.title}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-800 dark:text-white font-semibold hover:text-blue-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-slate-800 dark:text-white font-semibold">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800 space-y-5"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Sígueme en redes
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-transform hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <social.icon size={18} />
                      <span className="font-medium">{social.label}</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 dark:text-slate-500" />
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="/cv.pdf"
                download="Alessandro-Poves-CV.pdf"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors dark:border-gray-700 dark:text-slate-300 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={16} />
                Solicitar CV
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
