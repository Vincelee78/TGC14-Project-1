# TGC14-Project 1
To create an interactive map guide for tourists in Singapore.

# Summary: 
To allow tourists to locate nearby hotels, eateries, hawkers, attractions from their current location and display real time taxi availability.

# My goal/motivation for creating this project:
To provide tourists an one stop map guide for locations around Singapore.

# Context: 
Many of my overseas friends have commmented that Singapore is small and there is nothing to do here after a day. I created this map guide to encourage tourists to spend more time in Singapore and explore all the attractions and events despite the current COVID situation. Thus, in turn they will spend more and boost the local economy from tourism spending.

# Demo: 
A live website server can be found on the Gitpod server.

# Index:
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
| Adding or removing DOM elements to the display (map, DOM tree, game screen) based on user's actions |Added 1) Search feature, 2)toggle hawker centres,taxi coordinates, all hotels feature, 3) Top 3 attractions feature, 4)Remove search results and remove eateries feature, 5) Slide information bar in and out feature | 20 |
| Modifying the CSS of DOM elements based on the user's actions | 1) Sliding in the information bar using transition and transform css, 2) Sliding out the information bar using transition and transform css, 3) Displaying the map and hiding the index( landing) page using css display= block or none, 4) Using css style display=block or nonoe for removing eateries and search results, 5) Using css style display for toggling taxi coordinates, 6) Using css style display for collapsing search results in info tab | 12 |
| Use of 1D traversal of array | 1) Use of loop to extract out hotels,taxi,eateries and search coordinates within a 2km radius of current location, 2)Use of transversal of array to extract out names, address, number of rooms, cateogories of hotels,eateries,hawkers and search coordinates, 3) Use of loop to extract out all the resturants within a clicked location of map using geocoding, 4) Use of transveral of array to extract out all taxi coordinates and match it with the address of the respective coordinates| 15 |
| Each use of a unique functional mapping method (map, reduce, filter) | On https://tsw-photogallery.herokuapp.com/albums/create_album_form, user clicks on 'Back'. The URL should route to https://tsw-photogallery.herokuapp.com/albums. | Pass |
| Each use of CSS layout technique (Bootstrap columns, flex box, grid)| When user clicks on 'Upload Photos' on the landing page, the URL should route to https://tsw-photogallery.herokuapp.com/uploads | Pass |
| Each possible search or filtering criteria in the user interface | On https://tsw-photogallery.herokuapp.com/uploads, a form should be generated in the lower half of the screen and has 4 user input fields ('choose file', 'image caption', 'tags', and 'select upload destination') and 1 buttons ('Upload'). | Pass |
| Each case of the map updating base on the user's actions | On the upload form, when user clicks on 'Browse', a file-directory should pop up and prompts the user to select a file for uploading.| Pass |
| Each group of layers in the Leaflet map | On the upload form, when user clicks on 'Select Upload Destination', a dropdown list of albums names should appear and is selectable.| Pass |
| Each group of marker clustering | On the upload form, when user selects a test image "Capture.PNG" from his local directory, inputs "Test photo" as the image caption, "#test" as the tag and selects 'Test' as the album upload destination. User clicks 'Upload'. Page refreshes and user should see a flash message 'Image has been uploaded successfully' if image upload has been successful.| Pass |
| Each type of custom marker (using images or custom behaviour) | On the upload form, user selects a test image "Shepherd.jpg" from his local directory, inputs "Test photo" as the image caption, "#test" as the tag and selects 'Test' as the album upload destination. User clicks 'Upload'. Page refreshes and user should see a flash message 'Image has been uploaded successfully' if image upload has been successful.| Pass |


