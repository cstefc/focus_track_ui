import {getAuth} from "firebase/auth";

export async function getApi<T>(path: string) {
    const auth = getAuth();
    if (auth.currentUser) {
        try {
            const result = await fetch(`/api${path}`, {
                method: "GET",
                headers: {
                    Authorization: auth.currentUser ? `Bearer ${await auth.currentUser.getIdToken()}` : '',
                },
            })
            if (result.ok) return await result.json() as T;

        } catch (e) {
            console.error(e);
        }
    } else {
        console.error("Unauthorized");
    }
    return null;
}

export async function sendApi<T>(path: string, method: string, body: any) {
    const auth = getAuth();
    if (auth.currentUser) {
        try {
            const result = await fetch(`/api${path}`, {
                method: method.toUpperCase(),
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: auth.currentUser ? `Bearer ${await auth.currentUser.getIdToken()}` : '',
                },
            })
            if (result.ok) {
                return await result.json() as T;
            }
        } catch (e) {
            console.error(e);
        }

    } else {
        console.error("Unauthorized");
    }
    return null
}

export function deleteApi(path: string) {
    const auth = getAuth();
    if (auth.currentUser) {
        auth.currentUser.getIdToken().then(idToken => {
            void fetch(`/api${path}`, {
                method: "DELETE",
                headers: {
                    Authorization: auth.currentUser ? `Bearer ${idToken}` : '',
                },
            })
                .catch(e => console.error(e));
        })
            .catch(e => console.error(e));
    } else {
        console.error("Unauthorized");
    }
}

