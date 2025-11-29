import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import routes from "./config/routes";
import AuthChecker from "./components/layout/auth/AuthChecker";
import MyAppBar from "@/components/ui/appbar/MyAppBar";
import {getAuth} from "firebase/auth";
import Loading from "@/components/ui/Loading";
import {Box} from "@mui/material";

function App() {
    const [loading, setLoading] = useState(true);

    getAuth().onAuthStateChanged(() => {
        setLoading(false);
    });

    if (loading) return (<Loading/>);

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
                            <>
                                <MyAppBar/>
                                <Box marginTop={"80px"} padding={1}>
                                    {route.protected ? (
                                        <AuthChecker>
                                            <route.component/>
                                        </AuthChecker>
                                    ) : (
                                        <route.component/>
                                    )}
                                </Box>
                            </>
                        }
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
