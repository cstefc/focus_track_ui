import {render, screen} from "@testing-library/react";
import AuthChecker from "@/components/layout/auth/AuthChecker";
import useAuthCheck from "@/components/layout/auth/useAuthCheck";
import {vi} from "vitest";

const mockedUseAuthCheck = useAuthCheck as unknown as ReturnType<typeof vi.fn>;
vi.mock("@/components/layout/auth/useAuthCheck", () => ({
    default: vi.fn(),
}));

describe("AuthChecker", () => {
    it("does render spinner when loading", () => {
        // GIVEN
        mockedUseAuthCheck.mockReturnValue({user: null, loading: true});

        // WHEN
        render(<AuthChecker><p>This shouldn't be rendered</p></AuthChecker>);

        // THEN
        const spinner = screen.getByRole('progressbar')
        expect(spinner).toBeInTheDocument();
        const text = screen.queryByText("This shouldn't be rendered");
        expect(text).not.toBeInTheDocument();
    });

    it("does not render children when no user is found", () => {
        // GIVEN
        mockedUseAuthCheck.mockReturnValue({user: null, loading: false});

        // WHEN
        render(<AuthChecker><p>This shouldn't be rendered</p></AuthChecker>)

        // THEN
        const text = screen.queryByText("This shouldn't be rendered");
        expect(text).not.toBeInTheDocument();
    })

    it("does render children when user is found", () => {
        // GIVEN
        mockedUseAuthCheck.mockReturnValue({user: {name: "test"}, loading: false});

        // WHEN
        render(<AuthChecker>This should be rendered</AuthChecker>);

        // THEN
        const text = screen.getByText('This should be rendered');
        expect(text).toBeInTheDocument();
    })
})
