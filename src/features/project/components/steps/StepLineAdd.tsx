import {CreateStep, CreateStepForm} from "@/api/domain/projects/Step";
import {Box, Button, MenuItem, Select, Stack, TableCell, TableRow, Typography} from "@mui/material";
import React, {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import {Controller, useForm} from "react-hook-form";
import {ZodTextField} from "@/components/ui/forms/ZodTextField";
import {Status} from "@/api/domain/predefined/Status";
import CancelIcon from "@mui/icons-material/Cancel";
import {AddOutlined, SaveOutlined} from "@mui/icons-material";

export interface StepLineEditProps {
    goalId: number;
    onCreate: (createData: CreateStep) => void;
    sequence: number;
}

export const StepLineAdd = ({goalId, onCreate, sequence}: StepLineEditProps) => {
    const {t} = useTranslation("projects");
    const [adding, setAdding] = useState(false);

    const {register, handleSubmit, formState: {errors}, control, reset} = useForm<CreateStep>({
        resolver: zodResolver(CreateStepForm),
        defaultValues: {
            goalId: goalId,
            sequence: sequence,
            status: Status.NotStarted.valueOf()
        }
    });

    function cancelHandler(): void {
        reset();
        setAdding(false);
    }

    return (
        <>
            {!adding && <TableRow>
                <TableCell colSpan={6}>
                    <Box display={"flex"} justifyContent={"flex-end"}>
                        <Button color={"success"} variant={"outlined"} onClick={() => {
                            setAdding(true)
                        }}>
                            <AddOutlined/>
                        </Button>
                    </Box>
                </TableCell>
            </TableRow>}

            {adding && <TableRow key={"adding-line"}>
                <TableCell align="center">
                    <Typography variant={"body1"}>{sequence}</Typography>
                    <input
                        type="hidden"
                        {...register(`sequence`)}
                    />
                </TableCell>
                <TableCell align="center">
                    <ZodTextField errors={errors?.objective} translation_scope={"projects"}
                                  item={`objective`}
                                  register={register}/>
                </TableCell>
                <TableCell align="center">
                    <ZodTextField errors={errors?.description}
                                  translation_scope={"projects"} item={`description`}
                                  register={register}/>
                </TableCell>
                <TableCell align="center">
                    <ZodTextField errors={errors?.requirements}
                                  translation_scope={"projects"} item={`requirements`}
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
                        <Button color={"success"} onClick={handleSubmit(onCreate)}><SaveOutlined/></Button>
                        <Button color={"error"} onClick={cancelHandler}><CancelIcon/></Button>
                    </Stack>
                </TableCell>
            </TableRow>}
        </>

    );
}
