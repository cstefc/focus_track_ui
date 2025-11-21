import AppBarLogo from "../../../../src/components/ui/navbar/logo/AppBarLogo";
import {render, screen} from "@testing-library/react";

describe("Navbar Logo", () => {
    it("renders correctly", () => {
        // GIVEN

        // WHEN
        render(<AppBarLogo destination={"/"} />);

        // THEN
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "/FocusTrackLogo_600x600.jpg");
        expect(image).toHaveAttribute("alt", "pictures.logoAltText");

        const name = screen.getByText("Focus Track");
        expect(name).toBeInTheDocument();
    })
})