import {Nav, Navbar} from "react-bootstrap";
import AuthContainer from "./auth_container/AuthContainer";

import './my-navbar.css'
import NavbarLogo from "./NavbarLogo";
import NavbarRoutes from "./NavbarRoutes";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function MyNavbar() {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
        setExpanded(false);
    }

    return (
        <Navbar expanded={expanded} fixed={'top'} bg="dark" expand={"md"}>
            <Nav className="ms-3 align-items-center">
                <NavbarLogo
                    image={"/FocusTrackLogo_600x600.jpg"}
                    destination={"/dashboard"}/>
            </Nav>

            <Navbar.Toggle aria-controls="main-navbar" className={"me-3"} onClick={() => setExpanded(!expanded)}/>

            <Navbar.Collapse id="main-navbar" className={"ms-3"}>
                <Nav>
                    <NavbarRoutes navigate={handleNavigate}/>
                </Nav>

                <Nav className={"ms-auto me-3"}>
                    <AuthContainer navigate={handleNavigate}/>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar;
