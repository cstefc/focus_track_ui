import React from "react";
import {Col, Container, Row} from "react-bootstrap";

import HomeCarousel from "./components/HomeCarousel";
import HomeCard from "./components/HomeCard";
import '@/layouts/home.css';


export default function Home() {
    const pictures: string[] = ["/productivity1.jpg", "/productivity2.jpg", "/productivity3.jpg", "/productivity4.jpg", "/productivity5.jpg"];
    const cards: string[] = ["success", "productivity", "tracking"]

    return (
        <Container
            className={"align-content-center home"}
        >
            <Row key={'klj'} className={"m-3"}>
                <HomeCarousel pictures={pictures}/>
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