import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react"

export default function AppLayout() {

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main className="pt-16">
        <Outlet />
        <Analytics />
      </main>
      <Footer />
    </div>
  );
}
