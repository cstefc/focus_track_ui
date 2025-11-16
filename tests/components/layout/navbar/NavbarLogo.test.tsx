import NavbarLogo from "@/components/layout/navbar/NavbarLogo";
import {render, screen} from "@testing-library/react";

describe("Navbar Logo", () => {
    it("renders correctly", () => {
        // GIVEN

        // WHEN
        render(<NavbarLogo destination={"/"} />);
        screen.debug();

        // THEN
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "/FocusTrackLogo_600x600.jpg");
        expect(image).toHaveAttribute("alt", "pictures.logoAltText");

        const name = screen.getByText("Focus Track");
        expect(name).toBeInTheDocument();
    })
})