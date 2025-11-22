import {Project} from "@/api/domain/projects/Project";
import {useNavigate} from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import {Box, Button, Typography} from "@mui/material";
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
        <Card onClick={handleClick}
              sx={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
                <Typography variant={"h5"}>{project.title}</Typography>
                <Typography variant={"body1"}>{project.description}</Typography>
                <Box display={"flex"} justifyContent={"flex-end"} marginTop={"24px"} marginBottom={"0px"}>
                    {!project.archived &&
                        <Button
                            variant={"outlined"}
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
            </CardContent>
        </Card>
    );
}