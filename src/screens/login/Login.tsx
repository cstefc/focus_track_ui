import React from "react";
import {Container} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default function Login(){
    const {t} = useTranslation("login");
    return (
        <Container m-xl={"auto"}>
            <h1>{t("title")}</h1>
            <p>{t("text")}</p>
        </Container>);

};