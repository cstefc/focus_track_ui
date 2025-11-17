import routes, {RouteType} from "@/config/routes";
import {Nav} from "react-bootstrap";
import {getAuth} from "firebase/auth";
import {useTranslation} from "react-i18next";
import {JSX} from "react";
import {NavLink} from "react-router-dom";

export interface NavbarRoutesProps {
    onNavigate: () => void
}

export default function NavbarRoutes({onNavigate}: NavbarRoutesProps): JSX.Element {
    const {t} = useTranslation("general")
    return <>
        {routes.map((route: RouteType, index: number) => {
                if (route.navbar && ((getAuth().currentUser !== null) === route.protected)) {
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