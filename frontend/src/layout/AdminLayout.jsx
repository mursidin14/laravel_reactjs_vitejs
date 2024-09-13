import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UseStateContext } from "../contexts/ContextProvider";

export default function AdminLayout() {

  const { token } = UseStateContext();

  if(!token) {
    return <Navigate to="/login" />
  }

  return (
      <>
          <Navbar />
          <hr />
          <Outlet />
          <Footer />
      </>
  )
}
