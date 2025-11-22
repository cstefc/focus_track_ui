import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";


export interface ProjectCardEditPanelProps {
    handleSave: () => void;
    handleDelete?: () => void;
    handleArchive?: () => void;
    handleCancel?: () => void;
    isSubmitting?: boolean;
}

export default function EditPanel({handleSave, handleDelete, handleArchive, handleCancel, isSubmitting}: ProjectCardEditPanelProps) {
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
            <Stack direction="row" spacing={1}>
                <Button color={"warning"} onClick={() => {
                    setShowWarning("delete");
                }}>
                    <DeleteOutlineIcon/>
                </Button>
                {handleArchive &&
                    <Button color={"info"} onClick={() => {
                        setShowWarning("archive")
                    }}>
                        <ArchiveOutlinedIcon/>
                    </Button>
                }
                <Button color={"success"} disabled={isSubmitting} onClick={() => handleSave()}>
                    <CheckIcon/>
                </Button>
                <Button
                    color={"error"} onClick={() => {
                    handleCancel?.()
                }}>
                    <CancelIcon/>
                </Button>
            </Stack>

            <Dialog open={showWarning !== ""}>
                <DialogTitle>{t(`warning.title`)}</DialogTitle>
                <DialogContent>{t(`warning.${showWarning}.description`)}</DialogContent>
                <DialogActions>
                    <Button color={"secondary"} onClick={handleClose}>
                        {t("button.cancel")}
                    </Button>
                    <Button variant={"contained"} color={"primary"} onClick={handleContinue}>
                        {t("button.save")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}