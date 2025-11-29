import {Step, UpdateStep} from "@/api/domain/projects/Step";
import React from "react";
import {StepLineDisplay} from "@/features/project/components/steps/StepLineDisplay";
import {StepLineEdit} from "@/features/project/components/steps/StepLineEdit";

export interface StepLineProps {
    goalId: number;
    step: Step;
    onUpdate: (date: UpdateStep) => void;
    onDelete: (id: number) => void;
}

export const StepLine = ({step, onUpdate, onDelete}: StepLineProps) => {
    const [editing, setEditing] = React.useState(false);


    async function handleSubmit(data: UpdateStep) {
        setEditing(false);
        onUpdate(data);
    }

    function handleDelete(id: number) {
        setEditing(false);
        onDelete(id)
    }


    function cancelHandler(): void {
        setEditing(false);
    }

    return editing ? <StepLineEdit step={step} submitHandler={handleSubmit} cancelHandler={cancelHandler}/>
                     : <StepLineDisplay setEdit={setEditing} step={step} deleteHandler={handleDelete}/>
}