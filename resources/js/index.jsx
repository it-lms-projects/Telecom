/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap';
import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from "./components/hooks/use_auth";
import { NavigationProvider } from "./components/hooks/use_navigation";
import CssBaseline from "@mui/material/CssBaseline";
import ReactDOM from "react-dom/client";
import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("root"));

const newTheme = (theme) => createTheme({
    ...theme,
    components: {
        MuiPickersToolbar: {
            styleOverrides: {
                root: {
                    color: '#3784D0',
                    borderRadius: '7px',
                    borderWidth: '2px',
                    borderColor: '#99CCFF',
                    border: '2px solid',
                    backgroundColor: '#EBF5FF',
                }
            }
        }
    }
});

root.render(
    <React.StrictMode>
        <NavigationProvider>
            <AuthProvider>
                <ThemeProvider theme={newTheme(createTheme())}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </NavigationProvider>
    </React.StrictMode>
);