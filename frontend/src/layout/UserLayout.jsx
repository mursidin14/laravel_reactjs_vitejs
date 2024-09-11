import { Outlet, Navigate } from "react-router-dom";
import { UseStateContext } from "../contexts/ContextProvider";

export default function UserLayout() {

  const { token } = UseStateContext();

  if(token) {
    return <Navigate to="/" />
  }

  return (
    <div className="w-6xl mx-auto">
        <main>
          <Outlet />
        </main>
    </div>
  )
}
