import {Goal, UpdateGoal, UpdateGoalForm} from "@/api/domain/projects/Goal";
import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AccordionDetails, AccordionSummary, Button, Stack} from "@mui/material";
import {ZodTextField} from "@/components/layout/forms/ZodTextField";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

export interface GoalAccordionItemEditProps {
    goal: Goal;
    setEdit: (edit: boolean) => void;
}

export default function GoalAccordionEdit({goal, setEdit}: GoalAccordionItemEditProps) {
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<UpdateGoal>({
        resolver: zodResolver(UpdateGoalForm),
        defaultValues: {
            id: goal.id,
            title: goal.title,
            description: goal.description,
            priority: goal.priority,
            estimate: goal.estimate,
        }
    });

    async function submitHandler(updateGoal: UpdateGoal) {
        console.log('here here')
        console.log("updateGoal", updateGoal);
    }

    function handleCancel(): void {
        reset();
        setEdit(false);
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <AccordionSummary>
                <ZodTextField translation_scope={"projects"} item={"title"} itemKey={"title"} register={register}
                              errors={errors.title}/>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction={"row"} justifyContent={"space-between"} spacing={0}>
                    <ZodTextField translation_scope={"projects"} item={"description"} itemKey={"description"}
                                  register={register} errors={errors.description}/>
                    <Button color={"success"} type={"submit"} disabled={isSubmitting}>
                        <CheckIcon/>
                    </Button>
                    <Button color={"error"} onClick={handleCancel} disabled={isSubmitting}>
                        <CancelIcon/>
                    </Button>
                </Stack>
            </AccordionDetails>
        </form>
    );
}
