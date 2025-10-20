import {Button, Stack} from "react-bootstrap";
import {useState} from "react";

export default function Projects() {
    const [showProject, setShowProject] = useState(false);
    const [title, setTitle] = useState("");

    function saveProject() {
        // TODO
        setShowProject(false);
    }

    function createCategory() {

    }

    return (
        <>
            <Stack direction={"horizontal"} gap={4}>
                <Button
                    variant={"primary"}
                    className={"ms-auto"}
                    onClick={createCategory}
                >Create new category</Button>
                <Button
                    variant={"primary"}
                    onClick={() => setShowProject(true)}
                >Create a new task</Button>
            </Stack>


        </>
    );
};