import {NavDropdown} from "react-bootstrap";
import React, {JSX} from "react";
import {signOut} from "firebase/auth";
import {auth} from "../../../config/firebase";

export interface AuthContainerGoogleLogoutProps {
    navigate: (destination: string) => void;
    destination: string;
}

export default function AuthContainerGoogleLogout({navigate, destination}: AuthContainerGoogleLogoutProps): JSX.Element {
    async function handleLogout() {
        try {
            await signOut(auth);
            navigate(destination);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <NavDropdown.Item onClick={handleLogout}>
            Logout
        </NavDropdown.Item>
    );
}