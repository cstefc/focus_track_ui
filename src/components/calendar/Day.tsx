import {Card} from "react-bootstrap";

interface CalendarDayProps {
    dayName?: string,
    day?: number
}

const CalendarDay = ({dayName, day}: CalendarDayProps) => {
    return (
        <>
            <h1>{dayName}</h1>
            <h2>{day}</h2>
            <h1>Hello</h1>
        </>
    );
}

export default CalendarDay;