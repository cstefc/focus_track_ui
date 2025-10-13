import {signInWithPopup} from "firebase/auth";
import Image from "react-bootstrap/Image";
import {NavDropdown} from "react-bootstrap";
import React, {JSX} from "react";
import {auth, Providers} from "../../../config/firebase";

export interface AuthContainerGoogleLoginProps {
    navigate: (destination: string) => void;
    destination: string;
}

export default function AuthContainerGoogleLogin({navigate, destination}: AuthContainerGoogleLoginProps): JSX.Element {
    async function handleSignInWithGoogle () {
        try {
            await signInWithPopup(auth, Providers.google)
            navigate(destination);
        } catch (error: any) {
            console.error("Google sign-in failed:", error);
        }
    }

    return (
        <NavDropdown.Item
            onClick={handleSignInWithGoogle}>
            {<Image
                alt={"Google Logo"}
                className={"me-2"}
                width={18}
                height={18}
                src={"https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"}/>
            }
            Google Sign In
        </NavDropdown.Item>
    );
}