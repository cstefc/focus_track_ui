import {Project, UpdateProject, UpdateProjectForm} from "@/api/domain/projects/Project";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import EditPanel from "@/components/ui/EditPanel";
import {Box, CardActions, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import {ZodTextField} from "@/components/ui/forms/ZodTextField";

export interface ProjectCardEditProps {
    project: Project;
    handleUpdate: (updateProject: UpdateProject) => void;
    handleArchive: (updateProject: UpdateProject) => void;
    handleDelete: () => void;
    handleCancel: () => void;
}

export function ProjectCardEdit({
                                    project,
                                    handleUpdate,
                                    handleArchive,
                                    handleDelete,
                                    handleCancel,
                                }: ProjectCardEditProps) {
    const {t} = useTranslation("projects");
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<UpdateProject>({
        resolver: zodResolver(UpdateProjectForm),
        defaultValues: {
            id: project.id,
            title: project.title,
            description: project.description,
            archived: project.archived
        },
    });

    return (
        <>
            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography gutterBottom variant={'h5'} component={"div"}>
                        {t("edit.projectTitle")}
                    </Typography>

                    <ZodTextField translation_scope={"projects"} item={"title"} itemKey={"title"}
                                  register={register} errors={errors.title}/>
                    <ZodTextField translation_scope={"projects"} item={"description"} itemKey={"description"}
                                  register={register} errors={errors.description} minRows={2}/>
                </Box>
            </CardContent>

            <CardActions>
                <Box display={"flex"} justifyContent={"center"} width={"100%"} marginInlineEnd={"8px"}>
                    <EditPanel isSubmitting={isSubmitting}
                               handleSave={handleSubmit(handleUpdate)}
                               handleDelete={handleDelete}
                               handleArchive={handleSubmit(handleArchive)}
                               handleCancel={() => {
                                   reset();
                                   handleCancel();
                               }}
                    />
                </Box>
            </CardActions>
        </>
    );
}
