import React, {useEffect, useState} from "react";
import {Project} from "@/api/domain/projects/Project";
import api from "@/config/api";
import ProjectCard from "@/features/projects/components/project-cards/ProjectCard";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import CreateModal from "@/features/projects/components/create-modal/CreateModal";
import CenterMessage from "@/components/ui/CenterMessage";

export interface ProjectScreenProps {
    showWithArchived?: boolean;
}

export default function ProjectCards({showWithArchived}: ProjectScreenProps) {
    const {t} = useTranslation("projects");
    const items_name = showWithArchived ? "archived" : "active"

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);
    useEffect(() => {
        setLoading(true);
        api.project.findAll()
            .then(projects => setProjects(projects));
        setLoading(false);
    }, [refresh, showWithArchived]);

    async function handleUpdate() {
        setRefresh(refresh + 1);
    }

    return (
        <>
            {/** Create project button + modal*/}
            <CreateModal visible={!showWithArchived} onSave={handleUpdate}/>

            <Row key={"projects"} xs={1} sm={2} md={3} lg={4} className="g-2 justify-content-center align-items-center">
                {projects.map((project) => {
                    if (project.archived === showWithArchived) {
                        return (
                            <Col key={project.id}>
                                <ProjectCard project={project} onUpdate={handleUpdate}/>
                            </Col>
                        );
                    } else {
                        return null;
                    }
                })}
            </Row>

            {loading && <CenterMessage><Spinner animation="border" role="status"/></CenterMessage>}


            {projects.filter(projects => projects.archived === showWithArchived).length == 0 &&
                <CenterMessage><p>{t(`noProjects.${items_name}`)}</p></CenterMessage>}
        </>);
}
