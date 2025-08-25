import React, { useState, useRef, useEffect } from "react";
import { Moon, Sun } from 'lucide-react';
import { useAuth } from "./../hooks/use_auth";
import { SlArrowDown } from "react-icons/sl";
import AppIcon from './../../../assets/icons/quick_gmao.png'
import UserDefaultAvatar from './../../../assets/icons/default_user.png'

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(callback) {
    const callbackRef = useRef(); // initialize mutable ref, which stores callback
    const innerRef = useRef(); // returned to client, who marks "border" element

    // update cb on each render, so second useEffect has access to current value 
    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(e) {
            if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)) {
                callbackRef.current(e);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // no dependencies -> stable mousedown listener

    return innerRef; // convenience for client (doesn't need to init ref himself) 
}

function Dropdown({ className }) {
    const items = [
        { title: 'Paramètres', path: '/settings' },
        { title: 'Déconnexion', path: '/logout' },
    ];

    return (
        <div className={`${className} dropdown`}>
            <ul>
                {items.map((item, index) => {
                    return (
                        <li key={`key-${index}`} className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-200">
                            <a href={item.path}>{item.title}</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function QuickNavbar({ onBrightnessChanged }) {    
    const auth = useAuth();
    const [darkMode, setDarkMode]         = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const innerRef = useOutsideAlerter(() => {
        setShowDropdown(false);
    });

    const handleOnClick = () => {
        setDarkMode(!darkMode);
        if(onBrightnessChanged) {
            onBrightnessChanged(`${darkMode ? "dark" : "light"}`);
        }
    };

    useEffect(() => {
        //
    }, [auth.isAuthenticated, auth.user]);

    return (
        <div className="bg-[#2e4573] h-16 flex items-center">
            <div className="flex items-center justify-start flex-1">
                <img src={AppIcon} width="32" height="32" className="mt-2" />
                <div className="mx-4 text-xl font-bold text-white">
                    <a>I.T Management Systems</a>
                </div>
            </div>
            <button
                onClick={handleOnClick}
                className="p-2 text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative flex items-center justify-center h-full mr-2 text-white"
                 ref={innerRef}
                 onClick={() => setShowDropdown(!showDropdown)}>
                <h5 className="flex flex-col items-end justify-center h-full hover:bg-gray-800 hover:cursor-pointer">
                    {auth.user && (
                        <>
                            <span className="text-md">{auth.user.name}</span>
                            <span className="text-sm">{auth.user.email}</span>
                        </>
                    )}
                </h5>
                <div className="flex items-center hover:bg-[#25314bbf] hover:cursor-pointer rounded-full p-2">
                    <img src={UserDefaultAvatar} width="32" height="32" className="mr-1" />
                    <SlArrowDown size={16} />
                </div>
                {showDropdown
                    ? <Dropdown className="absolute bottom-0 z-30 w-full bg-white shadow-lg min-h-24 top-16" />
                    : <></>
                }
            </div>
        </div>
    );
}