
const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setCurrentNOE(value);

        let infoText;
        if (isNaN(value) || value <= 0) {
            infoText = "Number invalid"
        } else {
            infoText = "";
            setCurrentNOE(value);
        }
        setErrorAlert(infoText);
    };

    return (
        <div id="number-of-events">
            <label htmlFor="number-of-events-input">Number of Events:</label>
            <input 
            type="text"
            defaultValue={32}
            onChange={handleInputChanged}
            data-testid="numberOfEventsInput"
            />
        </div>
    );
};

export default NumberOfEvents;