import { useEffect, useState } from 'react';
import { getEvents, extractLocations } from './api';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';



const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  useEffect(() => {
    fetchData();
  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <CitySearch />
      <EventList events={events}/>
      <NumberOfEvents />
    </div>
  );
}

export default App;
