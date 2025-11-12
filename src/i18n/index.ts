import i18n from 'i18next';
import {initReactI18next}  from "react-i18next";

import enGeneral from './locales/en/general.json'
import enPlanning from './locales/en/planning.json'
import enDashboard from './locales/en/dashboard.json'
import enHome from './locales/en/home.json'
import enLogin from './locales/en/login.json'
import enProjects from './locales/en/projects.json'

import nlGeneral from './locales/nl/general.json'
import nlPlanning from './locales/nl/planning.json'
import nlDashboard from './locales/nl/dashboard.json'
import nlHome from './locales/nl/home.json'
import nlLogin from './locales/nl/login.json'
import nlProjects from './locales/nl/projects.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                general: enGeneral,
                home: enHome,
                planning: enPlanning,
                dashboard: enDashboard,
                login: enLogin,
                projects: enProjects,
            },
            nl: {
                general: nlGeneral,
                home: nlHome,
                planning: nlPlanning,
                dashboard: nlDashboard,
                login: nlLogin,
                projects: nlProjects,
            }
        },
        lng: 'nl',
        fallbackLng: 'en',
        interpolation: {escapeValue: false},
    });

export default i18n;