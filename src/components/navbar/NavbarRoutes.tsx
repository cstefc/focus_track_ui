import routes, {RouteType} from "@/config/routes";
import {Nav} from "react-bootstrap";
import {getAuth} from "firebase/auth";

export default function NavbarRoutes(props: {navigate: (destination: string) => void}) {
    const auth = getAuth()

    return(
        <>
        {auth.currentUser && routes.map((route: RouteType, index: number) => {
                if (route.navbar){
                    return <Nav.Link key={index} onClick={() => props.navigate(route.path)}>{route.name}</Nav.Link>
                }else{
                    return null
                }
            })}
        </>
    );
}