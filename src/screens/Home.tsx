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
                </div>}
        </>
    )
}

export default Home