const NumberOfEvents = ({setCurrentNOE}) => {

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setCurrentNOE(value);
    };

    return (
        <div id="number-of-events">
            <label htmlFor="number-of-events-input">Only show:</label>
            <input 
            type="text"
            defaultValue={32}
            onChange={handleInputChanged}
            data-testid="numberOfEventsInput"
            />
            <label htmlFor="number-of-events-input">events</label>
        </div>
    );
};

export default NumberOfEvents;