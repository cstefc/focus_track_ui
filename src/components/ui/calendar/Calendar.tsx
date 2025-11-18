import MonthView from "./MonthView";
import React from "react";
import DateSelector from "./DateSelector";
import './calendar.css'
import {Container} from "react-bootstrap";

export interface CalendarViewProps {
    date: Date;
    setDate: (date: Date) => void;
}

export default function Calendar({date, setDate}: CalendarViewProps) {
    return (
        <Container fluid className={"m-3"}>
            <DateSelector date={date} setDate={setDate}/>
            <MonthView selected={date} setSelected={setDate}/>
        </Container>
    );
}