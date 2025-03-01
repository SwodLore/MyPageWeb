import { Link } from "react-router-dom";

export default function CvPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">📄 Mi Currículum Vitae</h1>
      <iframe
        src="/cv.pdf"
        className="w-3/4 h-[80vh] border-2 border-[#61DAFB] rounded-lg shadow-lg"
      ></iframe>
      
      <a
        href="/cv.pdf"
        target="_blank"
        className="mt-4 px-6 py-3 bg-[#61DAFB] text-gray-900 font-semibold rounded-lg hover:bg-[#4bb0d7]"
      >
        📥 Descargar CV
      </a>

      <Link to="/" className="mt-2 text-[#61DAFB] underline mb-5">
        🔙 Volver al inicio
      </Link>
    </div>
  )
}
