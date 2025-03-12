import {auth} from "../config/firebase";

export interface ApiCategory{

}

export interface CreateCategory{
    name: string
    color: string
}

export async function createCategory(category: CreateCategory): Promise<ApiCategory | null> {
    let response = await fetch("/api/category", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
        body: JSON.stringify(category),
    })

    if (!response.ok) {
        return null
    }
    return await response.json() as ApiCategory
}

export async function getAllCategories(){
    let response = await fetch("/api/category/all", {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
    })

    if (!response.ok) {
        return null
    }
    return await response.json() as ApiCategory[]
}

// TODO updateTask
export async function updateCategory(task: ApiCategory): Promise<ApiCategory | null> {
    return null
}

// TODO delete task
export async function deleteCatagory(id: number): Promise<ApiCategory | null> {
    return null
}