import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {auth} from "../config/firebase";
import {Container} from "react-bootstrap";

function NavBar() {
    return (
        <Navbar fixed={'top'} expand={'md'} bg="dark" variant={"dark"}>
            <Container>
                <Nav>
                    <Nav.Item>
                        <Navbar.Brand href="/">
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
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/calendar">Calendar</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav>
                    <NavDropdown align-right menuVariant={'dark'} title={auth.currentUser?.displayName}>
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;
