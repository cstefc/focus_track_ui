import routes, {RouteType} from "@/config/routes";
import {Nav} from "react-bootstrap";
import {getAuth, User} from "firebase/auth";
import {useTranslation} from "react-i18next";
import {JSX, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import firebase from "firebase/compat";
import Auth = firebase.auth.Auth;

export interface NavbarRoutesProps {
    onNavigate: () => void
}

export default function NavbarRoutes({onNavigate}: NavbarRoutesProps): JSX.Element {
    const {t} = useTranslation("general")
    const [user, setUser] = useState<User | null>(getAuth().currentUser);

    useEffect(() => {
        getAuth().onAuthStateChanged(user => {setUser(user)})
    }, [])

    return <>
        {routes.map((route: RouteType, index: number) => {
                if (route.navbar && ((user !== null) === route.protected)) {
                    return <Nav.Link
                        key={index}
                        as={NavLink}
                        to={route.path}
                        onClick={onNavigate}
                    >{t(`routes.${route.name}`)}</Nav.Link>
                } else {
                    return null
                }
            })}
        </>
}