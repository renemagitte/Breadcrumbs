/* LAST FM

//får fram fakta om 1 låt
fetch('http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=e26b796f4961b23b890aa1fe985eb6ff&artist=cher&track=believe&format=json')
.then(function(respone){ 
    return respone.json(); 
})
.then(function(songData){ 
    console.log(songData);
})
.catch(function(error){
    console.log(error);
})


fetch('http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=e26b796f4961b23b890aa1fe985eb6ff&artist=cher&track=believe&format=json')
.then(function(respone){ 
    return respone.json(); 
})
.then(function(songData){ 
    console.log(songData);
})
.catch(function(error){
    console.log(error);
})
*/

//  function initMap() {
//    var uluru = {lat: -25.363, lng: 131.044};
//    var map = new google.maps.Map(document.getElementById('map'), {
//      zoom: 4,
//      center: uluru
//    });
//    var marker = new google.maps.Marker({
//      position: uluru,
//      map: map
//    });
//  }


/* Google maps tar ut var du är, successfully 

     // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

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
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }


*/

//var posTest = initMap();

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
          
          
//      }

          
          
          
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
          
          
        //
          
          
          
      } // end initMap

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
              
              
              
              console.log(pos);
              
              compareLocations(pos);
              
              
              
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }


var locations = [
        {lat: 59.27, lng: 18.04},
        {lat: 59.2734752, lng: 18.0496685},
        {lat: -33.718234, lng: 151.209834},
        {lat: -33.727111, lng: 150.371124},
        {lat: -33.848588, lng: 151.209834},
        {lat: -33.851702, lng: 151.216968},
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
        
        let yourLatParsed = parseFloat(yourPosition.lat);
        let yourLatRoundOff = yourLatParsed.toFixed(2);
        console.log(yourLatRoundOff);
    
        let yourLngParsed = parseFloat(yourPosition.lng);
        let yourLngRoundOff = yourLngParsed.toFixed(2);
        console.log(yourLngRoundOff);
    
    
    

    for(i = 0; i < locations.length; i++){
        



        for(i = 0; i < locations.length; i++){
//        console.log(i);
//        console.log(locations[i]);

//        let currentPos = locations[i];

            if((yourPosition.lat == locations[i].lat) && (yourPosition.lng == locations[i].lng)){
                console.log("IT'S A MATCH!")
            }else{
                    console.log("this is somewhere else")
                }
            } 


        }
    
    
    
    
}











