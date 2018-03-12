/*** In Alpha version, this array data is fetched from database ***/
var whereWhoWhenWhat = [
        {lat: 59.35, lng: 18.06, user: 'VenusInTheSoup', date: 'xx/xx', crumbId: '925dcc2f-273a-4278-a8b6-3f1f846a7a4b'}, /* MI */
//        {lat: 59.27, lng: 18.05, user: 'VenusInTheSoup', date: 'xx/xx', crumbId: '925dcc2f-273a-4278-a8b6-3f1f846a7a4b'},
        {lat: 59.2734859, lng: 18.0497044, user: 'VenusInTheSoup', date: 'xx/xx', crumbId: 05},
        {lat: 52.48142, lng: -1.89983, user: 'VenusInTheSoup', date: 'xx/xx', crumbId: 02},
        {lat: -33.727111, lng: 150.371124, user: 'VenusInTheSoup', date: 'xx/xx', crumbId: 03},
        {lat: -33.848588, lng: 151.209834, user: 'VenusInTheSoup', date: 'xx/xx', crumbId: 04},
        {lat: -33.851702, lng: 151.216968, user: 'VenusInTheSoup', date: 'xx/xx', crumbId: 05},
      ]

/*** DEMO row ***/
//{lat: 59.2734859, lng: 18.0497044, user: 'VenusInTheSoup', date: 'xx/xx', crumbId: 05}

/*** Setting up map ***/

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
            // create an array of markers based on a given "locations" (whereWhenWhat) array.
            // The map() method here has nothing to do with the Google Maps API.
            var markers = whereWhoWhenWhat.map(function(location, i) {
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
//          navigator.geolocation.getCurrentPosition(function(position) {
// change to watchPosition, see how that works out?
          navigator.geolocation.watchPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            
            infoWindow.open(map);
            map.setCenter(pos);


            /* sending the current position for comparing to existing Crumbs' locations */
              console.log(pos);
            compareLocations(pos);
                   
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

} // end initMap




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

        for(i = 0; i < whereWhoWhenWhat.length; i++){
            let crumbLatPosition = parseAndRoundOffPosition(whereWhoWhenWhat[i].lat);
            let crumbLngPosition = parseAndRoundOffPosition(whereWhoWhenWhat[i].lng);
            let crumbId = whereWhoWhenWhat[i].crumbId; 
            let crumbDate = whereWhoWhenWhat[i].date; 
            let crumbUser = whereWhoWhenWhat[i].user; 
            
            if((userLatPosition == crumbLatPosition) && (userLngPosition  == crumbLngPosition)){
                    console.log("it's a match!")
                pickUpCrumb(crumbId, crumbDate, crumbUser);
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
const pickUpElement = document.getElementById('pickUpElement');

function pickUpCrumb(id, date, user){
            let imageFileEnding = randomCrumbImage();
    
            let pickUpCrumbTest = `
            <div class="opacityOverMap"></div>
                <div class="foundCrumbMessage">
                    <img src="images/crumb${imageFileEnding}.jpg">
                    <p>Someone dropped something here! Pick it up!</p>
                </div>
            `;
            pickUpElement.insertAdjacentHTML('afterbegin', pickUpCrumbTest); 
    
            pickUpElement.addEventListener('click', function(){ 
                fetchAndPrintInfo(id, date, user, imageFileEnding);
            })
} // end pickUpCrumb

function fetchAndPrintInfo(id, date, user, imageFileEnding){
 //       console.log(id);

    
//        const fetchedInfo = document.createElement('div');
//        fetchedInfo.classList.add('classSome');
//        pickUpDiv.innerHTML = 'Some info about the track';
    
         fetch('http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&mbid=' + id + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
      .then(response => response.json())
      .then(songData => {
 //           console.log(songData);
//           console.log(songData.track.album.mbid);

             
            let searchStringArtist = generateSearchString(songData.track.artist.name);
            let searchStringSongTitle = generateSearchString(songData.track.name);
             
//                               let albumId = songData.track.album.mbid;             
//                              fetch('http://ws.audioscrobbler.com/2.0/?method=album.getInfo&mbid=' + albumId + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
//                              .then(response => response.json())
//                              .then(albumCoverFetch => {
//                                    console.log(albumCoverFetch);
//                                    console.log(albumCoverFetch.album.image[1]['#text']);
//                                    // let albumArtresult = albumCoverFetch.album.image[2]['#text'];

                                    
                                  
             let pickUpCrumbTest2 = `
            <div class="opacityOverMap"></div>
                    <div class="openFoundCrumb" id="openFoundCrumb">

                        <img src="images/heartnotes.gif">
                        <img src="images/happycrumb${imageFileEnding}.jpg">
                        <img src="images/heartnotes.gif">
                        <p><span class="crumbFont">Congratulations! </span> <br>
                        You found a song that was dropped here ${date} by ${user}.</p>
                            <div class="details_overwrap">
                                <div class="details_wrapper">
                                    <div class="div_key">Title:</div><div class="div_value">${songData.track.name} </div>
                                    <div class="div_key">Artist:</div><div class="div_value"<a href="${songData.track.artist.url}">${songData.track.artist.name}</a></div>
                                    <div class="div_key">Release:</div><div class="div_value">${songData.track.album.title} </div>
                                </div>
                            </div>
 
                    </div>
                    <a target="_blank" href="https://www.youtube.com/results?search_query=${searchStringArtist}+${searchStringSongTitle}">Search directly on YouTube</a></p>

                    If you loved this track, maybe you want to checkout:
            </div>
            `;
            pickUpElement.innerHTML = '';
            pickUpElement.insertAdjacentHTML('afterbegin', pickUpCrumbTest2); 
                                  
                                  
                                  
                                  
                                  
//                                })
//                                  .catch(function(error){
//                                        console.log(error);
//                                })
       
                 
 
             
            const seeRecentlyPlayedButton = document.createElement('button');
            seeRecentlyPlayedButton.classList.add('small_button');
            seeRecentlyPlayedButton.innerHTML = 'Users recent tracks';
             

            const openFoundCrumb = document.getElementById('openFoundCrumb');
            openFoundCrumb.appendChild(seeRecentlyPlayedButton);
             
            //openFoundCrumb.insertAdjacentHTML('beforeend', seeRecentlyPlayedButton); 
             
            seeRecentlyPlayedButton.addEventListener('click', function(){ 
                 seeRecentlyPlayed(id);
            });
             
             

            
                          
                          
    })
      .catch(function(error){
            console.log(error);
      })

    
}


function moreInfo(id){
    
}

function seeRecentlyPlayed(id){
    
      fetch('http://ws.audioscrobbler.com/2.0/?method=User.getInfo&method=User.getRecentTracks&user=VenusOfTheSoup&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
        .then(response => response.json())
        .then(songData => {
            console.log(songData);
          
            const seeRecentlyDiv = document.createElement('div');
          
              for(i = 5; i > 0; i--){ 
                let recentTrackRow = `
                ${i}. ${songData.recenttracks.track[i].artist['#text']} - ${songData.recenttracks.track[i].name} 
                `; 
                  
                openFoundCrumb.insertAdjacentHTML('beforeend', recentTrackRow);
              }

          
//                seeRecentlyDiv.insertAdjacentHTML('beforeend', recentTrackRow);
//          
//                openFoundCrumb.appendChild(seeRecentlyDiv);
                      
        })
        .catch(function(error){
            console.log(error);
        })
    
}

function randomCrumbImage(){
    return Math.floor((Math.random() * 7) + 1); 
}

function generateSearchString(string){
    let result = string.replace('\\ ', '+');
    return result; 
}



