import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "../config/firebase";
import {Card, CardText, CardTitle, Col, Container, Figure, FigureImage, Row} from "react-bootstrap";
import HomeCarousel from "../components/home/HomeCarousel";

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.currentUser) {
            navigate('/dashboard');
        }
    }, [navigate])

    return (
        <>
            <Container
                className={"align-content-center"}
            >
                <Row className="justify-content-center">
                    <HomeCarousel/>
                </Row>
                <Row className={"justify-content-center m-2"}>
                    <Col>
                        <Card className={""}>
                            <CardTitle
                                className="text-center p-3"
                                style={{
                                    fontSize: "26px",
                                    fontStyle: "italic",
                                    fontFamily: "Helvetica"
                                }}
                            >Success: The Power of Consistency</CardTitle>
                            <br/>
                            <CardText
                                className={"text-center m-3"}
                                style={
                                    {
                                        textAlign: "justify",
                                        alignContent: "top",
                                        fontSize: "20px",
                                        fontStyle: "italic",
                                        fontFamily: "Helvetica",
                                        overflow: "scroll"
                                    }
                                }>
                                Success isn’t just about big wins—it’s about small, consistent actions that add up over
                                time. By setting clear goals and tracking your progress, you stay motivated and on the
                                right
                                path. Every step forward brings you closer to achieving your dreams.
                            </CardText>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={""}>
                            <CardTitle
                                className="text-center p-3"
                                style={{
                                    fontSize: "26px",
                                    fontStyle: "italic",
                                    fontFamily: "Helvetica"
                                }}
                            >Productivity: Work Smarter, Not Harder
                            </CardTitle>
                            <br/>
                            <CardText
                                className={"text-center m-3"}
                                style={
                                    {
                                        textAlign: "justify",
                                        alignContent: "top",
                                        fontSize: "20px",
                                        fontStyle: "italic",
                                        fontFamily: "Helvetica",
                                        overflow: "scroll"
                                    }
                                }>
                                Maximizing productivity is all about focus and efficiency. Planning your activities
                                helps
                                you prioritize what truly matters, avoid distractions, and make steady progress. With
                                the
                                right system in place, you can achieve more in less time and with less stress.
                            </CardText>
                        </Card>

                    </Col>
                    <Col>
                        <Card className={""}>
                            <CardTitle
                                className="text-center p-3"
                                style={{
                                    fontSize: "26px",
                                    fontStyle: "italic",
                                    fontFamily: "Helvetica"
                                }}
                            >The Importance of Tracking: Stay on Course
                            </CardTitle>
                            <br/>
                            <CardText
                                className={"text-center m-3"}
                                style={
                                    {
                                        textAlign: "justify",
                                        alignContent: "top",
                                        fontSize: "20px",
                                        fontStyle: "italic",
                                        fontFamily: "Helvetica",
                                        overflow: "scroll"
                                    }
                                }>
                                Tracking your activities gives you valuable insights into your habits, strengths, and
                                areas
                                for improvement. It helps you stay accountable, celebrate milestones, and make informed
                                decisions. The more you track, the more you grow!
                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home
