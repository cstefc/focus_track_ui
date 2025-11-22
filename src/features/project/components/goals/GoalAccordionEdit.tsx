import {Goal, UpdateGoal, UpdateGoalForm} from "@/api/domain/projects/Goal";
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AccordionDetails, AccordionSummary, Button, Stack} from "@mui/material";
import {ZodTextField} from "@/components/layout/forms/ZodTextField";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import {sendApi} from "@/api/domain/api";

export interface GoalAccordionItemEditProps {
    goal: Goal;
    goals: Goal[];
    setGoals: (goals: Goal[]) => void;
    setEdit: (edit: boolean) => void;
}

export default function GoalAccordionEdit({goal, goals, setGoals, setEdit}: GoalAccordionItemEditProps) {
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<UpdateGoal>({
        resolver: zodResolver(UpdateGoalForm),
        defaultValues: {
            id: goal.id,
            title: goal.title,
            description: goal.description,
            priority: goal.priority.valueOf(),
            estimate: "00:00:00",
        }
    });

    async function submitHandler(updateGoal: UpdateGoal) {
        const goal = await sendApi<Goal>("/goals", "PUT", updateGoal)
        if (goal) setGoals(goals.map(g => g.id !== goal.id ? g : goal));
        setEdit(false);
    }

    function handleCancel(): void {
        reset();
        setEdit(false);
    }

    return (
        <>
            <AccordionSummary>
                <ZodTextField translation_scope={"projects"} item={"title"} itemKey={"title"} register={register}
                              errors={errors.title}/>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction={"row"} justifyContent={"flex-end"} spacing={0}>
                    <ZodTextField translation_scope={"projects"} item={"description"} itemKey={"description"}
                                  register={register} errors={errors.description}/>
                    <Button onClick={handleSubmit(submitHandler)} disabled={isSubmitting} color={"success"} autoFocus>
                        <CheckIcon/>
                    </Button>
                    <Button color={"error"} onClick={handleCancel} disabled={isSubmitting}>
                        <CancelIcon/>
                    </Button>
                </Stack>
            </AccordionDetails>


        </>
    );
}
