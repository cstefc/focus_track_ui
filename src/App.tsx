import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {auth} from "./config/firebase";
import routes from "./config/routes";
import AuthChecker from "./components/auth/AuthChecker";
import MyNavbar from "./components/navbar/MyNavbar";
import {Container, Spinner} from "react-bootstrap";
import "./layouts/app.css";

function App() {
    const [loading, setLoading] = useState(true);
    let height = 100;
    let useHeight;
    useHeight = height + "vh";

    auth.onAuthStateChanged((user) => {
        setLoading(false);
    });

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
        >
            <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Container className={"application-container"} fluid data-bs-theme="dark">
                                <MyNavbar/>
                                {route.protected ? (
                                    <AuthChecker>
                                        <route.component/>
                                    </AuthChecker>
                                ) : (
                                    <route.component/>
                                )}
                            </Container>
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
