import React, {useEffect, useState} from "react";
import {Project} from "@/api/domain/projects/Project";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import Loading from "@/components/ui/Loading";
import {useGetApi} from "@/hooks/useGetApi";
import {GoalsAccordion} from "@/features/project/components/goals/GoalsAccordion";

export default function ProjectScreen() {
    const {id} = useParams<{ id: string }>();
    const {data, loading} = useGetApi<Project[]>(`/projects?id=${id}`);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (data !== null) setProject(data?.[0]);
    }, [data]);

    if (loading) return <Loading/>;

    if (project === null) {
        navigate("/projects");
        return null;
    }

    return (
        <Box margin={"50px"}>
            <Typography variant={"h3"} sx={{marginBottom: "50px"}}>
                {project?.title}
            </Typography>
            <Typography variant={"body1"} sx={{wordWrap: "break-word", whiteSpace: "pre-line", marginBottom: "50px"}}>
                {project?.description}
            </Typography>

            <GoalsAccordion projectId={`${id}`}/>
        </Box>
    );
}
