import {Card, CardText, CardTitle, Col} from "react-bootstrap";
import React from "react";
import {useTranslation} from "react-i18next";

export interface HomeCardProps{
    card: string
}

export default function HomeCard({card}: HomeCardProps) {
    const {t} = useTranslation("home");

    return (
        <Col key={card}>
            <Card>
                <CardTitle className="text-center p-3 card_title">{t(`cards.${card}.title`)}</CardTitle>
                <br/>
                <CardText className={"text-center m-3 card_text"}>{t(`cards.${card}.text`)}</CardText>
            </Card>
        </Col>
    );
}