import React, {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {auth} from "./config/firebase";
import routes from "./config/routes";
import Center from "./components/utils/Center";
import AuthChecker from "./components/auth/AuthChecker";
import NavBar from "./components/navbar/NavBar";
import {Container} from "react-bootstrap";

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
                <CircularProgress/>
            </Center>
        );

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <>
                                <NavBar/>
                                <Container style={{marginTop: '56px'}}>
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
