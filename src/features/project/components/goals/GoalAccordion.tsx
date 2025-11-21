import React from "react";
import {Goal} from "@/api/domain/projects/Goal";
import GoalAccordionDisplay from "@/features/project/components/goals/GoalAccordionDisplay";
import GoalAccordionEdit from "@/features/project/components/goals/GoalAccordionEdit";
import StepTable from "@/features/project/components/steps/StepTable";
import {Accordion, AccordionDetails} from "@mui/material";

export interface GoalAccordionItemProps {
    goal: Goal;
}

export default function GoalAccordion({goal}: GoalAccordionItemProps) {
    const [edit, setEdit] = React.useState(false);

    return (
        <Accordion key={goal.id}>
            {edit ? <GoalAccordionEdit goal={goal} setEdit={setEdit}/> :
                <GoalAccordionDisplay goal={goal} edit={edit} setEdit={setEdit}/>
            }
            <AccordionDetails>
                <StepTable goalId={goal.id} steps={goal.steps}/>
            </AccordionDetails>
        </Accordion>
    );
}