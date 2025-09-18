import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    if (contactRef.current) {
      observer.observe(contactRef.current);

      // Observe individual contact elements
      const elements = contactRef.current.querySelectorAll('.contact-item');
      elements.forEach((element) => {
        observer.observe(element);
      });
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = `Contacto desde portfolio - ${name}`;
    const body = `Hola Alessandro,\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
    window.open(`mailto:apovesmartinez@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
      <div className="container-apple">
        {/* Section Header - Modern Style */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-6">
            Trabajemos Juntos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ¿Tienes un proyecto interesante? Me encantaría conocer más sobre tus ideas
            y cómo podemos crear algo extraordinario juntos.
          </p>
        </div>

        <div ref={contactRef} className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto scroll-animate">
          {/* Contact Form - Modern Style */}
          <div className="contact-item bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 scroll-animate" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
              Envíame un mensaje
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 shadow-xl flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* Contact Information - Apple Style */}
          <div className="space-y-8">
            {/* Contact Info Card */}
            <div className="contact-item bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 scroll-animate" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
                Información de contacto
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                    <Mail size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Email</p>
                    <a
                      href="mailto:apovesmartinez@gmail.com"
                      className="text-gray-800 dark:text-white hover:text-blue-500 transition-colors duration-200 font-medium"
                    >
                      apovesmartinez@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Ubicación</p>
                    <p className="text-gray-800 dark:text-white font-medium">Huancayo, Perú</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center">
                    <Phone size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">WhatsApp</p>
                    <a
                      href="https://wa.me/51977776058"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 dark:text-white hover:text-green-600 transition-colors duration-200 font-medium"
                    >
                      +51 977 776 058
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Sígueme en redes
              </h3>

              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/in/alessandro-piero-poves-martinez-524467318/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-600/60 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin size={20} className="text-blue-600" />
                    <span className="font-medium text-gray-800 dark:text-white">LinkedIn</span>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                </a>

                <a
                  href="https://github.com/SwodLore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600/60 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <Github size={20} className="text-gray-700 dark:text-gray-300" />
                    <span className="font-medium text-gray-800 dark:text-white">GitHub</span>
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200" />
                </a>
              </div>
            </div>

            {/* CV Download Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">
                Mi Currículum Vitae
              </h3>
              <p className="text-blue-100 mb-6">
                Descarga mi CV para conocer más sobre mi experiencia y habilidades técnicas.
              </p>
              <Link
                to="/cv.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-200 hover:scale-105"
              >
                <Download size={18} />
                Descargar CV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
