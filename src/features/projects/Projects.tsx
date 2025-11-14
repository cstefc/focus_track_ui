import {Button, Container, Stack} from "react-bootstrap";
import {useState} from "react";
import api from "@/config/api";
import {CreateProject} from "@/api/domain/projects/Project";
import CreateModal from "./components/create-modal/CreateModal";
import {useTranslation} from "react-i18next";
import {getAuth} from "firebase/auth";

export default function Projects() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const {t} = useTranslation("projects");
    const auth = getAuth();

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
                    >{t("button.createCategory")}</Button>
                    <Button
                        variant={"primary"}
                        onClick={() => setShowCreateModal(true)}
                    >{t("button.createProject")}</Button>
                </Stack>
            </Container>
            <CreateModal show={showCreateModal}
                         onClose={() => setShowCreateModal(false)}
                         onSubmit={createProject}/>
        </>
    );
};