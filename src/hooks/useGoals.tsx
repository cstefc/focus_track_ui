import {useGetApi} from "@/hooks/useGetApi";
import {CreateGoal, Goal, UpdateGoal} from "@/api/domain/projects/Goal";
import {useEffect, useState} from "react";
import {deleteApi, sendApi} from "@/api/apiCall";

export default function useGoals(projectId: string) {
    const {data, loading} = useGetApi<Goal[]>(`/goals?id=${projectId}`);
    const [goals, setGoals] = useState<Goal[]>([])

    useEffect(() => {
        if (data) setGoals(data);
    }, [data])

    async function createGoal(goalData: CreateGoal) {
        const result = await sendApi<Goal>("/goals", "POST", goalData)
        if (result) setGoals([...goals, result])
    }

    async function updateGoal(updateGoal: UpdateGoal) {
        const goal = await sendApi<Goal>("/goals", "PUT", updateGoal)
        if (goal) setGoals(goals.map(g => g.id !== goal.id ? g : goal));
    }

    async function deleteGoal(id: number) {
        void deleteApi('/goals?id=' + id);
        setGoals(goals.filter(g => g.id !== id));
    }

    return {loading, goals, createGoal, updateGoal, deleteGoal}
}