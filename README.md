# 🚀 Portfolio Personal - Alessandro Poves

Este es el repositorio oficial del sitio web personal de **Alessandro Poves**. Un portafolio moderno, interactivo y altamente optimizado diseñado para mostrar habilidades, proyectos y experiencia en desarrollo Full Stack y Ciberseguridad.

![Banner](public/og-image.png)

## ✨ Características Principales

*   **🎨 Diseño UI/UX Moderno**: Interfaz limpia con soporte nativo para **Modo Oscuro/Claro**, efectos de vidrio (Glassmorphism) y gradientes dinámicos.
*   **📱 Mobile-First & Responsivo**: Totalmente adaptado a cualquier tamaño de pantalla, desde móviles hasta grandes monitores.
*   **⚡ Rendimiento Extremo**:
    *   **Puntaje Lighthouse 90+** en Mobile y Desktop.
    *   **Animaciones CSS Nativas**: Reemplazo de animaciones JS pesadas para liberar el Main Thread.
    *   **Lazy Loading**: Carga diferida inteligente de secciones pesadas (Portafolio, Certificados).
*   **🖱️ Experiencia de Usuario**:
    *   **Scroll Guiado Inteligente**: Sistema que orienta suavemente la navegación del usuario.
    *   **Navegación Fluida**: Transiciones suaves entre secciones sin recargas.
*   **🛠️ Tech Stack de Vanguardia**: Construido con las últimas versiones de React y herramientas modernas.

---

## 🛠️ Tecnologías

Este proyecto utiliza un stack robusto y moderno para garantizar mantenibilidad y performance:

### Core:
*   **[React 19](https://react.dev/)**: Biblioteca principal para la UI.
*   **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático para mayor seguridad y escalabilidad.
*   **[Vite](https://vitejs.dev/)**: Build tool de próxima generación, ultra rápido.

### Estilos y Diseño:
*   **[TailwindCSS 4.0](https://tailwindcss.com/)**: Motor de estilos utility-first con configuración personalizada.
*   **[Shadcn/UI](https://ui.shadcn.com/)**: Componentes de UI reutilizables y accesibles.
*   **[Framer Motion](https://www.framer.com/motion/)**: Biblioteca para gestos y animaciones complejas (uso optimizado).
*   **CSS Modules / Keyframes**: Para animaciones de alto rendimiento (GPU accelerated).

### Herramientas Adicionales:
*   **Lucide React**: Iconografía consistente y ligera.
*   **Vercel Analytics**: Monitoreo de tráfico y performance.
*   **ESLint / Prettier**: Estándares de calidad de código.

---

## 📂 Estructura del Proyecto

La arquitectura sigue las mejores prácticas para aplicaciones React escalables:

```bash
src/
├── components/          # Componentes reutilizables
│   ├── magicui/         # Componentes de efectos especiales
│   ├── ui/              # Componentes base (botones, inputs, etc.)
│   ├── Header.tsx       # Navegación principal
│   ├── DashboardView.tsx # Vista principal (Hero, Stats)
│   └── ...
├── data/                # Datos estáticos (proyectos, certificados)
│   ├── portafolios.ts
│   └── certificados.ts
├── hooks/               # Custom Hooks (Lógica reutilizable)
│   ├── useGuidedScroll.ts
│   └── useTheme.ts
├── types/               # Definiciones de tipos TypeScript
└── index.css            # Estilos globales y variables CSS
```

---

## 🚀 Instalación y Desarrollo

Sigue estos pasos para ejecutar el proyecto localmente:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/SwodLore/MyPageWeb.git
    cd MyPageWeb
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Visita `http://localhost:5173` en tu navegador.

4.  **Construir para producción:**
    ```bash
    npm run build
    ```

5.  **Previsualizar build:**
    ```bash
    npm run preview
    ```

---

## 📈 Optimizaciones Recientes

### Mejora de Performance Mobile (2025)
Se realizó una auditoría profunda para mejorar la experiencia en dispositivos móviles:
*   ✅ **Reducción de TBT (Total Blocking Time)**: Migración de animaciones continuas de JS a CSS.
*   ✅ **Eliminación de Layout Shifts**: Corrección de dimensiones en imágenes y contenedores para evitar saltos (CLS).
*   ✅ **Optimización de Assets**: Uso de formatos modernos y carga condicional.

---

## 👨‍💻 Autor

**Alessandro Poves** - *Full Stack Developer & Cybersecurity Enthusiast*

*   🌐 **GitHub**: [SwodLore](https://github.com/SwodLore)
*   💼 **Portfolio**: [alessandropoves.com](https://alessandropoves.com)

---

Hecho con ❤️ usando React y TypeScript.
