import Center from "../components/utils/Center";
import {auth} from "../config/firebase";
import {Container} from "react-bootstrap";

const Dashboard = () => {
    return (
        <Container id='dashboard'>
            <Center>
                <h1>Welcome {auth.currentUser?.displayName}!</h1>
            </Center>
        </Container>
    );
};

export default Dashboard;
