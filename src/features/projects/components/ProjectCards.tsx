import React, {useEffect, useState} from "react";
import {Project} from "@/api/domain/projects/Project";
import {ProjectCard} from "@/features/projects/components/project-card/ProjectCard";
import {useTranslation} from "react-i18next";
import CreateProjectDialog from "@/features/projects/components/create-dialog/CreateProjectDialog";
import Loading from "@/components/ui/Loading";
import {Grid, Typography} from "@mui/material";
import {useGetApi} from "@/hooks/useGetApi";

export interface ProjectScreenProps {
    showWithArchived?: boolean;
}

export default function ProjectCards({showWithArchived}: ProjectScreenProps) {
    const {t} = useTranslation("projects");
    const items_name = showWithArchived ? "archived" : "active"

    const {data, loading} = useGetApi<Project[]>("/projects");
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        if (data) {
            setProjects(data);
        }
    }, [data]);

    return (
        <>
            {/** Create project button + modal*/}
            <CreateProjectDialog visible={!showWithArchived} projects={projects} setProjects={setProjects}/>

            {/** List the project cards*/}
            <Grid container spacing={2}>
                {projects.sort((p1, p2) => p1.id - p2.id).map((project, index) => project.archived === showWithArchived ?
                    <ProjectCard key={index} project={project} projects={projects} setProjects={setProjects}/> : null)
                }
            </Grid>

            {/** Show spinner when projects are being fetched*/}
            {loading && <Loading/>}

            {/** Show message when there aren't any projects */}
            {projects.filter(projects => projects.archived === showWithArchived).length == 0 &&
                <Typography variant={"body1"}>{t(`noProjects.${items_name}`)}</Typography>}
        </>
    );
}
