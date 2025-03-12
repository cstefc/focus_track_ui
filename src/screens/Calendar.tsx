import {Col, Container, Form, FormText, Row} from "react-bootstrap";
import MonthView from "../components/calendar/MonthView";
import React, {useState} from "react";
import DayView from "../components/calendar/DayView";

const Calendar = () => {
    const [date, setDate] = useState(new Date());

    return (
        <>
            <Row className={"w-100 h-100 justify-content-center align-items-center"}>
                {/* The date picker left on the calendar screen*/}
                <Col className={"h-100 m-1 calendar-container"}>
                    <Row className="justify-content-center">
                        <DayView date={date}/>
                    </Row>
                    <Row className="justify-content-center align-items-center h-100 w-100">
                        <MonthView
                            date={date}
                            setDate={setDate}
                            onDateSelect={(newDate) => {
                                setDate(newDate);
                            }}
                        />
                    </Row>
                    <br/>
                </Col>

                {/* TODO: The edit space for managing calendar events */}
                <Col className={"h-100 w-100 justify-item-center"}>
                    <Container className={"justify-content-center align-items-center w-100 h-100"}>
                        <h1 className={"text"}> TODO: Add tools to create and remove events</h1>
                    </Container>
                </Col>
            </Row>
        </>
    )
        ;
};

export default Calendar;