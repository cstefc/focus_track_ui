import {CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {StepLine} from "@/features/project/components/steps/StepLine";
import {useTranslation} from "react-i18next";
import {StepLineAdd} from "@/features/project/components/steps/StepLineAdd";
import useSteps from "@/hooks/useSteps";

export interface StepTableRowsDisplayProps {
    goalId: number;
}

export default function StepTable({goalId}: StepTableRowsDisplayProps) {
    const {t} = useTranslation("projects");
    const {loading, steps, updateStep, createStep, deleteStep} = useSteps(goalId);

    if (loading) return <CircularProgress/>;

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width={"5%"} align="center">#</TableCell>
                        <TableCell align="center">{t("forms.objectiveLabel")}</TableCell>
                        <TableCell align="center">{t("forms.descriptionLabel")}</TableCell>
                        <TableCell align="center">{t("forms.requirementsLabel")}</TableCell>
                        <TableCell width={"10%"} align="center">{t("forms.statusLabel")}</TableCell>
                        <TableCell width={"5%"} align="center">{t("forms.editLabel")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {steps.sort((s1, s2) => s1.sequence - s2.sequence).map((step) => (
                        <StepLine key={step.id} goalId={goalId} step={step} onUpdate={updateStep} onDelete={deleteStep}/>))}
                    <StepLineAdd goalId={goalId} onCreate={createStep}
                                 sequence={steps.length > 0 ? steps[steps.length - 1].sequence + 1 : 1}/>
                </TableBody>
            </Table>
        </TableContainer>);
}
