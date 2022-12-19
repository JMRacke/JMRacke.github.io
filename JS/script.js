//Search Form Sumbmit Handler
import { drawMap } from "./cards-and-maps/drawMap.js";
import {
  getRestaurants,
  noTrackGetRestaurants,
} from "./cards-and-maps/restaurant.js";
import { noTracking } from "./error-handling/error.js";

// This will turn on the initial location services to set the appropriate form or it will show the notracking form
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(() => {}, noTracking);
}

form_track.addEventListener("submit", (event) => {
  event.preventDefault();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getRestaurants, noTracking);
  }
});

form_noTrack.addEventListener("submit", (event) => {
  event.preventDefault();
  noTrackGetRestaurants(
    location_name_noTrack.value,
    restaurant_name_noTrack.value
  );
});

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(drawMap, noTracking);
// }
