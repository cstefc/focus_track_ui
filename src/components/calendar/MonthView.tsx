import CalendarDay from "./DayView";
import {useState} from "react";
import {Button, Card, Container} from "react-bootstrap";


class DayCardProps {
    day?: number;
    index?: number;
    enabled?: boolean;
    selected?: boolean;
}

class MonthViewProps {
    date?: Date;
    onDateSelect?: (newDate: Date) => void;
}

function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}


const MonthView = (props: MonthViewProps) => {
    const [date, setDate] = useState(props.date || new Date());

    const first: Date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const months_length: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    let calendar_fill: number[] = [];
    let offset = -first.getDay() + 1;
    for (let i = offset; i < months_length[date.getMonth()]; i++) {
        if (i < 0) {
            let prev_month = date.getMonth() - 1 >= 0 ? date.getMonth() - 1 : 11;
            calendar_fill.push(months_length[prev_month] + i + 1);
        } else {
            calendar_fill.push(i + 1);
        }
    }
    while (calendar_fill.length % 7 !== 0) {
        calendar_fill.push(7 - (calendar_fill.length % 7));
    }

    const DayCard = (p: DayCardProps) => {
        const cardDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), p?.index || p.index === 0 ? p.index + 1 : 1));
        return (
            <Button
                disabled={!p.enabled}
                variant={p?.selected ? "primary" : "dark"}
                key={p.index || "error"}
                style={{
                    width: "80px",
                    height: "80px",
                    margin: "2px",
                    color: cardDate.getDay() === 0 || cardDate.getDay() === 6 ? "red" : "",
                }}
                onClick={() => {
                    if (props.onDateSelect != null) props.onDateSelect(cardDate);
                    setDate(cardDate);
                }}
            >
                {p.day || "error"}
            </Button>

        );
    }

    return (
        <>
            <Container>
                <h1 className={"text-center"}>{months[date.getMonth()]}</h1>
                {calendar_fill.map((d, i) =>
                    <>
                        <DayCard
                            index={i + offset}
                            day={d}
                            selected={i + offset + 1 === date.getDate()}
                            enabled={i >= -offset && i < months_length[date.getMonth()] - offset}
                        />
                        {(i + 1) % 7 == 0 && <div style={{width: "100%"}}/>}
                    </>
                )}
            </Container>

        </>
    );
}

export default MonthView;