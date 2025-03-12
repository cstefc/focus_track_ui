import React, {useState} from "react";
import {signInWithPopup, signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {auth, Providers} from "../../config/firebase";
import Image from "react-bootstrap/Image";
import {NavDropdown} from "react-bootstrap";

interface Props {
}

const AuthContainer = (props: Props) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [disabledLogin, setDisabledLogin] = useState(auth.currentUser !== null);
    const [disabledLogout, setDisabledLogout] = useState(auth.currentUser === null);

    const signInWithGoogle = () => {
        setDisabledLogin(true);
        signInWithPopup(auth, Providers.google)
            .then(() => {
                setDisabledLogout(false)
                navigate("/dashboard");
            })
            .catch((error) => {
                setErrorMessage(error.code + ": " + error.message);
                setDisabledLogin(false);
            });
    };

    const logout = () => {
        setDisabledLogout(true);
        signOut(auth)
            .then(() => {
                navigate('/login');
                setDisabledLogin(false);
            })
            .catch((error) => {
                console.error(error);
                setDisabledLogout(false);
            });
    };

    return (
        <>
            {!disabledLogin &&
                <NavDropdown.Item
                    onClick={signInWithGoogle}>
                    {<Image
                        style={{
                            margin: "0 10px 0 0"
                        }}
                        src={"https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"}/>}
                    Google Sign In
                </NavDropdown.Item>
            }
            {!disabledLogout &&
                <NavDropdown.Item onClick={logout}>
                    Logout
                </NavDropdown.Item>}
        </>

    );
};

export default AuthContainer;
