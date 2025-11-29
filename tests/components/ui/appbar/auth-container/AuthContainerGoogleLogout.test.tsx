import {render, screen} from "@testing-library/react";
import AuthContainerGoogleLogout from "@/components/ui/appbar/auth-container/AuthContainerGoogleLogout";
import userEvent from "@testing-library/user-event";

describe("AuthContainerGoogleLogout", () => {
    it("renders without crashing", () => {
        // GIVEN

        // WHEN
        render(<AuthContainerGoogleLogout hidden={false} handleLogout={() => {}}/>);

        // THEN
        const button = screen.queryByText('authentication.signOut');
        expect(button).toBeInTheDocument();
    })

    it("should not be rendered when hidden", async () => {
        // GIVEN

        // WHEN
        render(<AuthContainerGoogleLogout hidden={true} handleLogout={() => {} } />);

        // THEN
        const button = screen.queryByText('authentication.signOut');
        expect(button).not.toBeInTheDocument();
    });

    it("should call the handleLogout function when clicked", async () => {
        // GIVEN
        const user = userEvent.setup();
        const logoutMock = vi.fn();

        // WHEN
        render(<AuthContainerGoogleLogout hidden={false} handleLogout={logoutMock} />);
        await user.click(screen.getByText("authentication.signOut"));

        // THEN
        expect(logoutMock).toHaveBeenCalled();
    })


})