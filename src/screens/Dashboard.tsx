import Center from "../components/utils/Center";
import {auth} from "../config/firebase";
import {Container} from "react-bootstrap";
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
            <Container id='dashboard'>
                <Center>
                    <h1>Welcome {auth.currentUser?.displayName}!</h1>
                </Center>
            </Container>
        </>
    );
};

export default Dashboard;
