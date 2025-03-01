
export default function DashboardView() {
  return (
    <>
      <section id="sobre-mi" className="py-16 px-8 md:px-20 bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        
        <div className="relative w-52 h-52 md:w-64 md:h-64">
          <img
            src="/profile.jpg"
            alt="Alessandro Poves"
            className="w-full h-full object-cover rounded-full border-4 border-[#61DAFB] shadow-lg"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold text-[#61DAFB] mb-4">Sobre Mí</h2>
          <p className="text-lg text-gray-300">
            ¡Hola! Soy <span className="text-white font-semibold">Alessandro Poves</span>, un apasionado por el desarrollo web y la tecnología.  
            Me especializo en backend con Laravel y Spring Boot, y estoy aprendiendo frontend con React y Angular.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-[#61DAFB] shadow-md">
              <h3 className="text-xl font-semibold"> <img src="https://uncp.edu.pe/wp-content/uploads/2024/01/logo-uncp-2024.png" alt="Logo de la UNCP" /> Universidad Nacional del Centro del Perú</h3>
              <p className="text-gray-400">Ingeniería de Sistemas - 7mo ciclo</p>
              
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-[#61DAFB] shadow-md">
              <h3 className="text-xl font-semibold"><img src="https://aulavirtual.icpnarc.edu.pe/pluginfile.php/1/theme_moove/logo/1739894532/logo-icpna.jpg" alt="Logo ICPNA" /> Instituto Cultural Peruano Norteamericano</h3>
              <p className="text-gray-400">Ingles - Intermedio - TOEFL B2</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-[#61DAFB] shadow-md">
              <h3 className="text-xl font-semibold">📜 Cursos Destacados</h3>
              <p className="text-gray-400">Laravel, Spring Boot, Redes y Seguridad Informática <a href="">Ver mas</a></p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-3xl font-bold text-[#61DAFB] text-center mb-6">💻 Habilidades Técnicas</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Laravel", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/800px-Laravel.svg.png" },
            { name: "Spring Boot", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
            { name: "MySQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" },
            { name: "SQL Server", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain-wordmark.svg" },
            { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
            { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "AWS", img: "https://tesslogs.com/wp-content/uploads/2024/10/Amazon-Web-Services-AWS-Logo.png" },
            { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
            { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }
          ].map((skill, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-md border border-[#61DAFB] transform transition-all hover:scale-105 hover:shadow-lg">
              <img src={skill.img} alt={skill.name} className="w-16 h-16 mb-2" />
              <p className="text-lg font-semibold">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
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
