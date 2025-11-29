import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {JSX} from "react";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateGoal, CreateGoalForm, Goal} from "@/api/domain/projects/Goal";
import {Priority} from "@/api/domain/predefined/Priority";
import {ZodTextField} from "@/components/layout/forms/ZodTextField";
import {sendApi} from "@/api/api";

export interface CreateGoalDialogProps {
    projectId: string;
    goals: Goal[],
    setGoals: (goal: Goal[]) => void,
}

export default function CreateGoalDialog({projectId, goals, setGoals}: CreateGoalDialogProps): JSX.Element {
    const {t} = useTranslation("projects");
    const [show, setShow] = React.useState(false);

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<CreateGoal>({
        resolver: zodResolver(CreateGoalForm),
        defaultValues: {
            projectId: projectId || "",
            priority: Priority.Medium,
            estimate: "00:00:00",
        },
    });

    const submitHandler = async (data: CreateGoal) => {
        const result = await sendApi<Goal>("/goals", "POST", data)
        if (result) setGoals([...goals, result])
        setShow(false);
    }

    return (
        <>
            <Button variant={"contained"} onClick={() => setShow(true)}>
                {t("button.createGoal")}
            </Button>
            <React.Fragment>
                <Dialog open={show} onClose={() => setShow(false)}>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <DialogTitle>{t("create.goalTitle")}</DialogTitle>
                        <DialogContent>
                            <ZodTextField translation_scope={"projects"} item={"title"} itemKey={"title"}
                                          register={register} errors={errors.title}/>
                            <ZodTextField translation_scope={"projects"} item={"description"} itemKey={"description"}
                                          register={register} errors={errors.description}/>
                        </DialogContent>
                        <DialogActions>
                            <Button disabled={isSubmitting} onClick={() => {
                                // @ts-ignore
                                document.activeElement?.blur();
                                reset();
                                setShow(false)
                            }}>
                                {t("button.cancel")}
                            </Button>
                            <Button type={"submit"} disabled={isSubmitting} variant={"contained"} autoFocus>
                                {t("button.save")}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        </>
    )
}
