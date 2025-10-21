import {Button, Container, Stack} from "react-bootstrap";
import {useState} from "react";
import api from "@/config/api";
import {CreateProject} from "../api/domain/projects/Project";
import {auth} from "../config/firebase";
import ProjectModal from "../components/project-modal/ProjectModal";

export default function Projects() {
    const [showCreateModal, setShowCreateModal] = useState(false);

    async function createProject(data: CreateProject) {
        if (!auth.currentUser) {
            throw new Error("Invalid uuid");
        }
        api.project.create(data);
        setShowCreateModal(false);
    }

    return (
        <>
            <Container className={"p-2"}>
                <Stack direction={"horizontal"} gap={4}>
                    <Button
                        variant={"primary"}
                        className={"ms-auto"}
                        onClick={() => {
                        }}
                    >Create new category</Button>
                    <Button
                        variant={"primary"}
                        onClick={() => setShowCreateModal(true)}
                    >Create a new project</Button>
                </Stack>
            </Container>
            <ProjectModal show={showCreateModal}
                          onClose={() => setShowCreateModal(false)}
                          onSubmit={createProject}/>
        </>
    );
};