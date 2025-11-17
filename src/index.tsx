import 'bootstrap/dist/css/bootstrap.css'
import "./theme.scss"
import App from './App';
import React from 'react';
import "./i18n"

import {createRoot} from 'react-dom/client';
import {ThemeProvider} from "./components/layout/theme/ThemeContext";

const container = document.getElementById('root');
const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
)