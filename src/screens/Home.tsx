import Logout from "../components/auth/Logout";
import Center from "../components/utils/Center";
import {auth} from "../config/firebase";

const Home = () => {
    return (
        <div>
            <Center>
                <h1>Welcome {auth.currentUser?.displayName}!</h1>
                <Logout/>
            </Center>
        </div>
    );
};

export default Home;
