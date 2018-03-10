/*

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


//fetch('http://ws.audioscrobbler.com/2.0/?method=User.getRecentTracks&user=VenusOfTheSoup&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
//.then(function(respone){ 
//    return respone.json(); 
//})
//.then(function(songData){ 
//    console.log(songData);
//    
//    console.log(songData.recenttracks.track[0].artist);
//    
//    console.log(songData.recenttracks.track[0].name);
//})
//.catch(function(error){
//    console.log(error);
//})

let songId = '68a14ccf-b8ad-4f70-8041-d0f3852e6ff1';

fetch('http://ws.audioscrobbler.com/2.0/?method=Track.getInfo&mbid=' + songId + '&api_key=e26b796f4961b23b890aa1fe985eb6ff&format=json')
.then(function(respone){ 
    return respone.json(); 
})
.then(function(songData){ 
    console.log(songData);
    
//    console.log(songData.recenttracks.track[0].artist);
//    
//    console.log(songData.recenttracks.track[0].name);
})
.catch(function(error){
    console.log(error);
})


