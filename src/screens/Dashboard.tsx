import {auth} from "../config/firebase";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {CreateTask, createTask, getAllTasks} from "../api/task";

const Dashboard = () => {
    const [token, setToken] = useState('')
    useEffect(() => {
        async function getToken() {
            if (!token) {
                setToken(await auth.currentUser?.getIdToken() || "")
            }
        }

        void getToken()
    }, [token]);
    return (
        <>
            <h1 className={"text-center"}>Welcome {auth.currentUser?.displayName}!</h1>
            <Button
                variant={"dark"}
                //onClick={() => {void createUser()}}
                onClick={async () => {
                    let response = await getAllTasks()
                    console.log(response)
                }

                }
            >Click me to test api call!</Button>
        </>
    );
};

export default Dashboard;
