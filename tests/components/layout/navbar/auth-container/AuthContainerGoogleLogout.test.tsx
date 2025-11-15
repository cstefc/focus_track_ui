import {render, screen} from "@testing-library/react";
import AuthContainerGoogleLogout from "@/components/layout/navbar/auth-container/AuthContainerGoogleLogout";
import userEvent from "@testing-library/user-event";
import {getAuth, signOut} from "firebase/auth";

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // simply returns the key
        i18n: {},
    }),
}));

vi.mock('firebase/auth', async () => {
    const actual = await import("firebase/auth");
    return {
        ...actual,
        getAuth: vi.fn(() => ({})), // can return empty object
        signOut: vi.fn() // resolved value to simulate success
    }
});

describe("AuthContainerGoogleLogout", () => {
    it("renders without crashing", () => {
        // GIVEN
        const navigate = vi.fn();
        const dest = "/login";

        // WHEN
        render(<AuthContainerGoogleLogout navigate={navigate} destination={dest}/>);

        // THEN
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("authentication.signOut");
    })

    it("should redirect after logout", async () => {
        // GIVEN
        const user = userEvent.setup();
        const navigate = vi.fn();
        const dest = "/login";

        // WHEN
        render(<AuthContainerGoogleLogout navigate={navigate} destination={dest}/>);
        await user.click(screen.getByRole('button'));

        // THEN
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("authentication.signOut");

        expect(signOut).toHaveBeenCalledWith(getAuth());
        expect(navigate).toHaveBeenCalledWith(dest);
    });


})