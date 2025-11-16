import {getAuth} from "firebase/auth";

export interface FetchOptions {
    headers: {},
    arguments: {}
}

export default class CrudRepository<T, C, U> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async findAll(): Promise<T[]> {
        const res = await apiFetch(this.endpoint, {
            headers: {},
            arguments: {
                method: 'GET',
            }
        });

        return await res as T[];
    }

    async findById(id: string): Promise<T> {
        const res = await apiFetch(`${this.endpoint}/${id}`, {
            headers: {},
            arguments: {
                method: 'GET',
            }
        });

        return await res as T;
    }

    async create(data: C): Promise<T> {
        const res = await apiFetch(`${this.endpoint}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            arguments: {
                method: 'POST',
                body: JSON.stringify(data),
            }
        });

        return await res as T;
    }

    async update(id: string, data: U): Promise<T> {
        const res = await apiFetch(`${this.endpoint}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            arguments: {
                method: 'UPDATE',
                body: JSON.stringify(data),
            }
        });

        return await res as T;
    }

    async delete(id: string) {
        await apiFetch(`${this.endpoint}/${id}`, {
            headers: {},
            arguments: {
                method: 'DELETE',
            }
        });
    }
}

async function apiFetch(path: string, options: FetchOptions): Promise<any> {
    const auth = getAuth();
    if (auth.currentUser) {
        const res = await fetch(path, {
            ...options.arguments,
            headers: {
                Authorization: auth.currentUser ? `Bearer ${await auth.currentUser.getIdToken()}` : '',
                ...options.headers
            },
        })

        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return await res.json();
    } else {
        throw new Error('Unauthorized');
    }
}
