## TGC14-Project 1
To create an interactive map guide for tourists in Singapore.

## Summary/User objectives: 
To allow tourists to locate nearby hotels, eateries, hawkers, attractions from their current location and display real time taxi availability to locate nearby taxis.

## My goal/motivation for creating this project:
To provide tourists an one stop map guide for locations around Singapore.

## Context: 
Many of my overseas friends have commmented that Singapore is small and there is nothing to do here after a day. I created this map guide to encourage tourists to spend more time in Singapore and explore all the attractions and events despite the current COVID situation. Thus, in turn they will spend more and boost the local economy from tourism spending.

## Demo: 
A live website server can be found on the Gitpod server.

## Index:
1. Project Complexity Matrix 
2. UX/UI
3. Technologies used
4. Use cases/ Future features to implement
5. Known Bugs
6. Deployment
7. Credits and Acknoledgement

### Project Complexity Matrix 
| Feature/Item | Eligibility | Max Score Accorded
| ------ | ------ | ------ |
| Consume the GET endpoint of an API, or consume a CSV/JSON file | Consumed 4 GET API's and 2 geojson files (6 altogether) | 12 |
| Adding or removing DOM elements to the display (map, DOM tree, game screen) based on user's actions |Added 1. Search feature, 2. toggle hawker centres,taxi coordinates, all hotels feature, 3. Top 3 attractions feature, 4. Remove search results and remove eateries feature, 5. Slide information bar in and out feature | 20 |
| Modifying the CSS of DOM elements based on the user's actions | 1. Sliding in the information bar using transition and transform css, 2. Sliding out the information bar using transition and transform css, 3. Displaying the map and hiding the index( landing) page using css display= block or none, 4. Using css style display=block or nonoe for removing eateries and search results, 5. Using css style display for toggling taxi coordinates, 6. Using css style display for collapsing search results in info tab | 12 |
| Use of 1D traversal of array | 1. Use of loop to extract out hotels,taxi,eateries and search coordinates within a 2km radius of current location, 2. Use of transversal of array to extract out names, address, number of rooms, cateogories of hotels,eateries,hawkers and search coordinates, 3. Use of loop to extract out all the resturants within a clicked location of map using geocoding, 4. Use of transveral of array to extract out all taxi coordinates and match it with the address of the respective coordinates| 15 |
| Each use of CSS layout technique (Bootstrap columns, flex box, grid)| 1. Using bootstrap py, px, mt in my info-tab table, 2. Using a display flex on my Carousel home page to align the logo, buttons and items in it, 3. Using the position property: relative and absolute and z-index to allow the buttons and features to show up on top of map | 12 |
| Each possible search or filtering criteria in the user interface | 1. Use of a search bar to fiter keywords for recommendations, 2. Use of filtering feature to show all hotels within a 2km radius of current location, 3. Use of a filtering feature to show up all eateries within 1km of a clicked location on the map | 12 |
| Each case of the map updating based on the user's actions | 1. Use of a refresh of taxi API every 2 minutes to update their coordinates/ refresh of all eateries markers when the remove eateries button is clicked, 2. Use of a refresh of searched markers whether a new search is done, 3. Use of a refresh of markers of eateries of 1km radius whenever a new location is clicked on the map| 12 |
| Each group of layers in the Leaflet map | There are 1. hotels, 2. taxis, 3. hawkers, 4. Seached venues, 5. eateries, 6. Nearby accommodation layers | 20 |
| Each group of marker clustering | There are 1. Taxi marker clusters, 2. Hotel marker clusters, 3. Hawker marker clusters | 12 |
| Each type of custom marker (using images or custom behaviour) | There are 1. Taxi custom markers, 2. Hotel custom markers, 3. Search results custom markers, 4.Eateries custom markers, 5. Nearby accommodation custom markers, 6. MBS custom markers, 7. Universal studios custom markers, 8. RWS custom markers | 20 |

### Bonus Scoring
 Feature/Item | Eligibility | Max Score Accorded
| ------ | ------ | ------ |
| Each extra feature| 1) Use of geocoding to find address of any clicked location of map, 2) Use of css transform and transition to slide in and out the info bar, 3) Use of custom popups and images which link to booking websites, 4) Use of feature to locate and display current location, 5) Use of gecoding to display address of taxis according to their coordinates | 15 |
| Single Page Application |Use of a landing page to showcase the project and pressing on the 'Get started' button redirects the user to the interactive map | 15 | 

### UX/UI 
#### (i) Project Strategy
Based on the user's needs and objectives, these are the guidelines for the features that were implemented.
| User Stories| Features|
| ------ | ------ |
| User wants to locate current location on map| When starting the map, user can allow the device to locate current location and display user's current marker lcoation on map. |
| User wants to locate nearby accommodation from current location | Map displays all recommended accommodation locations with name,address and category of accommodation within a 2km radius from current user's location.|
| User wants to locate all hotels in Singapore| On the top right corner of the screen, User is able to toggle on and off the location, name, address and number of rooms of all hotels in Singapore.|
| User wants to locate all taxis in Singapore or around his current location| User is able to toggle on and off all avaliable taxis markers and their respective address name and also locate all taxis nearby his location. |
| User wants to locate all nearby eateries from any clicked location on map| User can double tap anywhere on map and all eateries within a 1km radius from tapped location will appear with their name, address and category of eatery.|
| User wants to search for a recommended category or place in Singapore.| User can enter in keywords in the search bar and all recommended venues containing the keywords will appear in the search results. Clicking on the results will bring the user to the location on the map and why it is recommended.|
|User wants to explore the top 3 attractions in Singapore| Clicking on the top 3 attractions button on the right side of the map will bring down a drop-bar with the top 3 attractions based on traveller visits on Google. The popup will show a description and image of each attraction and clicking on the image will bring the user to the ticket booking of that attraction.|
| User wants to locate all the hawkers centers| Map has a toogle button to show all hawker center locations and ones that are nearby to the user.|
| User wants to slide the info bar away| There is a toggle button on the bottom right of the screen to allow the user to slide the infobar in and out of the screen to allow for more viewing of the map.|

#### (ii) Project Scope
The project skeleton and structure (wireframes) can be found [here.](https:) 
#### (iii) Design
The bootstrap plugin was used in for the front-end development of the website as it allows for better visual design of buttons, an information tab and also an easy grid layout. 
The general design of the website comprises a search bar as one of the main features and an information table which display the search results which is easy to read and navigate. There are tabs beside the search result tab for easy access to display the taxi markers and hawker center markers on the map.  
The colour palette consist of a green search button which colour is universally associated with success(success in finding a location). The information tab is light purple as it is visually pleasing and not too glaring. I choose the search result text colour to be white against a grey background as it is easy to be read. The markers are typically a darker colour as it is more visible on a light background on the map. The attractions button is red in colour as it directs attention to the user to notice it. The layout of the webpage is not overly complex and easy to use. Custom markers were created according to the classification of the location and to enhance the visual experience of users. Font size is relatively large and easy to read.
For a better user experience for mobile devices, I repositioned the buttons so that will not block the viewing of the map and its features and there is a toggle button to allow the infobar to slide out so that it will not block the features displayed on the map. 