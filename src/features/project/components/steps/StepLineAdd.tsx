import {CreateStep, CreateStepForm, Step} from "@/api/domain/projects/Step";
import {Button, MenuItem, Select, Stack, TableCell, TableRow, Typography} from "@mui/material";
import React from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import {Controller, useForm} from "react-hook-form";
import {ZodTextField} from "@/components/layout/forms/ZodTextField";
import {Status} from "@/api/domain/predefined/Status";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import {sendApi} from "@/api/api";

export interface StepLineEditProps {
    setAdding: (edit: boolean) => void;
    goalId: number;
    steps: Step[];
    setSteps: (steps: Step[]) => void;
}

export const StepLineAdd = ({setAdding, goalId, steps, setSteps}: StepLineEditProps) => {
    const {t} = useTranslation("projects");
    const sequence = steps.length > 0 ? steps[steps.length - 1].sequence + 1 : 1
    const {register, handleSubmit, formState: {errors}, control, reset} = useForm<CreateStep>({
        resolver: zodResolver(CreateStepForm),
        defaultValues: {
            goalId: goalId,
            sequence: sequence,
            status: Status.NotStarted.valueOf()
        }
    });

    async function submitHandler(data: CreateStep) {
        const result = await sendApi("/steps", "POST", data);
        if (result) setSteps([...steps, result]);
    }

    function cancelHandler(): void {
        reset();
        setAdding(false);
    }

    return (
        <TableRow key={"adding-line"} content={"form"} onSubmit={handleSubmit(submitHandler)}>
            <TableCell align="center">
                <Typography variant={"body1"}>{sequence}</Typography>
                <input
                    type="hidden"
                    {...register(`sequence`)}
                />
            </TableCell>
            <TableCell align="center">
                <ZodTextField errors={errors?.objective} translation_scope={"projects"}
                              item={`objective`} itemKey={"objective"}
                              register={register}/>
            </TableCell>
            <TableCell align="center">
                <ZodTextField errors={errors?.description}
                              translation_scope={"projects"} item={`description`}
                              itemKey={"description"}
                              register={register}/>
            </TableCell>
            <TableCell align="center">
                <ZodTextField errors={errors?.requirements}
                              translation_scope={"projects"} item={`requirements`}
                              itemKey={"requirements"}
                              register={register}/>
            </TableCell>

            <TableCell align="center">
                <Controller
                    name={`status`}
                    control={control}
                    render={({field}) => (
                        <Select
                            {...field}
                            label={t("forms.statusLabel")}
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
            <TableCell align="center">
                <Stack direction={"row"}>
                    <Button color={"success"} onClick={handleSubmit(submitHandler)}><CheckIcon/></Button>
                    <Button color={"error"} onClick={cancelHandler}><CancelIcon/></Button>
                </Stack>
            </TableCell>
        </TableRow>

    );
}
