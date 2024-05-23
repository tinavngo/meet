// Checks whether the CitySearch component contains a textbox or not
import { render, within, waitFor } from '@testing-library/react';
import { extractLocations, getEvents } from '../api';
import CitySearch from '../components/CitySearch';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={[]} />);
    });

    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');

        // When CitySearchComponent is rendered, do not show suggestions list by default
        expect(suggestionList).not.toBeInTheDocument(); 
    });

    test('renders a list of suggestions when a city textbox gains focus', async () => {
        const user = userEvent.setup();

        // Query cityTextBox
        const cityTextBox = CitySearchComponent.queryByRole('textbox'); 

        // Simulate user clicking textbox
        await user.click(cityTextBox); 
        const suggestionList = CitySearchComponent.queryByRole('list');

        // When user clicks on CitySearchComponent, show suggestion list
        expect(suggestionList).toBeInTheDocument(); 
        expect(suggestionList).toHaveClass('suggestions');
    });
    
    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
    
        // user types "Berlin" in city textbox
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");
    
        // filter allLocations to locations matching "Berlin"
        const suggestions = allLocations? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
        }): [];
    
        // get all <li> elements inside the suggestion list
        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');

        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i ++ ) {
          expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
      });

    test('renders the suggestion test in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch 
            allLocations={allLocations}
            setCurrentCity={() => { }} />);
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");

        // the suggestion's textContent look like this: "Berlin, Germany"
        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem') [0];

        // Simulate user clicking on suggestion
        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});

// Integration testing
describe('<CitySearch /> integration', () => {

    test('renders suggestions list when the app is rendered.', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        // Ensure cityTextBox is correctly queried
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');

        // Simulate user clicking on the texbox
        await user.click(cityTextBox);

        // Fetch events and locations
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        // Wait for suggestions to be rendered
        await waitFor(() => {
        const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
        expect(suggestionListItems.length).toBe(allLocations.length + 1);
        });
    });
});