import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import AuthContainer from "../auth/AuthContainer";
import {getAuth} from "firebase/auth";
import Image from "react-bootstrap/Image";

function NavBar() {
    const navigate = useNavigate();
    const auth = getAuth();
    return (
        <Navbar fixed={'top'} expand={'md'} bg="dark" variant={"dark"} style={{
            opacity: "90%"
        }}>

            <Container className={"m-auto"}>
                <Nav
                    className={"me-4"}
                >
                    <Nav.Item>
                        <Image
                            alt=""
                            src={"/calendar.png"}
                            width={50}
                            height={50}
                            className="d-inline-block align-top fluid"
                            onClick={() => navigate("/dashboard")}
                        />
                    </Nav.Item>
                </Nav>
                <Nav
                    className={"align-content-center align-items-center"}
                    style={{
                    height: "50px",
                    width: "50px",
                }}>
                    <Nav.Item>
                        <Navbar.Brand
                            onClick={() => navigate("/dashboard")}
                        >
                            Activity Planner
                        </Navbar.Brand>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => navigate('/dashboard')}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => navigate('/calendar')}>Calendar</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => navigate('/tasks')}>Tasks</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav className={"ms-auto"}>
                    {auth.currentUser &&
                        <Image
                            src={auth.currentUser.photoURL || ""}
                            alt={'profile_pic'} roundedCircle
                            width={35}
                            height={35}
                            fluid
                        />
                    }
                    <NavDropdown align-right={"true"} menuVariant={'dark'}
                                 title={auth.currentUser?.displayName || "Log In"}>
                        <AuthContainer/>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>

    )
}

export default NavBar;
