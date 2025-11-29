import AuthContainerGoogleLogin from "@/components/ui/appbar/auth-container/AuthContainerGoogleLogin";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AuthContainerGoogleLogin Component", () => {
    it("should render without crashing", () => {
        // GIVEN

        // WHEN
        render(<AuthContainerGoogleLogin hidden={false} handleLogin={() => {
        }}/>);

        // THEN
        const link = screen.getByText("authentication.google.signIn");
        expect(link).toBeInTheDocument();

        const logo = screen.getByRole('img');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("alt", "Google Logo");
        expect(logo).toHaveAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg");
    });

    it("should not render when hidden", async () => {
        // GIVEN

        // WHEN
        render(<AuthContainerGoogleLogin hidden={true} handleLogin={() => {
        }}/>)

        // THEN
        const link = screen.queryByText("authentication.google.signIn");
        expect(link).not.toBeInTheDocument();
    });

    it("should call login handler", async () => {
        // GIVEN
        const user = userEvent.setup()
        const loginMock = vi.fn();

        // WHEN
        render(<AuthContainerGoogleLogin hidden={false} handleLogin={loginMock}/>)
        await user.click(screen.getByText('authentication.google.signIn'));

        // THEN
        expect(loginMock).toHaveBeenCalled();
    });
})