import { useState } from "react";
import { certificados } from "../data/certificados";

export default function Certificado() {
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const certificadosVisibles = mostrarTodos ? certificados : certificados.slice(0, 3);
  return (
    <div className="text-white pt-10 pb-10">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {certificadosVisibles.map((cert, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg border-l-4 border-[#61DAFB] shadow-md">
            <img src={cert.imgInstitution} alt={cert.institution} className="h-10 mb-2" />
            <h3 className="text-xl font-semibold">{cert.name}</h3>
            <p className="text-gray-400">🎓 {cert.institution}</p>
            <p className="text-gray-400">👨‍🏫 {cert.teacher}</p>
            <p className="text-gray-400">📅 {cert.dateCertificate}</p>

            <a
              href={cert.urlCertificate}
              target="_blank"
              className="mt-3 block text-center bg-[#61DAFB] text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-[#4bb0d7]"
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
            className="bg-[#61DAFB] text-gray-900 px-6 py-2 rounded-lg font-bold hover:bg-[#4bb3d6] transition-all cursor-pointer"
              >
              {mostrarTodos ? "Ver menos" : "Ver más"}
          </button>
        </div>
      )}
    </div>
  )
}
