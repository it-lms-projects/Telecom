import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes/routes";
import LoginPage from "./features/authentication/login_page";
import LogoutPage from "./features/authentication/logout_page";
import BaseLayout from "./components/layouts/base_layout";
import Error404Page from "./components/layouts/error404";

export default function App({ }) {
    // Create the router of our application
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <LoginPage />,
            errorElement: <Error404Page />,
        },
        {
            path: "/logout",
            element: <LogoutPage />,
            errorElement: <Error404Page />,
        },
        {
            children: routes,
            element: <BaseLayout/>,
            errorElement: <Error404Page />,
        }
    ]);
    return <RouterProvider router={router}/>
}
