import React from "react";
import {AppBar as MuiAppBar, Box, Container, IconButton, Menu, Stack, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppBarLogo from "./logo/AppBarLogo";
import AppBarRoutes from "./routes/AppBarRoutes";
import ThemeBox from "./theme-box/ThemeBox";
import LanguageBox from "./language-box/LanguageBox";
import AuthContainer from "./auth-container/AuthContainer";
import {useNavigate} from "react-router-dom";

export default function MyAppBar() {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <MuiAppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* Mobile menu logo */}
                    <Box display={{xs: "flex", md: "none"}}>
                        <IconButton color="inherit" onClick={handleOpenNavMenu}>
                            <MenuIcon/>
                        </IconButton>
                    </Box>

                    {<AppBarLogo/>}

                    {/* Desktop items*/}
                    <Stack direction={"row"} flexGrow={1} display={{xs: "none", md: "flex"}}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <AppBarRoutes onNavigate={navigate} mobile={false}/>
                        </Stack>

                        <Stack direction={"row"} spacing={2} marginInlineStart={"auto"}>
                            <LanguageBox/>
                            <ThemeBox/>
                            <AuthContainer/>
                        </Stack>
                    </Stack>


                    {/* Mobile Items (opens by clicking item*/}
                    <Menu anchorEl={anchorElNav} keepMounted open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu} onClick={handleCloseNavMenu}>
                        <AppBarRoutes onNavigate={navigate} mobile={true}/>
                        <LanguageBox/>
                        <ThemeBox/>
                    </Menu>

                    <Stack direction={"row"} marginInlineStart={"auto"} display={{md: "none"}}>
                        <AuthContainer/>
                    </Stack>
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
}
