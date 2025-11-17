import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {themes} from "@/config/themes";

export interface ThemeContextValue {
    theme: string;
    setTheme: (newTheme: string) => void;
}
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeContextProps {
    children?: ReactNode;
}
export const ThemeProvider = ({children}: ThemeContextProps) => {
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const changeTheme = (newTheme: string) => {
        if (themes.includes(newTheme)) {
            localStorage.setItem("theme", newTheme);
            setTheme(newTheme);
        }
    }

    return(
        <ThemeContext.Provider value={{theme: theme, setTheme: changeTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeContext");
    return context;
}