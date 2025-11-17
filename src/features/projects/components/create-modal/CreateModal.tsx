import {Button, Container, Form, Modal} from "react-bootstrap";
import {CreateProject, CreateProjectForm} from "@/api/domain/projects/Project";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import api from "@/config/api";
import {useState} from "react";

export default function CreateModal() {
    const {t} = useTranslation("projects");
    const [showCreateModal, setShowCreateModal] = useState(false);

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<CreateProject>({
        resolver: zodResolver(CreateProjectForm),
    });

    async function submitHandler(data: CreateProject) {
        await api.project.create(data);
        reset()
        setShowCreateModal(false);
    }

    return (
        <>
            <Container className={"d-flex justify-content-end align-items-end"}>
                <Button
                    variant={"primary"}
                    className={"m-3"}
                    onClick={() => setShowCreateModal(true)}
                >
                    {t("button.createProject")}
                </Button>
            </Container>

            <Modal show={showCreateModal}>
                <Container>
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
                                onClick={() => setShowCreateModal(false)}
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
        </>
    );
}
