## "Breadcrumbs"
by Ida Bergström

Link to repository: https://github.com/renemagitte/ida_bergstrom_ajax

Link to GitHub Pages: ** länk till projektet live på GitHub Pages **

#### Description:
This page is my idea of a mixtape meeting my belief of what Pokémon Go is like (which I've never played).
This is just a demo version so there are only a few preset crumbs here but in a real version one user can "drop" "crumbs" (for example the song they're currently listening to) on the location they're currently on (or pick a position somewhere else, anywhere on earth!) and then their friends can follow their tracks (yes, in two senses!) and come to pick the "crumb" up. Once they're at the location they will be able to access the track that the crumb consist of.

##### Technologies:
* Vanilla Javascript
* API calls using fetch()
* (Secured my domain with https instead of http, in order to get Google Maps geolocation to work)

##### API:s:
[Google Maps Geolocation](https://developers.google.com/maps/documentation/javascript/examples/map-geolocation)
Google maps api that creates a map and marks the position the device is on. 

[Google Maps Marker Clustering](https://developers.google.com/maps/documentation/javascript/marker-clustering)
Google Maps api that creates multiple markers on the map. These are the positions for the dropped crumbs on my page.

[Last.fm API](https://www.last.fm/sv/api)
I use this api to fetch info about track, artist info, tags connected to the track and recently played songs.

##### Work progress:
* I could structure my work much better from the start to avoid problems further on. CSS I'm talking about you.
* Since I prefered to start coding instead of thinking, I ended up writing two verisons of the way crumbs are detected,
 several functions were written only to be erased and rewritten. 
* Better semantics regarding HTML5. I should have used headings, nav-tags and so on...
* I built my code around the fact that all songs from the last.fm-api came with an unique id (called "mbid").
Later on I realised that not all song have got an mbid which was quite disappointing (it just says mbid: "" in the API). So this verison only works with songs that has got an id.
* I spent time on trying to figure out how to get local storage to work (which I never did anyways!) instead of delivering the page on time :(
* Much trial and error: tried watchPosition instead of getCurrentPosition but it caused other problems.

##### Todo, if there was time:
* There's a bug when looking at artistinfo/tags/recently played. Need to sort that out.
* Sometimes, the fetching of the position is INCREDIBLY slow... I need to check up on that.
* ...so the page really needs some kind of loading indicator!
* Save timestamp for pick up in local storage and then empty after 10 minutes.
* Make so that the user can "drop" their own "crumb": a whole new page with input fields would need to be created, not least to say a database where the "crumbs" can be stored instead of the preset little array in this demoversion. 
* Connect the application to several different API:s! This demoversion had a kind of "lost mixtape" take to it, but a crumb could be anything really: a photo, a poem, just a small note, a link... anything! Fetched from database or from photo roll on users mobile e.g.
* A page for "crumb collection" where user can view the history of their picked up/dropped crumbs, what it consisted of.
* Make so that the markers disappear form the map once a crumb has been picked up. Once a crumb has been picked up, it's sent off to the "crumb collection" and can't be picked up again (by that user).
* Make "dropping user" to be able to set options for difficulty to detect crumb. How near one must be to detect it. And if the marker should appear at all at the map! Maybe you just want the crumb to appear if the other user happen to pass without knowing there's a "crumb" dropped there (only works if application is open ofcourse...)
* User-stuff: Not everyone can see every other persons dropped "crumbs" of course. But you can select who you want to follow and you can follow you in return. And select crumb settings so that they can be meant exclusivly for one of your followers, or if they're more public so that all your followers can go get it.
* Enroll a graphic design course in order to create a better design.