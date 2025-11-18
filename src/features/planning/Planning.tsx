import {Col, Row} from "react-bootstrap";
import React, {useState} from "react";
import DayView from "@/components/ui/day-view/DayView";
import Calendar from "@/components/ui/calendar/Calendar";
import "./planning.css"

export default function Planning() {
    const [date, setDate] = useState(new Date());

    return (
        <Row className={"m-3"}>
            <Col>
                <h1 className={"m-4 text"}> TODO: Add overview month stats</h1>
            </Col>

            <Col md={"auto"} className={"calendar-container justify-content-center"}>
                <Row className={"justify-content-center align-items-center"}>
                    <DayView date={date}/>
                    <Calendar date={date} setDate={setDate}/>
                </Row>
            </Col>

            <Col >
                <h1 className={"m-4 text"}> TODO: Add overview day stats</h1>
            </Col>
        </Row>
    );
}