# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Alessandro Poves, showcasing skills, projects, certificates, and contact information. Built as a modern React SPA with TypeScript, featuring a responsive design with dark/light theme support.

## Key Technologies & Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: TailwindCSS 4.0 with custom theming
- **Routing**: React Router DOM 7.2
- **UI Components**: Custom components with shadcn/ui configuration
- **Animations**: Motion library (Framer Motion) + custom magic UI components
- **Analytics**: Vercel Analytics integration
- **Icons**: Lucide React

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Project Architecture

### Core Structure
- **Entry Point**: `src/main.tsx` → `src/router.tsx` → `src/components/AppLayout.tsx`
- **Routing**: Single-page application with two main routes:
  - `/` - Dashboard view (main portfolio page)
  - `/skills` - Detailed skills page
- **Theme System**: Context-based theme provider with localStorage persistence

### Component Organization
- **Layout Components**: `AppLayout.tsx`, `Header.tsx`, `Footer.tsx`
- **Page Components**: `DashboardView.tsx`, `SkillsAboutMe.tsx`
- **Feature Components**: `Portafolio.tsx`, `Certificado.tsx`, `Contacto.tsx`, `Modal.tsx`
- **UI Components**: Custom magic UI components in `components/magicui/`
- **Theme Components**: `ThemeToggle.tsx` with `ThemeContext.tsx`

### Data Management
- **Static Data**: Portfolio projects in `src/data/portafolios.ts`
- **Certificates**: Data structure in `src/data/certificados.ts`
- **Skills/Icons**: Tech stack icons configuration in `src/data/slugs.ts`
- **Types**: TypeScript interfaces in `src/types/`

### Styling Approach
- **Primary Framework**: TailwindCSS with custom color scheme
- **Theme Colors**:
  - Light mode: `#007acc` (blue)
  - Dark mode: `#61DAFB` (cyan)
- **Responsive Design**: Mobile-first approach with `md:` breakpoints
- **Dark Mode**: Class-based toggle via `dark:` prefixes

### Key Features
- **Theme Switching**: Persistent dark/light mode with system preference detection
- **Smooth Scrolling**: Section navigation within single page
- **Icon Cloud**: Interactive 3D technology showcase
- **Box Reveal**: Custom animation components
- **Scroll Progress**: Page progress indicator
- **Modal System**: Project detail views

## Important Configuration Files

- **Vite Config**: `vite.config.ts` - includes path aliases (`@/` → `src/`)
- **TailwindCSS**: v4.0 configuration via Vite plugin
- **TypeScript**: Multiple tsconfig files for app and build tools
- **ESLint**: Modern flat config with React and TypeScript rules
- **Shadcn/UI**: `components.json` for component library setup

## Development Notes

- **Path Aliases**: Use `@/` prefix for imports from `src/` directory
- **Component Style**: Functional components with TypeScript interfaces
- **State Management**: React Context for theme, local state for components
- **Image Assets**: Static images in `public/` directory, referenced with absolute paths
- **External Assets**: CDN links for technology icons and external resources

## Portfolio Data Structure

Projects are defined in `src/data/portafolios.ts` with the following schema:
- `name`: Project title
- `img`: Screenshot path in `/img/portafolio/`
- `urlPageWeb`: Live demo URL (optional)
- `urlPageGithub`: GitHub repository URL
- `description`: Project description
- `tecnologias`: Array of tech stack with name and icon URL

This is a showcase project demonstrating full-stack development skills, cybersecurity projects, and modern web development practices.