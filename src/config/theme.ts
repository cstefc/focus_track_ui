import {createTheme, Theme} from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        fontFamily: "Roboto, Arial",
        h1: {fontSize: "2rem"},
    },
    shape: {borderRadius: 8},
});

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",        // soft, clean blue
        },
        secondary: {
            main: "#9c27b0",        // accent purple
        },
        background: {
            default: "#f7f9fc",     // ultra-light gray-blue
            paper: "#ffffff",       // pure white surfaces
        },
        text: {
            primary: "#1a1a1a",
            secondary: "#555",
        }
    },
    shape: {
        borderRadius: 12          // smooth, modern rounding
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                size: "medium",
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",        // light blue/tint
        },
        secondary: {
            main: "#ce93d8",        // mauve accent
        },
        background: {
            default: "#121212",     // pure dark
            paper: "#1e1e1e",       // elevated surfaces
        },
        text: {
            primary: "#ffffff",
            secondary: "rgba(255,255,255,0.7)",
        }
    },
    shape: {
        borderRadius: 12
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none", // prevents weird overlays
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                size: "medium",
            },
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                        },
                        "&:hover fieldset": {
                            borderColor: "rgba(255,255,255,0.5)",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#90caf9",
                        },
                    }
                }
            }
        }
    },
});


export const themes: Record<string, Theme> = {
    light: lightTheme,
    dark: darkTheme,
}