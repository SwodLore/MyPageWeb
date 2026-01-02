import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portfolio } from "../types";
import { X, ExternalLink, Github, Layers, Sparkles } from "lucide-react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    project: Portfolio | null;
}

export default function Modal({ isOpen, onClose, project }: ModalProps) {
    // Handle body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
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

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-50 overflow-y-auto"
                onClick={handleOverlayClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
                    <motion.div
                        className="relative w-full max-w-3xl bg-slate-900 rounded-2xl md:rounded-3xl shadow-2xl shadow-black/50 border border-slate-800/50 overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <motion.button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 border border-slate-700/50 hover:border-slate-600"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <X size={20} className="text-slate-300" />
                        </motion.button>

                        {/* Project Image */}
                        <div className="relative bg-slate-800 p-4 md:p-6">
                            {/* Badge */}
                            <div className="absolute top-6 left-6 z-10 px-3 py-1.5 bg-cyan-500/20 backdrop-blur-sm rounded-lg border border-cyan-500/30">
                                <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                                    <Sparkles size={12} />
                                    Vista Previa
                                </span>
                            </div>

                            {/* Image Container with frame - smaller with padding */}
                            <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border-2 border-slate-600/50">
                                {project.img ? (
                                    <img
                                        src={project.img}
                                        alt={project.name}
                                        className="w-full h-full object-contain"
                                        loading="eager"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                                <Github size={32} className="text-white" />
                                            </div>
                                            <span className="text-slate-500 text-sm">Sin vista previa</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 space-y-6">
                            {/* Title & Description */}
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                    {project.name}
                                </h2>
                                <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {/* Technologies Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                                        <Layers size={18} className="text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">
                                        Tecnologías Utilizadas
                                    </h3>
                                </div>

                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {project.tecnologias.map((tech, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            whileHover={{ y: -3, scale: 1.05 }}
                                            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-200"
                                        >
                                            <img
                                                src={tech.img}
                                                alt={tech.name}
                                                className="w-8 h-8 object-contain"
                                                loading="lazy"
                                            />
                                            <span className="text-xs font-medium text-slate-300 text-center leading-tight">
                                                {tech.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
                                {project.urlPageWeb && (
                                    <motion.a
                                        href={project.urlPageWeb}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ExternalLink size={18} />
                                        Ver Proyecto
                                    </motion.a>
                                )}
                                {project.urlPageGithub && (
                                    <motion.a
                                        href={project.urlPageGithub}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 hover:border-slate-600 transition-all"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Github size={18} />
                                        Ver Código
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
