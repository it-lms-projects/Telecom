import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes, authRoutes } from "@router/routes";
import BaseLayout from "@layouts/base_layout";
import AuthLayout from "@layouts/auth_layout";
import Error404Page from "@layouts/error404";

export default function App({ }) {
    // Create the router of our application
    const router = createBrowserRouter([        
        {
            children    : authRoutes,
            element     : <AuthLayout />,
            errorElement: <Error404Page />,
        },
        {
            children    : appRoutes,
            element     : <BaseLayout/>,
            errorElement: <Error404Page />,
        }
    ]);
    return <RouterProvider router={router}/>
}
