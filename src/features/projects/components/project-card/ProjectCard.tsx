import {Project} from "@/api/domain/projects/Project";
import {MouseEvent, useState} from "react";
import ProjectCardDisplay from "@/features/projects/components/project-card/ProjectCardDisplay";
import {ProjectCardEdit} from "@/features/projects/components/project-card/ProjectCardEdit";
import {Container} from "@mui/material";
import Card from "@mui/material/Card";
import {useNavigate} from "react-router-dom";

export interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({project}: ProjectCardProps) {
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    async function onEdit() {
        setEdit(!edit);
    }

    function handleClick(event: MouseEvent) {
        event.stopPropagation();
        if (!project.archived && !edit) {
            navigate(`/projects/${project.id}`);
        }
    }

    return (
        <Container sx={{
            height: "350px",
            width: "400px",
            cursor: "pointer",
            "&:hover": {opacity: 0.8}
        }}>
            <Card onClick={handleClick} sx={{height: "100%", width: "100%", display: "flex", flexDirection: "column"}}>
                {!edit && <ProjectCardDisplay project={project} onEdit={onEdit}/>}
                {edit && <ProjectCardEdit project={project} onEdit={onEdit}/>}
            </Card>
        </Container>
    )
        ;
}