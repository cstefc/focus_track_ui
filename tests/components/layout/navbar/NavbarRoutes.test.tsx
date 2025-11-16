import NavbarRoutes from "../../../../src/components/layout/navbar/NavbarRoutes";
import {render, screen} from "@testing-library/react";
import routes from "@/config/routes";
import {fakeAuth, test_user} from "../../../setup";

describe("Navbar Routes", () => {
    it("renders correctly logged in", () => {
        // GIVEN
        const navigate = vi.fn();
        // @ts-ignore
        fakeAuth.currentUser = test_user;
        // WHEN
        render(<NavbarRoutes navigate={navigate}/>);

        // THEN
        const expectedCount = routes.filter(r => r.navbar && r.protected === true).length;
        const availableRoutes = screen.getAllByText(/routes\..*/);
        expect(availableRoutes.length).toBe(expectedCount);
        fakeAuth.currentUser = null;
    })

    it("renders correctly not logged in", () => {
        // GIVEN
        const navigate = vi.fn();

        // WHEN
        render(<NavbarRoutes navigate={navigate}/>);

        // THEN
        const expectedCount = routes.filter(r => r.navbar && r.protected === false).length;
        const availableRoutes = screen.queryAllByText(/routes\..*/);
        expect(availableRoutes.length).toBe(expectedCount);
    })
})