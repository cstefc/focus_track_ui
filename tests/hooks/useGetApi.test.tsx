import {Mock, vi} from "vitest";
import {renderHook, waitFor} from "@testing-library/react";
import {useGetApi} from "../../src/hooks/useGetApi";
import {getApi} from "../../src/api/apiCall";

vi.mock("@/api/apiCall", () => ({
    getApi: vi.fn(),
}));

describe("useGetApi", async () => {
    it("should call getApi correctly", async () => {

        // GIVEN
        const mockData = {value: "test value"};
        (getApi<{ value: string }> as Mock).mockResolvedValue(mockData);

        // WHEN
        const {result} = renderHook(() => useGetApi("/test"));

        // THEN initial state
        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeUndefined();

        // THEN after async API resolves
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        })
        expect(result.current.data).toEqual(mockData);

        // API was called
        expect(getApi).toHaveBeenCalledWith("/test");
        expect(getApi).toHaveBeenCalledTimes(1);
    });
})
