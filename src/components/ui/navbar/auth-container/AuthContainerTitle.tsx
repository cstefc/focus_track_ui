import React from "react";
import {User} from "firebase/auth";
import {useTranslation} from "react-i18next";
import {Avatar, Stack, Typography} from "@mui/material";

export interface AuthContainerTitleProps {
    user: User | null;
}

export default function AuthContainerTitle({user}: AuthContainerTitleProps) {
    const {t} = useTranslation("general");

    return (
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
            {user && (
                <Avatar src={user.photoURL || undefined} alt="profile_pic"/>
            )}

            <Typography variant="body1" color={"inherit"} whiteSpace={"nowrap"}>
                {user?.displayName || t("authentication.signIn")}
            </Typography>
        </Stack>
    );
}
