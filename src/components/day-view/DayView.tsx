import {Card} from "react-bootstrap";
import './day-view.css'
import {useTranslation} from "react-i18next";

interface CalendarDayProps {
    date: Date,
}

export default function DayView({date}: CalendarDayProps) {
    const {t} = useTranslation("general");
    const days: string[] = ["calendar.days.sunday", "calendar.days.monday", "calendar.days.tuesday", "calendar.days.wednesday", "calendar.days.thursday", "calendar.days.friday", "calendar.days.saturday"];

    return (
        <Card key={date.getDate()} className={"day m-3"}>
            <Card.Title className={`${date.getDay() === 0 || date.getDay() === 6 ? "weekend" : "weekday"}`}>
                {t(days[date.getDay()])}
            </Card.Title>

            <Card.Text className={date.getDay() === 0 || date.getDay() === 6 ? "weekend" : "weekday"}>
                {date.getDate()}
            </Card.Text>
        </Card>
    );
}