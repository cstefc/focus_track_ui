import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import AuthContainerTitle from "./AuthContainerTitle";
import AuthContainerGoogleLogin from "./AuthContainerGoogleLogin";
import AuthContainerGoogleLogout from "./AuthContainerGoogleLogout";
import {getAuth, signInWithPopup, signOut, User} from "firebase/auth";
import ProfileMenu from "@/components/ui/appbar/auth-container/ProfileMenu";
import {Providers} from "@/config/firebase";
import {useNavigate} from "react-router-dom";

export interface AuthContainerProps {
}

export default function AuthContainer({}: AuthContainerProps) {


    const auth = getAuth();
    const [user, setUser] = useState<User | null>(auth.currentUser);
    useEffect(() => {
        return auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    }, [auth]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => {
        // @ts-ignore
        document.activeElement?.blur();
        setAnchorEl(null);
    }

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const handleSignInWithGoogle = async () => {
        setLoading(true);
        try {
            await signInWithPopup(getAuth(), Providers.google)
            navigate("/")
            setLoading(false);
        } catch (error) {
            console.error("Google sign-in failed:", error)
        }
    }
    const handleSignOutWithGoogle = async () => {
        setLoading(true);
        try {
            navigate("/login")
            await signOut(getAuth());
            setLoading(false);
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <Box display={"flex"} alignItems={"center"}>
            <Box
                onClick={handleOpen}
                sx={{
                    cursor: "pointer",
                    "&:hover": {opacity: 0.8}
                }}
            >
                <AuthContainerTitle user={user}/>
            </Box>

            <ProfileMenu anchorEl={anchorEl} handleClose={handleClose} handleOpen={handleOpen}>
                <AuthContainerGoogleLogout hidden={loading || !user} handleLogout={handleSignOutWithGoogle}/>
                <AuthContainerGoogleLogin hidden={loading || user !== null} handleLogin={handleSignInWithGoogle}/>
            </ProfileMenu>
        </Box>
    );
}
