import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { GlowButton, GlassCard } from "./ui";
import { triggerSimpleConfetti } from "../lib/confetti";

// ═══════════════════════════════════════════════════════════════
// Animation Config
// ═══════════════════════════════════════════════════════════════

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing },
  },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// ═══════════════════════════════════════════════════════════════
// Animated Input Component
// ═══════════════════════════════════════════════════════════════

interface AnimatedInputProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  isTextarea?: boolean;
  rows?: number;
}

function AnimatedInput({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required = false,
  isTextarea = false,
  rows = 5,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const inputClasses = `
    w-full px-5 py-4 rounded-2xl
    bg-white dark:bg-slate-800
    border-2 transition-all duration-300
    text-slate-900 dark:text-white
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    focus:outline-none
    ${isFocused
      ? "border-blue-500 dark:border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
    }
  `;

  const commonProps = {
    id,
    name,
    value,
    onChange,
    required,
    placeholder,
    className: inputClasses,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };

  return (
    <motion.div
      className="space-y-2"
      variants={fadeInUp}
    >
      <label
        htmlFor={id}
        className={`block text-sm font-medium transition-colors duration-300 ${isFocused
          ? "text-blue-600 dark:text-blue-400"
          : "text-slate-600 dark:text-slate-400"
          }`}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea {...commonProps} rows={rows} style={{ resize: "none" }} />
      ) : (
        <input {...commonProps} type={type} />
      )}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Contact Info Card
// ═══════════════════════════════════════════════════════════════

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    value: "apovesmartinez@gmail.com",
    href: "mailto:apovesmartinez@gmail.com",
    color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30"
  },
  {
    icon: Phone,
    title: "WhatsApp",
    value: "+51 977 776 058",
    href: "https://wa.me/51977776058",
    color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30"
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: "Huancayo, Perú",
    color: "text-rose-500 bg-rose-100 dark:bg-rose-900/30"
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alessandro-piero-poves-martinez-524467318/",
    icon: Linkedin,
    color: "hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-700"
  },
  {
    label: "GitHub",
    href: "https://github.com/SwodLore",
    icon: Github,
    color: "hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-600"
  },
];

const collaborationBenefits = [
  "Reuniones estratégicas sin costo",
  "Entrega en sprints con demos",
  "Seguimiento post-lanzamiento",
];

// ═══════════════════════════════════════════════════════════════
// Main Contact Component
// ═══════════════════════════════════════════════════════════════

export default function Contacto() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

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

    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20">
      <div className="container-apple">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <Sparkles size={14} />
            Contacto
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Trabajemos{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 dark:from-blue-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Juntos
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400"
          >
            Cuéntame tu idea y diseñemos soluciones precisas, medibles y con un look & feel impecable.
          </motion.p>

          {/* Benefits */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-8"
            variants={fadeInUp}
          >
            {collaborationBenefits.map((benefit) => (
              <span
                key={benefit}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 shadow-sm"
              >
                <CheckCircle2 size={14} className="text-emerald-500" />
                {benefit}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing }}
          >
            <GlassCard className="p-8 md:p-10" hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-white">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Envíame un mensaje
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Respondo en menos de 24 horas
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatedInput
                  id="name"
                  name="name"
                  label="Nombre completo"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />

                <AnimatedInput
                  id="email"
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <AnimatedInput
                  id="message"
                  name="message"
                  label="Mensaje"
                  placeholder="Cuéntame sobre tu proyecto, tiempos y objetivos..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  isTextarea
                  rows={4}
                />

                <GlowButton
                  onClick={() => { }}
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  <Send size={18} />
                </GlowButton>
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing, delay: 0.1 }}
          >
            {/* Contact Info Card */}
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Información de contacto
              </h3>

              <div className="space-y-5">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 6 }}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {item.title}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-900 dark:text-white font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-slate-900 dark:text-white font-semibold">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Social Links Card */}
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Sígueme en redes
              </h3>

              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all ${social.color}`}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <social.icon size={18} />
                      <span className="font-medium">{social.label}</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-400" />
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="/cv.pdf"
                download="Alessandro-Poves-CV.pdf"
                onClick={triggerSimpleConfetti}
                className="inline-flex items-center gap-2 mt-4 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                Descargar CV
              </motion.a>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
