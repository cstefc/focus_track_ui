import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {auth} from "./config/firebase";
import routes from "./config/routes";
import AuthChecker from "./components/auth/AuthChecker";
import NavBar from "./components/navbar/NavBar";
import {Container, Spinner} from "react-bootstrap";
import Center from "./components/utils/Center";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.info("User detected.");
            } else {
                console.info("No user detected");
            }
            setLoading(false);
        });
    }, []);

    if (loading)
        return (
            <Center>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Center>
        );

    return (
        <BrowserRouter
            basename="/"
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <>
                                <NavBar/>
                                <Container style={{marginLeft: '0px', paddingLeft:'0px', marginTop: '90px'}}>
                                    {route.protected ? (
                                        <AuthChecker>
                                            <route.component/>
                                        </AuthChecker>
                                    ) : (
                                        <route.component/>
                                    )}
                                </Container>
                            </>
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
