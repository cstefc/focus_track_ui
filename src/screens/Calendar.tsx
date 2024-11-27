import {Container, Row, Spinner, Stack} from "react-bootstrap";
import MonthView from "../components/calendar/MonthView";
import React, {useState} from "react";
import DayView from "../components/calendar/DayView";

const Calendar = () => {
    const [date, setDate] = useState(new Date());

    return (
        <Stack className={"m-auto"}>
            <Row className={"m-auto"}>
                <DayView date={date}/>
            </Row>
            <MonthView
                date={date}
                onDateSelect={(newDate) => {
                    setDate(newDate);
                }}
            />
        </Stack>
    );
};

export default Calendar;