import {Goal} from "@/api/domain/projects/Goal";
import GoalAccordionEdit from "@/features/project/components/goals/GoalAccordionEdit";
import GoalAccordionDisplay from "@/features/project/components/goals/GoalAccordionDisplay";
import {Accordion, AccordionDetails} from "@mui/material";
import StepTable from "@/features/project/components/steps/StepTable";
import React, {useState} from "react";

export interface GoalAccordionProps {
    goal: Goal;
    goals: Goal[];
    setGoals: (goals: Goal[]) => void;
}

export function GoalAccordion({goal, goals, setGoals}: GoalAccordionProps) {
    const [edit, setEdit] = useState(false)

    return (
        <Accordion key={goal.id}>
            {edit ? <GoalAccordionEdit goal={goal} goals={goals} setGoals={setGoals} setEdit={setEdit}/> :
                <GoalAccordionDisplay goal={goal} goals={goals} setGoals={setGoals} edit={edit} setEdit={setEdit}/>
            }
            <AccordionDetails>
                <StepTable goalId={goal.id}/>
            </AccordionDetails>
        </Accordion>
    )
}