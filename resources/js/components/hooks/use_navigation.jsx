import React, { createContext, useContext, useEffect, useState } from 'react';

export const NavigationContext = createContext();

export const NavigationProvider2 = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('/'); // Default page

    const navigateTo = (page) => {
        setCurrentPage(page);
        window.history.pushState({}, '', page); // Update the URL without reloading
    };

    useEffect(() => {
        const handlePopState = () => {
            setCurrentPage(window.location.pathname);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <NavigationContext.Provider value={{ currentPage, navigateTo }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function NavigationProvider({ children }) {
    const [currentRoute, setCurrentRoute] = useState('/');

    const handleNavigate = (path) => {
        // console.log(path);
        setCurrentRoute(path);
    };

    useEffect(() => {
        handleNavigate(currentRoute);
    }, [window.location.pathname]);

    return (
        <NavigationContext.Provider value={{ currentRoute, setCurrentRoute }}>
            {children}
        </NavigationContext.Provider>
    );
}

export const useNavigation = () => {
    return useContext(NavigationContext);
};