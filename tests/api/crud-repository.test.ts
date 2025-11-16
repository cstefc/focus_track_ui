import CrudRepository from "../../src/api/crud-repository";
import {fakeAuth, test_user} from "../setup";

interface testObject {
    item: string
}

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch);

describe('CrudRepository', () => {
    beforeEach(() => {
        fakeAuth.currentUser = test_user;
        mockFetch.mockReset();
    })

    test("findAll should return an array of types", async () => {
        // GIVEN
        const repo = new CrudRepository("/test");
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [{item: "item1"}, {item: "item2"}] as testObject[],
        });

        // WHEN
        const result = await repo.findAll();

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/test", {
            headers: {
                Authorization: "Bearer mock-token",
            },
            method: "GET",
        })
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(2);
    });

    test('findById should return an object', async () => {
        // GIVEN
        const repo = new CrudRepository("/test");
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({item: "item1"})
        });

        // WHEN
        const result = await repo.findById("1");

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/test/1", {
            headers: {
                Authorization: "Bearer mock-token",
            },
            method: "GET",
        })
        expect(result).toEqual({item: "item1"});
    })

    test("create sends correct data", async () => {
        // GIVEN
        const repo = new CrudRepository("/test");
        const data = {item: "new item"}
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({item: "returned from server"}),
        });

        // WHEN
        const result = await repo.create(data);

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/test", {
            headers: {
                Authorization: "Bearer mock-token",
                'Content-Type': "application/json",
            },
            method: "POST",
            body: JSON.stringify(data)
        });
        expect(result).toEqual({item: "returned from server"});
    })

    test("update sends correct data", async () => {
        // GIVEN
        const repo = new CrudRepository("/test");
        const data = {item: "new item"}
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({item: "returned from server"})
        });

        // WHEN
        const result = await repo.update("1", data)

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/test/1", {
            headers: {
                Authorization: "Bearer mock-token",
                "Content-Type": "application/json",
            },
            method: "UPDATE",
            body: JSON.stringify(data)
        })
        expect(result).toEqual({item: "returned from server"});
    })

    test("deletes uses correct data", async () => {
        // GIVEN
        const repo = new CrudRepository("/test");
        const id = "1";
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({})
        })

        // WHEN
        await repo.delete(id);

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/test/1", {
            headers: {
                Authorization: "Bearer mock-token",
            },
            method: "DELETE",
        })
    })

    test("repo throws error when not logged in", async () => {
        // GIVEN
        const repo = new CrudRepository("/test");
        fakeAuth.currentUser = null;

        // WHEN
        await expect(repo.findAll()).rejects.toBeInstanceOf(Error);

        // THEN
        expect(mockFetch).not.toHaveBeenCalled();
    })

    test("repo throws error when result not ok", async () => {
        // GIVEN
        const repo = new CrudRepository("/test");
        mockFetch.mockResolvedValueOnce({
            ok: false,
        })

        // WHEN
        await expect(repo.findAll()).rejects.toBeInstanceOf(Error);

        // THEN
        expect(mockFetch).toHaveBeenCalledWith("/test", {
            headers: {
                Authorization: "Bearer mock-token",
            },
            method: "GET",
        });

    })
})