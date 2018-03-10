

     // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map;
      var infoWindow;

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

            // multiple marker test
              var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            // Add some markers to the map.
            // Note: The code uses the JavaScript Array.prototype.map() method to
            // create an array of markers based on a given "locations" array.
            // The map() method here has nothing to do with the Google Maps API.
            var markers = locations.map(function(location, i) {
              return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
              });
            });

            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);

            /* sending the current position for comparing to existing Crumbs' locations */  
            compareLocations(pos);
                   
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

} // end initMap

/*** in this version, crumbId's are fixed, not variables from database :( ***/
var locations = [
        {lat: 59.35, lng: 18.06, crumbId: '68a14ccf-b8ad-4f70-8041-d0f3852e6ff1'}, /* MI, 3:e bänken, stolen näst längst in..) */
        {lat: 59.27, lng: 18.05, crumbId: '68a14ccf-b8ad-4f70-8041-d0f3852e6ff1'},
        {lat: -33.718234, lng: 151.209834, crumbId: 02},
        {lat: -33.727111, lng: 150.371124, crumbId: 03},
        {lat: -33.848588, lng: 151.209834, crumbId: 04},
        {lat: -33.851702, lng: 151.216968, crumbId: 05},
      ]


      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }






function compareLocations(yourPosition){
    let userLatPosition = parseAndRoundOffPosition(yourPosition.lat);
    let userLngPosition = parseAndRoundOffPosition(yourPosition.lng);

        for(i = 0; i < locations.length; i++){
            let crumbLatPosition = parseAndRoundOffPosition(locations[i].lat);
            let crumbLngPosition = parseAndRoundOffPosition(locations[i].lng);
            let crumbId = locations[i].crumbId;     
            
            if((userLatPosition == crumbLatPosition) && (userLngPosition  == crumbLngPosition)){
                    console.log("it's a match!")
                pickUpCrumb(crumbId);
            }else{
                    console.log("this is somewhere else")
            }
        }    
}

function parseAndRoundOffPosition(latOrLng){
    let latOrLngParsed = parseFloat(latOrLng);
    let latOrLngRoundOff = latOrLngParsed.toFixed(2); // kalibrera detta värde???
    return latOrLngRoundOff;   
}


/*** DOM Elements ***/
const pickUpDiv = document.getElementById('pickUpDiv');


function pickUpCrumb(id){
    
     fetch('http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&mbid=' + id + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
      .then(response => response.json())
      .then(jsonData => {
//            console.log(songData);
//            console.log(songData.track.artist.name);
         

         
            const pickUpCrumb = document.createElement('div');
            pickUpCrumb.classList.add('pickUpCrumb');
            pickUpCrumb.innerHTML = 'Yay! You found a crumb! Pick it up!';
            pickUpDiv.appendChild(pickUpCrumb);
         
            pickUpCrumb.addEventListener('click', function(){ 
                printInfo(id);
            })
      })
      .catch(function(error){
            console.log(error);
      })

} // end pickUpCrumb

//const printInfo = document.getElementById('printInfo');

function printInfo(id){
    
        const fetchedInfo = document.createElement('div');
        fetchedInfo.classList.add('classSome');
        pickUpDiv.innerHTML = 'Some info about the track';
        //pickUpDiv.appendChild(fetchedInfo);
    
    moreInfoButton.addEventListener('click', function(){ 
        moreInfo(id);
    })
    
}


function moreInfo(id){
    
}









