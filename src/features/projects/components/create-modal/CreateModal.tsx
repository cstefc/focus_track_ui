import {Button, Container, Form, Modal} from "react-bootstrap";
import {CreateProject, CreateProjectForm} from "@/api/domain/projects/Project";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";


export interface ProjectModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: (data: CreateProject) => void;
}

export default function CreateModal({show, onClose, onSubmit}: ProjectModalProps) {
    const {t} = useTranslation("projects");

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
                    <Modal.Title>{t("create.title")}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit(submitHandler)}>
                    <Modal.Body>
                        <Form.Group controlId="formTitle">
                            <Form.Label>{t("create.titleLabel")}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t("create.titlePlaceholder")} {...register("name")}
                            />
                            {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>{t("create.descriptionLabel")}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t("create.descriptionPlaceholder")} {...register("description")}
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
                        >{t("button.cancel")}</Button>

                        <Button
                            type={"submit"}
                            variant={"primary"}
                            disabled={isSubmitting}
                        >{t("button.save")}</Button>
                    </Modal.Footer>
                </Form>
            </Container>
        </Modal>
    );
}
