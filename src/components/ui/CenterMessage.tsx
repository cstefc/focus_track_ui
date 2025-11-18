import React from "react";
import {Col} from "react-bootstrap";

export interface CenterMessageProps {
    children: React.ReactNode;
}

export default function CenterMessage({children}: CenterMessageProps) {
    return (
        <Col
            md={8}
            className="d-flex justify-content-center align-items-center flex-column text-center"
            style={{minHeight: "50vh", maxHeight: "90vh", width: "100%"}}
        >
            {children}
        </Col>
    );
}