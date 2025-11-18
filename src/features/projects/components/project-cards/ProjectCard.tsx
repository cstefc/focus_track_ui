import {Button, Card, Col} from "react-bootstrap";
import {Project} from "@/api/domain/projects/Project";
import {Archive, Trash} from "react-bootstrap-icons";
import {useNavigate} from "react-router-dom";
import api from "@/config/api";

export interface ProjectCardProps {
    project: Project;
    onUpdate: () => void;
}

export default function ProjectCard({project, onUpdate}: ProjectCardProps) {
    const navigate = useNavigate();

    function handleClick() {
        if (!project.archived){
            navigate(`/projects/${project.id}`);
        }
    }

    async function handleDelete() {
        await api.project.delete(`${project.id}`);
        onUpdate();
    }

    async function handleArchive() {
        project.archived = true;
        await api.project.update(`${project.id}`, project);
        onUpdate();
    }

    return (
        <Card className={"p-3 h-100 w-100 "} onClick={handleClick}>
            <Card.Title>
                {project.title}
            </Card.Title>
            <Card.Body>
                {project.description}
            </Card.Body>
            <Col className={"d-flex justify-content-end align-items-end"}>
                {!project.archived &&<Button variant={"outline-warning"} className={"me-2"} onClick={(e) => {
                    e.stopPropagation(); // <-- stop card click
                    void handleArchive();
                }}><Archive/></Button>}
                <Button variant={"outline-danger"} onClick={(e) => {
                    e.stopPropagation(); // <-- stop card click
                    void handleDelete();
                }}><Trash/></Button>
            </Col>
        </Card>
    );
}