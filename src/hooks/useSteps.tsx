import {useEffect, useState} from "react";
import {CreateStep, Step, UpdateStep} from "@/api/domain/projects/Step";
import {useGetApi} from "@/hooks/useGetApi";
import {deleteApi, sendApi} from "@/api/apiCall";

export default function useSteps(goalId: number) {
    const [steps, setSteps] = useState<Step[]>([]);
    const {data, loading} = useGetApi<Step[]>("/steps?id=" + goalId);

    useEffect(() => {
        // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
        if (data) setSteps(data)
    }, [loading]);

    async function createStep(createData: CreateStep) {
        const result = await sendApi<Step>("/steps", "POST", JSON.stringify(createData));
        if (result) setSteps([...steps, result]);
    }

    async function updateStep(data: UpdateStep) {
        const result = await sendApi<Step>("/steps", "PUT", JSON.stringify(data));
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