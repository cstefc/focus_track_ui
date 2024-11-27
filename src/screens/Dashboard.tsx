import {auth} from "../config/firebase";
import {useEffect, useState} from "react";

const Dashboard = () => {
    const [token, setToken] = useState('')
    useEffect(() => {
        async function getToken() {
            if (!token) {
                setToken(await auth.currentUser?.getIdToken() || "")
                console.log(await auth.currentUser?.getIdToken())
            }
        }

        void getToken()
    }, [token]);
    return (
        <>
            <h1 className={"text-center"}>Welcome {auth.currentUser?.displayName}!</h1>
        </>
    );
};

export default Dashboard;
