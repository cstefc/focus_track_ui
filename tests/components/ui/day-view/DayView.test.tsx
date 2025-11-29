import {render, screen} from '@testing-library/react';
import DayView from "@/components/ui/day-view/DayView";

describe('DayView', () => {
    test("Component rendering", () => {
        // GIVEN friday 14/11/2025
        const date = new Date(2025, 10, 14);

        // WHEN
        render(<DayView date={date}/>);

        // THEN
        const title = screen.getByText("calendar.days.friday")
        expect(title).toBeInTheDocument();

        const p = screen.getByText("14");
        expect(p).toBeInTheDocument();
    })
})
