import { render, within, waitFor, screen } from '@testing-library/react';
import { getEvents } from '../api';
import App from "../App";
import EventList from '../components/EventList';


describe('<EventList /> component', () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  })

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
      EventListComponent.rerender(<EventList events={allEvents} />);
      expect(EventListComponent.getAllByRole('listitem')).toHaveLength(allEvents.length);
  });

  test('has an element with "list" role', () => {
    expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
  });

  test('renders correct number of events', async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole('listitem')).toHaveLength(allEvents.length);
  });

});

// Integration testing
describe('<EventList /> integration', () => { // fix eventlist rendering before app component
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    render(<App />);
    const EventListDOM = await waitFor(() => screen.getByRole('list', { id: 'event-list' }));
    const EventListItems = within(EventListDOM).queryAllByRole('listitem');
    expect(EventListItems.length).toBe(32);
  });
});
