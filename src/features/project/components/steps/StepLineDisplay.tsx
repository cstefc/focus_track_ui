import {Button, Stack, TableCell, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import {Step} from "@/api/domain/projects/Step";
import {Status} from "@/api/domain/predefined/Status";
import {useTranslation} from "react-i18next";
import {deleteApi} from "@/api/domain/api";

export interface StepLineDisplayProps {
    setEdit: (edit: boolean) => void;
    step: Step;
    steps: Step[];
    setSteps: (steps: Step[]) => void;
}

export const StepLineDisplay = ({step, steps, setSteps, setEdit}: StepLineDisplayProps) => {
    const {t} = useTranslation("projects");

    function handleDelete() {
        void deleteApi("/steps?id=" + step.id);
        const newSteps = (steps.filter(s => s.id !== step.id));
        for (let i = 0; i < newSteps.length; i++) {
            newSteps[i].sequence = i+1;
        }
        setSteps(newSteps);
    }

    return (
        <>
            <TableRow key={step.id}>
                <TableCell align="center">{step.sequence}</TableCell>
                <TableCell align="center">{step.objective}</TableCell>
                <TableCell align="center">{step.description}</TableCell>
                <TableCell align="center">{step.requirements}</TableCell>
                <TableCell align="center">{t(`status.${Status[step.status]}`)}</TableCell>
                <TableCell align="center">
                    <Stack direction={"row"}>
                        <Button onClick={() => setEdit(true)}>
                            <EditIcon/>
                        </Button>
                        <Button color={"error"} onClick={handleDelete}>
                            <DeleteOutlineIcon/>
                        </Button>
                    </Stack>
                </TableCell>
            </TableRow>
        </>
    );
}