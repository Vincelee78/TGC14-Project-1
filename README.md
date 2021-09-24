## TGC14-Project 1
To create an interactive map guide for tourists in Singapore.

## Summary: 
To allow tourists to locate nearby hotels, eateries, hawkers, attractions from their current location and display real time taxi availability.

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

#### Project Complexity Matrix 
| Feature/Item | Eligibility | Max Score Eligible
| ------ | ------ | ------ |
| Consume the GET endpoint of an API, or consume a CSV/JSON file | Consumed 4 GET API's and 2 geojson files (6 altogether) | 12 |
| Adding or removing DOM elements to the display (map, DOM tree, game screen) based on user's actions |Added 1.Search feature, 2. toggle hawker centres,taxi coordinates, all hotels feature, 3) Top 3 attractions feature, 4)Remove search results and remove eateries feature, 5) Slide information bar in and out feature | 20 |
| Modifying the CSS of DOM elements based on the user's actions | 1) Sliding in the information bar using transition and transform css, 2) Sliding out the information bar using transition and transform css, 3) Displaying the map and hiding the index( landing) page using css display= block or none, 4) Using css style display=block or nonoe for removing eateries and search results, 5) Using css style display for toggling taxi coordinates, 6) Using css style display for collapsing search results in info tab | 12 |
| Use of 1D traversal of array | 1) Use of loop to extract out hotels,taxi,eateries and search coordinates within a 2km radius of current location, 2)Use of transversal of array to extract out names, address, number of rooms, cateogories of hotels,eateries,hawkers and search coordinates, 3) Use of loop to extract out all the resturants within a clicked location of map using geocoding, 4) Use of transveral of array to extract out all taxi coordinates and match it with the address of the respective coordinates| 15 |
| Each use of CSS layout technique (Bootstrap columns, flex box, grid)| Using bootstrap py, px, mt in my info-tab table, 2) Using a display flex on my Carousel home page to align the logo, buttons and items in it, 3) Using the position property: relative and absolute and z-index to allow the buttons and features to show up on top of map | 12 |
| Each possible search or filtering criteria in the user interface | 1) Use of a search bar to fiter keywords for recommendations, 2) Use of filtering feature to show all hotels within a 2km radius of current location, 3) Use of a filtering feature to show up all eateries within 1km of a clicked location on the map | 12 |
| Each case of the map updating based on the user's actions | 1) Use of a refresh of taxi API every 2 minutes to update their coordinates/ refresh of all eateries markers when the remove eateries button is clicked, 2) Use of a refresh of searched markers whether a new search is done, 3) Use of a refresh of markers of eateries of 1km radius whenever a new location is clicked on the map| 12 |
| Each group of layers in the Leaflet map | There are 1)hotels, 2)taxis, 3)hawkers, 4)Seached venues, 5)eateries, 6)neaby accommodation layers | 20 |
| Each group of marker clustering | There are 1)Taxi marker clusters, 2)Hotel marker clusters, 3)Hawker marker clusters | 12 |
| Each type of custom marker (using images or custom behaviour) | There are 1) Taxi custom markers, 2) Hotel custom markers, 3)Search results custom markers, 4)Eateries custom markers, 5) Nearby accommodation custom markers, 6)MBS custom markers, 7)Universal studios custom markers, 8) RWS custom markers | 20 |


