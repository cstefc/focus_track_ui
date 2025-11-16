import React from "react";
import {Col, Container, Row} from "react-bootstrap";

import PictureCarousel from "../../components/ui/PictureCarousel";
import HomeCard from "./components/HomeCard";
import './home.css';

export default function Home() {
    const pictures: string[] = ["/productivity1.jpg", "/productivity2.jpg", "/productivity3.jpg", "/productivity4.jpg", "/productivity5.jpg"];
    const cards: string[] = ["success", "productivity", "tracking"]

    return (
        <Container
            className={"align-content-center home"}
        >
            <Row key={'carousel-row'} className={"m-3"}>
                <PictureCarousel pictures={pictures}/>
            </Row>

            <Row className={"m-2"}>
                {cards.map((card: string, index: number) => (
                    <Col key={index}>
                        <HomeCard card={card}/>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}