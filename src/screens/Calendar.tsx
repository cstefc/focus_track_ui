import {Container} from "react-bootstrap";
import MonthView from "../components/calendar/MonthView";

const Calendar = () => {
    return (
        <>
            <Container>
                <h1>Calendar Page</h1>
            </Container>
            <MonthView/>
        </>
    );
};

export default Calendar;