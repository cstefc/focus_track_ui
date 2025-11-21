import {Project} from "@/api/domain/projects/Project";
import {useState} from "react";
import ProjectCardDisplay from "@/features/projects/components/project-cards/ProjectCardDisplay";
import {ProjectCardEdit} from "@/features/projects/components/project-cards/ProjectCardEdit";

export interface ProjectCardProps {
    project: Project;
    onUpdate: () => void;
}

export default function ProjectCard({project, onUpdate}: ProjectCardProps) {
    const [edit, setEdit] = useState(false);

    return (
        <>
            {!edit && <ProjectCardDisplay project={project} edit={edit} setEdit={setEdit}/>}
            {edit && <ProjectCardEdit project={project} edit={edit} setEdit={setEdit} onUpdate={onUpdate}/>}
        </>
    )
        ;
}