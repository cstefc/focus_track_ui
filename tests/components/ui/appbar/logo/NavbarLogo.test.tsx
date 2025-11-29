import AppBarLogo from "@/components/ui/appbar/logo/AppBarLogo";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {mockNavigate} from "../../../../setup";

describe("Navbar Logo", () => {
    it("should renders correctly", () => {
        // GIVEN

        // WHEN
        render(<AppBarLogo/>);

        // THEN
        const name = screen.getByText("Focus Track");
        expect(name).toBeInTheDocument();
    })

    it("should navigate when clicked", async () => {
        // GIVEN
        const user = userEvent.setup()

        // WHEN
        render(<AppBarLogo/>)
        await user.click(screen.getByText("Focus Track"))

        // THEN
        expect(mockNavigate).toHaveBeenCalledWith("/");

    })
})