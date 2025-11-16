import useAuthCheck from "@/components/layout/auth/useAuthCheck";
import {act, renderHook, waitFor} from "@testing-library/react";
import {User} from "firebase/auth";
import {fakeAuth, mockNavigate} from "../../../setup";



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
        await act(async () => {
            fakeAuth.triggerUser(fakeUser);
        })

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
        await act(async () => {
            fakeAuth.triggerUser(null);
        })

        await waitFor(() => {
            expect(result.current.user).toBe(null);
            expect(result.current.loading).toBe(false);
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        })
    })
})