import {render, screen} from '@testing-library/react';
import DayView from "@/components/ui/day-view/DayView";

describe('DayView', () => {
    test("Component rendering", () => {
        // GIVEN
        // friday 14/11/2025
        const date = new Date(2025, 10, 14);

        // WHEN
        render(<DayView date={date}/>);

        // THEN
        const title = screen.getByText("calendar.days.friday")
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass("card-title");

        const p = screen.getByRole("paragraph");
        expect(p).toBeInTheDocument();
        expect(p).toHaveTextContent(/[0-9]*/);

    })

    test("Weekday class is present", () => {
        // GIVEN
        // friday 14/10/2025
        const date = new Date(2025, 10, 14);

        // WHEN
        render(<DayView date={date}/>);

        // THEN
        const title = screen.getByText("calendar.days.friday");
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass("weekday");

        const p = screen.getByRole("paragraph");
        expect(p).toBeInTheDocument();
        expect(p).toHaveClass("weekday")
    })

    test("Weekend class is present", () => {
        // GIVEN
        // sunday 16/10/2025
        const date = new Date(2025, 10, 16);

        // WHEN
        render(<DayView date={date}/>);

        // THEN
        const title = screen.getByText("calendar.days.sunday");
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass("weekend");

        const p = screen.getByRole("paragraph");
        expect(p).toBeInTheDocument();
        expect(p).toHaveClass("weekend");
    })
})