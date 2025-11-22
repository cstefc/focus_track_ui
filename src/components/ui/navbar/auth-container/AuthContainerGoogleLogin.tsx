import React, {JSX} from "react";
import {useTranslation} from "react-i18next";
import {Avatar, ListItemIcon, ListItemText, MenuItem, Typography} from "@mui/material";

export interface AuthContainerGoogleLoginProps {
    hidden: boolean;
    handleLogin: () => void;
}

export default function AuthContainerGoogleLogin({hidden, handleLogin}: AuthContainerGoogleLoginProps): JSX.Element {
    const {t} = useTranslation("general");

    return (!hidden ?
            <MenuItem onClick={handleLogin}>
                <ListItemIcon>
                    <Avatar
                        src={"https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"}
                        alt={"Google Logo"}
                    />
                </ListItemIcon>

                <ListItemText>
                    <Typography variant={"body1"}>{t("authentication.google.signIn")}</Typography>
                </ListItemText>
            </MenuItem> : <></>
    );
}