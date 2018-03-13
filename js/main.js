/*** In Alpha version, this array data is fetched from database ***/
var whereWhoWhenWhat = [
        {lat: 59.35, lng: 18.06, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: '925dcc2f-273a-4278-a8b6-3f1f846a7a4b'}, /* MI */
//        {lat: 59.27, lng: 18.05, user: 'VenusInTheSoup', date: 'xx/xx', crumbId: '925dcc2f-273a-4278-a8b6-3f1f846a7a4b'},
        {lat: 59.2734859, lng: 18.0497044, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: 05},
        {lat: 52.48142, lng: -1.89983, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: 02},
        {lat: -33.727111, lng: 150.371124, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: 03},
        {lat: -33.848588, lng: 151.209834, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: 04},
        {lat: -33.851702, lng: 151.216968, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: 05},
      ]

/*** DEMO row ***/
//{lat: 59.2734859, lng: 18.0497044, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: 05}
//{lat: 59.34588819999999, lng: 18.058012599999998, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: 05} /* MI klassrummet */


var myVar;

function myFunction() {
    initMap = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}


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
     fetch('http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&mbid=' + id + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
      .then(response => response.json())
      .then(songData => {
         
         console.log(songData);
         
            let crumbId = id;
            let crumbDate = date;
            let crumbUser = user;
            let fileEnding = imageFileEnding;
            let searchStringArtist = generateSearchString(songData.track.artist.name);
            let searchStringSongTitle = generateSearchString(songData.track.name);
         
            console.log(searchStringArtist);
            console.log(searchStringSongTitle);
         
            let trackId = songData.track.mbid; 
            let trackName = songData.track.name;
            let artistName = songData.track.artist.name
            let artistId = songData.track.artist.mbid;
            let albumName = songData.track.album.title;
            let artistUrl = songData.track.artist.url;

            printOutOutput(crumbId, crumbDate, crumbUser, fileEnding, searchStringArtist, searchStringSongTitle,
            trackId, trackName, artistName, artistId, albumName, artistUrl);      
        })
        .catch(function(error){
            console.log(error);
        })
} // end fetchAndPrintInfo()
                          
function printOutOutput(crumbId, crumbDate, crumbUser, fileEnding, searchStringArtist, searchStringSongTitle,
            trackId, trackName, artistName, artistId, albumName, artistUrl){
    
                 let pickUpCrumbTest2 = `
            <div class="opacityOverMap"></div>
                    <div class="openFoundCrumb" id="openFoundCrumb">

                        <img src="images/heartnotes.gif">
                        <img src="images/happycrumb${fileEnding}.jpg">
                        <img src="images/heartnotes.gif">
                        <p><span class="crumbFont">Congratulations! </span> <br>
                        You found a song that was dropped here ${crumbDate} by ${crumbUser}.</p>
                            <div class="details_overwrap">
                                <div class="details_wrapper">
                                    <div class="div_key">Title:</div><div class="div_value">${trackName} </div>
                                    <div class="div_key">Artist:</div><div class="div_value"<a href="${artistUrl}">${artistName}</a></div>
                                </div>
                            </div>
                    <p><span class="crumbFont">Direct search on youtube:</span></p>
                    <a target="_blank" href="https://www.youtube.com/results?search_query=${searchStringArtist}+${searchStringSongTitle}">
                        <img id="youtube_logo" src="images/youtube_logo.jpg">
                    </a></p>

                    <p><span class="crumbFont">If you want to know more:</span></p>
                    </div>


            </div>
            `;
         
            pickUpElement.innerHTML = '';
            pickUpElement.insertAdjacentHTML('afterbegin', pickUpCrumbTest2); 
    
            const seeRecentlyPlayedButton = document.createElement('button');
            seeRecentlyPlayedButton.classList.add('small_button');
            seeRecentlyPlayedButton.innerHTML = 'Users recent tracks';
    
            const seeTagsButton = document.createElement('button');
            seeTagsButton.classList.add('small_button');
            seeTagsButton.innerHTML = 'See tags for this track';
    
            const seeArtistInfo = document.createElement('button');
            seeArtistInfo.classList.add('small_button');
            seeArtistInfo.innerHTML = 'Read about the artist';
    
            const openFoundCrumb = document.getElementById('openFoundCrumb');
    
    
            openFoundCrumb.appendChild(seeRecentlyPlayedButton);
            openFoundCrumb.appendChild(seeTagsButton);
            openFoundCrumb.appendChild(seeArtistInfo);
    
            let user = crumbUser; // ta bort här ha bara crumbUser som argument???!!
            //console.log(user);
             
            seeRecentlyPlayedButton.addEventListener('click', function(){ 
                 fetchRecentlyPlayed(user);
            }); 
    
            seeTagsButton.addEventListener('click', function(){ 
                 fetchTags(trackId);
            });
    
            seeArtistInfo.addEventListener('click', function(){ 
                 fetchArtistInfo(artistId);
            });   
    
}
                   
function fetchRecentlyPlayed(id){
      fetch('http://ws.audioscrobbler.com/2.0/?method=User.getRecentTracks&user=' + id + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
        .then(response => response.json())
        .then(songData => {
            //let userId = id;
            
            //console.log(songData);
          
          //printRecentlyPlayed(userId)
          
            let artist = songData.recenttracks.track[i].artist['#text'];
            let track = songData.recenttracks.track[i].name;
          
            const exploreFurtherDiv = document.createElement('div');
          
               for(i = 0; i < 5; i++){  
                 let recentTrackRow = `
                 <div class="recentTrackRow">${i+1}. ${songData.recenttracks.track[i].artist['#text']} - ${songData.recenttracks.track[i].name} </div>
                 `;
                   exploreFurtherDiv.insertAdjacentHTML('beforeend', recentTrackRow); 
                }
                openFoundCrumb.appendChild(exploreFurtherDiv); 
        })
            .catch(function(error){
                console.log(error);
        })
}

//function printRecentlyPlayed(){
//    
//}
                  
function fetchTags(id){
      fetch('http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&mbid=' + id + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
        .then(response => response.json())
        .then(songData => {
            let songId = id;
            let tagArray = songData.track.toptags.tag; // kan man skicka med en array på det här sättet???
            printTags(songId, tagArray);
        })
            .catch(function(error){
                console.log(error);
        })
}


function printTags(songId, tagArray){
    
   const exploreFurtherDivTags = document.createElement('div');
    
   for(i = 0; i < tagArray.length; i++){ 
       // varför slutar sidan fungera om jag döper denna nedan till tagsForTrack[i]
     let tagsForTrack = `

            <div class="tagDiv${[i]}" id="tagDiv${[i]}">
                ${tagArray[i].name}
            </div>

     `;
       exploreFurtherDivTags.insertAdjacentHTML('beforeend', tagsForTrack); // även tagsForTrack[i] här såklart

    }
    openFoundCrumb.appendChild(exploreFurtherDivTags);

}

//                    <div class="tagsWrapper">
//                        <div class="tagDiv${[i]}" id="tagDiv">
//                            ${tagArray[i].name}
//                        </div>
//                    </div>

function fetchArtistInfo(id){
    fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&mbid=' + id + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
    .then(response => response.json())
    .then(songData => {
        let artistInfo = songData.artist.bio.summary;
        printArtistInfo(artistInfo);
    })
        .catch(function(error){
            console.log(error);
    })
}

function printArtistInfo(artistInfo){
    const exploreFurtherDiv = document.createElement('div'); 
    exploreFurtherDiv.classList.add('exploreFurtherDiv');
    let artistInfoOutput = `
        <div class="artistInfoDiv">${artistInfo}</div>
    `;
    exploreFurtherDiv.insertAdjacentHTML('beforeend', artistInfoOutput); 
    openFoundCrumb.appendChild(exploreFurtherDiv);  
}








/*** Small functions ***/
function randomCrumbImage(){
    return Math.floor((Math.random() * 7) + 1); 
}

/* This function should probably be built out to handle more "weird characters" */
function generateSearchString(string){
    let filterOutCharacters = string.replace('&', '').replace('/', ''); 
    let searchStringFormat = filterOutCharacters.split(' ').join('+');
    return searchStringFormat; 
}
