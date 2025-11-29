import React from "react";
import {Goal} from "@/api/domain/projects/Goal";
import {AccordionDetails, AccordionSummary, Box, Button, Stack, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export interface GoalAccordionItemDisplayProps {
    goal: Goal;
    handleDelete: (id: number) => void;
    toggleEdit: () => void;
}

export default function GoalAccordionDisplay({goal, handleDelete, toggleEdit}: GoalAccordionItemDisplayProps) {
    return (
        <>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography variant={"h4"}>{goal.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant={"body1"}>{goal.description}</Typography>
                    <Box>
                        <Button onClick={toggleEdit}><EditIcon/></Button>
                        <Button color={'error'} onClick={() => handleDelete(goal.id)}><DeleteOutlineIcon/></Button>
                    </Box>
                </Stack>
            </AccordionDetails>
        </>
    );
}