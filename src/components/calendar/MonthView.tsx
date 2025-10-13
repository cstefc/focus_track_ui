import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {calendarList} from "../../utils/calendar";
import DayButton from "./DayButton";

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
        <Container className={"month-view"}>
            {rows.map((row: Date[], idx: number) => (
                <div className={"week-row"} key={idx}>
                    {row.map((date, btn_idx: number) => (
                        <DayButton key={btn_idx} date={date} selected={selected} setSelected={setSelected}/>
                    ))}
                </div>
            ))}
        </Container>
    );
}