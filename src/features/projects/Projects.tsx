import {Button, Container, Stack, Tab, Tabs} from "react-bootstrap";
import {useState} from "react";
import api from "@/config/api";
import {CreateProject} from "@/api/domain/projects/Project";
import CreateModal from "./components/create-modal/CreateModal";
import {useTranslation} from "react-i18next";
import {getAuth} from "firebase/auth";
import ProjectScreen from "./components/project-screen/ProjectScreen";

export default function Projects() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const {t} = useTranslation("projects");

    const onCloseModal = (saveStatus: boolean | null) => {
        if (saveStatus === null) {

        } else if (saveStatus) {

        } else {

        }

        setShowCreateModal(false);
    }

    return (
        <Container fluid className={"ms-3 mt-3"}>
            <h1>Projects</h1>
            <p>Manage your projects or consult the archived projects</p>
            <Tabs
                defaultActiveKey={"active"}
            >
                <Tab
                    eventKey={"active"}
                    title={t("tabs.active")}
                >
                    <Button
                        variant={"primary"}
                        className={"m-3"}
                        onClick={() => setShowCreateModal(true)}
                    >
                        {t("button.createProject")}
                    </Button>
                    <ProjectScreen showArchived={false}/>
                </Tab>
                <Tab eventKey={"archived"} title={t("tabs.archived")}>
                    <ProjectScreen showArchived={true}/>
                </Tab>
            </Tabs>


            <CreateModal show={showCreateModal} onClose={onCloseModal}/>
        </Container>
    );
};