import {themes} from "@/config/theme";
import {Box, Button, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../layout/theme/ThemeContext";

export default function ThemeBox() {
    const {t} = useTranslation("general");
    const {mode, changeMode} = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box display={"flex"} alignItems={"center"}>
            <Button onClick={handleOpen} color="inherit" sx={{
                "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.8,
                },
            }}>
                {t(`theme.${mode}`)}
            </Button>
            <Menu id="account-menu" anchorEl={anchorEl} onClose={handleClose} onClick={handleClose} open={Boolean(anchorEl)}>
                {Object.keys(themes).map((option) => {
                    return ((option !== mode) ?
                        <MenuItem key={option} onClick={() => {
                            changeMode(option)
                        }}>
                            {t(`theme.${option}`)}
                        </MenuItem> : null);
                })}
            </Menu>
        </Box>
    );
}
