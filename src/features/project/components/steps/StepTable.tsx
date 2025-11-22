import {Step} from "@/api/domain/projects/Step";
import {useState, useEffect} from "react";
import {
    Stack,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress
} from "@mui/material";
import {StepLine} from "@/features/project/components/steps/StepLine";
import {AddOutlined} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {useGetApi} from "@/hooks/useGetApi";
import {StepLineEdit} from "@/features/project/components/steps/StepLineEdit";
import {StepLineAdd} from "@/features/project/components/steps/StepLineAdd";

export interface StepTableRowsDisplayProps {
    goalId: number;
}

export default function StepTable({goalId}: StepTableRowsDisplayProps) {
    const {t} = useTranslation("projects");
    const [steps, setSteps] = useState<Step[]>([]);
    const {data, loading} = useGetApi<Step[]>("/steps?id=" + goalId);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (data) setSteps(data)
    }, [data]);

    if (loading) return <CircularProgress/>;

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">{t("forms.objectiveLabel")}</TableCell>
                        <TableCell align="center">{t("forms.descriptionLabel")}</TableCell>
                        <TableCell align="center">{t("forms.requirementsLabel")}</TableCell>
                        <TableCell align="center">{t("forms.statusLabel")}</TableCell>
                        <TableCell align="center">{t("forms.editLabel")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {steps.sort((s1, s2) => s1.sequence - s2.sequence).map((step) => (
                        <StepLine key={step.id} goalId={goalId} step={step} steps={steps} setSteps={setSteps}/>))}
                    {adding && <StepLineAdd goalId={goalId} setAdding={setAdding} steps={steps} setSteps={setSteps}/>}
                </TableBody>
            </Table>
            <Stack direction={"row"}
                   spacing={"8px"}
                   display={"flex"}
                   margin={1}
                   justifyContent={"flex-end"}
            >
                {!adding && <Button
                    sx={{marginTop: "8px"}}
                    variant={"outlined"}
                    color={"success"}
                    onClick={() => setAdding(true)}
                >
                    <AddOutlined/>
                </Button>}
            </Stack>
        </TableContainer>);
}
