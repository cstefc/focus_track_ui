import {Button, Container, Form, Modal} from "react-bootstrap";
import {CreateProject, CreateProjectForm} from "@/api/domain/projects/Project";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";
import api from "@/config/api";
import {JSX, useState} from "react";

export interface CreateModalProps {
    onSave: () => void;
    visible: boolean;
}

export default function CreateModal({onSave, visible}: CreateModalProps): JSX.Element {
    const {t} = useTranslation("projects");
    const [showCreateModal, setShowCreateModal] = useState(false);

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<CreateProject>({
        resolver: zodResolver(CreateProjectForm),
        defaultValues: {
            archived: false, // hidden default
        },
    });

    async function submitHandler(data: CreateProject) {
        setShowCreateModal(false);
        await api.project.create(data);
        onSave();
        reset();
    }

    return (
        <>
            <Container className={"d-flex justify-content-end align-items-end m-3"}>
                <Button
                    className={"ms-auto"}
                    style={{visibility: visible ? "visible" : "hidden"}}
                    variant={"primary"}
                    onClick={() => setShowCreateModal(true)}
                >
                    {t("button.createProject")}
                </Button>
            </Container>

            <Modal show={showCreateModal}>
                <Form onSubmit={handleSubmit(submitHandler)}>
                    <Modal.Header>
                        <Modal.Title>{t("create.title")}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group controlId="formTitle" className={"mb-2"}>
                            <Form.Label>{t("create.titleLabel")}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t("create.titlePlaceholder")}
                                {...register("title")}
                            />
                            {errors.title && <Form.Text className="text-danger">{errors.title.message}</Form.Text>}
                        </Form.Group>
                        <Form.Group controlId="formDescription" className={"mb-2"}>
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
            </Modal>
        </>
    );
}
