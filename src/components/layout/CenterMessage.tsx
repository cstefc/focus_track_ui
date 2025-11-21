import React from "react";
import { Container, Box } from "@mui/material";

export interface CenterMessageProps {
    children: React.ReactNode;
}

export default function CenterMessage({ children }: CenterMessageProps) {
    return (
        <Container
            maxWidth="md" // roughly equivalent to Bootstrap md
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // vertical centering
                alignItems: "center",     // horizontal centering
                textAlign: "center",
                minHeight: "50vh",
                maxHeight: "90vh",
            }}
        >
            <Box sx={{ width: "100%" }}>{children}</Box>
        </Container>
    );
}
