import { Portfolio } from "../types";
import { X } from "lucide-react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    project: Portfolio | null;
}
export default function Modal({ isOpen, onClose, project }: ModalProps) {
    if (!isOpen || !project) return null;
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };
    return (

      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={handleOverlayClick}
      >
        <div className="bg-gray-900 text-white p-6 rounded-lg w-[90%] max-w-lg lg:max-w-3xl relative shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
  
          <img
            src={project.img}
            alt={project.name}
            className="rounded-lg mb-4 w-full h-48 lg:h-84 2xl:h-96 object-cover"
          />
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="text-gray-400 mb-3">{project.description}</p>
  
          <h3 className="text-lg font-semibold mb-2">🛠 Tecnologías:</h3>
          <div className="flex gap-3 flex-wrap">
            {project.tecnologias.map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-lg"
              >
                <img src={tech.img} alt={tech.name} className="w-5 h-5" />
                <span className="text-sm">{tech.name}</span>
              </div>
            ))}
          </div>
  
          <div className="flex gap-3 mt-4">
            <a
              href={project.urlPageWeb}
              target="_blank"
              className="bg-[#61DAFB] text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-[#4bb3d6]"
            >
              🌍 Ver Proyecto
            </a>
            <a
              href={project.urlPageGithub}
              target="_blank"
              className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600"
            >
              💻 Código
            </a>
          </div>
        </div>
      </div>
  )
}
