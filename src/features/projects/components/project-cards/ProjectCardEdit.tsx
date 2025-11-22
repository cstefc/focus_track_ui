import {Project, UpdateProject, UpdateProjectForm} from "@/api/domain/projects/Project";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import EditPanel from "@/components/ui/EditPanel";
import {Box, CardActions, TextField, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {deleteApi, sendApi} from "@/api/domain/api";

export interface ProjectCardEditProps {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    project: Project;
    toggleEdit: () => void;
}

export function ProjectCardEdit({project, projects, setProjects, toggleEdit}: ProjectCardEditProps) {
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<UpdateProject>({
        resolver: zodResolver(UpdateProjectForm),
        defaultValues: {
            id: project.id,
            title: project.title,
            description: project.description,
            archived: project.archived
        },
    });
    const {t} = useTranslation("projects");

    async function handleDelete() {
        void deleteApi(`/projects/?id=${project.id}`);
        setProjects(projects.filter((p) => p.id !== project.id));
        toggleEdit()
    }

    async function handleArchive(data: UpdateProject) {
        data.archived = true;
        const result = await sendApi<Project>(`/projects`, "PUT", data);
        if (result) {
            setProjects(projects.map((project) => project.id == data.id ? result : project));
        }
        toggleEdit()
    }

    async function handleCancel() {
        reset();
        toggleEdit()
    }

    async function updateHandler(data: UpdateProject) {
        const result = await sendApi<Project>(`/projects`, "PUT", data);
        if (result) {
            setProjects(projects.map((project) => project.id == data.id ? result : project));
        }
        toggleEdit()
    }

    return (
        <Card sx={{height: "100%", width: "100%", display: "flex", flexDirection: "column"}}>
            <CardContent sx={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Box component={"form"} onSubmit={handleSubmit(updateHandler)}
                     sx={{display: "flex", flexDirection: "column", gap: 2}}
                >
                    <Typography gutterBottom
                                variant={'h5'}
                                component={"div"}
                                sx={{marginBottom: "16px"}}
                    >
                        {t("edit.projectTitle")}
                    </Typography>
                    <TextField
                        label={t("forms.titleLabel")}
                        placeholder={t("forms.titlePlaceholder")}
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        fullWidth
                    />

                    <TextField
                        label={t("forms.descriptionLabel")}
                        placeholder={t("forms.descriptionPlaceholder")}
                        {...register("description")}
                        error={!!errors.description}
                        fullWidth
                    />

                </Box>
            </CardContent>
            <CardActions sx={{display: "flex", flexDirection: "column"}}>
                <EditPanel handleSave={handleSubmit(updateHandler)} handleDelete={handleDelete}
                           handleArchive={handleSubmit(handleArchive)}
                           handleCancel={handleCancel} isSubmitting={isSubmitting}/>
            </CardActions>
        </Card>
    )
        ;
}
