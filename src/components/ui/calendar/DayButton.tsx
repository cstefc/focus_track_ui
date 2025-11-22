import React from "react";
import {Button} from "@mui/material";

export interface DayButtonProps {
    date: Date;
    selected: Date;
    setSelected: (newDate: Date) => void;
}

export default function DayButton({date, selected, setSelected}: DayButtonProps) {
    const type: string = date.getDay() === 0 || date.getDay() === 6 ? "weekend" : "weekday"
    const isSelected: boolean = selected.getDate() === date.getDate() && selected.getMonth() === date.getMonth();

    return (
        <Button
            disabled={date.getMonth() !== selected.getMonth()}
            variant={isSelected ? "contained" : "outlined"}
            sx={{
                aspectRatio: "1 / 1",
                fontSize: "clamp(0.6rem, 3vw, 1.5rem)",
                p: "0.1rem",
                color: type === "weekend" ? "red" : "inherit",
            }}
            onClick={() => setSelected(date)}
        >
            {date.getDate() || "error"}
        </Button>
    );
};