import AuthContainerGoogleLogin from "@/components/layout/navbar/auth-container/AuthContainerGoogleLogin";
import {render, screen} from "@testing-library/react";
import {getAuth, signInWithPopup} from "firebase/auth";
import {Providers} from "../../../../../src/config/firebase";
import userEvent from "@testing-library/user-event";

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
        signInWithPopup: vi.fn().mockResolvedValue({uuid: "user"}) // resolved value to simulate success
    }
});

describe("AuthContainerGoogleLogin Component", () => {
    it("should render without crashing", () => {
        // GIVEN
        const dest = "/dashboard";
        const navigate = vi.fn();

        // WHEN
        render(<AuthContainerGoogleLogin navigate={navigate} destination={dest}/>);

        // THEN
        const link = screen.getByRole("button");
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent("authentication.google.signIn");

        const logo = screen.getByRole('img');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("alt", "Google Logo");

    });

    it("should redirect after signing in", async () => {
        // GIVEN
        const user = userEvent.setup()
        const dest = "/dashboard";
        const navigate = vi.fn();

        // WHEN
        render(<AuthContainerGoogleLogin destination={dest} navigate={navigate}/>)
        await user.click(screen.getByRole('button'));

        // THEN
        expect(signInWithPopup).toHaveBeenCalledWith(getAuth(), Providers.google);
        expect(navigate).toHaveBeenCalledWith(dest);
    })
})