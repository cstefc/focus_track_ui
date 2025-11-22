import {SxProps, Typography} from "@mui/material";
import React from "react";
import {Theme} from "@mui/material/styles";

export interface DisplayTitleProps {
    sx?: SxProps<Theme>;
    children?: React.ReactNode;
}

export const DisplayTitle = ({sx, children}: DisplayTitleProps) => {
    return (<Typography variant={"h2"} component={"div"} sx={sx}>{children}</Typography>);
}