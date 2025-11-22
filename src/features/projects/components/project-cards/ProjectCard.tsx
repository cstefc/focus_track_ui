import {Project} from "@/api/domain/projects/Project";
import {useState} from "react";
import ProjectCardDisplay from "@/features/projects/components/project-cards/ProjectCardDisplay";
import {ProjectCardEdit} from "@/features/projects/components/project-cards/ProjectCardEdit";
import {Container} from "@mui/material";

export interface ProjectCardProps {
    project: Project;
    projects: Project[];
    setProjects: (projects: Project[]) => void;
}

export function ProjectCard({project, projects, setProjects}: ProjectCardProps) {
    const [edit, setEdit] = useState(false);

    const toggleEdit = () => {
        setEdit(!edit);
    }

    return (
        <Container sx={{
            height: "300px",
            width: "360px",
        }}>
            {!edit && <ProjectCardDisplay
                project={project}
                toggleEdit={toggleEdit}
            />}
            {edit && <ProjectCardEdit
                project={project}
                projects={projects}
                setProjects={setProjects}
                toggleEdit={toggleEdit}
            />}

        </Container>
    )
        ;
}