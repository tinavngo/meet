// Checks whether the CitySearch component contains a textbox or not
import { render } from '@testing-library/react';
import CitySearch from '../components/CitySearch';
import userEvent from '@testing-library/user-event';

describe('<CitySearch /> component', () => {
    test('renders text input', () => {
        const CitySearchComponent = render(<CitySearch />);
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        const CitySearchComponent = render(<CitySearch />);
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument(); // When CitySearchComponent is rendered, do not show suggestions list by default
    });

    test('renders a list of suggestions when a city textbox gains focus', async () => {
        const CitySearchComponent = render(<CitySearch />);
        const user = userEvent.setup();
        const cityTextBox = CitySearchComponent.queryByRole('textbox'); // What the user clicks
        await user.click(cityTextBox); // User clicks here
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument(); // When user clicks on CitySearchComponent, show suggestion list
        expect(suggestionList).toHaveClass('suggestions');
    });
});