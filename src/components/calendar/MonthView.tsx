import CalendarDay from "./DayView";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Row, Stack} from "react-bootstrap";


class DayCardProps {
    date?: Date;
    day?: number;
    index?: number;
    enabled?: boolean;
    onDateSelect?: (newDate: Date) => void;
    selected?: boolean;
}

const DayCard = ({date, index, day, enabled, selected, onDateSelect}: DayCardProps) => {
    const cardDate = date !== undefined && index !== undefined ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), index + 1)) : new Date();

    return (
        <Button
            disabled={!enabled}
            variant={selected ? "primary" : "dark"}
            style={{
                width: "80px",
                height: "80px",
                fontSize: "20px",
                color: cardDate.getDay() === 0 || cardDate.getDay() === 6 ? "red" : "",
            }}
            onClick={() => onDateSelect?.(cardDate)}
        >
            {day || "error"}
        </Button>
    );
};


const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const months_length: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function calendarOffset(date: Date): number {
    const first: Date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
    return first.getDay() !== 0 ? -((first.getDay() - 1) % 7) : -6;
}

function calendarList(date: Date): number[] {
    const calendar_fill: number[] = []
    const offset = calendarOffset(date);
    for (let i = offset; i < months_length[date.getMonth()]; i++) {
        if (i < 0) {
            let prev_month = date.getMonth() - 1 >= 0 ? date.getMonth() - 1 : 11;
            calendar_fill.push(months_length[prev_month] + i + 1);
        } else {
            calendar_fill.push(i + 1);
        }
    }
    if (date.getMonth() === 1 && isLeapYear(date.getFullYear())) calendar_fill.push(29);

    let i = 1;
    while (calendar_fill.length % 7 !== 0) {
        calendar_fill.push(i);
        i += 1
    }
    return calendar_fill;
}

class MonthViewProps {
    date: Date | undefined;
    setDate: ((date: Date) => void) | undefined;
    onDateSelect: ((newDate: Date) => void) | undefined;
}

const MonthView = ({date, onDateSelect, setDate}: MonthViewProps) => {
    if (!date || !setDate) return <></>;

    let calendar_list: number[] = calendarList(date);
    let offset = calendarOffset(date);

    return (
        <Container
            style={{
                width: "700px",
                height: "600px",
            }}
        >
            <Stack direction={"horizontal"} className={"justify-content-between"}>
                <Button
                    variant="dark"
                    onClick={() => {
                        let newDate = new Date(date);
                        if (newDate.getDate() > 0) {
                            newDate.setMonth(date.getMonth() - 1);
                        } else {
                            newDate.setMonth(11);
                            newDate.setFullYear(newDate.getFullYear() - 1);
                        }
                        setDate(newDate)
                    }}
                >Previous Month</Button>

                <h1 className={"text-center text"} style={{
                    width: "auto",
                    padding: "10px",
                }}>{months[date.getMonth()] + " " + date.getFullYear()}</h1>

                <Button
                    onClick={() => {
                        let newDate = new Date(date);
                        if (newDate.getMonth() < 11) {
                            newDate.setMonth(date.getMonth() + 1);
                        } else {
                            newDate.setMonth(0);
                            newDate.setFullYear(newDate.getFullYear() + 1);
                        }
                        setDate(newDate)
                    }}
                    variant={'dark'}
                >Next Month</Button>
            </Stack>
            <Container className={"w-100 align-content-center"}>
                <Row className="justify-content-between align-items-center">
                    {calendar_list.map((d, i) => (
                        <Col key={i} className="p-1 text-center">
                            <DayCard
                                date={date}
                                index={i + offset}
                                day={d}
                                selected={i + offset + 1 === date.getDate()}
                                enabled={
                                    i >= -offset &&
                                    i + offset < months_length[date.getMonth()] + (isLeapYear(date.getFullYear()) ? 1 : 0)
                                }
                                onDateSelect={(newDate) => {
                                    setDate(newDate);
                                    onDateSelect?.(newDate);
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
}

export default MonthView;
