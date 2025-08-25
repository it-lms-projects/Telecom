import React, { useEffect, Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({}) {
    const [darkMode, setDarkMode] = useState(false);    
    const navigate = useNavigate();    

    return (
        <div className={`App flex flex-col h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>            
            <div className="flex-1 h-0">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
}