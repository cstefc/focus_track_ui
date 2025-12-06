import {createContext, ReactNode, use, useMemo, useState} from "react";
import {themes} from "@/config/theme";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";

export interface ThemeContextProps {
    mode: string;
    changeMode: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    mode: "dark",
    changeMode: () => {
    },
});

export const useTheme = () => {
    const context = use(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeContext");
    return context;
}

export interface CustomThemeProviderProps {
    children?: ReactNode;
}

export const CustomThemeProvider = ({children}: CustomThemeProviderProps) => {
    const saved = localStorage.getItem("theme");
    const [mode, setMode] = useState<string>(saved ? saved : "dark");

    const changeMode = (newTheme: string) => {
        if (newTheme in themes) {
            localStorage.setItem("theme", newTheme);
            setMode(newTheme);
        }
    }

    const theme = useMemo(() => {
        localStorage.setItem("theme", mode);
        return mode in themes ? themes[mode] : themes["dark"];
    }, [mode]);

    return (
        <ThemeContext value={{mode: mode, changeMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ThemeContext>
    );
}
