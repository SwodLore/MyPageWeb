import { useState, useEffect, useRef } from "react";
import { Award, ExternalLink, Calendar, Building, User, ChevronDown, ChevronUp } from "lucide-react";
import { certificados } from "../data/certificados";

interface Certificate {
  name: string;
  teacher: string;
  institution: string;
  imgInstitution: string;
  urlCertificate: string;
  dateCertificate: string;
}

export default function Certificado() {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 6; // Mostrar solo los primeros 6
  const gridRef = useRef<HTMLDivElement>(null);

  const displayedCertificados = showAll ? certificados : certificados.slice(0, initialCount);
  const hasMore = certificados.length > initialCount;

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

    if (gridRef.current) {
      observer.observe(gridRef.current);

      // Observe individual certificate cards for staggered animation
      const cards = gridRef.current.querySelectorAll('.certificate-card');
      cards.forEach((card) => {
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, [displayedCertificados]); // Re-run when certificates change

  return (
    <div className="container-apple">
      {/* Certificates Grid */}
      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate">
        {displayedCertificados.map((cert: Certificate, index: number) => (
          <div
            key={index}
            className="certificate-card group bg-white/95 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-slate-600/50 hover:-translate-y-2 scroll-animate"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Certificate Image - Using a certificate icon instead of institution logo */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600">
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative">
                  {/* Certificate Background */}
                  <div className="w-32 h-24 bg-white dark:bg-slate-800 rounded-lg shadow-lg border-4 border-blue-600 flex items-center justify-center">
                    <div className="text-center">
                      <Award size={32} className="text-blue-600 mx-auto mb-2" />
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">CERTIFICADO</div>
                    </div>
                  </div>
                  {/* Ribbon */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-xs">🏆</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Certificate Badge */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-blue-600" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Verificado
                  </span>
                </div>
              </div>
            </div>

            {/* Certificate Content */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 leading-tight">
                  {cert.name}
                </h3>
              </div>

              {/* Certificate Details */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Building size={14} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300 font-medium text-sm">
                    {cert.institution}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <User size={14} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300 text-sm">
                    {cert.teacher}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={14} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300 text-sm">
                    {cert.dateCertificate}
                  </span>
                </div>
              </div>

              {/* Skills/Technologies */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800">
                    Certificación
                  </span>
                  <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-medium rounded-full border border-green-200 dark:border-green-800">
                    Completado
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex gap-3">
                <a
                  href={cert.urlCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm"
                >
                  <ExternalLink size={14} />
                  Ver Certificado
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl group"
          >
            {showAll ? (
              <>
                Ver Menos Certificados
                <ChevronUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
              </>
            ) : (
              <>
                Ver Todos los Certificados ({certificados.length})
                <ChevronDown size={20} className="group-hover:translate-y-0.5 transition-transform duration-300" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Skills Summary Section */}
      <div className="mt-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12 rounded-3xl text-white">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Competencias Certificadas
            </h3>
            <p className="text-blue-100 mb-8 max-w-3xl mx-auto text-lg">
              {certificados.length} certificaciones que respaldan mi experiencia en tecnologías modernas
              y metodologías de desarrollo profesional.
            </p>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {[
                { icon: "🚀", title: "Desarrollo Web", subtitle: "Laravel & React" },
                { icon: "🔒", title: "Ciberseguridad", subtitle: "Ethical Hacking" },
                { icon: "🌐", title: "Redes", subtitle: "CCNA Cisco" },
                { icon: "☕", title: "Backend", subtitle: "PHP & Java" }
              ].map((skill, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h4 className="font-semibold text-white mb-1">{skill.title}</h4>
                  <p className="text-blue-100 text-sm">{skill.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contacto"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Trabajemos Juntos
              </a>
              <a
                href="#portafolio"
                className="bg-transparent border border-white/20 hover:border-white/40 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Ver Proyectos
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}