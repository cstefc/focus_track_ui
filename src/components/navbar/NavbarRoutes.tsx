import routes, {RouteType} from "@/config/routes";
import {Nav} from "react-bootstrap";
import {getAuth} from "firebase/auth";
import {useTranslation} from "react-i18next";

export default function NavbarRoutes(props: {navigate: (destination: string) => void}) {
    const auth = getAuth()
    const {t} = useTranslation("general");
    return(
        <>
        {auth.currentUser && routes.map((route: RouteType, index: number) => {
                if (route.navbar){
                    return <Nav.Link key={index} onClick={() => props.navigate(route.path)}>{t(`routes.${route.name}`)}</Nav.Link>
                }else{
                    return null
                }
            })}
        </>
    );
}