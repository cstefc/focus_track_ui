import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import AuthContainer from "../auth/AuthContainer";
import {getAuth} from "firebase/auth";
import Image from "react-bootstrap/Image";
import logo from "/logos/TaskRingLogo192.jpeg"

function NavBar() {
    const navigate = useNavigate();
    const auth = getAuth();
    return (<>
            <Navbar fixed={'top'} expand={'md'} bg="dark" variant={"dark"}>
                <Container>
                    <Image
                        alt=""
                        src={logo}
                        className="d-inline-block align-top"
                        onClick={() => navigate("/dashboard")}
                        height={75}
                        width={75}
                        roundedCircle
                    />
                    <Nav className={""}>
                        <Nav.Item>
                            <Navbar.Brand
                            onClick={() => navigate("/dashboard")}
                            >
                                TaskRing
                            </Navbar.Brand>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => navigate('/dashboard')}>Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => navigate('/calendar')}>Calendar</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className={"ms-auto"}>
                        {auth.currentUser &&
                            <Image
                                src="https://lh3.googleusercontent.com/a/ACg8ocK4osZpMOuXm4xFg8-CHeHKqqrkOhtfVWv2aA7VskOn9go=s96-c"
                                alt={'profile_pic'} roundedCircle
                                width={35}
                                height={35}
                                fluid
                            />
                        }
                        <NavDropdown align-right={"true"} menuVariant={'dark'}
                                     title={auth.currentUser?.displayName || "Account"}>
                            <AuthContainer/>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;
