import {Step} from "@/api/domain/projects/Step";
import React from "react";
import {Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {StepLine} from "@/features/project/components/steps/StepLine";
import {AddOutlined} from "@mui/icons-material";

export interface StepTableRowsDisplayProps {
    goalId: number;
    steps: Step[]
}

export default function StepTable({goalId, steps}: StepTableRowsDisplayProps) {
    function handleAdd(): void {

    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Objective</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Requirements</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {steps.map((step) => <StepLine key={step.id} goalId={goalId} step={step}/>)}
                </TableBody>
            </Table>
            <Stack direction={"row"}
                   spacing={"8px"}
                   display={"flex"}
                   margin={1}
                   justifyContent={"flex-end"}
            >
                <Button
                    sx={{marginTop: "8px"}}
                    variant={"outlined"}
                    color={"success"}
                    onClick={handleAdd}
                >
                    <AddOutlined/>
                </Button>
            </Stack>
        </TableContainer>);
}
