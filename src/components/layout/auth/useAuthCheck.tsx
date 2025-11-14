import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAuth, User} from "firebase/auth";

export default function useAuthCheck(){
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        return auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (!currentUser) {
                navigate("/login");
            }
        });
    }, []);

    return {user, loading};
}