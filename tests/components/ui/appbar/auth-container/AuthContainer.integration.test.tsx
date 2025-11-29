import {act, render, screen} from "@testing-library/react";
import AuthContainer from "@/components/ui/appbar/auth-container/AuthContainer";
import userEvent from "@testing-library/user-event";
import {fakeAuth, test_user} from "../../../../setup";
import {User} from "firebase/auth";

describe("AuthContainer", () => {
    it("should show login when current user is null", () => {
        // GIVEN

        // WHEN
        render(<AuthContainer/>);

        // THEN
        const button = screen.queryByText("authentication.signIn");
        expect(button).toBeInTheDocument();
    })

    it("should log in after clicking login button", async () => {
        // GIVEN
        const user = userEvent.setup();

        // WHEN
        render(<AuthContainer/>)

        await user.click(screen.getByText('authentication.signIn'));
        await user.click(screen.getByText('authentication.google.signIn'));

        await act(async () => {
            fakeAuth.triggerUser({displayName: "test user", photoURL: "https://example.com"} as unknown as User)
        })

        // THEN
        const text = screen.queryByText('test user');
        expect(text).toBeInTheDocument();
    })

    it("should show logout button when logged in", async () => {
        // GIVEN
        const user = userEvent.setup();
        fakeAuth.currentUser = test_user;   // User is logged in

        // WHEN
        render(<AuthContainer/>)
        await user.click(screen.getByText('test user'));

        // THEN
        const logout = screen.getByText("authentication.signOut");
        expect(logout).toBeInTheDocument();
    })

    it("should log out after clicking logout button", async () => {
        // GIVEN
        const user = userEvent.setup();
        fakeAuth.currentUser = test_user;

        // WHEN
        render(<AuthContainer/>)
        await user.click(screen.getByText('test user'));
        await user.click(screen.getByText("authentication.signOut"));

        // THEN
        const button = screen.getByText("authentication.signIn");
        expect(button).toBeInTheDocument();
        expect(fakeAuth.currentUser).toBeNull();
    })
})