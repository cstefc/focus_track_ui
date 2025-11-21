import {CreateProject, CreateProjectForm} from "@/api/domain/projects/Project";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import api from "@/config/api";
import React, {JSX, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {theme} from "@/config/theme";
import {ZodTextField} from "@/components/layout/forms/ZodTextField";

export interface CreateProjectDialogProps {
    onSave: () => void;
    visible: boolean;
}

export default function CreateProjectDialog({onSave, visible}: CreateProjectDialogProps): JSX.Element {
    const {t} = useTranslation("projects");
    const [showCreateModal, setShowCreateModal] = useState(false);

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<CreateProject>({
        resolver: zodResolver(CreateProjectForm),
        defaultValues: {
            archived: false, // hidden default
        },
    });

    async function submitHandler(data: CreateProject) {
        setShowCreateModal(false);
        await api.project.create(data);
        onSave();
        reset();
    }

    return (
        <>
            <Box display={"flex"} justifyContent={"flex-end"} margin={"normal"}>
                <Button variant={"contained"} hidden={!visible}
                        onClick={() => setShowCreateModal(true)}
                >
                    {t("button.createProject")}
                </Button>
            </Box>

            <React.Fragment>
                <Dialog open={showCreateModal} onClose={() => setShowCreateModal(false)}
                >
                    <Box component={"form"} onSubmit={handleSubmit(submitHandler)}>
                        <DialogTitle id="alert-dialog-title">
                            {t("create.projectTitle")}
                        </DialogTitle>

                        <DialogContent>
                            <ZodTextField translation_scope={"projects"} item={"title"} itemKey={"title"}
                                          register={register} errors={errors.title}/>
                            <ZodTextField translation_scope={"projects"} item={"description"} itemKey={"description"}
                                          register={register} errors={errors.description}/>
                        </DialogContent>

                        <DialogActions>
                            <Stack direction={"row"} padding={1} spacing={1}>
                                <Button disabled={isSubmitting} onClick={() => {
                                    document.activeElement?.blur();
                                    setShowCreateModal(false)
                                }}>
                                    {t("button.cancel")}
                                </Button>
                                <Button type={"submit"} disabled={isSubmitting} variant={"contained"} autoFocus>
                                    {t("button.save")}
                                </Button>
                            </Stack>
                        </DialogActions>
                    </Box>
                </Dialog>
            </React.Fragment>
        </>
    );
}
