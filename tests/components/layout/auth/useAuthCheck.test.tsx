import useAuthCheck from "@/components/layout/auth/useAuthCheck";
import {renderHook, waitFor} from "@testing-library/react";
import {User} from "firebase/auth";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));

const fakeAuth = (() => {
    let callback: ((user: User) => void) | null = null;

    return {
        onAuthStateChanged: (cb: (user: any) => void) => {
            callback = cb;
            return () => {
            }; // unsubscribe
        },

        // simulate Firebase login/logout
        triggerUser: (user: any) => {
            if (callback) callback(user);
        }
    };
})();

vi.mock("firebase/auth", () => ({
    getAuth: () => fakeAuth
}))

describe('useAuthCheck', () => {
    it("should be loading when initialised", () => {
        // GIVEN
        const {result} = renderHook(() => useAuthCheck());
        expect(result.current.user).toBe(null);
        expect(result.current.loading).toBe(true);
    });

    it("should be logged in when receiving user from firebase", async () => {
        // WHEN
        const {result} = renderHook(() => useAuthCheck());

        // THEN
        const fakeUser = {uid: "123", displayName: "Logged in user"} as User;
        fakeAuth.triggerUser(fakeUser);

        // wait for React state to update
        await waitFor(() => {
            expect(mockNavigate).not.toHaveBeenCalled();
            expect(result.current.user).toEqual(fakeUser);
            expect(result.current.loading).toBe(false);
        });
    })

    it ("should navigate to login when no user got", async () => {
        // WHEN
        const {result} = renderHook(() => useAuthCheck());

        // THEN
        fakeAuth.triggerUser(null);

        await waitFor(() => {
            expect(result.current.user).toBe(null);
            expect(result.current.loading).toBe(false);
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        })
    })
})