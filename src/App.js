import { useEffect, useState } from 'react';
import { getEvents, extractLocations } from './api';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';



const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);

    try{
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
    allEvents :
    allEvents.filter(event => event.location === currentCity)

    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  } catch (error) {
    console.error('Error fetching data:', error);
    setError(true); // Set error state if fetching fails
  } finally {
    setLoading(false); // Set loading to false in both success and error cases
  }
  }

 useEffect(() => {
fetchData();
}, [currentCity, currentNOE]); 

return (
  <div className="App">
    <h1>Meet</h1>

    {/* Load while fetching */}
    {loading && <p>Content is loading... Please wait.</p>}
    {error && <p>Error loading events. Please try again later.</p>}
    {!loading && !error && (
      <>

    {/* Search bar */}
    <CitySearch 
    allLocations={allLocations} 
    setCurrentCity={setCurrentCity}/>

    {/* Events filter */}
    <NumberOfEvents
    setCurrentNOE={setCurrentNOE} />

    {/* Events */}
    <EventList 
    events={events}/>
      </>
    )}
  </div>
);
}

export default App;
