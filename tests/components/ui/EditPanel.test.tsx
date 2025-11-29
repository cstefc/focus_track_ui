import {render, screen} from "@testing-library/react";
import EditPanel from "../../../src/components/ui/EditPanel";
import userEvent from "@testing-library/user-event";

describe("Edit Panel", () => {
    it("should render correctly without archive", () => {
        // GIVEN

        // WHEN
        render(<EditPanel handleSave={() => {}}/>)

        // THEN
        const deleteButton = screen.queryByTestId("DeleteOutlineIcon");
        const archiveButton = screen.queryByTestId("ArchiveOutlinedIcon");
        const checkButton = screen.queryByTestId("CheckIcon");
        const cancelButton = screen.queryByTestId("CancelIcon");

        expect(deleteButton).toBeInTheDocument();
        expect(archiveButton).not.toBeInTheDocument();
        expect(checkButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it("should render correctly with archive", () => {
        // GIVEN

        // WHEN
        render(<EditPanel handleSave={() => {}} handleArchive={() => {}}/>)

        // THEN
        const deleteButton = screen.queryByTestId("DeleteOutlineIcon");
        const archiveButton = screen.queryByTestId("ArchiveOutlinedIcon");
        const checkButton = screen.queryByTestId("CheckIcon");
        const cancelButton = screen.queryByTestId("CancelIcon");

        expect(deleteButton).toBeInTheDocument();
        expect(archiveButton).toBeInTheDocument();
        expect(checkButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it("should call save handler", async () => {
        // GIVEN
        const user = userEvent.setup();
        const saveMock = vi.fn();

        // WHEN
        render(<EditPanel handleSave={saveMock}/>)
        const saveButton = screen.getByTestId("CheckIcon");
        await user.click(saveButton);

        // THEN
        expect(saveMock).toHaveBeenCalled()
    });

    it("should call delete handler", async () => {
        // GIVEN
        const user = userEvent.setup();
        const deleteMock = vi.fn();

        // WHEN
        render(<EditPanel handleSave={() => {}} handleDelete={deleteMock}/>)
        const deleteButton = screen.getByTestId("DeleteOutlineIcon");
        await user.click(deleteButton);
        await user.click(screen.getByText("button.save"));

        // THEN
        expect(deleteMock).toHaveBeenCalled()
    });

    it("should call archive handler", async () => {
        // GIVEN
        const user = userEvent.setup();
        const archiveMock = vi.fn();

        // WHEN
        render(<EditPanel handleSave={() => {}} handleArchive={archiveMock}/>)
        const archiveButton = screen.getByTestId("ArchiveOutlinedIcon");
        await user.click(archiveButton);
        await user.click(screen.getByText("button.save"));

        // THEN
        expect(archiveMock).toHaveBeenCalled()
    });

    it("should call cancel handler", async () => {
        // GIVEN
        const user = userEvent.setup();
        const cancelMock = vi.fn();

        // WHEN
        render(<EditPanel handleSave={() => {}} handleCancel={cancelMock}/>)
        const cancelButton = screen.getByTestId("CancelIcon");
        await user.click(cancelButton);

        // THEN
        expect(cancelMock).toHaveBeenCalled()
    });
})
