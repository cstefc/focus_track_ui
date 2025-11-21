import React, {useEffect, useState} from "react";
import api from "@/config/api";
import {Project} from "@/api/domain/projects/Project";
import {useNavigate, useParams} from "react-router-dom";
import {CreateGoal, Goal} from "@/api/domain/projects/Goal";
import CrudRepository from "@/api/crud-repository";
import CenterMessage from "@/components/layout/CenterMessage";
import {useTranslation} from "react-i18next";
import GoalAccordion from "@/features/project/components/goals/GoalAccordion";
import {Box, Button, Stack, Typography} from "@mui/material";
import Loading from "@/components/ui/Loading";

export default function ProjectScreen() {
    const {id} = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();
    const {t} = useTranslation("projects");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!id) {
                navigate("/projects");
                return;
            }

            const projectsPromise = api.project.findById(id);
            const repo = new CrudRepository<Goal, CreateGoal>(`/api/projects/${id}/goals`);
            const goalsPromise = repo.findAll();
            const [projectData, goalsData] = await Promise.all([projectsPromise, goalsPromise]);
            setProject(projectData);
            setGoals(goalsData);
        }

        fetchData().then(() => setLoading(false))
    }, []);

    if (loading) {
        return <Loading/>;
    }

    if (!project) {
        navigate("/projects");
        return null;
    }


    return (
        <Box margin={"24px"}>
            <Typography variant={"h3"}>{project?.title}</Typography>
            <Typography variant={"body1"}>{project?.description}</Typography>

            <Stack direction={"row"} spacing={1} display={"flex"} margin={1} justifyContent={"flex-end"}>
                <Button color={"secondary"} onClick={() => navigate(`/projects/`)}>
                    {t("button.back")}
                </Button>
                <Button variant={"contained"} onClick={() => navigate(`/projects/`)}>
                    {t("button.createGoal")}
                </Button>
            </Stack>

            {goals?.length == 0 && <CenterMessage><p>{t("noGoals")}</p></CenterMessage>}
            {goals.map((goal: Goal, index) => <GoalAccordion key={index} goal={goal}/>)}
        </Box>
    );
}
