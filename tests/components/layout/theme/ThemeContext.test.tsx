import {CustomThemeProvider} from "../../../../src/components/layout/theme/ThemeContext";
import {render, screen} from "@testing-library/react";
import {useTheme} from "@/components/layout/theme/ThemeContext";


describe('ThemeContext', () => {
    it("should render without crashing", () => {
        // GIVEN
        const TestComponent = () => {
            return (<p>This should render</p>);
        }

        // WHEN
        render(
            <CustomThemeProvider>
                <TestComponent/>
            </CustomThemeProvider>

        )

        // THEN
        expect(screen.getByText("This should render")).toBeInTheDocument();
    });

    it("should save the theme to localstorage", () => {
        // GIVEN
        const TestComponent = () => {
            return (<p>This should render</p>);
        }

        // WHEN
        render(
            <CustomThemeProvider>
                <TestComponent/>
            </CustomThemeProvider>

        )

        // THEN
        expect(localStorage.getItem("theme")).toEqual("dark")
    });

    it("should provide the theme in the child components", () => {
        // GIVEN
        const TestComponent = () => {
            const {mode} = useTheme();

            return (<p>{mode}</p>);
        }

        // WHEN
        render(
            <CustomThemeProvider>
                <TestComponent/>
            </CustomThemeProvider>

        )

        // THEN
        expect(screen.getByText("dark")).toBeInTheDocument();
    });

    it("should be able to change the theme", () => {
        // GIVEN
        const TestComponent = () => {
            const {mode, changeMode} = useTheme();
            changeMode("light");
            return (<p>{mode}</p>);
        }

        // WHEN
        render(
            <CustomThemeProvider>
                <TestComponent/>
            </CustomThemeProvider>

        )

        // THEN
        expect(screen.getByText("light")).toBeInTheDocument();
        expect(localStorage.getItem("theme")).toEqual("light")
    });


})