import { Portfolio } from "../types";
import { X, ExternalLink, Github, Code, Layers } from "lucide-react";
import { useEffect } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    project: Portfolio | null;
}

export default function Modal({ isOpen, onClose, project }: ModalProps) {
    // Manejar el scroll del body
    useEffect(() => {
        if (isOpen) {
            // Bloquear scroll cuando se abre
            document.body.style.overflow = 'hidden';
        } else {
            // Restaurar scroll cuando se cierra
            document.body.style.overflow = 'auto';
        }

        // Cleanup al desmontar - siempre restaurar
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-2xl z-50 animate-fade-in overflow-y-auto"
            onClick={handleOverlayClick}
        >
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-gradient-to-br from-white/98 via-gray-50/95 to-blue-50/90 dark:from-gray-800/98 dark:via-gray-900/95 dark:to-slate-900/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl max-h-[80vh] overflow-y-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] border border-white/60 dark:border-gray-700/60 animate-scale-in relative overflow-hidden">
                {/* Header */}
                <div className="relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-white/90 via-gray-50/80 to-white/90 dark:from-gray-700/90 dark:via-gray-800/80 dark:to-gray-700/90 hover:from-white hover:to-gray-50 dark:hover:from-gray-600 dark:hover:to-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/50 dark:border-gray-600/50 group"
                    >
                        <X size={16} className="sm:w-5 sm:h-5 md:w-5 md:h-5 text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200" />
                    </button>

                    {/* Project Image */}
                    <div className="relative aspect-[16/9] sm:aspect-[16/9] md:aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue-100/60 via-purple-100/40 to-cyan-100/50 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-cyan-950/25 rounded-t-2xl sm:rounded-t-3xl">
                        {project.img ? (
                            <img
                                src={project.img}
                                alt={project.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/30 via-purple-500/25 to-cyan-500/30 relative">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                                    <div className="relative bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-600/30">
                                        <Code size={72} className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 px-2 py-1 sm:px-3 sm:py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full border border-white/50 dark:border-gray-600/50">
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Vista Previa</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 md:p-8 lg:p-10 relative">
                    {/* Project Title & Description */}
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 leading-tight">
                            {project.name}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-200 leading-relaxed mb-4 sm:mb-6 md:mb-8">
                            {project.description}
                        </p>
                    </div>

                    {/* Technologies Section */}
                    <div className="mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500/30 via-purple-500/25 to-cyan-500/30 dark:from-blue-400/30 dark:via-purple-400/25 dark:to-cyan-400/30 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl border border-blue-200/50 dark:border-blue-600/50 backdrop-blur-sm">
                                <Layers size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                                Tecnologías Utilizadas
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                            {project.tecnologias.map((tech, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gradient-to-br from-white/80 via-white/60 to-gray-50/80 dark:from-gray-700/50 dark:via-gray-800/40 dark:to-gray-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 flex flex-col items-center gap-1 sm:gap-2 md:gap-3 hover:from-blue-50/90 hover:via-purple-50/70 hover:to-cyan-50/90 dark:hover:from-gray-600/60 dark:hover:via-gray-700/50 dark:hover:to-gray-800/60 transition-all duration-300 border border-white/50 dark:border-gray-600/40 hover:scale-105 sm:hover:scale-110 hover:shadow-xl hover:-translate-y-1 group"
                                >
                                    <img
                                        src={tech.img}
                                        alt={tech.name}
                                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                        {project.urlPageWeb && (
                            <a
                                href={project.urlPageWeb}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden group text-sm sm:text-base"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                <ExternalLink size={16} className="sm:w-5 sm:h-5 relative z-10" />
                                Ver Proyecto
                            </a>
                        )}
                        {project.urlPageGithub && (
                            <a
                                href={project.urlPageGithub}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-black dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 dark:hover:from-gray-500 dark:hover:via-gray-600 dark:hover:to-gray-700 text-white px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-gray-500/25 flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden group text-sm sm:text-base"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                <Github size={16} className="sm:w-5 sm:h-5 relative z-10" />
                                Ver Código
                            </a>
                        )}
                    </div>

                </div>
                </div>
            </div>
        </div>
    );
}
