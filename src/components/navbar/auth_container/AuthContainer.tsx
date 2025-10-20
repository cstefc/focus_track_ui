import React, {useEffect, useState} from "react";
import {auth} from "@/config/firebase";
import {NavDropdown} from "react-bootstrap";
import DropdownTitle from "./AuthContainerTitle";
import AuthContainerGoogleLogin from "./AuthContainerGoogleLogin";
import AuthContainerGoogleLogout from "./AuthContainerGoogleLogout";
import {User} from "firebase/auth";

export interface AuthContainerProps {
    navigate: (destination: string) => void
}

export default function AuthContainer(props: AuthContainerProps) {
    const [user, setUser] = useState<User | null>(auth.currentUser);

    useEffect(() => {
        return auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    }, [])

    return (
        <NavDropdown
            menuVariant={'dark'}
            align={"end"}
            title={<DropdownTitle user={user}/>}>

            {!user && <AuthContainerGoogleLogin navigate={props.navigate} destination={"/dashboard"} />}
            {user && <AuthContainerGoogleLogout navigate={props.navigate} destination={"/login"}/>}
        </NavDropdown>
    );
};
