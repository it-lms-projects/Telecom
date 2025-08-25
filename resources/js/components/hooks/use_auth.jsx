import React, { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

function useProvideAuth() {
    // Here you can add your authentication logic, e.g., API calls to login/logout
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    // Signin is the same as login, but for the sake of clarity, we use signin.
    const signIn = (email, password) => {
        setIsLoading(true);
        fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((err) => {
                        setErrors(err.errors || ["Login failed"]);
                        throw new Error("Login failed");
                    });
                }
                return response.json();
            })
            .then((data) => {                
                if (data.success) {
                    setUser(data.user);
                    setErrors([]);
                    setIsAuthenticated(true);
                    setAccessToken(data.accessToken);
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("isAuthenticated", true);
                    localStorage.setItem("user", JSON.stringify(data.user));
                } else {
                    setErrors(data.errors || ["Login failed"]);
                }
            })
            .catch((error) => {
                setErrors([error.message]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const signUp = (signupData) => {
        setErrors([]);
        setIsLoading(true);
        fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupData),
            })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((err) => {
                        setErrors(err.errors || ["Signup failed"]);
                        throw new Error("Login failed");
                    });
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setUser(data.user);
                    setErrors([]);
                    setIsAuthenticated(true);
                    localStorage.setItem("isAuthenticated", true);
                } else {
                    setErrors(data.errors || ["Signup failed"]);
                }
            })
            .catch((error) => {
                setErrors([error.message]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Signout is the same as logout, but for the sake of clarity, we use signout.
    const signOut = () => {        
        setErrors([]);
        fetch("/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {                
                if (response.ok) {
                    setUser(null);
                    setIsAuthenticated(false);
                    setAccessToken(null);
                    setErrors([]);
                    localStorage.removeItem("isAuthenticated");
                    localStorage.removeItem("accessToken");
                } else {
                    setErrors(["Logout failed"]);
                }
            })
            .catch((error) => {
                setErrors([error.message]);
            });
    };

    function autoSignIn() {
        fetch("/api/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (!response.ok) {
                   throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then((data) => {
                setUser(data.user);
            })
            .catch((error) => {
                setErrors([error.message]);
            });
    }

    useEffect(() => {
        const _isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
        const _accessToken = localStorage.getItem("accessToken");        
        if (_isAuthenticated) {
            setAccessToken(_accessToken);
            setUser(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);            
        } else {            
            setAccessToken(null);
            setUser(null);
        }
        setIsAuthenticated(_isAuthenticated);
    }, []);

    return {
        user,
        accessToken,
        signIn,
        signUp,
        signOut,
        autoSignIn,
        errors,
        setErrors,
        isLoading,
        isAuthenticated,
    };
}

// Provider component that wraps your app and makes auth object...
// ...available to any child component that calls useAuth().
export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for child components to get the auth object...
// ...and re-render when it changes.
export const useAuth = () => {
    return useContext(AuthContext);
}