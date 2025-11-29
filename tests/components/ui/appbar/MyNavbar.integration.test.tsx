import {render, screen} from "@testing-library/react";
import MyNavbar from "@/components/ui/appbar/MyAppBar";
import {fakeAuth, mockChangeLanguage, mockNavigate, test_user} from "../../../setup";
import routes, {RouteType} from "@/config/routes";
import userEvent, {UserEvent} from "@testing-library/user-event";
import {MemoryRouter} from "react-router-dom";
import {CustomThemeProvider} from "@/components/layout/theme/ThemeContext";


describe("MyNavbar", () => {
    it("renders correctly logged in", () => {
        // GIVEN
        const expected_routes = routes.filter(route => route.protected && route.navbar);
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
        const logo = screen.getByText('Focus Track');
        expect(logo).toBeInTheDocument();

        const found_routes = screen.queryAllByText(/routes\..*/);
        expect(found_routes.length).toBe(expected_routes.length * 2); // Once for desktop and one for mobile

        const profile_buttons = screen.queryAllByText("test user");
        expect(profile_buttons.length).toBe(2);
    });

    it("renders correctly logged out", () => {
        // GIVEN
        const expected_routes = routes.filter(route => !route.protected && route.navbar);
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
        const logo = screen.getByText('Focus Track');
        expect(logo).toBeInTheDocument();

        const found_routes = screen.queryAllByText(/routes\..*/);
        expect(found_routes.length).toBe(expected_routes.length*2);

        const login_buttons = screen.getAllByText('authentication.signIn');
        expect(login_buttons.length).toBe(2);
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

        const logo = screen.getByText('Focus Track');
        await user.click(logo)

        // THEN
        expect(logo).toBeInTheDocument();
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
            for (const option of options){
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
        for (const option of options){
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
        expect(options.length).toBe(2);


        await user.click(options[0]);
        await user.click(screen.getByText("theme.light"));

        // THEN
        expect(localStorage.getItem("theme")).toBe('light')

        await user.click(options[1]);
        await user.click(screen.getByText("theme.dark"))
        expect(localStorage.getItem("theme")).toBe('dark');
    })

})