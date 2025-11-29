import React, {JSX} from "react";
import {useTranslation} from "react-i18next";
import {ListItemText, MenuItem, Typography} from "@mui/material";

export interface AuthContainerGoogleLogoutProps {
    hidden: boolean;
    handleLogout: () => void;
}

export default function AuthContainerGoogleLogout({hidden, handleLogout}: AuthContainerGoogleLogoutProps): JSX.Element {
    const {t} = useTranslation("general");

    return (
        !hidden ?
        <MenuItem onClick={handleLogout}>
            <ListItemText>
                <Typography variant={"body1"}>{t("authentication.signOut")}</Typography>
            </ListItemText>
        </MenuItem> : <></>
    );
}