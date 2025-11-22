import {Step} from "@/api/domain/projects/Step";
import React from "react";
import {StepLineDisplay} from "@/features/project/components/steps/StepLineDisplay";
import {StepLineEdit} from "@/features/project/components/steps/StepLineEdit";

export interface StepLineProps {
    goalId: number;
    step: Step;
    steps: Step[];
    setSteps: (steps: Step[]) => void;
}

export const StepLine = ({step, steps, setSteps}: StepLineProps) => {
    const [editing, setEditing] = React.useState(false);

    return editing ? <StepLineEdit setEdit={setEditing} step={step} steps={steps} setSteps={setSteps}/>
                     : <StepLineDisplay setEdit={setEditing} step={step} steps={steps} setSteps={setSteps}/>
}