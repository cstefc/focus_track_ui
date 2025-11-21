import React from "react";
import {Goal} from "@/api/domain/projects/Goal";
import {AccordionDetails, AccordionSummary, Button, Stack, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from "@mui/icons-material/Edit";

export interface GoalAccordionItemDisplayProps {
    goal: Goal;
    index: number;
    edit: boolean;
    setEdit: (state: boolean) => void;
}

export default function GoalAccordionDisplay({goal, edit, setEdit}: GoalAccordionItemDisplayProps) {
    return (
        <>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography variant={"h4"}>{goal.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant={"body1"}>{goal.description}</Typography>
                    <Button onClick={() => {
                        setEdit(!edit)
                    }}>
                        <EditIcon/>
                    </Button>
                </Stack>
            </AccordionDetails>
        </>
    );
}