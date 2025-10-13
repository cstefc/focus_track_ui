import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './layouts/index.css';

import "./i18n"
import App from './App';


import {createRoot} from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)