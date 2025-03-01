
export default function DashboardView() {
  return (
    <>
      <section id="sobre-mí" className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
        <h2 className="text-4xl font-bold text-[#61DAFB]">Sobre Mí</h2>
        <p className="text-lg max-w-2xl text-center mt-4">Aquí puedes escribir sobre ti, tu experiencia y habilidades.</p>
      </section>

      <section id="portafolio" className="min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white">
        <h2 className="text-4xl font-bold text-[#61DAFB]">Portafolio</h2>
        <p className="text-lg max-w-2xl text-center mt-4">Aquí puedes mostrar tus proyectos con imágenes y descripciones.</p>
      </section>

      <section id="certificados" className="min-h-screen flex flex-col justify-center items-center bg-gray-700 text-white">
        <h2 className="text-4xl font-bold text-[#61DAFB]">Certificados</h2>
        <p className="text-lg max-w-2xl text-center mt-4">Muestra los certificados y logros que has obtenido.</p>
      </section>

      <section id="contacto" className="min-h-screen flex flex-col justify-center items-center bg-gray-600 text-white">
        <h2 className="text-4xl font-bold text-[#61DAFB]">Contacto</h2>
        <p className="text-lg max-w-2xl text-center mt-4">Déjame tu mensaje o contáctame en mis redes sociales.</p>
      </section>
    </>
  )
}
