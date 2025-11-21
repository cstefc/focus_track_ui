import {Project, UpdateProject, UpdateProjectForm} from "@/api/domain/projects/Project";
import api from "@/config/api";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import EditPanel from "@/components/ui/EditPanel";
import {Box, TextField, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export interface ProjectCardEditProps {
    project: Project;
    edit: boolean;
    setEdit: (edit: boolean) => void;
    onUpdate: () => void;
}

export function ProjectCardEdit({project, edit, setEdit, onUpdate}: ProjectCardEditProps) {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<UpdateProject>({
        resolver: zodResolver(UpdateProjectForm),
        defaultValues: {
            id: project.id,
            title: project.title,
            description: project.description,
            archived: false
        },
    });
    const {t} = useTranslation("projects");

    async function handleDelete() {
        await api.project.delete(`${project.id}`);
        onUpdate();
    }

    async function handleArchive() {
        project.archived = true;
        await api.project.update(`${project.id}`, project);
        onUpdate();
    }

    async function handleCancel() {
        reset();
        setEdit(false);
    }

    async function updateHandler(data: UpdateProject) {
        await api.project.update(`${project.id}`, data);
        onUpdate();
        setEdit(!edit);
    }

    return (
        <Card sx={{
            padding: "16px",
            margin: "8px",
        }}>
            <CardContent>

                <Typography gutterBottom
                            variant={'h5'}
                            component={"div"}
                            sx={{marginBottom: "16px"}}
                >{t("edit.projectTitle")}</Typography>
                <Box component={"form"} onSubmit={handleSubmit(updateHandler)}
                     sx={{display: "flex", flexDirection: "column", gap: 2}}
                >
                    <TextField
                        label={t("edit.titleLabel")}
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        fullWidth
                    />

                    <TextField
                        label={t("edit.descriptionLabel")}
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        fullWidth
                    />

                    <EditPanel handleDelete={handleDelete} handleArchive={handleArchive} handleCancel={handleCancel}/>
                </Box>
            </CardContent>
        </Card>
    )
        ;
}
