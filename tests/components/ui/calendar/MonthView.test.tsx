import {render} from "@testing-library/react";
import MonthView from "../../../../src/components/ui/calendar/MonthView";

describe("MonthView", () => {
    test("renders correctly", () => {
        let date = new Date();

        render(<MonthView selected={date} setSelected={newDate => date = newDate}/>)
    })
})