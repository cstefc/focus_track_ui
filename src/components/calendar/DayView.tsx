import {Card} from "react-bootstrap";

interface CalendarDayProps {
    date: Date,
}

const CalendarDay = (props: CalendarDayProps) => {
    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date: Date =  props.date || new Date();
    return (
        <Card
            key={date.getDate()}
            style={{width: '150px', height: "150px", padding: "5px", margin: "5px"}}>
            <Card.Body className="text-center">
                <Card.Title
                    style={{
                        color: date.getDay() === 0 || date.getDay() === 6 ? "red" : "",
                    }}
                >{days[date.getDay()]}</Card.Title>
                <Card.Text style={{
                    fontSize: "48pt",
                    color: date.getDay() === 0 || date.getDay() === 6 ? "red" : "",
                }}>{date.getDate()}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CalendarDay;