import {Menu} from "@mui/material";
import React from "react";

export interface ProfileMenuProps {
    children: React.ReactNode;
    anchorEl: HTMLElement | null;
    handleClose: () => void;
    handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ProfileMenu({children, anchorEl, handleClose}: ProfileMenuProps) {
    return (
        <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
        >
            {children}
        </Menu>
    );
}