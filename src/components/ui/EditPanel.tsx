import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CheckIcon from "@mui/icons-material/Check";


export interface ProjectCardEditPanelProps {
    handleSave: () => void;
    handleDelete?: () => void;
    handleArchive?: () => void;
    handleCancel?: () => void;
}

export default function EditPanel({handleSave, handleDelete, handleArchive, handleCancel}: ProjectCardEditPanelProps) {
    const {t} = useTranslation("projects");
    const [showWarning, setShowWarning] = useState("");

    const handleContinue = () => {
        if (showWarning === "archive") {
            handleArchive?.()
        } else {
            handleDelete?.()
        }
        setShowWarning("");
    }

    const handleClose = () => {
        setShowWarning("");
    }

    return (
        <>
            <Grid direction="row" spacing={2} justifyContent={"space-around"}>
                <Button color={"warning"} variant={"outlined"} onClick={() => {
                    setShowWarning("delete");
                }}>
                    <DeleteOutlineIcon/>
                </Button>
                {handleArchive &&
                    <Button color={"info"} variant={"outlined"} onClick={() => {
                        setShowWarning("archive")
                    }}>
                        <ArchiveOutlinedIcon/>
                    </Button>
                }
                <Button color={"success"} variant={"outlined"} onClick={() => handleSave()}>
                    <SaveOutlinedIcon/>
                </Button>
                <Button
                    color={"error"} variant={"outlined"} type={"submit"} onClick={() => {
                    handleCancel?.()
                }}>
                    <CancelIcon/>
                </Button>
            </Grid>

            <Dialog open={showWarning !== ""}>
                <DialogTitle>{t(`warning.title`)}</DialogTitle>
                <DialogContent>{t(`warning.${showWarning}.description`)}</DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} color={"primary"} onClick={handleContinue}>
                        <CheckIcon/>
                    </Button>

                    <Button variant={"outlined"} color={"secondary"} onClick={handleClose}>
                        <CancelIcon/>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}