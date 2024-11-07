import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "../config/firebase";

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.currentUser) {
            navigate('/dashboard');
        }
    }, [navigate])

    return (
        <>
            {!auth.currentUser &&
                <div>
                <h1> Welcome to my website</h1>
                <h5>To proceed using this application, you'll have to log in.</h5>
            </div>}
        </>
    )
}

export default Home