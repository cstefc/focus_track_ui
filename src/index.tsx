import App from './App';
import React from 'react';
import "./i18n"

import {createRoot} from 'react-dom/client';
import {CustomThemeProvider} from "@/components/layout/theme/ThemeContext";

const container = document.getElementById('root');
const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <CustomThemeProvider>
            <App />
        </CustomThemeProvider>
    </React.StrictMode>
)