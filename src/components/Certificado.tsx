import { certificados } from "../data/certificados";

export default function Certificado() {
  return (
    <div className="min-h-screen bg-gray-700 text-white py-10">
      <h1 className="text-3xl font-bold text-center mb-8">📜 Mis Certificados</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {certificados.map((cert, index) => (
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
    </div>
  )
}
