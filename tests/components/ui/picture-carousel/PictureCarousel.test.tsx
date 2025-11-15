import PictureCarousel from "../../../../src/components/ui/PictureCarousel";
import {render} from "@testing-library/react";

describe("Picture Carousel", () => {
    test("Should render correctly", () => {
        render(<PictureCarousel pictures={["", "", ""]}/>);
    })
})