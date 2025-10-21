import {Button, Container, Form, Modal} from "react-bootstrap";
import {CreateProject, CreateProjectForm, Project} from "../../api/domain/projects/Project";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


export interface ProjectModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: CreateProject) => void;
}

export default function ProjectModal({show, onClose, onSubmit}: ProjectModalProps) {
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<CreateProject>({
        resolver: zodResolver(CreateProjectForm),
    });

    async function submitHandler(data: CreateProject) {
        await onSubmit(data);
        reset()
        onClose()
    }

    return (
        <Modal show={show}>
            <Container className={"bg-dark text-light"}>
                <Modal.Header>
                    <Modal.Title>Create a new project</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(submitHandler)}>
                    <Modal.Body>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter a title" {...register("name")}
                            />
                            {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter a title" {...register("description")}
                            />
                        </Form.Group>
                        {errors.description &&
                            <Form.Text className="text-danger">{errors.description.message}</Form.Text>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={onClose}
                            variant={"secondary"}
                            disabled={isSubmitting}
                        >Cancel</Button>

                        <Button
                            type={"submit"}
                            variant={"primary"}
                            disabled={isSubmitting}
                        >Save</Button>
                    </Modal.Footer>
                </Form>
            </Container>
        </Modal>
    );
}
