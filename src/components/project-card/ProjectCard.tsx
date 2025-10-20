import {Button, Col, Container, Form, Modal} from "react-bootstrap";
import {Project} from "@/api/domain/projects/Project";
import {useState} from "react";

export interface ProjectCardProps {
    project: Project;
    saveProject: () => void;
    showProject: boolean;
    setShowProject: (showProject: boolean) => void;

    title: string;
    setTitle: (title: string) => void;
}

export default function ProjectCard({project, saveProject, showProject, setShowProject, title, setTitle}: ProjectCardProps) {

    return (
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
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
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

    );
}