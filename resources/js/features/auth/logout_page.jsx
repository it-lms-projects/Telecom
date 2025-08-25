import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/hooks/use_auth";

export default function LogoutPage({}) {
    const auth = useAuth(); // Call the useAuth hook to get the authentication context
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    useEffect(() => {
        auth.signOut(); // Call the signOut method from the authentication context            
        localStorage.removeItem('isAuthenticated'); // Remove the authentication flag from local storage
        setTimeout(() => {
            console.log("Redirecting to login page...");
            // Optionally, you can show a message or a loading spinner here
            navigate("/login"); // Redirect to the login page after 2 seconds
        }, 5000);
    }, []); // Empty dependency array to run this effect only once when the component mounts
    
    return (
        <div className="bg-[#E5E5E5] h-screen flex items-center justify-center px-16 py-16 md:py-24 overflow-y-auto">
            <div className="flex flex-row w-full max-h-3/5 md:max-w-6xl rounded shadow-sm overflow-hidden">
                <div className="bg-white flex-1 md:pl-4 pt-4">
                    <div className="w-full bg-white p-8">
                        <h1 className="text-3xl font-bold text-blue-700 ">Quick Gmao</h1>
                        <hr className="mt-4"/>
                        <h2 className="mb-8 mt-8 md:mt-24 text-lg md:text-2xl font-bold text-blue-700">
                            Déconnexion réussie
                            <br className="hidden md:block"/> de <span className="text-blue-700 text-md md:text-xl font-bold">Quick Gmao</span>
                        </h2>
                        <p className="mt-2 text-gray-600">Vous avez été déconnecté avec succès.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}