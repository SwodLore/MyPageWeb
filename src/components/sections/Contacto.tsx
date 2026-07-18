import { useCallback, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import {
  CheckCheck,
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
// iPhone con la conversación de WhatsApp en vivo: refleja lo que
// el visitante escribe en el formulario, burbuja a burbuja.
// CSS puro + profile.webp (ya cargada en el hero) — costo ~cero.
// ═══════════════════════════════════════════════════════════════

const CHAT_TIME = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

interface PhoneMockupProps {
  name: string;
  email: string;
  message: string;
}

function PhoneMockup({ name, email, message }: PhoneMockupProps) {
  const hasDraft = Boolean(name.trim() || email.trim() || message.trim());

  return (
    <div className="relative w-[280px] shrink-0 overflow-hidden rounded-[2.6rem] border-[6px] border-night-700 bg-night-950 shadow-2xl shadow-accent-500/15">
      {/* Isla dinámica */}
      <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />

      {/* Header del chat */}
      <div className="border-b border-night-700 bg-night-900 px-4 pb-3 pt-10">
        <div className="flex items-center gap-2.5">
          <img src="/profile.webp" alt="" className="h-9 w-9 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Alessandro Poves</p>
            <p className="flex items-center gap-1 text-[10px] text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              en línea
            </p>
          </div>
        </div>
      </div>

      {/* Conversación */}
      <div className="flex h-[290px] flex-col gap-2 overflow-y-auto p-3 text-[13px] leading-snug" data-lenis-prevent>
        {/* Mensaje entrante fijo */}
        <div className="max-w-[85%] self-start rounded-2xl rounded-tl-sm bg-night-800 px-3 py-2 text-slate-200">
          ¡Hola! 👋 Cuéntame sobre tu proyecto — respondo en menos de 24 horas.
          <span className="mt-1 block text-right text-[9px] text-slate-500">{CHAT_TIME}</span>
        </div>

        {/* Borrador en vivo del visitante */}
        {hasDraft ? (
          <div className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-accent-600 px-3 py-2 text-white">
            {name.trim() && (
              <p>
                Hola, soy <strong>{name}</strong> 👋
              </p>
            )}
            {email.trim() && <p className="text-white/80">{email}</p>}
            {message.trim() && <p className="mt-1 whitespace-pre-wrap">{message}</p>}
            <span className="mt-1 flex items-center justify-end gap-1 text-[9px] text-white/70">
              {CHAT_TIME}
              <CheckCheck size={11} />
            </span>
          </div>
        ) : (
          <div className="max-w-[85%] self-end rounded-2xl rounded-tr-sm border border-dashed border-night-700 px-3 py-2 italic text-slate-500">
            Tu mensaje aparecerá aquí mientras escribes…
          </div>
        )}
      </div>

      {/* Barra de escritura (decorativa) */}
      <div className="border-t border-night-700 bg-night-900 p-3">
        <div className="rounded-full bg-night-800 px-4 py-2 text-xs text-slate-500">
          Escribe usando el formulario
        </div>
      </div>
    </div>
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

          {/* iPhone con el chat en vivo + contacto compacto */}
          <m.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easing, delay: 0.1 }}
          >
            <PhoneMockup
              name={formData.name}
              email={formData.email}
              message={formData.message}
            />

            {/* Contacto compacto: datos + redes + CV */}
            <GlassCard className="w-full p-5" hover={false}>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
                {contactItems.map((item) =>
                  item.href ? (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                    >
                      <item.icon size={15} className="text-accent-500" />
                      {item.value}
                    </a>
                  ) : (
                    <span
                      key={item.title}
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
                    >
                      <item.icon size={15} className="text-accent-500" />
                      {item.value}
                    </span>
                  )
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 border-t border-slate-200 dark:border-night-700 pt-4">
                {socialLinks.map((social) => (
                  <m.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 dark:border-night-700 bg-white dark:bg-night-800 text-slate-500 dark:text-slate-400 hover:border-accent-500/50 hover:text-accent-500 transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={16} />
                  </m.a>
                ))}
                <m.a
                  href="/cv.pdf"
                  download="Alessandro-Poves-CV.pdf"
                  onClick={triggerSimpleConfetti}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-night-700 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-accent-500/50 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={15} />
                  Descargar CV
                </m.a>
              </div>
            </GlassCard>
          </m.div>
        </div>
      </div>
    </section>
  );
}
