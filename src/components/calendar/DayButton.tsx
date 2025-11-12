import {Button} from "react-bootstrap";
import React from "react";

export interface DayButtonProps {
    date: Date;
    selected: Date;
    setSelected: (newDate: Date) => void;
}

export default function DayButton ({date, selected, setSelected}: DayButtonProps) {
    const type: string = date.getDay() === 0 || date.getDay() === 6 ? "weekend-button" : "weekday-button"

    return (
        <Button
            disabled={date.getMonth() !== selected.getMonth()}
            variant={selected.getDate() === date.getDate() && selected.getMonth() === date.getMonth() ? "primary" : "dark"}
            className={`day-button ${type}`}
            onClick={() => setSelected(date)}
        >
            {date.getDate() || "error"}
        </Button>
    );
};