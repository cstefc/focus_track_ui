import Image from "react-bootstrap/Image";
import {Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function NavbarLogo(props: {image: string, destination: string}){
    const navigate = useNavigate();

    return (
        <Navbar.Brand
            className={"navbar-logo"}
            onClick={() => navigate(props.destination)}
        >
            <Image
                alt="Logo"
                src={props.image}
                width={50}
                height={50}
                roundedCircle={true}
                className="d-inline-block align-top"
            />
            Focus Track
        </Navbar.Brand>
    );
}