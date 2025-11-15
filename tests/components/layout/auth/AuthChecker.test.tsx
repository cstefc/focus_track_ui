import {render, screen} from "@testing-library/react";
import AuthChecker from "@/components/layout/auth/AuthChecker";
import useAuthCheck from "@/components/layout/auth/useAuthCheck";
import {useNavigate} from "react-router-dom";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate, // replace navigate with spy
    };
});

vi.mock("@/components/layout/auth/useAuthCheck", () => ({
    default: vi.fn(),
}));

describe("AuthChecker", () => {
    it("does render spinner when loading", () => {
        // GIVEN
        useAuthCheck.mockReturnValue({user: null, loading: true});

        // WHEN
        render(<AuthChecker><p>This shouldn't be rendered</p></AuthChecker>);

        // THEN
        const spinner = screen.getByRole('status')
        expect(spinner).toBeInTheDocument();
        const text = screen.queryByText("This shouldn't be rendered");
        expect(text).not.toBeInTheDocument();
    });

    it("does not render children when no user is found", () => {
        // GIVEN
        useAuthCheck.mockReturnValue({user: null, loading: false});

        // WHEN
        render(<AuthChecker><p>This shouldn't be rendered</p></AuthChecker>)

        // THEN
        const text = screen.queryByText("This shouldn't be rendered");
        expect(text).not.toBeInTheDocument();
    })

    it("does render children when user is found", () => {
        // GIVEN
        useAuthCheck.mockReturnValue({user: {name: "test"}, loading: false});

        // WHEN
        render(<AuthChecker>This should be rendered</AuthChecker>);

        // THEN
        const text = screen.getByText('This should be rendered');
        expect(text).toBeInTheDocument();
    })
})
