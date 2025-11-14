import React from "react";
import {Spinner} from "react-bootstrap";
import useAuthCheck from "./useAuthCheck";

interface Props {
    children: React.ReactNode;
}

export default function AuthChecker({children}: Props) {
    const {user, loading} = useAuthCheck();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <Spinner animation="border" role="status"/>
            </div>
        );
    }

    return (<>{user && children}</>);
}
