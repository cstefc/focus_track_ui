import Home from "../../../src/features/home/Home";
import {render, screen} from "@testing-library/react";

describe('Home', () => {
    it('renders correctly', () => {
        // GIVEN

        // WHEN
        render(<Home />);

        // THEN
        const pictures = screen.queryAllByRole('img');
        const cards = screen.queryAllByText(/cards\.[^.]*\.title/);

        expect(pictures.length >= 3).toBe(true);
        expect(cards).toHaveLength(3);
    })
})