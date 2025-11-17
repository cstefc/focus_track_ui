import {ThemeProvider, useTheme} from "@/components/layout/theme/ThemeContext";
import {render, renderHook, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe('ThemeContext', () => {
    it("should be used inside a theme context", () => {
        // GIVEN

        // WHEN
        expect(() => renderHook(() => useTheme()))
            // THEN
            .toThrow();
    })

    it("should be default dark", () => {
        // GIVEN
        localStorage.removeItem("theme");

        function TestConsumer() {
            const {theme} = useTheme();
            return (
                <span data-testid="theme-value">{theme}</span>
            );
        }

        // WHEN
        render(
            <ThemeProvider>
                <TestConsumer/>
            </ThemeProvider>
        );

        // THEN
        const theme = screen.getByTestId('theme-value');
        expect(theme).toHaveTextContent("dark")
    })

    it("should change theme", async () => {
        // GIVEN
        localStorage.removeItem("theme");
        const user = userEvent.setup();
        function TestConsumer() {
            const {theme, setTheme} = useTheme();
            return (
                <div>
                    <span data-testid="theme-value">{theme}</span>
                    <button data-testid="set-light" onClick={() => setTheme("light")}>
                        Set Light
                    </button>
                </div>
            );
        }

        // WHEN
        render(
            <ThemeProvider>
                <TestConsumer/>
            </ThemeProvider>
        );

        // THEN
        expect(localStorage.getItem("theme")).toEqual("dark");
        await user.click(screen.getByTestId('set-light'));
        expect(localStorage.getItem("theme")).toEqual("light");
    })
})