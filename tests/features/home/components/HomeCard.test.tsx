import HomeCard from "@/features/home/components/HomeCard";
import {render, screen} from "@testing-library/react";

describe('HomeCard', () => {
    test('should render correctly', () => {
        // GIVEN
        const card_name = "testCard";

        // WHEN
        render(<HomeCard card={card_name} />);

        // THEN
        const title = screen.getByText(`cards.${card_name}.title`);
        const text = screen.getByText(`cards.${card_name}.text`);

        expect(title).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    })
})