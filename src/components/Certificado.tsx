import { useState } from "react";
import { certificados } from "../data/certificados";

export default function Certificado() {
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const certificadosVisibles = mostrarTodos ? certificados : certificados.slice(0, 3);
  return (
    <div className="text-white pt-10 pb-10">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {certificadosVisibles.map((cert, index) => (
          <div key={index} className="dark:bg-gray-800 bg-slate-200 p-4 rounded-lg border-l-4 dark:border-[#61DAFB] border-[#007acc] shadow-md">
            <img src={cert.imgInstitution} alt={cert.institution} className="h-10 mb-2" />
            <h3 className="text-xl font-semibold dark:text-white text-black">{cert.name}</h3>
            <p className="dark:text-gray-400 text-gray-800">🎓 {cert.institution}</p>
            <p className="dark:text-gray-400 text-gray-800">👨‍🏫 {cert.teacher}</p>
            <p className="dark:text-gray-400 text-gray-800">📅 {cert.dateCertificate}</p>

            <a
              href={cert.urlCertificate}
              target="_blank"
              className="mt-3 block text-center dark:bg-[#61DAFB] bg-[#007acc] text-gray-900 px-4 py-2 rounded-lg font-semibold dark:hover:bg-[#4bb3d6] hover:bg-[#007acce5]"
            >
              📄 Ver Certificado
            </a>
          </div>
        ))}
      </div>
      {certificados.length > 3 && (
        <div className="flex flex-col items-center mt-6">
          <button
            onClick={() => setMostrarTodos(!mostrarTodos)}
            className="dark:bg-[#61DAFB] bg-[#007acc] text-gray-900 px-6 py-2 rounded-lg font-bold dark:hover:bg-[#4bb3d6] hover:bg-[#007acce5] transition-all cursor-pointer"
              >
              {mostrarTodos ? "Ver menos" : "Ver más"}
          </button>
        </div>
      )}
    </div>
  )
}
