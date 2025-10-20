import {auth} from "../config/firebase";
import {T} from "vitest/dist/chunks/global.d.MAmajcmJ";

export interface FetchOptions {
    headers: {},
    options: {}
}

export default class CrudRepository<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async findAll(): Promise<T[]> {
        const res = await apiFetch(this.endpoint, {
            headers: {},
            options: {
                method: 'GET',
            }
        });

        return await res as T[];
    }

    async findById(id: string): Promise<T> {
        const res = await apiFetch(`${this.endpoint}/${id}`, {
            headers: {},
            options: {
                method: 'GET',
            }
        });

        return await res as T;
    }

    async create(data: T): Promise<T> {
        const res = await apiFetch(`${this.endpoint}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            options: {
                method: 'PUT',
                body: JSON.stringify(data),
            }
        });

        return await res as T;
    }

    async update(id: string, data: T): Promise<T> {
        const res = await apiFetch(`${this.endpoint}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            options: {
                method: 'UPDATE',
                body: JSON.stringify(data),
            }
        });

        return await res as T;
    }

    async delete(id: string) {
        await apiFetch(`${this.endpoint}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            options: {
                method: 'DELETE',
            }
        });
    }
}

async function apiFetch(path: string, options: FetchOptions): Promise<any> {
    const res = await fetch(path, {
        ...options.options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: auth.currentUser ? `Bearer ${await auth.currentUser.getIdToken()}` : '',
            ...options.headers
        },
    })

    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

    return await res.json();
}
