import {Step, UpdateStep, UpdateStepForm} from "@/api/domain/projects/Step";
import {Button, MenuItem, Select, Stack, TableCell, TableRow, Typography} from "@mui/material";
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import {Controller, useForm} from "react-hook-form";
import {ZodTextField} from "@/components/layout/forms/ZodTextField";
import {Status} from "@/api/domain/predefined/Status";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

export interface StepLineEditProps {
    setEdit: (edit: boolean) => void;
    goalId: number;
    step: Step;
}

export const StepLineEdit = ({setEdit, goalId, step}: StepLineEditProps) => {
    const {t} = useTranslation();
    const {register, handleSubmit, formState: {errors}, control, reset} = useForm<UpdateStep>({
        resolver: zodResolver(UpdateStepForm),
        defaultValues: {
            id: goalId,
            sequence: step.sequence,
            objective: step.objective,
            description: step.description,
            requirements: step.requirements,
            status: step.status,

        }
    });

    function submitHandler(data: UpdateStep) {
        console.log(data)
    }

    function cancelHandler(): void {
        reset();
        setEdit(false);
    }

    return (
        <TableRow key={step.id} content={"form"} onSubmit={handleSubmit(submitHandler)}>
            <TableCell>
                <Typography variant={"body1"}>{step.sequence}</Typography>
                <input
                    type="hidden"
                    {...register(`sequence`)}
                />
            </TableCell>
            <TableCell>
                <ZodTextField errors={errors?.objective} translation_scope={"projects"}
                              item={`objective`} itemKey={"objective"}
                              register={register}/>
            </TableCell>
            <TableCell>
                <ZodTextField errors={errors?.description}
                              translation_scope={"projects"} item={`description`}
                              itemKey={"description"}
                              register={register}/>
            </TableCell>
            <TableCell>
                <ZodTextField errors={errors?.requirements}
                              translation_scope={"projects"} item={`requirements`}
                              itemKey={"requirements"}
                              register={register}/>
            </TableCell>

            <TableCell>
                <Controller
                    name={`status`}
                    control={control} // from useForm
                    defaultValue={step.status}
                    render={({field}) => (
                        <Select
                            {...field} // includes value & onChange
                            label={t("edit.statusTitle")}
                            fullWidth
                            error={!!errors.status}
                        >
                            {(Object.keys(Status) as Array<keyof typeof Status>)
                                .filter((key) => isNaN(Number(key)))
                                .map((key) => (
                                    <MenuItem key={key} value={Status[key]}>
                                        {t(`status.${key}`)}
                                    </MenuItem>
                                ))}
                        </Select>
                    )}
                />
            </TableCell>
            <TableCell>
                <Stack direction={"row"}>
                    <Button color={"success"} type={"submit"}>
                        <CheckIcon/>
                    </Button>
                    <Button color={"error"} onClick={cancelHandler}>
                        <CancelIcon/>
                    </Button>
                </Stack>
            </TableCell>
        </TableRow>
    );
}
