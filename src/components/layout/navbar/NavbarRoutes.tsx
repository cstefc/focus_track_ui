import routes, {RouteType} from "@/config/routes";
import {Nav} from "react-bootstrap";
import {getAuth} from "firebase/auth";
import {useTranslation} from "react-i18next";
import {JSX} from "react";

export interface NavbarRoutesProps {
    navigate: (destination: string) => void
}

export default function NavbarRoutes({navigate}: NavbarRoutesProps): JSX.Element {
    const {t} = useTranslation("general");
    return (
        <>
            {routes.map((route: RouteType, index: number) => {
                if (route.navbar && ((getAuth().currentUser !== null) === route.protected)) {
                    return <Nav.Link key={index}
                                     onClick={() => navigate(route.path)}>{t(`routes.${route.name}`)}</Nav.Link>
                } else {
                    return null
                }
            })}
        </>
    );
}