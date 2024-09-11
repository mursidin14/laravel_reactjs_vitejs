import { Outlet, Navigate } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminLayout() {

  const { token } = UseStateContext();

  if(!token) {
    // return <Navigate to="/login" />
  }

  return (
      <>
          <Navbar />
            <main>
              <div className="z-0"><Outlet /></div>
            </main>
          <Footer />
    </>
  )
}
