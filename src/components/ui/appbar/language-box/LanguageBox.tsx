import {Box, Button, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

export default function LanguageBox() {
    const {i18n} = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const currentLanguage = i18n.language || "en";
    const changeLanguage = (lng: string) => {
        void i18n.changeLanguage(lng);
        handleClose();
    };

    return (
        <Box display={"flex"} alignItems={"center"}>
            <Button
                onClick={handleOpen}
                color="inherit"
                sx={{
                    "&:hover": {
                        backgroundColor: "transparent",
                        opacity: 0.8,
                    },
                }}
            >
                {currentLanguage.toUpperCase()}
            </Button>

            <Menu id="account-menu" anchorEl={anchorEl} onClose={handleClose} onClick={handleClose} open={Boolean(anchorEl)}>
                {Object.keys(i18n.options.resources || {})
                    .map((lng) => (
                        (lng.toUpperCase() !== currentLanguage) ?
                        <MenuItem key={lng} onClick={() => changeLanguage(lng)}>
                            {lng.toUpperCase()}
                        </MenuItem> : null
                    ))}
            </Menu>
        </Box>
    );
}
