## **Meet App**

## Serverless functions
The Meet app uses serverless functions which comes from handling requests from the Google Calendar API. Users are able to authorize with the Google OAuth Provider which grants them access to the Google Calendar API. The chosen cloud-service provider for this app is AWS Lambda which will be efficient in areas of scalability, cost and back-end maintenence.

## Features & Scenarios
### Feature: Filter Events By City
As a user, I should be able to filter events by city, so that I can see a list of events taking place in that city.

SCENARIO 1: When the user hasn't searched for a city, show upcoming events from all cities. 
 - **Given** The events app is open;
 - **When** User sees list of upcoming events from all cities; 
 - **Then** Upcoming events are displayed with the city

SCENARIO 2: User is able to see list of suggestions when they search for a city.
 - **Given** The events app is open;
 - **When** User types in the search bar for cities;
 - **Then** App displays relevant cities to what the user has typed

SCENARIO 3: User is able to filter through number of events shown
 - **Given** The events app is open;
 - **When** User types/selects a number in the filter bar
 - **Then** Number of events shown is limited to the number that user has put.

SCENARIO 4: User selects a city from suggestions list
 - **Given** User typed a specific city in the search bar with suggestions list present;
 - **When** User selects city from list of suggestions;
 - **Then** Filter list of events located within selected city.

### Feature: Show/Hide Event Details
As a user, I should be able to show and hide event details, so that I can get more details on an event that is requested by me

SCENARIO 1: All events details are hidden by default
 - **Given** The events app is open;
 - **When** User views list of upcoming events;
 - **Then** Event details are collapsed

SCENARIO 2: User selects a button to reveal event details
 - **Given** The event app is open;
 - **When** User clicks a button to reveal event details;
 - **Then** App displays event details for selected event

SCENARIO 3: User selects a button to hide event details
 - **Given** App displays event details for selected event;
 - **When** User clicks button to hide event details;
 - **Then** App collapse event details for selected event

### Feature: Specify Number of Events
As a user, I should be able to specify the number of events displayed, so that I can decide how much is visible.

SCENARIO 1: Show 32 events by default when user has not specified number
 - **Given** Events are rendered on the events app;
 - **When** The user has not specified a number;
 - **Then** 32 events are shown by default

 SCENARIO 2: User can change the number of events displayed
 - **Given** Events are rendered on the events app;
 - **When** The user has specified a number;
 - **Then** The app will show the amount of events the user has specified

### Feature: Use App Offline
As a user, I should be able to use the application when I am offline, so that I can use the app when I don't have access to the internet.

SCENARIO 1: User is able to navigate app without internet
 - **Given** The user is offline;
 - **When** User interacts with the app;
 - **Then** App still provides functionalities without internet

SCENARIO 2: User is able to download information for offline use
 - **Given** User is online;
 - **When** User downloads a selected event;
 - **Then** App stores data of selected event for offline usage


### Feature: Add an App Shortcut 
As a use, I should be able to add a shortcut of the app to my homescreen, so that I would not need to open the browser to access the app.

SCENARIO 1: User is able to access and navigate app from home screen
 - **Given** App is installed on user's device;
 - **When** The user adds an app shrotcut to the homescreen;
 - **Then** User is able to open app with the shortcut

### Feature: Visualization Chart
As a user, I should be able to see charts visualizing event details, so that I can quickly see what kind of events there are.

SCENARIO 1: User sees chart with data regarding what types of events are taken place through available cities
 - **Given** The events app is open;
 - **When** The user navigates through app;
 - **Then** App displays visual of events for all cities or filtered cities


