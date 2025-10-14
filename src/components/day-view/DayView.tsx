import {Card} from "react-bootstrap";
import './day-view.css'

interface CalendarDayProps {
    date: Date,
}

export default function DayView({date}: CalendarDayProps) {
    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <Card key={date.getDate()} className={"day m-3"}>
            <Card.Title className={`${date.getDay() === 0 || date.getDay() === 6 ? "weekend" : "weekday"}`}>
                {days[date.getDay()]}
            </Card.Title>

            <Card.Text className={date.getDay() === 0 || date.getDay() === 6 ? "weekend" : "weekday"}>
                {date.getDate()}
            </Card.Text>
        </Card>
    );
}