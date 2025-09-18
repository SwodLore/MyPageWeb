import { skills } from "../data/skills";
import { Code, Heart, User, Star, Zap } from "lucide-react";

export default function SkillsAboutMe() {
  const softSkills = [
    { icon: "💬", name: "Comunicación efectiva", description: "Capacidad para transmitir ideas de forma clara" },
    { icon: "👥", name: "Trabajo en equipo", description: "Colaboración efectiva con equipos multidisciplinarios" },
    { icon: "🎯", name: "Resolución de problemas", description: "Análisis y solución de desafíos complejos" },
    { icon: "🧠", name: "Pensamiento crítico", description: "Evaluación objetiva y toma de decisiones" },
    { icon: "⏳", name: "Gestión del tiempo", description: "Organización y priorización eficiente" },
    { icon: "🎨", name: "Creatividad e innovación", description: "Búsqueda de soluciones originales" },
    { icon: "📚", name: "Aprendizaje continuo", description: "Actualización constante de conocimientos" },
    { icon: "💡", name: "Adaptabilidad", description: "Flexibilidad ante cambios y nuevos entornos" },
    { icon: "🤝", name: "Liderazgo y empatía", description: "Guía de equipos con comprensión humana" }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-cyan-50/30 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container-apple">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6">
            Habilidades & Experiencia
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Una combinación de competencias técnicas y habilidades blandas que me permiten
            crear soluciones tecnológicas excepcionales.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Technical Skills */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                <Code size={24} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Habilidades Técnicas
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="group bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-blue-50 dark:hover:bg-gray-600/60 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <img
                      src={skill.img}
                      alt={skill.name}
                      className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {skill.name}
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${
                          i < parseInt(skill.level)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Nivel {skill.level}/5
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center">
                <Heart size={24} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Habilidades Blandas
              </h3>
            </div>

            <div className="space-y-4">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="group p-4 bg-gray-50/80 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl hover:bg-purple-50 dark:hover:bg-gray-600/60 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg">{skill.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        {skill.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Sobre Mí
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed text-blue-100 mb-6">
              Soy un <strong className="text-white">desarrollador full stack apasionado</strong> con experiencia en tecnologías
              web modernas y backend robusto. Mi enfoque se centra en crear experiencias digitales excepcionales
              que combinen funcionalidad, rendimiento y diseño elegante.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center gap-3">
                <Zap className="text-yellow-300 flex-shrink-0" size={20} />
                <span className="text-blue-100">Soluciones eficientes</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="text-red-300 flex-shrink-0" size={20} />
                <span className="text-blue-100">Trabajo colaborativo</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="text-yellow-300 flex-shrink-0" size={20} />
                <span className="text-blue-100">Calidad premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
