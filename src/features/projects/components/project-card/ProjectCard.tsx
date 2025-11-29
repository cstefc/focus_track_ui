import {Project, UpdateProject} from "@/api/domain/projects/Project";
import {useState, MouseEvent} from "react";
import ProjectCardDisplay from "@/features/projects/components/project-card/ProjectCardDisplay";
import {ProjectCardEdit} from "@/features/projects/components/project-card/ProjectCardEdit";
import {Container} from "@mui/material";
import {deleteApi, sendApi} from "@/api/apiCall";
import Card from "@mui/material/Card";
import {useNavigate} from "react-router-dom";

export interface ProjectCardProps {
    project: Project;
    projects: Project[];
    setProjects: (projects: Project[]) => void;
}

export function ProjectCard({project, projects, setProjects}: ProjectCardProps) {
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    async function handleUpdate(data: UpdateProject) {
        const result = await sendApi<Project>(`/projects`, "PUT", data);
        if (result) {
            setProjects(projects.map((project) => project.id == data.id ? result : project));
        }
        setEdit(!edit);
    }

    async function handleArchive(data: UpdateProject) {
        data.archived = true;
        const result = await sendApi<Project>(`/projects`, "PUT", data);
        if (result) {
            setProjects(projects.map((project) => project.id == data.id ? result : project));
        }
        setEdit(!edit);
    }

    async function handleDelete() {
        void deleteApi(`/projects/?id=${project.id}`);
        setProjects(projects.filter((p) => p.id !== project.id));
        setEdit(!edit);
    }

    async function handleCancel() {
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
            height: "360px",
            width: "400px",
        }}>
            <Card onClick={handleClick} sx={{height: "100%", width: "100%", display: "flex", flexDirection: "column"}}>
                {!edit && <ProjectCardDisplay
                    project={project}
                    handleEdit={() => setEdit(true)}
                />}

                {edit && <ProjectCardEdit
                    project={project}
                    handleUpdate={handleUpdate}
                    handleArchive={handleArchive}
                    handleDelete={handleDelete}
                    handleCancel={handleCancel}
                />}

            </Card>
        </Container>
    )
        ;
}