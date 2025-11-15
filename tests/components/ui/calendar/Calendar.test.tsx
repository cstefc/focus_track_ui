import {render, screen} from "@testing-library/react";
import Calendar from "../../../../src/components/ui/calendar/Calendar";


describe("Calendar", () => {
    test("renders without crashing", () => {
        // GIVEN
        let date = new Date();

        // WHEN
        render(<Calendar date={date} setDate={(new_date => date = new_date)}/>);
        screen.debug();

        // THEN
        const button = screen.getByText('calendar.date_selector.prev_month');
        expect(button).toBeInTheDocument();

        const buttons = screen.getByText("1");
        expect(buttons).toBeInTheDocument();
    })
})