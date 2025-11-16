import Image from "react-bootstrap/Image";
import React from "react";
import {User} from "firebase/auth";
import {useTranslation} from "react-i18next";

export default function AuthContainerTitle(props: { user: User | null }) {
    const {t} = useTranslation("general");
    return (
        <>
            {props.user &&
                <Image
                    className="me-3"
                    src={props.user?.photoURL || undefined}
                    alt={'profile_pic'} roundedCircle
                    width={50}
                    height={50}
                    fluid
                />}
            {props.user?.displayName || t("authentication.signIn")}
        </>
    );
}