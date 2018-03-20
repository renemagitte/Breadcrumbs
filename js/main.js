    fetch('http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&artist=Denim&track=Internet+curtains&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
        .then(response => response.json())
        .then(songData => {
            console.log(songData);
        })
        .catch(function (error) {
            console.log(error);
        })

/******************** Array of info ***************************/
/* In Alpha version, this array data is fetched from database */

var whereWhoWhenWhat = [
//    {lat: 59.34588819999999, lng: 18.058012599999998, user: 'VenusOfTheSoup', date: '13/3 2018', 
//     crumbId: '6161a743-23fc-458f-8aed-eeac7782bca0'}, /* bruce haack - program me */
    {lat: 59.34588819999999, lng: 18.058012599999998, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: 'c4610d30-0831-4913-b177-542ce1fab4db'}, /* bruce haack - school for robots */
    {lat: 59.315189, lng: 18.043007200000034, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '50ee013e-6d25-4a2e-9a98-6015801fa255'}, /* the gist - love at first sight */
    {lat: 59.319595, lng: 18.070485299999973, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '2d905c53-4d75-4982-bc60-898119ad4a97'}, /* skatebård - data italia */
    {lat: 59.29323549999999, lng: 18.0812138, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '9396958e-95be-405a-a0f2-abf41bf24d33'}, /* kraftwerk - computer love */
    {lat: 59.33178700000001, lng: 18.086991500000067, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '224ab66d-c764-4258-b82f-efa89047f36c'}, /* software - island sunrise */
    {lat: 59.3447535, lng: 18.098191799999995, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '224bc68e-5d9c-42de-b8ce-350e3f36c97b'}, /* file not found - give me sign */
    {lat: 59.29380129999998, lng: 18.014540600000032, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '10cd695c-5784-40f9-9776-b3240ca0fa40'}, /* fleetwood mac - family man */
    {lat: 59.3550448, lng: 18.01459049999994, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '---Factory Floor---Heart of data'}, /* factory floor - heart of data */
    {lat: 59.3318129, lng: 18.0265938, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: 'cef51eff-ced3-48ee-9f00-f3cb45b6ee6d'}, /* Macintosh Plus — リサフランク420 / 現代のコンピュー */
    {lat: 59.32412109999999, lng: 18.101595299999985, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '894d769e-bb8e-4140-8c4f-52caced82af2'}, /* kate bush - deeper understanding (text) */
    {lat: 59.3178415, lng: 18.08591039999999, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: 'a38f8b5b-a2d4-4757-977d-a2a65e11eb0d'}, /* pet shop boys - opportunities (text) */
    {lat: 59.3329563, lng: 17.980345199999988, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: 'e8f20a87-e5c9-4697-9e11-807b13573b3a'}, /* 6th Borough Project - the callback */
    {lat: 59.2583266, lng: 18.083452299999976, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '---The Magnetic Fields---Technical (You\'re so)'}, /* magnetic fields - technical (you're so) */
    {lat: 59.2795448, lng: 18.00356529999999, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '---Legowelt---Computerized paradise'}, /* legowelt - computerized paradise */
    {lat: 59.27438780000001, lng: 18.133848599999965, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '---The internet---Girl'}, /* the internet - girl */
    {lat: 59.2744378, lng: 17.901997299999948, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '6d4e507f-f424-40ee-90f9-51e7ad75482b'}, /* casco - cybernetic love */
    {lat: 59.30790299999999, lng: 18.15604189999999, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '---Software Seduction---Try'}, /* software seduction - try */
    {lat: 59.38292819999999, lng: 17.964470699999993, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '62ec8081-b946-4294-a817-7cd01248e998'}, /* carole king - computer eyes */
    {lat: 59.2632336, lng: 18.04249600000003, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '4082758d-de91-448a-bafa-6436f6400c41'}, /* com truise - data kiss */
    {lat: 59.39876100000001, lng: 18.036410499999988, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '---Jamie Jupitor---Computer Power (Instrumental)'}, /* jamie jupitor - computer power (instrumental) */
   {lat: 59.39876100000001, lng: 18.036410499999988, user: 'VenusOfTheSoup', date: '13/3 2018', 
     crumbId: '295d531e-81ef-47ca-94bb-b062ebfc13c9'} /* the beach boys - surf's up */
    ]

/************************* Map ************************************/

  var map;
  var infoWindow;

  function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 59.34588819999999, lng: 18.058012599999998}, /* sets out default position */
          zoom: 12 /* and default zoom */
      });
      infoWindow = new google.maps.InfoWindow;

      /*** Setting up crumb markers ***/
      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; /* marker name string */

      /* Adding markers, using the labels above: 
      "The code uses the JavaScript Array.prototype.map() method to create an array of markers based on a given "locations" 
      [in this code: whereWhoWhenWhat] array. The map() method here has nothing to do with the Google Maps API" */
      var markers = whereWhoWhenWhat.map(function (location, i) {
          return new google.maps.Marker({
              position: location,
              label: labels[i % labels.length],
          });
      });

      /* The marker clusterer manage the markers */
      var markerCluster = new MarkerClusterer(map, markers, {
          imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      });

      /*** Geolocation ***/
      if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function (position) {
              var pos = {
                  lat: position.coords.latitude, /* device latitude */
                  lng: position.coords.longitude /* device longitude */
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent('You are here!');
              infoWindow.open(map);
              map.setCenter(pos);

              showPage(); /* Function that will display map-element in DOM when getCurrentPosition is done */

              /**********************************************************************************************/
              /* Hello myself & world!                                                                      */
              /* For getting and testing the location you're at:                                            */
              /* 1. Run this console.log:                                                                   */
              // console.log(pos);
              /* 2. Insert logged positions on some row in lat/lng properties in whereWhoWhenWhat-array ^   */
              /* 3. Reload page                                                                             */
              /**********************************************************************************************/

              compareLocations(pos);

          }, function () {
              let errorText = 'It seems like the Geolocation service failed';
              errorMessage(errorText);
          });
      } else {
          let errorText = "Too bad. Your browser doesn't support Geolocation.";
          errorMessage(errorText);
      }
  } 

/***************** Display page after loading **********************************/

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderMessage").style.display = "none";
    document.getElementById("map").style.display = "block";
}

/*********************** Location functions ***********************************/

function compareLocations(yourPosition){
    
    const noCrumbAround = document.getElementById("noCrumbAround");
    
    let userLatPosition = parsePosition(yourPosition.lat);
    let userLngPosition = parsePosition(yourPosition.lng);    

    for(i = 0; i < whereWhoWhenWhat.length; i++){
        let crumbLatPosition = parsePosition(whereWhoWhenWhat[i].lat);
        let crumbLngPosition = parsePosition(whereWhoWhenWhat[i].lng);
        let crumbId = whereWhoWhenWhat[i].crumbId; 
        let crumbDate = whereWhoWhenWhat[i].date; 
        let crumbUser = whereWhoWhenWhat[i].user;
        
        /* Checking if there is any crumb around... */
        if(isCrumbNear(crumbLatPosition, crumbLngPosition, userLatPosition, userLngPosition, 1)){ /* = 1 km */

            noCrumbAround.classList.add('hide');
            
            /* Checking if it's been over 10 minutes since last pick up */        
            if(checkTimestamp()){
                pickUpCrumb(crumbId, crumbDate, crumbUser);
            }else{
                alert("Please cherish the last crumb you picked up for at least 10 minutes before picking up another one.");
            }
        }else{
            noCrumbAround.classList.add('block');
        }  
    }   
}

function isCrumbNear(checkPointLat, checkPointLng, centerPointLat, centerPointLng, km){
    var ky = 40000 / 360;    
    var kx = Math.cos(Math.PI * centerPointLat / 180.0) * ky;
    var dx = Math.abs(centerPointLng - checkPointLng) * kx;
    var dy = Math.abs(centerPointLat - checkPointLat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}

/************************* Timestamp ********************************/

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

/****************** Crumb: Pick up, fetch & print functions ************************/

const pickUpElement = document.getElementById('pickUpElement');

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
}

function fetchAndPrintInfo(id, date, user, imageFileEnding){
    
    var fetchUrl = `http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&mbid=${id}&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json`;
    
    /* If the track did not have an id (mbid) then format the fetch url */
    if(id.substr(0,3) == '---'){
        fetchUrl = getFetchUrl(id);
    }

    fetch(fetchUrl)
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
}

/* This function is for tracks that did not have an id/mbid. They're stored in array starting 
with --- (could have been something else!) for recognizion, and then they will be transformed 
in this function to return an alternative fetch-url adjusted to search for artist/trackname instead of mbid */
function getFetchUrl(id){
        id = id.replace('---', ''); /* removes "recognizion flag" */
        let arrayOfAlt = id.split('---'); /* split where --- marks end of artistname, beginning of trackname */
        var altArtist = generateSearchString(arrayOfAlt[0]); 
        var altTrackName = generateSearchString(arrayOfAlt[1]);
        
        url = `http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&artist=${altArtist}&track=${altTrackName}&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json`;

        return url;   
}
                          
function printOutOutput(crumbId, crumbDate, crumbUser, fileEnding, searchStringArtist, searchStringSongTitle,
            trackId, trackName, artistName, artistId, albumName, artistUrl){
    
    let pickUpCrumbOutput = `
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
    pickUpElement.insertAdjacentHTML('afterbegin', pickUpCrumbOutput); 

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
    
    seeRecentlyPlayedButton.addEventListener('click', function(){ 
        fetchRecentlyPlayed(crumbUser);
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
            let userId = id;
            let recentTrackArray = songData.recenttracks.track;
            printRecentlyPlayed(userId, recentTrackArray);
        })
        .catch(function (error) {
            let errorText = 'Something went wrong with the API when fetching users recent tracks.';
            errorMessage(errorText);
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
        })
}

/******************* Print Out-functions for Explore Further Section *****************/
/* There's a bug here? These sections doesn't seem to work perfectly all the time */

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

function printTags(songId, tagArray){
    const exploreFurtherDivTags = document.createElement('div');
    for(i = 0; i < tagArray.length; i++){ 
        let tagsForTrack = `
            <div class="tag">
                ${tagArray[i].name}
            </div>
            `;
        exploreFurtherDivTags.insertAdjacentHTML('beforeend', tagsForTrack);
    }
    openFoundCrumb.appendChild(exploreFurtherDivTags);
}


/*************************** Small functions **********************************/

function randomCrumbImage(){
    return Math.floor((Math.random() * 6) + 1); 
}

/* This function should probably be built out to handle more "weird characters" */
function generateSearchString(string){
    let filterOutCharacters = string.replace('&', '').replace('/', ''); 
    let searchStringFormat = filterOutCharacters.split(' ').join('+');
    return searchStringFormat; 
}

function parsePosition(latOrLng){    
    let latOrLngParsed = parseFloat(latOrLng);
    return latOrLngParsed;    
}

/************************ Errors & such  *****************************************/

function errorMessage(errorText){
    const body = document.getElementById('body');
    body.innerHTML = '';
        let errorOutput = `
        <div class="errorMessageBody">
            <div class="errorMessageDiv">
                <img src="images/alwayssadcrumb.jpg">
                <p><span class="crumbFont">Sorry! Say hello to ERROR.</span></p>
                <p>Reason:</p>
                <p>${errorText}</p>
                <p><a href="#" onclick="window.location.reload(true);">Try to reload the page</a></p>
            </div>
        </div>
        `;
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