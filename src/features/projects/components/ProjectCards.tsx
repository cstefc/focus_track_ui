import React, {useEffect, useState} from "react";
import {Project} from "@/api/domain/projects/Project";
import api from "@/config/api";
import ProjectCard from "@/features/projects/components/project-cards/ProjectCard";
import {useTranslation} from "react-i18next";
import CreateProjectDialog from "@/features/projects/components/create-dialog/CreateProjectDialog";
import CenterMessage from "@/components/layout/CenterMessage";
import Loading from "@/components/ui/Loading";
import {Grid, Typography} from "@mui/material";

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
            <CreateProjectDialog visible={!showWithArchived} onSave={handleUpdate}/>

            {/** List the project cards*/}
            <Grid container spacing={2}>
                {projects.map((project) => project.archived === showWithArchived ?
                    <ProjectCard project={project} onUpdate={handleUpdate}/> : null)
                }
            </Grid>

            {/** Show spinner when projects are being fetched*/}
            {loading && <Loading/>}

            {/** Show message when there aren't any projects */}
            {projects.filter(projects => projects.archived === showWithArchived).length == 0 &&
                <CenterMessage><Typography
                    variant={"body1"}>{t(`noProjects.${items_name}`)}</Typography></CenterMessage>}
        </>
    );
}
