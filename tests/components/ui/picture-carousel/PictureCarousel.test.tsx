import PictureCarousel from "../../../../src/components/ui/PictureCarousel";
import {render, screen} from "@testing-library/react";

describe("Picture Carousel", () => {

    test("Should render correctly", () => {
        // GIVEN
        const sources = ["source1", "source2"];

        // WHEN
        render(<PictureCarousel pictures={sources}/>);
        screen.debug()

        // THEN
        const images = screen.getAllByRole('img');
        expect(images.length).toBe(2);
        expect(images[0]).toHaveAttribute("src", "source1");
        expect(images[1]).toHaveAttribute("src", "source2");
    })
})