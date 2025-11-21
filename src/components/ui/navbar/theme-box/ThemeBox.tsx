import {themes} from "@/config/theme";
import {Box, Button, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useTheme} from "../../../layout/theme/ThemeContext";
import ProfileMenu from "@/components/ui/ProfileMenu";

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
            <ProfileMenu handleOpen={handleOpen} handleClose={handleClose} anchorEl={anchorEl}>
                {Object.keys(themes).map((option) => {
                    return ((option !== mode) ?
                        <MenuItem key={option} onClick={() => {changeMode(option)}}>
                            {t(`theme.${option}`)}
                        </MenuItem> : null);
                })}
            </ProfileMenu>
        </Box>
    );
}
