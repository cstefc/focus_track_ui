import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "@/config/firebase";
import {User} from "firebase/auth";
import {Spinner} from "react-bootstrap";

interface Props {
    children: React.ReactNode;
}

export default function AuthChecker({children}: Props) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (!currentUser) {
                navigate("/login");
            }
        });
    }, [navigate]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <Spinner animation="border" role="status"/>
            </div>
        );
    }

    return (<>{user && children}</>);
}
