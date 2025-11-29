import {useEffect, useState} from "react";
import {CreateStep, Step, UpdateStep} from "@/api/domain/projects/Step";
import {useGetApi} from "@/hooks/useGetApi";
import {deleteApi, sendApi} from "@/api/apiCall";

export default function useSteps(goalId: number) {
    const [steps, setSteps] = useState<Step[]>([]);
    const {data, loading} = useGetApi<Step[]>("/steps?id=" + goalId);

    useEffect(() => {
        if (data) setSteps(data)
    }, [data]);

    async function createStep(createData: CreateStep) {
        const result = await sendApi<Step>("/steps", "POST", createData);
        if (result) setSteps([...steps, result]);
    }

    async function updateStep(data: UpdateStep) {
        const result = await sendApi<Step>("/steps", "PUT", data);
        if (result) setSteps(steps.map(s => s.id !== data.id ? s : result));
    }

    function deleteStep(id: number) {
        void deleteApi("/steps?id=" + id);
        const newSteps = (steps.filter(s => s.id !== id));
        for (let i = 0; i < newSteps.length; i++) {
            newSteps[i].sequence = i + 1;
        }
        setSteps(newSteps);
    }

    return {loading, steps, createStep, updateStep, deleteStep};
}