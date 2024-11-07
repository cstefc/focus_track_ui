import Center from "../components/utils/Center";
import {auth} from "../config/firebase";
import {Container} from "react-bootstrap";
import Image from "react-bootstrap/Image";
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
        <Container id='dashboard'>
            <Center>
                <h1>Welcome {auth.currentUser?.displayName}!</h1>
                <Image
                    src="https://lh3.googleusercontent.com/a/ACg8ocK4osZpMOuXm4xFg8-CHeHKqqrkOhtfVWv2aA7VskOn9go=s96-c"
                    alt={'profile_pic'} roundedCircle/>
            </Center>
        </Container>
    );
};

export default Dashboard;
