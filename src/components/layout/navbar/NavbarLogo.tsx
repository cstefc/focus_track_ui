import Image from "react-bootstrap/Image";
import {Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function NavbarLogo(props: {image: string, destination: string}){
    const navigate = useNavigate();
    const {t} = useTranslation("general");
    return (
        <Navbar.Brand
            className={"navbar-logo"}
            onClick={() => navigate(props.destination)}
        >
            <Image
                alt={t("pictures.logoAltText")}
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