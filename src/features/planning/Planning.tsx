import {Col, Row} from "react-bootstrap";
import React, {useState} from "react";
import DayView from "@/components/day-view/DayView";
import Calendar from "@/components/calendar/Calendar";
import "@/layouts/planning.css"

export default function Planning() {
    const [date, setDate] = useState(new Date());

    return (
        <Row className={"p-3"}>
            <Col>
                <Row className={"calendar-container"}>
                    <DayView date={date}/>
                    <Calendar date={date} setDate={setDate}/>
                </Row>
            </Col>
            <Col>
                <h1 className={"m-4 text"}> TODO: Add tools to create and remove events</h1>
            </Col>
        </Row>
    );
}