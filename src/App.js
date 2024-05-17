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
  const [loading, setLoading] = useState('true');


  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
    allEvents :
    allEvents.filter(event => event.location === currentCity)

    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
    setLoading('false')
  }

  useEffect(() => {
    fetchData();
    setLoading('false')
}, []);

/* useEffect(() => {
fetchData();
}, [currentCity]); */

return (
  <div className="App">
      {loading ? (
          <div>Content is loading...</div>
      ):(
          <>
              <h1>Meet</h1>
              <CitySearch 
              allLocations={allLocations} 
              setCurrentCity={setCurrentCity}/>
              <NumberOfEvents />
              <EventList events={events}/>
          </>
      )}
  </div>
);
}

export default App;
