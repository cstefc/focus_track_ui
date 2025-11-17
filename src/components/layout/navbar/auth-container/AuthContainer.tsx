import React, {useEffect, useState} from "react";
import {Nav, NavDropdown} from "react-bootstrap";
import AuthContainerTitle from "./AuthContainerTitle";
import AuthContainerGoogleLogin from "./AuthContainerGoogleLogin";
import AuthContainerGoogleLogout from "./AuthContainerGoogleLogout";
import {getAuth, User} from "firebase/auth";
import LanguageBox from "../language-box/LanguageBox";

export interface AuthContainerProps {
    navigate: (destination: string) => void
}

export default function AuthContainer({navigate}: AuthContainerProps) {
    const auth = getAuth();
    const [user, setUser] = useState<User | null>(auth.currentUser);

    useEffect(() => {
        return auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    }, [])

    return (
        <NavDropdown
            title={<AuthContainerTitle user={user}/>}>
            {!user && <AuthContainerGoogleLogin navigate={navigate} destination={"/dashboard"}/>}
            {user && <AuthContainerGoogleLogout navigate={navigate} destination={"/login"}/>}
        </NavDropdown>
    );
};
