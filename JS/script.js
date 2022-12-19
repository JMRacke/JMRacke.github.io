//Search Form Sumbmit Handler
import { drawMap } from "./cards-and-maps/drawMap.js";
import { getRestaurants, noTrackGetRestaurants } from "./cards-and-maps/restaurant.js";
import { noTracking } from "./error-handling/error.js";



form_track.addEventListener("submit", (event) => {

  event.preventDefault();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getRestaurants, noTracking);
  } 

});

form_noTrack.addEventListener("submit", (event) => {
  event.preventDefault();
  noTrackGetRestaurants(location_name_noTrack.value, restaurant_name_noTrack.value);
  
});

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(drawMap, noTracking);
// } 
