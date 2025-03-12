import {auth} from "../config/firebase";
import {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
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
            <Container className={"align-content-center flex justify-content"}>
                <h1 className={"text-center text m-3"}>Welcome {auth.currentUser?.displayName}!</h1>
                <Row className={"w-100"}>
                    <Col className={"w-100"}>
                        <Button
                            variant={"dark primary m-5"}
                            //onClick={() => {void createUser()}}
                            onClick={async () => {
                                let response = await getAllTasks()
                                console.log(response)
                            }

                            }
                        >Click me to test api call!</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
