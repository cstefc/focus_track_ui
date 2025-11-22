import React from "react";
import {Goal} from "@/api/domain/projects/Goal";
import {Box, AccordionDetails, AccordionSummary, Button, Stack, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {deleteApi} from "@/api/domain/api";

export interface GoalAccordionItemDisplayProps {
    goal: Goal;
    goals: Goal[];
    setGoals: (goal: Goal[]) => void;
    edit: boolean;
    setEdit: (state: boolean) => void;
}

export default function GoalAccordionDisplay({goal, goals, setGoals, edit, setEdit}: GoalAccordionItemDisplayProps) {

    async function handleDelete() {
        void deleteApi('/goals?id=' + goal.id);
        setGoals(goals.filter(g => g.id !== goal.id));
    }

    return (
        <>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography variant={"h4"}>{goal.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant={"body1"}>{goal.description}</Typography>

                    <Box>
                        <Button onClick={() => {
                            setEdit(!edit)
                        }}>
                            <EditIcon/>
                        </Button>
                    <Button color={'error'} onClick={handleDelete}>
                        <DeleteOutlineIcon/>
                    </Button>
                    </Box>
                </Stack>
            </AccordionDetails>
        </>
    );
}