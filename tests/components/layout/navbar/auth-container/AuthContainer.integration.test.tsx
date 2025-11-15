import {User} from "firebase/auth";
import {act, render, screen} from "@testing-library/react";
import AuthContainer from "@/components/layout/navbar/auth-container/AuthContainer";
import userEvent from "@testing-library/user-event";

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key, // simply returns the key
        i18n: {},
    }),
}));

const fakeAuth = (() => {
    let callback: ((user: User) => void) | null = null;

    return {
        currentUser: null,
        onAuthStateChanged: (cb: (user: any) => void) => {
            callback = cb;
            return () => {
            }; // unsubscribe
        },

        // simulate Firebase login/logout
        triggerUser: (user: any) => {
            if (callback) callback(user);
        },
    };
})();
vi.mock("firebase/auth", async () => {
    const actual = await vi.importActual("firebase/auth");
    return {
        ...actual,
        getAuth: () => fakeAuth,
        GoogleAuthProvider: vi.fn().mockImplementation(function () {
            return {};
        }),
        signInWithPopup: vi.fn().mockResolvedValue({displayName: "test user"}),
        signOut: vi.fn()
    }
})

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
            fakeAuth.triggerUser({displayName: "test user", photoURL: "pic"} as unknown as User)
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
        // @ts-ignore
        fakeAuth.currentUser = {displayName: "test user", photoURL: "pic"} as unknown as User;

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
        // @ts-ignore
        fakeAuth.currentUser = {displayName: "test user", photoURL: "pic"} as unknown as User;

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