import {Button, Stack} from "react-bootstrap";
import React from "react";
import {months, nextMonth, prevMonth} from "@/utils/calendar";

export interface DateSelectorProps {
    date: Date;
    setDate: (newDate: Date) => void;
}

export default function DateSelector({date, setDate}: DateSelectorProps) {

    return (
        <Stack direction={"horizontal"} className={"justify-content-between p-2"}>
            <Button
                className={"selector-button"}
                variant="dark"
                onClick={() => setDate(prevMonth(date))}
            >Previous Month</Button>

            <p className={"month-text text p-2"}>{months[date.getMonth()] + " " + date.getFullYear()}</p>

            <Button
                className={"selector-button"}
                variant={'dark'}
                onClick={() => setDate(nextMonth(date))}
            >Next Month</Button>
        </Stack>

    );
}