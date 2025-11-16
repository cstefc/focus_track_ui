import {render, screen} from "@testing-library/react";
import MyNavbar from "@/components/layout/navbar/MyNavbar";
import {fakeAuth, mockNavigate, test_user} from "../../../setup";
import routes, {RouteType} from "../../../../src/config/routes";
import userEvent, {UserEvent} from "@testing-library/user-event";


describe("MyNavbar", () => {
    it("renders correctly logged in", () => {
        // GIVEN
        const expected_routes = routes.filter(route => route.protected && route.navbar);
        fakeAuth.currentUser = test_user;

        // WHEN
        render(<MyNavbar/>)

        // THEN
        const logo = screen.getByText('Focus Track');
        expect(logo).toBeInTheDocument();

        const found_routes = screen.queryAllByText(/routes\..*/);
        expect(found_routes.length).toBe(expected_routes.length);

        const profile_button = screen.getByText("test user");
        expect(profile_button).toBeInTheDocument();
    })

    it("renders correctly logged out", () => {
        // GIVEN
        const expected_routes = routes.filter(route => !route.protected && route.navbar);
        fakeAuth.currentUser = null;

        // WHEN
        render(<MyNavbar/>)

        // THEN
        const logo = screen.getByText('Focus Track');
        expect(logo).toBeInTheDocument();

        const found_routes = screen.queryAllByText(/routes\..*/);
        expect(found_routes.length).toBe(expected_routes.length);

        const login_button = screen.getByText('authentication.signIn');
        expect(login_button).toBeInTheDocument();
    })

    it("Logo navigates to home page", async () => {
        // GIVEN
        const user = userEvent.setup();

        // WHEN
        render(<MyNavbar/>);
        const logo = screen.getByText('Focus Track');
        await user.click(logo)

        // THEN
        expect(logo).toBeInTheDocument();
        expect(mockNavigate).toHaveBeenCalledWith("/");
    })

    it("Routes work", async () => {
        // GIVEN
        const user: UserEvent = userEvent.setup();
        const expected_routes: RouteType[] = routes.filter(route => route.protected && route.navbar);
        fakeAuth.currentUser = test_user;

        // WHEN
        render(<MyNavbar/>);
        screen.debug()
        for (const expected of expected_routes) {
            await user.click(screen.getByText("routes." + expected.name));

            // THEN
            expect(mockNavigate).toHaveBeenCalledWith(expected.path);
        }

    })

})