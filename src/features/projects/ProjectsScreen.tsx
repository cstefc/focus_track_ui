import {Container, Tab, Tabs} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import ProjectCards from "./components/project-cards/ProjectCards";
import {useState} from "react";

export default function ProjectsScreen() {
    const {t} = useTranslation("projects");
    const [activeTab, setActiveTab] = useState<string | null>("active");

    return (
        <Container fluid className={"mt-3"}>
            <h1>{t("title")}</h1>
            <p>{t("description")}</p>

            <Tabs defaultActiveKey={"active"} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
                <Tab eventKey={"active"} title={t("tabs.active")}/>
                <Tab eventKey={"archived"} title={t("tabs.archived")}/>
            </Tabs>

            <ProjectCards showWithArchived={activeTab !== "active"}/>
        </Container>
    );
};