import {Button, Col, Container, Row, Stack} from "react-bootstrap";

const Tasks = () => {
    return (
        <>
            <Container
                className={"w-100 justify-content-center align-items-center"}
                style={{
                    position: "sticky",
                }}
            >
                <Stack className={"p-5"} direction={"horizontal"} gap={4}>
                        <Button
                            variant={"primary"}
                            className={"p-3 ms-auto"}
                            style={{
                                fontSize: "20px"
                            }}
                        >Create new category</Button>
                        <Button
                            variant={"primary"}
                            className={"p-3"}
                            style={{
                                fontSize: "20px"
                            }}
                        >Create a new task</Button>
                </Stack>
            </Container>

            <Row className="w-100 h-100">
                <Col xs={4}>
                    <Container className={"align-items-center"}>
                        <h1 className={"text text-center"}>Left</h1>
                        <h1 className={"text text-center"}>Left</h1>
                        <h1 className={"text text-center"}>Left</h1>
                        <h1 className={"text text-center"}>Left</h1>
                        <h1 className={"text text-center"}>Left</h1>
                        <h1 className={"text text-center"}>Left</h1>
                        <h1 className={"text text-center"}>Left</h1>
                        <h1 className={"text text-center"}>Left</h1>
                    </Container>
                </Col>
                <Col>
                    <Container className={"align-items-center"}>
                        <h1 className={"text text-center"}>Middle</h1>
                        <h1 className={"text text-center"}>Middle</h1>
                        <h1 className={"text text-center"}>Middle</h1>
                        <h1 className={"text text-center"}>Middle</h1>
                        <h1 className={"text text-center"}>Middle</h1>
                        <h1 className={"text text-center"}>Middle</h1>
                        <h1 className={"text text-center"}>Middle</h1>
                        <h1 className={"text text-center"}>Middle</h1>
                    </Container>
                </Col>
                <Col>
                    <Container className={"align-items-center"}>
                        <h1 className={"text text-center"}>Right</h1>
                        <h1 className={"text text-center"}>Right</h1>
                        <h1 className={"text text-center"}>Right</h1>
                        <h1 className={"text text-center"}>Right</h1>
                        <h1 className={"text text-center"}>Right</h1>
                        <h1 className={"text text-center"}>Right</h1>
                        <h1 className={"text text-center"}>Right</h1>
                        <h1 className={"text text-center"}>Right</h1>
                    </Container>
                </Col>
            </Row>
        </>
    );
};

export default Tasks;
