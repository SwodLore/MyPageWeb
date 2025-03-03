import { skills } from "../data/skills";

export default function SkillsAboutMe() {
  return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-900 py-20 px-10">
            {skills.map((skill, index) => (
                <div
                    key={index} 
                    className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md border border-[#61DAFB] transform transition-all hover:scale-105 hover:shadow-lg text-white relative overflow-hidden">
                    
                    <img src={skill.img} alt={skill.name} className="w-16 h-16 mb-2" />
                    <p className="text-lg font-semibold">{skill.name}</p>
                </div>
            ))}
        </div>
  )
}
