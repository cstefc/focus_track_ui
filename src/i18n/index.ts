import i18n from 'i18next';
import {initReactI18next}  from "react-i18next";

import enCalendar from './locales/en/calendar.json'
import enDashboard from './locales/en/dashboard.json'
import enHome from './locales/en/home.json'
import enLogin from './locales/en/login.json'
import enProjects from './locales/en/projects.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                home: enHome,
                calendar: enCalendar,
                dashboard: enDashboard,
                login: enLogin,
                projects: enProjects,
            }
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {escapeValue: false},
    });

export default i18n;