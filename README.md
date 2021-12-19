## TGC14 Project 1-SGTouristMapGuide
This project is called SGTouristMapGuide and it is an interactive map guide for tourists in Singapore.

## Summary/Target audience: 
The project is aimed at tourists in Singapore with demographics aged from 12 to 79 years old who is on a free and easy tour here to locate nearby hotels, eateries, hawkers, attractions from their current location and display real time taxi availability to locate nearby taxis.

## My goal/motivation for creating this project:
To provide tourists an one stop map guide for locations around Singapore.

## Context: 
Many of my overseas friends have commmented that Singapore is small and there is nothing to do here after a day. I created this map guide to encourage tourists to spend more time in Singapore and explore all the attractions and events Singapore has to offer despite the current COVID situation. Thus in turn, they will spend more and boost the local economy from tourism spending.

## Demo: 
#### A screenshot of the interactive map page of the project.
![Image](https://res.cloudinary.com/dtrwtlldr/image/upload/v1639721848/images_hntzgp.jpg "Image")

## Index:
1. [Project Strategy](#a)
2. [UX/UI](#b)
3. [Technologies used](#c)
4. [Future features to implement](#d)
5. [Testing](#e)
6. [Deployment](#f)
7. [Credits and Acknowledgement](#g)

 
## <a name="a">1. Project Strategy
Based on the user's needs and objectives, these are the guidelines for the features that were implemented.
| User Stories| Features|
| ------ | ------ |
| User wants to locate current location on map| When starting the map, user can allow the device to locate current location and display user's current marker location on map. |
| User wants to locate nearby accommodation from current location | Map displays all recommended accommodation locations with name,address and category of accommodation within a 2km radius from current user's location.|
| User wants to locate all hotels in Singapore| On the top right corner of the screen, User is able to toggle on and off the location, name, address and number of rooms of all hotels in Singapore.|
| User wants to locate all taxis in Singapore or around his current location| On the top right corner of the screen, User is able to toggle on and off all real-time avaliablity of taxis coordinates and addresses in Singapore. The coordinates of taxis are updated every 2 minutes. |
| User wants to locate all the hawkers centers| On the top right corner of the screen, User is able to toggle on and off all hawker centers in Singapore.|
| User wants to locate all nearby eateries from any clicked location on map| User can double tap anywhere on map and all eateries within a 1km radius from tapped location will appear with their name, address and category of eatery.|
| User wants to search for a recommended category or place in Singapore.| User can enter in keywords in the search bar and all recommended venues containing the keywords will appear in the search results. Clicking on the results will bring the user to the location on the map and why it is recommended.|
|User wants to explore the top 3 attractions in Singapore| Clicking on any of the top 3 attractions in the 'Top 3 attractions' of the infotab will bring up the respective attraction popup with a description. The popup will show a description and image of each attraction and clicking on the image will bring the user to the ticket booking of that attraction.|
| User wants to remove all the search icons and results| Clicking on the 'Remove searches' in the infobar will remove all the search results and icons in the map.|
| User wants to slide the info bar away| There is a toggle button on the bottom right of the screen to allow the user to slide the infobar in and out of the screen for easier viewing of the map.|

#### Bonus Scoring
 Feature/Item | Eligibility | 
| ------ | ------ |
| Each extra feature| 1) Use of geocoding to find address of any clicked location of map 2) Use of css transform and transition to slide in and out the info bar, 3) Use of custom popups and images which link to booking websites, 4) Use of feature to locate and display current location, 5) Use of Geocoding to display address of taxis according to their coordinates 6) Use of array transversal 7) Use of asynchronous function calls in parallel 8) Use of array mapping transformation |
| Single Page Application |Use of a landing page to showcase the project and pressing on the 'Get started' button to redirect the user to the interactive map | 

## <a name="b">2. UX/UI
This project is a professional website intended for tourists in Singapore to locate attractions, hotels, eateries and taxis. Hence, the fonts selected for the project focuses on readability and a relatively large font-szie. The colours chosen are also adhering to the professional theme with no dark colours, instead using bright colours.

#### (i) Design
* The bootstrap plugin was used in for the front-end development of the website as it allows for better visual design of buttons, an information tab and also an easy grid layout. 
* The general design of the website comprises a search bar as one of the main features and an information table which displays the search results which is easy to read and navigate. 
* The information tab is light purple as it is visually pleasing and not too glaring.  
* I choose the search results text colour to be black against a grey background as it is easy to be read.  
* The markers are typically a darker colour as it is more visible on a light background on the map.  
* The attractions button is red in colour as it directs attention to the user to notice it.  
* The layout of the webpage is not overly complex and easy to use. Custom markers were created according to the classification of the location and to enhance the visual experience of users.  
* Font size is relatively large and easy to read.  
* For a better user experience for mobile devices, I repositioned the buttons so that it will not block the viewing of the map and its features and there is a toggle button to allow the infobar to slide out for less obstruction of the map.

#### Primary font:
* font-family: 'sans-serif'
* font-size: 1 rem
* font-weight: 400

#### Prominent colours:
* mediumslateblue
* grey
* white
* green
* orangered

### (ii) Project Scope
The project skeleton and structure (wireframes) can be found [here](https://docs.google.com/presentation/d/1GqyhQLMf-A_-2YCcyQbgSmhdlelVVPVr/edit?usp=sharing&ouid=100349503230330665538&rtpof=true&sd=true) 


## <a name="c">3. Technologies Used
* [HTML 5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
<br> This project uses HTML5 to structure the content and to insert buttons and images.
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
<br> This project uses CSS to add visual colors, adjust the size of the features and also positioning and animation of the features, and ensure it is mobile responsive.
* [Bootstrap 5.1.1](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
<br> This project uses Bootstrap to structure the layout of the website such as my Navtab and added features such as Carousel. It is also used in positioning the text and features.
* [Awesomemarkers 2.0.2](https://github.com/lennardv2/Leaflet.awesome-markers) 
<br> This project uses the awesome markers plugin for custom styling of markers.
* [FontAwesome 5.15](https://fontawesome.com/v5/changelog/latest)
<br> This project uses FontAwesome to add custom markers and icons on the map and to enhance the visual experience of users.  
* [Leaflet 1.7.1](https://leafletjs.com/2020/09/04/leaflet-1.7.1.html) 
<br> This project uses leaflet to render the map and for the insertion of default markers. 
* [Esri Leaflet 3.0.2](https://www.npmjs.com/package/esri-leaflet) 
<br> This project uses the esri leaflet for geocoding of the coordinates on the map and to display the address of coordinates.
* [MarkerCluster 1.4.1](https://www.npmjs.com/package/leaflet.markercluster) 
<br> This project uses the marker cluster plugin for Animated Marker Clustering for Leaflet.
* [Axios 0.21.1](https://www.npmjs.com/package/axios/v/0.21.1) 
<br> This project uses the axios plugin for Promise based HTTP client for the browser and make requests to an API, return data from the API.

## <a name="d">4. Future Features To Implement
- A feature for users to view a short video in the popup of the place/venue they have clicked on.
- A feature that allows users to jump to the search result based on voice input.

## <a name="e">5. Testing
| Test Case Number| Test Case Description| Results|
| ------ | ------ | ------ |
| 1 | On the landing page, user should see a Carousel feature with images and a button 'Get started' and asking the user to locate his location | Pass |
| 2 | When user clicks on 'Get started' button on the landing page, the page should be directed to the interactive map | Pass |
| 3 | Map is rendered with the user's marker current location and a popup 'Your current location on the map' with hotels markers within a circular radius. Clicking on the hotel markers shows their respective details | Pass |
| 4 | Under the 'Search Recommendations!' textbox , user inputs keywords 'attractions' and click 'Search Recommendations!'. The search results container will appear 30 search results with 'Universal Studios Singapore' as its first result. Clicking on 'Universal Studios Singapore' will bring to user to Universal Studios Singapore location and the popup box with its details | Pass |
| 5 | Clicking on remove search results removes all the search results and the respective markers. Clicking on the arrow down icon in the top extreme right of the Navtab bar removes the search results with the markers still intact | Pass |
| 6 | Clicking on the toggle button on the bottom right of the screen slides the Navtab out of the screen and clicking it again slides it in | Pass |
| 7 | Clicking on the 'toggle for taxis avaliable now' in the Navtab creates cluster markers of the taxi locations. Clicking on the taxi icon opens a popup with the address of the current taxi. Clicking on the toggle button again removes the cluster markers | Pass |
| 8 | Clicking on the 'Toggle Hawker Locations' in the Navtab creates cluster markers of the hawker centers. Clicking on the utensils marker icon shows a popup with the address of the current hawker center and its details. Clicking on the toggle button again removes the cluster markers | Pass |
| 9 | Clicking on the 'Hotels' checkbox in the top right symbol of the screen creates cluster markers of all the hotels. Clicking on the hotel marker icon shows a popup with the address of the current hotel and its details. Unchecking the hotel checkbox again removes the cluster markers | Pass |
| 10 | Double-Clicking on anywhere on the map will produce a marker at that location with its address in the popup. Eateries icon markers will appear within 1km of the clicked location. Clicking on the eateries markers will show its details. Clicking on the yellow button 'Remove Eateries' will remove all eateries markers that were created with this feature | Pass |
| 11 | Clicking on the 'Top 3 attractions' will show 3 images of the attractions and they can be accessed by scrolling down the dropbox. Clicking on the 'Gardens by the Bay' logo will fly to the coordinates of the attraction and generate its custom marker. The popup will open showing the attraction details. Clicking on the image of the popup of Gardens by the Bay will open an external page and bring the user to the ticket booking page of Gardens by the Bay | Pass |

#### 5(i) Mobile Responsiveness
- Mobile responsive test results were done on 3 mobile devices.
1. [Iphone SE 2020](https://drive.google.com/file/d/1uvnKRK0U9Mm15a5ZPn83R8LfCtMNGMn2/view?usp=sharing)
2. [Iphone7](https://drive.google.com/file/d/1fj5Tdu3Pkv3ovIwFAJPnVWCnTdWg2ow1/view?usp=sharing)
3. [Oppo R17 pro](https://drive.google.com/file/d/1u6HLpeHFTTer1080yVeVCeD_cBut1yIH/view?usp=sharing)

#### 5(ii) Known Bugs
- The current location marker of the user is sometimes not that accurate on a PC as the exact location of user depends on the IP address of the browser.

## <a name="f">6. Deployment
The live website is currently deployed on the [Netlify server](https://awesome-brattain-2464a9.netlify.app/).


## <a name="g">7. Credits and Acknowledgement
- Credits to https://data.gov.sg/ for the geojson files used to locate hawkers and hotels.
- Credits to  https://developer.foursquare.com/, https://nominatim.org/ for data on eateries, hotels and geocoding for taxi coordinates.
- Credits to 
1. [Singapore Tourism Board](https://www.visitsingapore.com/)
2. https://www.thepoortraveler.net/2019/05/singapore-itinerary-things-to-do/
3. https://www.kids-world-travel-guide.com/singapore-attractions.html
4. https://www.iconfinder.com/icons/3138775/attractions_gardens_gardens_by_the_bay_landmarks_park_singapore_travel_icon 
5. [Gardens by the Bay](https://www.gardensbythebay.com.sg/)
6. https://www.clipartmax.com/middle/m2i8H7K9N4b1d3b1_singapore-merlion-clip-art-singapore-merlion-clipart/
7. [Marina Bay Sands](https://www.marinabaysands.com/)
8. https://thenounproject.com/term/singapore/668086/
9. [Universal Studios Singapore](https://www.rwsentosa.com/en/attractions/universal-studios-singapore/explore)
10. https://seeklogo.com/vector-logo/258502/universal-studios-singapore
11. http://getdrawings.com/get-icon#map-pin-icon-png-67.png
for their images, icons and logos
