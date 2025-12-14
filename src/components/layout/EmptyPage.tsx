import {Box} from "@mui/material";
import {ReactNode} from "react";

export interface EmptyPageProps {
    children: ReactNode;
}

export function EmptyPage({children}: EmptyPageProps) {
    return (
        <Box padding={{xs: 1, md: 4}}>
            {children}
        </Box>
    )
}