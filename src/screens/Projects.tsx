import {Button, Stack} from "react-bootstrap";
import {useState} from "react";
import ProjectCard from "@/components/project-card/ProjectCard";
import {Project} from "@/api/domain/projects/Project";
import api from "@/config/api";

export default function Projects() {
    const [project, setProject] = useState<Project>({
        name: "test", ownerId: 1, description: "test project", plans: []
    });
    const [showProject, setShowProject] = useState(false);
    const [title, setTitle] = useState("");

    async function saveProject() {
        // TODO
        const projects = await api.project.findAll();
        setShowProject(false);
        for (let project of projects) {
            console.log(project);
        }
    }

    return (
        <>
            <Stack direction={"horizontal"} gap={4}>
                <Button
                    variant={"primary"}
                    className={"ms-auto"}
                    onClick={() => {
                    }}
                >Create new category</Button>
                <Button
                    variant={"primary"}
                    onClick={() => setShowProject(true)}
                >Create a new task</Button>
            </Stack>

            {showProject && <ProjectCard
                project={project}
                saveProject={saveProject}
                showProject={showProject}
                setShowProject={setShowProject}
                title={title}
                setTitle={setTitle}
            />}
        </>
    );
};