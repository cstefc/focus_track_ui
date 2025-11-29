import {CreateProject, CreateProjectForm, Project} from "@/api/domain/projects/Project";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import React, {JSX, useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {ZodTextField} from "@/components/layout/forms/ZodTextField";
import {sendApi} from "@/api/api";

export interface CreateProjectDialogProps {
    visible: boolean;
    projects: Project[];
    setProjects: (projects: Project[]) => void;
}

export default function CreateProjectDialog({visible, projects, setProjects}: CreateProjectDialogProps): JSX.Element {
    const {t} = useTranslation("projects");
    const [showDialog, setShowDialog] = useState(false);

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<CreateProject>({
        resolver: zodResolver(CreateProjectForm),
        defaultValues: {
            archived: false, // hidden default
        },
    });

    async function submitHandler(data: CreateProject) {
        setShowDialog(false);
        const project = await sendApi<Project>("/projects", "POST", data);
        if (project){
            setProjects([...projects, project]);
            reset();
        }
    }

    return (
        <>
            <Box display={"flex"} justifyContent={"flex-end"} margin={2}>
                <Button variant={"contained"} hidden={!visible}
                        onClick={() => setShowDialog(true)}
                >
                    {t("button.createProject")}
                </Button>
            </Box>

            <React.Fragment>
                <Dialog open={showDialog} onClose={() => setShowDialog(false)}
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
                                <Button color={"secondary"} disabled={isSubmitting} onClick={() => {
                                    // @ts-ignore
                                    document.activeElement?.blur();
                                    setShowDialog(false)
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
