import ProjectCard from "@/features/projects/components/project-cards/ProjectCard";
import {useEffect, useState} from "react";
import api from "@/config/api";
import {Project} from "@/api/domain/projects/Project";
import {useNavigate, useParams} from "react-router-dom";
import {Accordion, Container, Table} from "react-bootstrap";
import {Status} from "@/api/domain/predefined/Status";

export default function ProjectScreen() {
    const {id} = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null as unknown as Project);
    const navigate = useNavigate();

    useEffect(() => {
        api.project.findById(`${id}`)
            .then(project => setProject(project))
            .catch(() => {
                navigate("/projects")
            });
    }, [])

    return (
        <Container className="m-3" fluid>
            <h1>{project?.title}</h1>
            <p>{project?.description}</p>
            <Accordion defaultActiveKey={"0"}>
                <Accordion.Item eventKey={"0"}>
                    <Accordion.Header>
                        {"Goal #1"}
                    </Accordion.Header>

                    <Accordion.Body>
                        <p>description of the goal...</p>
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Objective</th>
                                <th>Description</th>
                                <th>Requirements</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Place steps</td>
                                <td>Load the steps from api</td>
                                <td>The actual goals + endpoints</td>
                                <td>{Status.NotStarted}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}
