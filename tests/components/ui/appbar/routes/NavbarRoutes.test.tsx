import AppBarRoutes from "@/components/ui/appbar/routes/AppBarRoutes";
import {render, screen} from "@testing-library/react";
import routes from "@/config/routes";
import {fakeAuth, test_user} from "../../../../setup";
import {MemoryRouter} from "react-router-dom";

describe("Navbar Routes", () => {
    it("renders correctly logged in", () => {
        // GIVEN
        const onNavigate = vi.fn();
        // @ts-ignore
        fakeAuth.currentUser = test_user;
        // WHEN
        render(
            <MemoryRouter>
                <AppBarRoutes onNavigate={onNavigate} mobile={false}/>
            </MemoryRouter>
        );

        // THEN
        const expectedCount = routes.filter(r => r.navbar && r.protected === true).length;
        const availableRoutes = screen.getAllByText(/routes\..*/);
        expect(availableRoutes.length).toBe(expectedCount);
        fakeAuth.currentUser = null;
    })

    it("renders correctly not logged in", () => {
        // GIVEN
        const onNavigate = vi.fn();
        fakeAuth.currentUser = null;

        // WHEN
        render(
            <MemoryRouter>
                <AppBarRoutes onNavigate={onNavigate} mobile={false}/>
            </MemoryRouter>
        );
        screen.debug()

        // THEN
        const expectedCount = routes.filter(r => r.navbar && r.protected === false).length;
        const availableRoutes = screen.queryAllByText(/routes\..*/);
        expect(availableRoutes.length).toBe(expectedCount);
    })
})