import {Container, Tab, Tabs} from "react-bootstrap";
import CreateModal from "./components/create-modal/CreateModal";
import {useTranslation} from "react-i18next";
import ProjectCards from "./components/project-cards/ProjectCards";

export default function Projects() {
    const {t} = useTranslation("projects");

    return (
        <Container fluid className={"m-3"}>
            <h1>Projects</h1>
            <p>Manage your projects or consult the archived projects</p>
            <Tabs
                defaultActiveKey={"active"}
            >
                <Tab
                    eventKey={"active"}
                    title={t("tabs.active")}
                >
                    <CreateModal/>
                    <ProjectCards showWithArchived={false}/>
                </Tab>
                <Tab eventKey={"archived"} title={t("tabs.archived")}>
                    <ProjectCards showWithArchived={true}/>
                </Tab>
            </Tabs>


        </Container>
    );
};