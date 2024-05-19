import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
    const [eventNumber, setEventNumber] = useState('32');

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setEventNumber(value);
        setCurrentNOE(value);
    };

    return (
        <div id="number-of-events">
            <p className="showonly">Show only:</p>
            <input 
            className="NOE"
            type="text"
            value={eventNumber}
            onChange={handleInputChanged}
            />
            <p className="showonlyevent">events</p>
        </div>
    );
};

export default NumberOfEvents;