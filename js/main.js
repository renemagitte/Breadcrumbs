//    fetch('http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&artist=Denim&track=Internet+curtains&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
//        .then(response => response.json())
//        .then(songData => {
//            console.log(songData);
//        })
//        .catch(function (error) {
//            console.log(error);
//        })


/*** In Alpha version, this array data is fetched from database ***/

var whereWhoWhenWhat = [
/* MI, videotips! */
{lat: 59.35, lng: 18.06, user: 'VenusOfTheSoup', date: '13/3 2018', crumbId: '770a770b-ad34-4564-8c9e-83e6d47f90e'}, 
/* data */
{lat: 59.2734988, lng: 18.0497676, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: '2d905c53-4d75-4982-bc60-898119ad4a97'}, 
/* centerpoint, data */
{lat: 59.285044, lng: 18.050966, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: '17831aa7-0b90-4cd7-b247-a8118ea894be'}, // test en matbutik
//{lat: 59.2734859, lng: 18.0497044, user: 'VenusOfTheSoup', date: '13/3 2018', crumbId: 'c4610d30-0831-4913-b177-542ce1fab4db'},
{lat: 59.243301, lng: 18.301159, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: 'c74ef86c-5f0e-4c9a-a7af-45d249e41ed7'}, // test Sandra
{lat: -33.848588, lng: 151.209834, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: 04},
{lat: -33.851702, lng: 151.216968, user: 'VenusOfTheSoup', date: 'xx/xx', crumbId: 05},
      ]

/*** DEMO row ***/
//{lat: 59.2734859, lng: 18.0497044, user: 'VenusOfTheSoup', date: '13/3 2018', crumbId: 'c4610d30-0831-4913-b177-542ce1fab4db'}
//{lat: 59.34588819999999, lng: 18.058012599999998, user: 'VenusOfTheSoup', date: '13/3 2018', crumbId: 'c4610d30-0831-4913-b177-542ce1fab4db'} /* MI klassrummet */

/*** DOM Elements ***/
const pickUpElement = document.getElementById('pickUpElement');



/*** Setting up map ***/

  var map;
  var infoWindow;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {  /* get map-div-element and fill with content */
      center: {lat: 59.34588819999999, lng: 18.058012599999998}, /* sets out default position */
      zoom: 12                                                   /* and default zoom */
    });
    infoWindow = new google.maps.InfoWindow;

/*** Setting up crumb markers ***/
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; /* marker name string */

//    var markerImage = 'images/bread-flat.dms';
//   markerImage.width = 50;
      
    /* Adding markers, using the labels above: 
    "The code uses the JavaScript Array.prototype.map() method to create an array of markers based on a given "locations" (whereWhenWhat) array. The map() method here has nothing to do with the Google Maps API"" */ 
    var markers = whereWhoWhenWhat.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length],
//       icon: markerImage
          });
        });
      
/* The marker clusterer manage the markers */
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

/*** Geolocation ***/
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function(position) {
            var pos = {
              lat: position.coords.latitude, /* device latitude */
              lng: position.coords.longitude /* device longitude */
            };
              
            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here!');
            infoWindow.open(map);
            map.setCenter(pos);
            //console.log(pos);
            //compareLocations(pos); /* <---this is is WORKING, but trying: *******/
            newCompareLocations(pos);
              
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
//            let errorText = 'It seems like the Geolocation service failed';
//            errorMessage(errorText);
          });
        } else {
          handleLocationError(false, infoWindow, map.getCenter());
//            let errorText = "Too bad. Your browser doesn't support Geolocation.";
//            errorMessage(errorText);
        }
      
} // end initMap

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }


function newCompareLocations(yourPosition){
    
    let userLatPosition = parsePosition(yourPosition.lat);
    let userLngPosition = parsePosition(yourPosition.lng);    
//    console.log(userLatPosition);
//    console.log(userLngPosition);

    for(i = 0; i < whereWhoWhenWhat.length; i++){
        let crumbLatPosition = parsePosition(whereWhoWhenWhat[i].lat);
        let crumbLngPosition = parsePosition(whereWhoWhenWhat[i].lng);
        let crumbId = whereWhoWhenWhat[i].crumbId; 
        let crumbDate = whereWhoWhenWhat[i].date; 
        let crumbUser = whereWhoWhenWhat[i].user; 
//        console.log(crumbLatPosition);
//        console.log(crumbLngPosition);
//        console.log(newIsCrumbNear(crumbLatPosition, crumbLngPosition, userLatPosition, userLngPosition, 2)); 
            
        /* kollar ifall i närhten */
        if(newIsCrumbNear(crumbLatPosition, crumbLngPosition, userLatPosition, userLngPosition, 1)){ /* = 1 km */

                    /* kollar ifall det är en ny */
                    //if(saveCrumbLocally(userLatPosition, userLngPosition)){
            /* Checking if it's been over 10 minutes since last pick up */        
            if(checkTimestamp()){
                pickUpCrumb(crumbId, crumbDate, crumbUser);
            }else{
                console.log("Wait 10 minutes");
            }
        }else{
            console.log("this is somewhere else")
        }
    }         
}

var storedTimestamp = [];

function storeTimestamp(){
    let timestamp = new Date;
    timestampJS = timestamp.getTime(); 
    storedTimestamp[0] = timestampJS;
    localStorage.setItem('storedTimestamp', JSON.stringify(storedTimestamp));
}

function checkTimestamp(){
    let timestamp = new Date;
    timestampJS = timestamp.getTime();
    
    if(!localStorage.getItem('storedTimestamp')){
        localStorage.setItem('storedTimestamp', JSON.stringify(storedTimestamp));
        storedTimestamp[0] = timestampJS;
        localStorage.setItem('storedTimestamp', JSON.stringify(storedTimestamp));
        return true;
    }else{
       let earlierTimestampJS = JSON.parse(localStorage.getItem('storedTimestamp'));
        let diffMs = (timestampJS - earlierTimestampJS); /* milliseconds between earler timestamp & current timestamp */
        let diffMins = diffMs/60000; /* convert milliseconds to minutes */
            if(diffMins > 10){
                return true; 
            }else{
                return false;
            } 
    }    
}


function pickUpCrumb(id, date, user) {
    let imageFileEnding = randomCrumbImage();
    let pickUpCrumbTest = `
        <div class="opacityOverMap"></div>
        <div class="foundCrumbMessage">
            <img src="images/crumb${imageFileEnding}.jpg">
            <p>Someone dropped something here! Pick it up!</p>
        </div>
    `;
    pickUpElement.insertAdjacentHTML('afterbegin', pickUpCrumbTest);
    pickUpElement.addEventListener('click', function () {
        fetchAndPrintInfo(id, date, user, imageFileEnding);
        storeTimestamp();
    })
} // end pickUpCrumb

// NTS: replace with HTTPS when uploading on oderland
function fetchAndPrintInfo(id, date, user, imageFileEnding){
     fetch('http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&mbid=' + id + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
         .then(response => response.json())
         .then(songData => {

             let crumbId = id;
             let crumbDate = date;
             let crumbUser = user;
             let fileEnding = imageFileEnding;
             let searchStringArtist = generateSearchString(songData.track.artist.name);
             let searchStringSongTitle = generateSearchString(songData.track.name);
             let trackId = songData.track.mbid;
             let trackName = songData.track.name;
             let artistName = songData.track.artist.name
             let artistId = songData.track.artist.mbid;
             let albumName = songData.track.album.title;
             let artistUrl = songData.track.artist.url;

             printOutOutput(crumbId, crumbDate, crumbUser, fileEnding, searchStringArtist, searchStringSongTitle,
                 trackId, trackName, artistName, artistId, albumName, artistUrl);
         })
         .catch(function (error) {
             let errorText = 'Something went wrong in the API connection.';
             errorMessage(errorText);
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

            <div class="details_wrapper">
            <p><span class="crumbFont">Congratulations! You found this song:</span></p>
            <p>"${trackName}" by <a href="${artistUrl}">${artistName}</a><br>

            <span class="mini">It was dropped here ${crumbDate} by ${crumbUser}.</span></p>
            <p><span class="crumbFont">Direct search on youtube:</span><br>
            <a target="_blank" href="https://www.youtube.com/results?search_query=${searchStringArtist}+${searchStringSongTitle}">
            <div class="youtube_logo"><img src="images/youtube_logo.jpg">
            </a></div>
            <span class="crumbFont">If you want to know more:</span>
            </p>
            </div>
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
                   

/**************** Fetch-functions for Explore Further Section ****************/

function fetchRecentlyPlayed(id) {
    fetch('http://ws.audioscrobbler.com/2.0/?method=User.getRecentTracks&user=' + id + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
        .then(response => response.json())
        .then(songData => {
            console.log(songData);
            let userId = id;
            let recentTrackArray = songData.recenttracks.track;
            printRecentlyPlayed(userId, recentTrackArray);
        })
        .catch(function (error) {
            let errorText = 'Something went wrong with the API when fetching users recent tracks.';
            errorMessage(errorText);
            console.log(error);
        })
}

function fetchArtistInfo(id) {
    fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&mbid=' + id + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
        .then(response => response.json())
        .then(songData => {
            let artistInfo = songData.artist.bio.summary;
            printArtistInfo(artistInfo);
        })
        .catch(function (error) {
            let errorText = 'Something went wrong in the API connection.';
            errorMessage(errorText);
            console.log(error);
        })
}

function fetchTags(id) {
    fetch('http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&mbid=' + id + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
        .then(response => response.json())
        .then(songData => {
            let songId = id;
            let tagArray = songData.track.toptags.tag;
            printTags(songId, tagArray);
        })
        .catch(function (error) {
            let errorText = 'Something went wrong in the API connection.';
            errorMessage(errorText);
            console.log(error);
        })
}

/***************** Print Out-functions for Explore Further Section *****************/

function printRecentlyPlayed(userId, recentTrackArray){
    const exploreFurtherDiv = document.createElement('div');
    for(i = 0; i < 5; i++){  
        let recentTrackRow = `
        <div class="recentTrackRow">
            <div class="recentTrackRow_number">${i+1}.</div> 
            <div class="recentTrackRow_artist">${recentTrackArray[i].artist['#text']}</div> 
            <div class="recentTrackRow_track">- ${recentTrackArray[i].name}</div>
        </div>
        `;
        exploreFurtherDiv.insertAdjacentHTML('beforeend', recentTrackRow); 
    }
    openFoundCrumb.appendChild(exploreFurtherDiv);     
}

function printArtistInfo(artistInfo){
    const exploreFurtherDiv = document.createElement('div'); 
    exploreFurtherDiv.classList.add('exploreFurtherDiv');
    
    artistInfo = artistInfo.substr(0, 275);
    let artistInfoOutput = `
        ${artistInfo}...
    `;
    exploreFurtherDiv.insertAdjacentHTML('beforeend', artistInfoOutput); 
    openFoundCrumb.appendChild(exploreFurtherDiv);  
}

//        <div class="artistInfoDiv">
//        ${artistInfo}
//        </div>

function printTags(songId, tagArray){
    const exploreFurtherDivTags = document.createElement('div');
    for(i = 0; i < tagArray.length; i++){ 
        let tagsForTrack = `
            <div class="tag tagDiv${[i]}" id="tagDiv${[i]}">
                ${tagArray[i].name}
            </div>
            `;
        exploreFurtherDivTags.insertAdjacentHTML('beforeend', tagsForTrack);
    }
    openFoundCrumb.appendChild(exploreFurtherDivTags);
}





/*************************** Small functions **********************************/
function randomCrumbImage(){
    return Math.floor((Math.random() * 7) + 1); 
}

/* This function should probably be built out to handle more "weird characters" */
function generateSearchString(string){
    let filterOutCharacters = string.replace('&', '').replace('/', ''); 
    let searchStringFormat = filterOutCharacters.split(' ').join('+');
    return searchStringFormat; 
}

/*
// WORKING; but not the way t should be done
function parseAndRoundOffPosition(latOrLng){
    let latOrLngParsed = parseFloat(latOrLng);
    let latOrLngRoundOff = latOrLngParsed.toFixed(2); // kalibrera detta värde???
    return latOrLngRoundOff;    
}
*/

/* the above function is replaced with these two below: */
function parsePosition(latOrLng){    
    let latOrLngParsed = parseFloat(latOrLng);
    return latOrLngParsed;    
}

function newIsCrumbNear(checkPointLat, checkPointLng, centerPointLat, centerPointLng, km){
    var ky = 40000 / 360;    
    var kx = Math.cos(Math.PI * centerPointLat / 180.0) * ky;
    var dx = Math.abs(centerPointLng - checkPointLng) * kx;
    var dy = Math.abs(centerPointLat - checkPointLat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}

//example stack overflow!!!!!!
//    function arePointsNear(checkPoint, centerPoint, km) {
//          var ky = 40000 / 360;
//          var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
//          var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
//          var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
//          return Math.sqrt(dx * dx + dy * dy) <= km;
//        }

function errorMessage(errorText){
    const body = document.getElementById('body');
    body.innerHTML = '';
        let errorOutput = `
        <div class="errorMessageBody">
            <div class="errorMessageDiv">
                <img src="images/crumb4.jpg">
                <p><span class="crumbFont">Sorry! You have just been served a slice of ERROR.</span></p>
                <p>Reason:</p>
                <p>${errorText}</p>
                <p><a href="#" onclick="window.location.reload(true);">Try to reload the page</a></p>
            </div>
        </div>
        `; // Or "Sorry! Say hello to ERROR."
        body.insertAdjacentHTML('afterbegin', errorOutput);     
}

/* My comment: Is it possible to add several variables to the same eventlistener? That would have been better. */
const inactive1 = document.getElementById('inactive1');
const inactive2 = document.getElementById('inactive2');
const inactive3 = document.getElementById('inactive3');
const inactive4 = document.getElementById('inactive4');

inactive1.addEventListener('click', function(){ 
     alert('Nope. This function is not available in demo version.')
}); 
inactive2.addEventListener('click', function(){ 
     alert('Nope. This function is not available in demo version.')
}); 
inactive3.addEventListener('click', function(){ 
     alert('Nope. This function is not available in demo version.')
}); 
inactive4.addEventListener('click', function(){ 
     alert('Nope. This function is not available in demo version.')
}); 




