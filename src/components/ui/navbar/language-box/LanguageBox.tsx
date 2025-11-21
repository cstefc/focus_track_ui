import {Box, Button, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import ProfileMenu from "@/components/ui/ProfileMenu";

export default function LanguageBox() {
    const {i18n} = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

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
                {i18n.language.toUpperCase()}
            </Button>

            <ProfileMenu anchorEl={anchorEl} handleOpen={handleOpen} handleClose={handleClose}>
                {Object.keys(i18n.options.resources || {})
                    .map((lng) => (
                        (lng.toUpperCase() !== i18n.language.toUpperCase()) ?
                        <MenuItem key={lng} onClick={() => changeLanguage(lng)}>
                            {lng.toUpperCase()}
                        </MenuItem> : null
                    ))}
            </ProfileMenu>
        </Box>
    );
}
