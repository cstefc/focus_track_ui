import {NavDropdown} from "react-bootstrap";
import React, {JSX} from "react";
import {getAuth, signOut} from "firebase/auth";
import {useTranslation} from "react-i18next";

export interface AuthContainerGoogleLogoutProps {
    navigate: (destination: string) => void;
    destination: string;
}

export default function AuthContainerGoogleLogout({navigate, destination}: AuthContainerGoogleLogoutProps): JSX.Element {
    const {t} = useTranslation("general");

    async function handleLogout() {
        try {
            await signOut(getAuth());
            navigate(destination);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <NavDropdown.Item onClick={handleLogout}>
            {t("authentication.signOut")}
        </NavDropdown.Item>
    );
}