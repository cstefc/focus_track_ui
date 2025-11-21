import {Step} from "@/api/domain/projects/Step";
import React from "react";
import {StepLineDisplay} from "@/features/project/components/steps/StepLineDisplay";
import {StepLineEdit} from "@/features/project/components/steps/StepLineEdit";

export interface StepLineProps {
    goalId: number;
    step: Step;
}

export const StepLine = ({goalId, step}: StepLineProps) => {
    const [editing, setEditing] = React.useState(false);

    return editing ? <StepLineEdit setEdit={setEditing} goalId={goalId} step={step}/>
                     : <StepLineDisplay setEdit={setEditing} step={step}/>
}