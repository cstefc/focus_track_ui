import {fakeAuth, test_user} from "../setup";
import {deleteApi, getApi, sendApi} from "../../src/api/apiCall";

interface testObject {
    item: string
}

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch);

describe('Api methods', () => {
    beforeEach(() => {
        fakeAuth.currentUser = test_user;
        mockFetch.mockReset();
    })

    test("getApi should send GET request", async () => {
        // GIVEN
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [{item: "item1"}, {item: "item2"}] as testObject[],
        });

        // WHEN
        const result = await getApi<testObject>('/test');

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/api/test", {
            headers: {
                Authorization: "Bearer mock-token",
            },
            method: "GET",
        })
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(2);
    });

    test("sendApi sends correct create data", async () => {
        // GIVEN
        const data = {item: "new item"}
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({item: "returned from server"}),
        });

        // WHEN
        const result = await sendApi<testObject>('/test', "POST", data);

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/api/test", {
            headers: {
                Authorization: "Bearer mock-token",
                'Content-Type': "application/json",
            },
            method: "POST",
            body: JSON.stringify(data)
        });
        expect(result).toEqual({item: "returned from server"});
    })

    test("sendApi sends correct update data", async () => {
        // GIVEN
        const data = {item: "new item"}
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({item: "returned from server"})
        });

        // WHEN
        const result = await sendApi("/test", "PUT", data);

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/api/test", {
            headers: {
                Authorization: "Bearer mock-token",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data)
        })
        expect(result).toEqual({item: "returned from server"});
    })

    test("deletes uses correct data", async () => {
        // GIVEN
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({})
        })

        // WHEN
        await deleteApi("/test?id=1"); // Await needed for test

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/api/test?id=1", {
            headers: {
                Authorization: "Bearer mock-token",
            },
            method: "DELETE",
        })
    })

    test("getApi returns null when not logged in", async () => {
        // GIVEN
        fakeAuth.currentUser = null;

        // WHEN
        const result = await getApi('/test');

        // THEN
        expect(mockFetch).not.toHaveBeenCalled();
        expect(result).toBeNull();
    })

    test("getApi returns null when result not ok", async () => {
        // GIVEN
        mockFetch.mockResolvedValueOnce({
            ok: false,
        })

        // WHEN
        const result = await getApi("/test");

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/api/test", {
            headers: {
                Authorization: "Bearer mock-token",
            },
            method: "GET",
        });
        expect(result).toBeNull();

    })

    test("sendApi returns null when not logged in", async () => {
        // GIVEN
        fakeAuth.currentUser = null;

        // WHEN
        const result = await sendApi('/test', "PUT", {});

        // THEN
        expect(mockFetch).not.toHaveBeenCalled();
        expect(result).toBeNull();

    })

    test("sendApi returns null when result not ok", async () => {
        // GIVEN
        mockFetch.mockResolvedValueOnce({
            ok: false,
        })

        // WHEN
        const result = await sendApi("/test", "PUT", {});

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/api/test", {
            body: "{}",
            headers: {
                Authorization: "Bearer mock-token",
                "Content-Type": "application/json",
            },
            method: "PUT",
        });
        expect(result).toBeNull();
    })
})