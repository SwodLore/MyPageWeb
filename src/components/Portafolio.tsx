import { useState } from "react";
import Modal from "./Modal";
import { Portfolio } from "../types";
import { portafolio } from "../data/portafolios";

export default function Portafolio() {
    const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (project: Portfolio) => {
        setSelectedProject(project);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedProject(null);
    };
    const [mostrarTodos, setMostrarTodos] = useState(false);
    const proyectosVisibles = mostrarTodos ? portafolio : portafolio.slice(0, 6);
  return (
    <section className="py-12 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#61DAFB]">Mi Portafolio</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectosVisibles.map((proyecto, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-5 border-l-4 border-[#61DAFB] hover:scale-[1.02] transition-transform">
              <h3 className="text-xl font-semibold">{proyecto.name}</h3>
              <div className="flex gap-2 flex-wrap my-3">
                {proyecto.tecnologias.map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-lg">
                    <img src={tech.img} alt={tech.name} className="w-5 h-5" />
                    <span className="text-sm">{tech.name}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openModal(proyecto)}
                className="bg-[#61DAFB] text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-[#4bb3d6] cursor-pointer"
              >
                📜 Ver más detalle
              </button>
            </div>
          ))}
        </div>
        {portafolio.length > 6 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setMostrarTodos(!mostrarTodos)}
              className="bg-[#61DAFB] text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-[#4bb3d6] transition-all cursor-pointer"
            >
              {mostrarTodos ? "Ver menos" : "Ver más"}
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} project={selectedProject} />
    </section>
  )
}
