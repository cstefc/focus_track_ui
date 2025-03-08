import {auth} from "../config/firebase";

export type ApiUser = {
    google_id: string;
    name: string;
    id: number;
}

export async function getUserId(): Promise<ApiUser | null> {
    let response = await fetch("/api/user", {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
    })
    if (!response.ok) {
        return null
    }
    return await response.json() as ApiUser
}

