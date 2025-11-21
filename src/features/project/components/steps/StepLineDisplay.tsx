import {Box, Button, TableCell, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import {Step} from "@/api/domain/projects/Step";
import {Status} from "@/api/domain/predefined/Status";
import {useTranslation} from "react-i18next";

export interface StepLineDisplayProps {
    setEdit: (edit: boolean) => void;
    step: Step;
}

export const StepLineDisplay = ({step, setEdit}: StepLineDisplayProps) => {
    const {t} = useTranslation();

    function handleEdit() {
        setEdit(true);
    }

    function handleDelete() {

    }

    return (
        <>
            <TableRow key={step.id}>
                <TableCell>{step.sequence}</TableCell>
                <TableCell>{step.objective}</TableCell>
                <TableCell>{step.description}</TableCell>
                <TableCell>{step.requirements}</TableCell>
                <TableCell>{t(`status.${Status[step.status]}`)}</TableCell>
                <TableCell>
                    <Box display={"flex"} justifyContent={"flex-end"} gap={0.5}>
                        <Button onClick={handleEdit}>
                            <EditIcon/>
                        </Button>
                        <Button color={"error"} onClick={handleDelete}>
                            <DeleteOutlineIcon/>
                        </Button>
                    </Box>
                </TableCell>
            </TableRow>
        </>
    );
}