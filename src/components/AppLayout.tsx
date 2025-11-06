import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react"
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function AppLayout() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden">
      <Header />
      <main className="pt-16 overflow-x-hidden">
        <Outlet />
        <Analytics />
      </main>
      <Footer />
    </div>
  );
}
