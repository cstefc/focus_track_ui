import {MemoryRouter} from "react-router-dom";
import {ThemeProvider} from "@/components/layout/theme/ThemeContext";
import {render, screen} from "@testing-library/react";
import MyNavbar from "@/components/layout/navbar/MyNavbar";
import userEvent from "@testing-library/user-event";

describe("Theme Box", () => {

    test('renders correctly', () => {
        // GIVEN

        // WHEN
        render(
            <ThemeProvider>
                <MemoryRouter>
                    <MyNavbar/>
                </MemoryRouter>
            </ThemeProvider>
        )

        // THEN
        const selector = screen.getByText(/theme\..*/);
        expect(selector).toBeInTheDocument();
    });

    test("should change theme", async () => {
        // GIVEN
        const user = userEvent.setup()

        // WHEN
        render(
            <ThemeProvider>
                <MemoryRouter>
                    <MyNavbar/>
                </MemoryRouter>
            </ThemeProvider>
        )
        await user.click(screen.getByText(/theme.dark/));
        screen.debug()
        await user.click(screen.getByText(/theme.light/))

        // THEN
        expect(localStorage.getItem("theme")).toEqual("light");
    })
})