import { skills } from "../data/skills";

export default function SkillsAboutMe() {
  return (
    <div className="dark:bg-gray-900 bg-slate-200 p-10 grid md:grid-cols-2">
        
        <div>
            <h3 className="text-3xl font-bold dark:text-[#61DAFB] text-[#007acc] text-center">💻 Habilidades Técnicas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-12 px-6">
            {skills.map((skill, index) => (
            <div
                key={index}
                className="flex flex-col items-center p-3 bg-gray-800 rounded-md border dark:border-[#61DAFB] border-[#007acc] text-white text-center"
            >
                <img src={skill.img} alt={skill.name} className="w-12 h-12 mb-1" />
                <p className="text-sm font-medium">{skill.name}</p>
                <span className="text-xs text-gray-400">{skill.level}</span>
            </div>
            ))}
            </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 dark:border-[#61DAFB] border-[#007acc]">
        <h3 className="text-3xl font-bold dark:text-[#61DAFB] text-[#007acc] text-center"> 🤝 Habilidades Blandas</h3>
        <ul className="space-y-3 mt-4">
            <li className="flex items-center gap-3 text-white">
                <span className="text-xl">💬</span> Comunicación efectiva
            </li>
            <li className="flex items-center gap-3 text-white">
                <span className="text-xl">👥</span> Trabajo en equipo
            </li>
            <li className="flex items-center gap-3 text-white">
                <span className="text-xl">🎯</span> Resolución de problemas
            </li>
            <li className="flex items-center gap-3 text-white">
                <span className="text-xl">🧠</span> Pensamiento crítico
            </li>
            <li className="flex items-center gap-3 text-white">
                <span className="text-xl">⏳</span> Gestión del tiempo
            </li>
            <li className="flex items-center gap-3 text-white">
                <span className="text-xl">🎨</span> Creatividad e innovación
            </li>
            <li className="flex items-center gap-3 text-white">
                <span className="text-xl">📚</span> Aprendizaje continuo
            </li>
            <li className="flex items-center gap-3 text-white">
                <span className="text-xl">💡</span> Adaptabilidad y flexibilidad
            </li>
            <li className="flex items-center gap-3 text-white">
                <span className="text-xl">🤝</span> Liderazgo y empatía
            </li>
        </ul>
            <div className="p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-3xl font-bold dark:text-[#61DAFB] text-[#007acc] text-center">👨‍💻 Sobre Mí</h3>
            <p className="text-white mt-4 text-lg text-center">
                Soy un apasionado desarrollador de software con experiencia en tecnologías web y backend. Me encanta aprender nuevas herramientas y 
                afrontar desafíos tecnológicos. Destaco por mi capacidad de resolver problemas, trabajar en equipo y adaptarme a nuevos entornos. 
                Siempre busco mejorar mis habilidades y contribuir con soluciones eficientes y creativas.
            </p>
        </div>
        </div>
        
    </div>
  )
}
