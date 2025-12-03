import App from './App';
import React from 'react';
import "./i18n"

import {createRoot} from 'react-dom/client';
import {CustomThemeProvider} from "@/components/layout/theme/ThemeContext";
import {Typography} from "@mui/material";

const isDev = import.meta.env.VITE_DEV === "true";
const container = document.getElementById('root');
const root = createRoot(container!)
root.render(
    isDev ? (
        <React.StrictMode>
            <CustomThemeProvider>
                <Typography content={"h3"}>STRICT!!!</Typography>
                <App/>
            </CustomThemeProvider>
        </React.StrictMode>
    ) : (
        <CustomThemeProvider>
            <App/>
        </CustomThemeProvider>
    )
)