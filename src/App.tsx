import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {auth} from "./config/firebase";
import routes from "./config/routes";
import AuthChecker from "./components/auth/AuthChecker";
import NavBar from "./components/navbar/NavBar";
import {Spinner, Stack} from "react-bootstrap";

function App() {
    const [loading, setLoading] = useState(true);
    let height = 100;
    let useHeight;
    useHeight = height + "vh";

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
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: useHeight,
                }}
            >
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
            ;

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
                            <Stack
                                style={{padding: "100px 0 0 0"}}
                                data-bs-theme="dark"
                                direction="vertical">
                                <NavBar/>
                                {route.protected ? (
                                    <AuthChecker>
                                        <route.component/>
                                    </AuthChecker>
                                ) : (
                                    <route.component/>
                                )}
                            </Stack>
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
