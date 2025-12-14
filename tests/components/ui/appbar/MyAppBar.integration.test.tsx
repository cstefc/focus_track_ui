import {render, screen} from "@testing-library/react";
import MyNavbar from "@/components/ui/appbar/MyAppBar";
import {fakeAuth, mockChangeLanguage, mockNavigate, test_user} from "../../../setup";
import routes, {RouteType} from "@/config/routes";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import {CustomThemeProvider} from "@/components/layout/theme/ThemeContext";


describe("MyAppBar", () => {
    it("renders correctly logged in", () => {
        // GIVEN
        fakeAuth.currentUser = test_user;

        // WHEN
        render(
            <CustomThemeProvider>
                <MemoryRouter>
                    <MyNavbar/>
                </MemoryRouter>
            </CustomThemeProvider>
        );

        // THEN
        const logo = screen.queryAllByText('Focus Track');
        expect(logo.length).toBeGreaterThan(0);

        const found_routes = screen.queryAllByText(/routes\..*/);
        expect(found_routes.length).toBeGreaterThan(0);

        const profile_buttons = screen.queryAllByText("test user");
        expect(profile_buttons.length).toBeGreaterThan(0);
    });

    it("renders correctly logged out", () => {
        // GIVEN
        fakeAuth.currentUser = null;

        // WHEN
        render(
            <CustomThemeProvider>
                <MemoryRouter>
                    <MyNavbar/>
                </MemoryRouter>
            </CustomThemeProvider>
        );

        // THEN
        const logo = screen.getAllByText('Focus Track');
        expect(logo.length).toBeGreaterThan(0);

        const found_routes = screen.queryAllByText(/routes\..*/);
        expect(found_routes.length).toBe(routes.filter(route => !route.protected && route.navbar).length);

        const login_buttons = screen.getAllByText('authentication.signIn');
        expect(login_buttons.length).toBeGreaterThan(0);
    });

    it("Logo navigates to home page", async () => {
        // GIVEN
        const user = userEvent.setup();

        // WHEN
        render(
            <CustomThemeProvider>
                <MemoryRouter>
                    <MyNavbar/>
                </MemoryRouter>
            </CustomThemeProvider>
        );

        const logo = screen.getAllByText('Focus Track');
        expect(logo.length).toBeGreaterThan(0);
        await user.click(logo[0])

        // THEN
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("Routes work", async () => {
        // GIVEN
        const user: UserEvent = userEvent.setup();
        const expected_routes: RouteType[] = routes.filter(route => route.protected && route.navbar);
        fakeAuth.currentUser = test_user;

        // WHEN
        render(
            <CustomThemeProvider>
                <MemoryRouter>
                    <MyNavbar/>
                </MemoryRouter>
            </CustomThemeProvider>
        );

        for (const expected of expected_routes) {
            const options = await screen.getAllByText("routes." + expected.name)
            for (const option of options) {
                await user.click(option);
                // THEN
                expect(mockNavigate).toHaveBeenCalled();
            }

        }

    });

    it("should be able to change languages", async () => {
        // GIVEN
        const user = userEvent.setup();

        // WHEN
        render(
            <CustomThemeProvider>
                <MemoryRouter>
                    <MyNavbar/>
                </MemoryRouter>
            </CustomThemeProvider>
        );

        const options = screen.getAllByText("EN");
        for (const option of options) {
            await user.click(option);
            await user.click(screen.getByText("NL"));

            // THEN
            expect(mockChangeLanguage).toHaveBeenCalledWith('nl')
        }

    })

    it("should be able to change themes", async () => {
        // GIVEN
        const user = userEvent.setup();

        // WHEN
        render(
            <CustomThemeProvider>
                <MemoryRouter>
                    <MyNavbar/>
                </MemoryRouter>
            </CustomThemeProvider>
        );

        const options = screen.getAllByText("theme.dark");
        expect(options.length).toBeGreaterThan(0);

        await user.click(options[0]);
        await user.click(screen.getByText("theme.light"));

        // THEN
        expect(localStorage.getItem("theme")).toBe('light')
    })

})