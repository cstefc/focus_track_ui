import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {auth} from "../../config/firebase";
import {Container} from "react-bootstrap";
import Logout from "../auth/Logout";
import {useNavigate} from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    return (
        <Navbar fixed={'top'} expand={'md'} bg="dark" variant={"dark"}>
            <Container>
                <Nav>
                    <Nav.Item>
                        <Navbar.Brand onClick={() => navigate("/")}>
                            <img
                                alt=""
                                src='/logos/logo192.png'
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            Activity Planner
                        </Navbar.Brand>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => navigate('/calendar')}>Calendar</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav>
                    {auth.currentUser !== null &&
                        <NavDropdown align-right menuVariant={'dark'} title={auth.currentUser?.displayName}>
                            <Logout/>
                        </NavDropdown>}

                    {auth.currentUser === null && <Nav.Link align-right href={'/login'}>
                        Log In
                    </Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;
