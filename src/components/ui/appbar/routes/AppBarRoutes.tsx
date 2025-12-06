import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {getAuth, User} from "firebase/auth";

import {Box, MenuItem, Typography} from "@mui/material";

import routes, {RouteType} from "@/config/routes";

export interface AppBarRoutesProps {
    mobile: boolean;
    onNavigate: (path: string) => void;
}

export default function AppBarRoutes({mobile, onNavigate}: AppBarRoutesProps) {
    const {t} = useTranslation("general");
    const [user, setUser] = useState<User | null>(() => getAuth().currentUser);

    useEffect(() => {
        return getAuth().onAuthStateChanged((user) => setUser(user));
    }, []);

    return (
        <>
            {routes.map((route: RouteType) => {
                if (route.navbar && ((user !== null) === route.protected)) {
                    return (
                        mobile
                            ? <MenuItem key={route.name} sx={{textTransform: "none"}}
                                        onClick={() => onNavigate(route.path)}>
                                <Typography variant={"body1"}>{t(`routes.${route.name}`)}</Typography>
                            </MenuItem>
                            :
                            <Box key={route.name} color="inherit" sx={{
                                cursor: "pointer", textTransform: "none",
                                "&:hover": {opacity: 0.8}
                            }} onClick={() => onNavigate(route.path)}>
                                <Typography variant={"body1"}>{t(`routes.${route.name}`)}</Typography>
                            </Box>
                    );
                }
                return null;
            })}
        </>
    );
}
