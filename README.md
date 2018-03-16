kort beskrivning av applikationen, dess syfte och funktionalitet.
punktlista med vilka teknologier du använt.
kort beskrivning av det API/APIer du använt samt länk till dem.
kortfattat om din arbetsprocess och vad som skulle kodmässigt kunna förbättras. Man kan t.ex. ha en "TODO"-sektion i ens README med saker som skulle kunna implementeras om tid fanns.

# "Breadcrumbs"
by Ida Bergström

Link to repository: https://github.com/renemagitte/ida_bergstrom_ajax

** länk till projektet live på GitHub Pages **

**kort beskrivning av applikationen, dess syfte och funktionalitet.**

#### Description:
This page is my idea of a mixtape meeting my belief of what Pokémon Go is like (which I've never played).
This is just a demo version so there are only a few preset crumbs here but in a real version one user can "drop" "crumbs" (for example the song they're currently listening to) on the location they're currently on (or pick a position somewhere else, anywhere on earth!) and then their friends can
follow their tracks (yes, in two senses!) and come to pick the "crumb" up. Once they're at the location they will be able to access the track that the crumb consist of.

##### API:s:

[Google Maps Geolocation][https://developers.google.com/maps/documentation/javascript/examples/map-geolocation]

Google maps api that creates a map and marks the position the device is on. 

[Google Maps Marker Clustering][https://developers.google.com/maps/documentation/javascript/marker-clustering]

Google Maps api that creates multiple markers on the map. These are the positions for the dropped crumbs on my page.

[Last.fm API][https://www.last.fm/sv/api]

I use this api to fetch info about track, artist info, tags connected to the track and recently played songs.

<!--
Simple Icons
https://developers.google.com/maps/documentation/javascript/examples/icon-simple
-->

##### Work progress:
* I could structur my work much better from the start to avoid problems further on. CSS I'm talking about you.
* Better semantics regarding HTML5. I should have used headings, nav-tags and so on...
* I built my code around the fact that all songs from the last.fm-api came with an unique id (called "mbid").
Later on I realised that not all song have got an mbid which was quite disappointing (it just says mbid: "" in the API). So this verison only works with songs that has got an id.



##### Todo, if there was time:
* Make so that the user can "drop" their own "crumb": a whole new page with input fields would need to be created, not least to say a database where the "crumbs" can be stored instead of the preset little array in this demoverison. 
* Connect the application to several different API:s! This demoverion had a kind of "lost mixtape" thought to it, but a crumb could be anything really: a photo, a poem, just a small note, a link... anything! Fetched from database or from photo roll on users mobile e.g.
* A page for "crumb collection" where user can view the history of their picked up/dropped crumbs, what it consisted of.
* Make so that the markers disappear form the map once a crumb has been picked up. Once a crumb has been picked up, it's sent off to the "crumb collection" and can't be picked up again (by that user).
* Make "dropping user" to be able to set options for difficulty to detect crumb. How near one must be to detect it. And if the marker should appear at all at the map! Maybe you just want the crumb to appear if the other user happen to pass without knowing there's a "crumb" dropped there.
* User-stuff: Not everyone can see every other persons dropped "crumbs" of course. But you can select who you want to follow and you can follow you in return. And select crumb settings so that they can be meant exclusivly for one of your followers, or if they're more public so that all your followers can go get it.
* Enroll a graphic design course in order to create a better design.