import {User} from "firebase/auth";
import {act, render, screen} from "@testing-library/react";
import AuthContainer from "@/components/layout/navbar/auth-container/AuthContainer";
import userEvent from "@testing-library/user-event";
import {fakeAuth, test_user} from "../../../../setup";

describe("AuthContainer", () => {
    it("should show login when current user is null", () => {
        // GIVEN
        const navigate = vi.fn();

        // WHEN
        render(<AuthContainer navigate={navigate}/>);

        // THEN
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent("authentication.signIn");

    })

    it("should log in after clicking login button", async () => {
        // GIVEN
        const user = userEvent.setup();
        const navigate = vi.fn();

        // WHEN
        render(<AuthContainer navigate={navigate}/>)
        await user.click(screen.getByText('authentication.signIn'));
        await user.click(screen.getByText('authentication.google.signIn'));
        await act(async () => {
            fakeAuth.triggerUser({displayName: "test user", photoURL: "https:"} as unknown as User)
        })

        // THEN
        const text = screen.queryByText('test user');
        expect(text).toBeInTheDocument();

        const logout = screen.queryByText("authentication.signOut");
        expect(logout).toBeInTheDocument();
    })

    it("should show logout button when logged in", async () => {
        // GIVEN
        const user = userEvent.setup();
        const navigate = vi.fn();
        fakeAuth.currentUser = test_user;

        // WHEN
        render(<AuthContainer navigate={navigate}/>)
        await user.click(screen.getByText('test user'));

        // THEN
        const logout = screen.getByText("authentication.signOut");
        expect(logout).toBeInTheDocument();
    })

    it("should log out after clicking logout button", async () => {
        // GIVEN
        const user = userEvent.setup();
        const navigate = vi.fn();
        fakeAuth.currentUser = test_user;

        // WHEN
        render(<AuthContainer navigate={navigate}/>)
        await user.click(screen.getByText('test user'));
        await user.click(screen.getByText("authentication.signOut"));
        await act(async () => {
            fakeAuth.triggerUser(null)
        })
        screen.debug();
        // THEN
        const button = screen.getByText("authentication.signIn");
        expect(button).toBeInTheDocument();
    })
})