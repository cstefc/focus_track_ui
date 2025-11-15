import {render, screen} from "@testing-library/react";
import MonthView from "../../../../src/components/ui/calendar/MonthView";

describe("MonthView", () => {
    test("renders correctly", () => {
        // GIVEN saturday 15/11/2025
        let date = new Date(2025, 10, 15);

        // WHEN
        render(<MonthView selected={date} setSelected={newDate => date = newDate}/>);

        // THEN
        const buttons = screen.getAllByRole("button");
        expect(buttons.length % 7).toBe(0);
    })

    test("updates when clicked", async () => {
        // GIVEN saturday 15/11/2025
        let date = new Date(2025, 10, 15);

        // WHEN
        render(<MonthView selected={date} setSelected={newDate => date = newDate}/>)
        screen.getByText("25").click();

        // THEN
        expect(date.getDate()).toBe(25);

    })
})