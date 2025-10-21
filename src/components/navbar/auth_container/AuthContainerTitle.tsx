import Image from "react-bootstrap/Image";
import React from "react";
import {User} from "firebase/auth";

export default function DropdownTitle(props: { user: User | null }) {
    return (
        <>
            {props.user &&
                <Image
                    className="me-3"
                    src={props.user?.photoURL || ""}
                    alt={'profile_pic'} roundedCircle
                    width={50}
                    height={50}
                    fluid
                />}
            {props.user?.displayName || "Log In"}
        </>);
}