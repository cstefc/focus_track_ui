import {Button, Col, Container, Form, Modal, Row, Stack} from "react-bootstrap";
import {useState} from "react";

export default function Projects () {
    const [showProject, setShowProject] = useState(false);
    const [title, setTitle] = useState("");

    function saveProject() {
        // TODO
        setShowProject(false);
    }

    function createCategory() {

    }

    return (
        <>
            <Stack className={"d-flex justify-content-end p-3"} direction={"horizontal"} gap={4}>
                <Button
                    variant={"primary"}
                    className={"p-3 ms-auto"}
                    style={{
                        fontSize: "20px"
                    }}
                    onClick={createCategory}
                >Create new category</Button>
                <Button
                    variant={"primary"}
                    className={"p-3"}
                    style={{
                        fontSize: "20px"
                    }}
                    onClick={() => setShowProject(true)}
                >Create a new task</Button>
            </Stack>
            <div className={'justify-content-center'}>
                <Row className="d-flex justify-content-center">
                    <Col>
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
                    <Col/>
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
                <Row>
                    <h1 className={"text"}>Test 123</h1>
                </Row>
            </div>
            <Modal show={showProject} onHide={saveProject} variant={"dark"}>
                <Container className={"modal-content bg-dark text-white"}>
                    <Modal.Header>
                        <Modal.Title>Create a task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter a title"
                                    value={title}
                                    onChange={(e) => {setTitle(e.target.value)}}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col className={'d-flex justify-content-between'}>
                            <Button className={"ms-auto me-2"} onClick={() => setShowProject(false)}>Cancel</Button>
                            <Button className={""} onClick={saveProject}>Save</Button>
                        </Col>
                    </Modal.Footer>
                </Container>
            </Modal>
        </>
    );
};