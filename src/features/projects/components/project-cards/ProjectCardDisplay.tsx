import {Project} from "@/api/domain/projects/Project";
import {useNavigate} from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import {Box, Button, CardActions, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";


export interface ProjectCardDisplay {
    project: Project;
    toggleEdit: () => void;
}


export default function ProjectCardDisplay({project, toggleEdit}: ProjectCardDisplay) {
    const navigate = useNavigate();

    function handleClick() {
        if (!project.archived) {
            navigate(`/projects/${project.id}`);
        }
    }

    return (
        <Card onClick={handleClick} sx={{height: "100%", width: "100%", display: "flex", flexDirection: "column"}}>
            <CardContent sx={{flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Box>
                    <Typography variant="h5" gutterBottom>
                        {project.title}
                    </Typography>
                    <Typography variant="body1">
                        {project.description}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Box display={" flex"} justifyContent={"flex-end"} width={"100%"} marginInlineEnd={"8px"}>
                    {!project.archived &&
                        <Button
                            color={"primary"}
                            onClick={e => {
                                e.stopPropagation();
                                toggleEdit();
                            }}
                        >
                            <EditIcon/>
                        </Button>
                    }
                </Box>
            </CardActions>
        </Card>
    );
}