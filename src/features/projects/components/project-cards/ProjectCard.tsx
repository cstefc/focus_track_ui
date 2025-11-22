import {Project} from "@/api/domain/projects/Project";
import {useState} from "react";
import ProjectCardDisplay from "@/features/projects/components/project-cards/ProjectCardDisplay";
import {ProjectCardEdit} from "@/features/projects/components/project-cards/ProjectCardEdit";

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
        <>
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

        </>
    )
        ;
}