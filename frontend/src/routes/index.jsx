import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Aboute from "../pages/Aboute";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        element: <AdminLayout />,
        children:[
            {
                path:'/',
                element: <Home />
            },
            {
                path:'/aboute',
                element: <Aboute />
            }
        ]
    },
    {
        element: <UserLayout />,
        children:[
            {
                path:'/login',
                element: <Login />
            },
            {
                path:'/register',
                element: <Register />
            }
        ]
    },
    {
        path:'*',
        element: <NotFound />
    }
])