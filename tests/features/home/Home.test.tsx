import Home from "../../../src/features/home/Home";
import {render, screen} from "@testing-library/react";

describe('Home', () => {
    it('renders correctly', () => {
        // GIVEN

        // WHEN
        render(<Home />);

        // THEN
        const picture = screen.queryByRole('img');
        expect(picture).toBeInTheDocument();

        const cards = screen.queryAllByText(/cards\.[^.]*\.title/);
        expect(cards).toHaveLength(3);
    })
})