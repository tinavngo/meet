import { useEffect, useState } from 'react';
import { getEvents, extractLocations } from './api';
import CitySearch from './components/CitySearch';
import CityEventsChart from './components/CityEventsChart';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import './App.css';



const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningError] = useState("");


  const fetchData = async () => {

    const allEvents = await getEvents();
    let filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    // Check to see if there are events and allEvents count
    if (currentNOE && currentNOE < filteredEvents.length) {
      filteredEvents = filteredEvents.slice(0, currentNOE)
    }
    setEvents(filteredEvents.slice(0, currentNOE));

    setAllLocations(extractLocations(allEvents));
  }

  useEffect(() => {
    if (navigator.onLine) {
      setWarningError('');
    } else {
      setWarningError('You are currently offline, events are loaded from cache!');
    }
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <h1>Meet</h1>

      {/* Alerts */}
      <div className='alerts-container'>
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
      </div>
      {/* Search bar */}
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert}/>

      {/* Events filter */}
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />

      {/* CityEventsChart */}
      <CityEventsChart allLocations={allLocations} events={events}/>

      {/* Events */}
      <EventList events={events} />

    </div>
  );
}

export default App;
