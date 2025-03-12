import {auth} from "../config/firebase";

export type ApiTask = {
    title: string;
    description: string;
    completed_time: string;
    user_id: null
    id: number;
}

export type CreateTask = {
    title: string;
    description: string;
    completed_time: string;
}

export async function createTask(task: CreateTask): Promise<ApiTask | null> {
    let response = await fetch("/api/task", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
        body: JSON.stringify(task),
    })

    if (!response.ok) {
        return null
    }
    return await response.json() as ApiTask
}

export async function getAllTasks(){
    let response = await fetch("/api/task/all", {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
    })

    if (!response.ok) {
        return null
    }
    return await response.json() as ApiTask[]
}

// TODO updateTask
export async function updateTask(task: ApiTask): Promise<ApiTask | null> {
    return null
}

// TODO delete task
export async function deleteTask(id: number): Promise<ApiTask | null> {
    return null
}

