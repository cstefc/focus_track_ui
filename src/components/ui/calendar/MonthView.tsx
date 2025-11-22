import React, {useEffect, useState} from "react";
import {calendarList} from "@/lib/date";
import DayButton from "./DayButton";
import {Box} from "@mui/material";

export interface MonthViewProps {
    selected: Date;
    setSelected: ((date: Date) => void);
}

export default function MonthView({selected, setSelected}: MonthViewProps) {
    const [rows, setRows] = useState<Date[][]>(get_rows(selected));

    function get_rows(date: Date): Date[][] {
        const days: Date[] = calendarList(date);
        let rows: Date[][] = [];
        let curr: Date[] = []
        for (let i = 0; i < days.length; i++) {
            if (i > 0 && i % 7 === 0) {
                rows.push(curr);
                curr = []
            }
            curr.push(days[i]);
        }
        rows.push(curr);
        return rows;
    }

    useEffect(() => {
        setRows(get_rows(selected));
    }, [selected]);

    return (
        <Box display={"grid"} gridTemplateColumns={"repeat(auto-fill, 1fr)"} gap={"0.25rem"} padding={"0.5rem"}
             boxSizing={"border-box"}
        >
            {rows.map((row: Date[], idx: number) => (
                <Box display={"grid"} gridTemplateColumns={"repeat(7, 1fr)"} gap={"0.25rem"} key={idx}>
                    {row.map((date, btn_idx: number) => (
                        <DayButton key={btn_idx} date={date} selected={selected} setSelected={setSelected}/>
                    ))}
                </Box>
            ))}
        </Box>
    );
}