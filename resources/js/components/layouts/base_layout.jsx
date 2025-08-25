import React, { useEffect, Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use_auth";
import QuickNavbar from "../navbars/quick_navbar";

export default function BaseLayout({}) {
    const [darkMode, setDarkMode] = useState(false);
    const auth     = useAuth();
    const navigate = useNavigate();

    const handleOnBrightnessChanged = (brightness) => {        
        if(brightness === "dark")
            setDarkMode(true);
        else
            setDarkMode(false);
    };

    // Check if the user is authenticated when the component mounts
    useEffect(() => {
        // Check if the user is authenticated        
        if (!auth.isAuthenticated) {
            // Redirect to the login page if not authenticated
            //navigate("/login");
        }
    }, [navigate]);

    return (
        <div className={`flex flex-col h-screen overflow-hidden App ${darkMode ? 'dark' : ''}`}>
            <QuickNavbar onBrightnessChanged={handleOnBrightnessChanged}/>
            <div className="flex-1 h-0">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
}