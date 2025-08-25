import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/hooks/use_auth";
import CoverImage from "./../../../assets/icons/quick_gmao_cover.png";
import MicrosoftIcon64 from "./../../../assets/icons/microsoft_64.png";

// This is the login page component. It will be used to render the login form.
// It will also handle the login logic and display any errors that occur during login.
export default function LoginPage({}) {
    const auth                    = useAuth(); // Call the useAuth hook to get the authentication context
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const navigate                = useNavigate();

    const handleLoginClick = (e) => {
        e.preventDefault(); // Prevent the default form submission
        if (auth.isLoading) return; // If the authentication is loading, do nothing
        if (email === '' || password === '') {
            auth.setErrors(['Veuillez remplir tous les champs']); // Set error if fields are empty
            return;
        }
        auth.signIn(email, password); // Call the signIn method from the authentication context
    };

    useEffect(() => {
        // If the user is already authenticated, redirect them to the dashboard or home page
        if (auth.isAuthenticated) {
            navigate("/"); // Redirect to the home page
            localStorage.setItem('isAuthenticated', true); // Set the authentication flag in local storage
        } else {
            localStorage.removeItem('isAuthenticated'); // Remove the authentication flag from local storage
        }
    }, [auth.isAuthenticated, navigate]); // Add auth.isAuthenticated as a dependency to the useEffect hook
    

    return (
        <div className="bg-[#E5E5E5] h-screen flex items-center justify-center  px-16 py-16 md:py-24 overflow-y-auto">
            <div className="flex flex-row w-full overflow-hidden rounded shadow-sm max-h-3/5 md:max-w-6xl">
                <div className="flex-1 pt-4 bg-white md:pl-4">
                    <div className="w-full p-8 bg-white">
                        <h1 className="text-3xl font-bold text-blue-700 ">Quick Gmao</h1>
                        <h2 className="mt-8 mb-8 text-lg font-bold text-blue-700 md:mt-24 md:text-2xl">
                            Maitrisez la maintenance de votre entreprise
                            <br className="hidden md:block"/> avec <span className="font-bold text-blue-700 text-md md:text-xl">Quick Gmao</span>
                        </h2>
                        <p className="mt-2 text-gray-600">Bienvenu ! Veuillez vous connecter.</p>

                        <form className="mt-4">
                            <div className="mb-4">
                                <label className="text-sm font-semibold text-gray-700">Adresse email</label>
                                <input
                                    type="email"
                                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="hakeem@digital.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-8">
                                <label className="text-sm font-semibold text-gray-700">Mot de passe</label>
                                <input
                                    type="password"
                                    className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="********************"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span className="text-sm text-gray-700">Remember Me</span>
                                </label>
                                <a href="#" className="text-sm text-blue-600 hover:underline">
                                    Mot de passe oublié ?
                                </a>
                            </div>
                            <div className="flex items-center justify-center space-x-4">
                                <button 
                                    onClick={handleLoginClick} 
                                    className={`w-[280px] my-4  text-white py-2 rounded-md  ${auth.isLoading ? 'cursor-not-allowed bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                                    Se connecter
                                </button>
                            </div>
                            <div>
                                {auth.errors.length > 0 && (
                                    <div className="flex flex-col items-center justify-center mt-4 text-red-600">
                                        {auth.errors.map((error, index) => (
                                            <p key={index} className="text-sm">{error}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-gray-700">
                                -------- Or login with --------
                            </p>
                            <div className="mt-6 space-x-4">
                                <a href="/auth/microsoft" className={`flex gap-2 items-center justify-center`}>                                    
                                    <img src={MicrosoftIcon64} alt="Microsoft" className="inline-block w-6 h-6" />
                                    <span className="text-md hover:underline">Votre compte Microsoft</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#F9F9F9] flex-1 hidden md:flex items-center justify-center">
                    <img src={CoverImage} alt="Logo" className="w-4/5 h-auto" />
                </div>
            </div>
        </div>
    );
}