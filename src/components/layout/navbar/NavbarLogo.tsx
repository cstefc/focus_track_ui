import Image from "react-bootstrap/Image";
import {Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {JSX} from "react";

export interface NavbarLogoProps {
    image: string;
    destination: string;
}

export default function NavbarLogo({image, destination} :NavbarLogoProps): JSX.Element {
    const navigate = useNavigate();
    const {t} = useTranslation("general");

    return (
        <Navbar.Brand
            className={"navbar-logo"}
            onClick={() => navigate(destination)}
        >
            <Image
                alt={t("pictures.logoAltText")}
                src={image}
                width={50}
                height={50}
                roundedCircle={true}
                className="d-inline-block align-top"
            />
            Focus Track
        </Navbar.Brand>
    );
}