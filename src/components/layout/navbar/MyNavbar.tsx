import {Nav, Navbar} from "react-bootstrap";
import AuthContainer from "./auth-container/AuthContainer";

import './my-navbar.css'
import NavbarLogo from "./NavbarLogo";
import NavbarRoutes from "./NavbarRoutes";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import LanguageBox from "./language-box/LanguageBox";

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
                    destination={"/"}/>
            </Nav>

            <Navbar.Toggle aria-controls="main-navbar" className={"me-3"} onClick={() => setExpanded(!expanded)}/>

            <Navbar.Collapse id="main-navbar" className={"ms-3"}>
                <Nav>
                    <NavbarRoutes navigate={handleNavigate}/>
                </Nav>

                <Nav className={"ms-auto me-3"}>
                    <LanguageBox/>
                </Nav>

                <Nav>
                    <AuthContainer navigate={handleNavigate}/>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar;
