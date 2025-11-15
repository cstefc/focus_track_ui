import DateSelector from "@/components/ui/calendar/DateSelector";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {useState} from "react";

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // simply returns the key
        i18n: {},
    }),
}));

describe("DateSelector", () => {
    test("should render correctly", () => {
        // GIVEN friday 14-11-2025
        let date = new Date(2025, 10, 14);

        // WHEN
        render(<DateSelector date={date} setDate={new_date => date = new_date}/>);

        // THEN
        const prevBtn = screen.getByText("calendar.date_selector.prev_month");
        expect(prevBtn).toBeInTheDocument();

        const month = screen.getByText("calendar.months.november 2025");
        expect(month).toBeInTheDocument();

        const nextBtn = screen.getByText("calendar.date_selector.next_month");
        expect(nextBtn).toBeInTheDocument();

    })

    test("previous month should work", async () => {
        // GIVEN friday 14-11-2025
        const user = userEvent.setup();
        const Wrapper = () => {
            const [date, setDate] = useState(new Date(2025, 10, 14));
            return <DateSelector date={date} setDate={setDate} />;
        };

        // WHEN
        render(<Wrapper/>);

        await user.click(screen.getByText("calendar.date_selector.prev_month"));

        // THEN
        const month = screen.getByText("calendar.months.october 2025");
        expect(month).toBeInTheDocument();
    })

    test("next month should work", async () => {
        // GIVEN friday 14-11-2025
        const user = userEvent.setup();
        const Wrapper = () => {
            const [date, setDate] = useState(new Date(2025, 10, 14));
            return <DateSelector date={date} setDate={setDate} />;
        };

        // WHEN
        render(<Wrapper/>);
        await user.click(screen.getByText("calendar.date_selector.next_month"));

        // THEN
        const month = screen.getByText("calendar.months.december 2025");
        expect(month).toBeInTheDocument();
    })
})