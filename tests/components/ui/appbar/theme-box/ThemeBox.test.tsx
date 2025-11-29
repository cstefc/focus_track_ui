import {MemoryRouter} from "react-router-dom";
import {CustomThemeProvider} from "@/components/layout/theme/ThemeContext";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeBox from "../../../../../src/components/ui/appbar/theme-box/ThemeBox";
import {AppBar} from "@mui/material";

describe("Theme Box", () => {

    test('renders correctly', () => {
        // GIVEN

        // WHEN
        render(
            <CustomThemeProvider>
                <MemoryRouter>
                    <AppBar>
                        <ThemeBox/>
                    </AppBar>
                </MemoryRouter>
            </CustomThemeProvider>
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
            <CustomThemeProvider>
                <MemoryRouter>
                    <AppBar>
                        <ThemeBox/>
                    </AppBar>
                </MemoryRouter>
            </CustomThemeProvider>
        )
        await user.click(screen.getByText(/theme.dark/));
        await user.click(screen.getByText(/theme.light/))

        // THEN
        expect(localStorage.getItem("theme")).toEqual("light");
    })
})