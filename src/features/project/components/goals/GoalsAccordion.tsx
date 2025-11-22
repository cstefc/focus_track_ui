import {useGetApi} from "@/hooks/useGetApi";
import {Goal} from "@/api/domain/projects/Goal";
import React, {useEffect, useState} from "react";
import Loading from "@/components/ui/Loading";
import CenterMessage from "@/components/layout/CenterMessage";
import {useTranslation} from "react-i18next";
import {Button, Stack} from "@mui/material";
import CreateGoalDialog from "@/features/project/components/goals/CreateGoalDialog";
import {useNavigate} from "react-router-dom";
import {GoalAccordion} from "@/features/project/components/goals/GoalAccordion";

export interface GoalsAccordionProps {
    projectId: string;
}

export function GoalsAccordion({projectId}: GoalsAccordionProps) {
    const {t} = useTranslation("projects");
    const navigate = useNavigate();

    const {data, loading} = useGetApi<Goal[]>(`/goals?id=${projectId}`);
    const [goals, setGoals] = useState<Goal[]>([])

    useEffect(() => {
        if (data) setGoals(data);
    }, [data])


    if (loading) return <Loading/>

    return (
        <>
            <Stack direction={"row"} spacing={1} display={"flex"} margin={1} justifyContent={"flex-end"}>
                <Button color={"secondary"} onClick={() => navigate(`/projects/`)}>
                    {t("button.back")}
                </Button>
                <CreateGoalDialog projectId={projectId} goals={goals} setGoals={setGoals}/>
            </Stack>

            {(!loading && goals.length === 0) && <CenterMessage><p>{t("noGoals")}</p></CenterMessage>}
            {goals.sort((g1, g2) => g1.id - g2.id).map((goal: Goal, index) => (
                <GoalAccordion key={index} goal={goal} goals={goals} setGoals={setGoals}/>
            ))}

        </>)
        ;
}