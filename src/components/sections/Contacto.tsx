import { useCallback, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { GlowButton, GlassCard, Input, Textarea, Label } from "@/components/ui";
import { triggerSimpleConfetti } from "@/lib/confetti";
import { personal } from "@/data/personal";
import { SOCIAL_LINKS } from "@/data/navigation";

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
// Form Field — compone Label + Input/Textarea de ui/
// El estado de foco lo maneja CSS (:focus y group-focus-within)
// ═══════════════════════════════════════════════════════════════

interface FormFieldProps {
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

function FormField({
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
}: FormFieldProps) {
  const commonProps = { id, name, value, onChange, required, placeholder };

  return (
    <m.div className="group space-y-2" variants={fadeInUp}>
      <Label
        htmlFor={id}
        className="group-focus-within:text-accent-600 dark:group-focus-within:text-accent-400"
      >
        {label}
      </Label>
      {isTextarea ? (
        <Textarea {...commonProps} rows={rows} />
      ) : (
        <Input {...commonProps} type={type} />
      )}
    </m.div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Contact Info Card
// ═══════════════════════════════════════════════════════════════

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    color: "text-accent-500 bg-accent-100 dark:bg-accent-900/30"
  },
  {
    icon: Phone,
    title: "WhatsApp",
    value: personal.phone,
    href: `https://wa.me/${personal.whatsapp}`,
    color: "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30"
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: personal.location,
    color: "text-accent-500 bg-accent-100 dark:bg-accent-900/30"
  },
];

/* Presentación local sobre los links canónicos de data/navigation */
const SOCIAL_HOVER: Record<string, string> = {
  LinkedIn: "hover:bg-accent-50 hover:border-accent-300 dark:hover:bg-accent-900/20 dark:hover:border-accent-700",
  GitHub: "hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-600",
};

const socialLinks = SOCIAL_LINKS
  .filter((link) => link.name in SOCIAL_HOVER)
  .map((link) => ({ ...link, color: SOCIAL_HOVER[link.name] }));

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
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (submitTimerRef.current) clearTimeout(submitTimerRef.current); }, []);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const { name, email, message } = formData;
    const text = [
      "Hola Alessandro 👋",
      "",
      "Quiero conversar sobre un proyecto:",
      `Nombre: ${name}`,
      `Correo: ${email}`,
      "Mensaje:",
      message,
    ].join("\n");

    const url = `https://wa.me/${personal.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    if (submitTimerRef.current) clearTimeout(submitTimerRef.current);
    submitTimerRef.current = setTimeout(() => setIsSubmitting(false), 1000);
  }, [formData]);

  return (
    <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-accent-50/30 dark:from-night-950 dark:via-night-900 dark:to-accent-950/20">
      <div className="container-page">
        {/* Section Header */}
        <m.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <m.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100/80 dark:bg-accent-900/30 border border-accent-200/50 dark:border-accent-700/50 text-accent-700 dark:text-accent-300 text-sm font-medium mb-6"
          >
            <Sparkles size={14} />
            Contacto
          </m.span>

          <m.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Trabajemos{" "}
            <span className="text-accent-600 dark:text-accent-400">
              Juntos
            </span>
          </m.h2>

          <m.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400"
          >
            Cuéntame tu idea y diseñemos soluciones precisas, medibles y con un look & feel impecable.
          </m.p>

          {/* Benefits */}
          <m.div
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
          </m.div>
        </m.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Form */}
          <m.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing }}
          >
            <GlassCard className="p-8 md:p-10" hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500 text-white">
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
                <FormField
                  id="name"
                  name="name"
                  label="Nombre completo"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />

                <FormField
                  id="email"
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <FormField
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
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  <Send size={18} />
                </GlowButton>
              </form>
            </GlassCard>
          </m.div>

          {/* Contact Info & Social */}
          <m.div
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
                  <m.div
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
                          className="text-slate-900 dark:text-white font-semibold hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-slate-900 dark:text-white font-semibold">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </m.div>
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
                  <m.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all ${social.color}`}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                      <social.icon size={18} />
                      <span className="font-medium">{social.name}</span>
                    </div>
                    <ArrowRight size={16} className="text-slate-400" />
                  </m.a>
                ))}
              </div>

              <m.a
                href="/cv.pdf"
                download="Alessandro-Poves-CV.pdf"
                onClick={triggerSimpleConfetti}
                className="inline-flex items-center gap-2 mt-4 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                Descargar CV
              </m.a>
            </GlassCard>
          </m.div>
        </div>
      </div>
    </section>
  );
}
