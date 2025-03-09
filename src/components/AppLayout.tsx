import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react"

export default function AppLayout() {
  return (
    <>
        <Header />
        <main className="pt-20">
          <Outlet />
          <Analytics />
        </main>
        <Footer />
    </>
  )
}
