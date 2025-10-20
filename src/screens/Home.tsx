import React from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "@/config/firebase";
import {Col, Container, Row} from "react-bootstrap";

import HomeCarousel from "@/components/home/HomeCarousel";
import HomeCard from "@/components/home/HomeCard";
import '@/layouts/home.css';


export default function Home() {
    const navigate = useNavigate();
    if (auth.currentUser) {
        navigate('/dashboard');
        return null;
    }
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