
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

/*** in this version, crumbId's are fixed :( ***/
var locations = [
        {lat: 59.35, lng: 18.06, crumbId: '68a14ccf-b8ad-4f70-8041-d0f3852e6ff1'}, /* MI, 3:e bänken, stolen näst längst in..) */
        {lat: 59.2734752, lng: 18.0496685, crumbId: '68a14ccf-b8ad-4f70-8041-d0f3852e6ff1'},
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

        //console.log(yourPosition.lat);
        
        /* Formatting Your latitude
        let yourLatParsed = parseFloat(yourPosition.lat);
        let yourLatRoundOff = yourLatParsed.toFixed(2);
        console.log(yourLatRoundOff);
    
        let yourLngParsed = parseFloat(yourPosition.lng);
        let yourLngRoundOff = yourLngParsed.toFixed(2);
        console.log(yourLngRoundOff);
        */
    
    
        let userLatPosition = parseAndRoundOffPosition(yourPosition.lat);
        let userLngPosition = parseAndRoundOffPosition(yourPosition.lng);
    

        for(i = 0; i < locations.length; i++){
//        console.log(i);
//        console.log(locations[i]);
        
            /* Formatting Crumb latitude 
            let crumbLatParsed = parseFloat(locations[i].lat);
            let crumbLatRoundOff = crumbLatParsed.toFixed(2);
            console.log(crumbLatRoundOff);
            */

            let crumbLatPosition = parseAndRoundOffPosition(locations[i].lat);
            
            /* Formatting Crumb longitude    
            let crumbLngParsed = parseFloat(locations[i].lng);
            let crumbLngRoundOff = crumbLngParsed.toFixed(2);
            console.log(crumbLngRoundOff);
            */
            
            let crumbLngPosition = parseAndRoundOffPosition(locations[i].lng);
            
            let crumbId = locations[i].crumbId;
            
            /* if((yourLatRoundOff == crumbLatRoundOff) && (yourLngRoundOff == crumbLngRoundOff)){ */
            if((userLatPosition == crumbLatPosition) && (userLngPosition  == crumbLngPosition)){
                console.log("IT'S A MATCH!")
                
                //console.log(locations[i].crumbId);

                
                pickUpCrumb(crumbId);
                
            }else{
                    console.log("this is somewhere else")
                }
        }    
} // end of compareLocations



function parseAndRoundOffPosition(latOrLng){
    let latOrLngParsed = parseFloat(latOrLng);
    let latOrLngRoundOff = latOrLngParsed.toFixed(2);
    return latOrLngRoundOff;   
}


function pickUpCrumb(id){
    console.log("Yay! You found a song!")
    
//    let songId = '68a14ccf-b8ad-4f70-8041-d0f3852e6ff1';

    fetch('http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&mbid=' + id + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
    .then(function(respone){ 
        return respone.json(); 
    })
    .then(function(songData){ 
        console.log(songData);
        
        console.log(songData.track.artist.name);
        
//    console.log(songData.recenttracks.track[0].artist);
//    
//    console.log(songData.recenttracks.track[0].name);
        
        /* knapp: jag vill veta mer om den här artisten */

    })
    .catch(function(error){
        console.log(error);
    })
    
}









