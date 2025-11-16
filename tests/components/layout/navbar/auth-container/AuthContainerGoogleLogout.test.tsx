import {render, screen} from "@testing-library/react";
import AuthContainerGoogleLogout from "@/components/layout/navbar/auth-container/AuthContainerGoogleLogout";
import userEvent from "@testing-library/user-event";
import {getAuth, signOut} from "firebase/auth";

describe("AuthContainerGoogleLogout", () => {
    it("renders without crashing", () => {
        // GIVEN
        const navigate = vi.fn();
        const dest = "/login";

        // WHEN
        render(<AuthContainerGoogleLogout navigate={navigate} destination={dest}/>);

        // THEN
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("authentication.signOut");
    })

    it("should redirect after logout", async () => {
        // GIVEN
        const user = userEvent.setup();
        const navigate = vi.fn();
        const dest = "/login";

        // WHEN
        render(<AuthContainerGoogleLogout navigate={navigate} destination={dest}/>);
        await user.click(screen.getByRole('button'));

        // THEN
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("authentication.signOut");

        expect(signOut).toHaveBeenCalledWith(getAuth());
        expect(navigate).toHaveBeenCalledWith(dest);
    });


})