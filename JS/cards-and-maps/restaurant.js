import { handleError } from "../error-handling/error.js";
import { drawMap } from "./drawMap.js";
import { getData } from "../api-helper/get-data.js";
import { NO_FOUND_RESTAURANTS } from "../global-constants/constants.js";

const locationCoords = {
  lat: 0,
  lng: 0,
};

export function getRestaurants({ coords: { latitude: lat, longitude: lon } }) {
  locationCoords.lat = Number(lat);
  locationCoords.lng = Number(lon);
  const meters = calculateRadius(search_range_Track.value);

  const apiUrl = `https://sde-final-backend.herokuapp.com/api?term=${restaurant_name.value}&latitude=${lat}&longitude=${lon}&radius=${meters}&open_now=true&sort_by=best_match&limit=20`;

  handleUrl(apiUrl);
}

export function noTrackGetRestaurants(searchlocation, searchTerm) {
  const meters = calculateRadius(search_range_noTrack.value);
  const apiUrl = `https://sde-final-backend.herokuapp.com/api?location=${searchlocation}&radius=${meters}&term=${searchTerm}&open_now=true&sort_by=best_match&limit=20`;

  handleUrl(apiUrl);
}

function handleUrl(url) {
  getData(url).then((json_payload) => {
    const restaurants = json_payload.businesses;
    const apiError = json_payload.error;

    if (apiError) {
      handleError();
    } else if (!restaurants || restaurants.length === 0) {
      handleError(NO_FOUND_RESTAURANTS);
    } else {
      showRes(restaurants);
    }
  });
}

function showRes(restaurants) {
  restaurant_results.innerHTML = "";
  map_container.innerHTML = "";

  for (const rest of restaurants) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "card grid-item";
    cardContainer.setAttribute("style", "width: 18rem; height: 22rem;");
    cardContainer.setAttribute("lat", `${rest.coordinates.latitude}`);
    cardContainer.setAttribute("lng", `${rest.coordinates.longitude}`);
    cardContainer.innerHTML = `
    <a href="${rest.url}" method="get" target="_blank"><img src="${rest.image_url}" class="card-img-top card-img" alt="the img of ${rest.name}"></a>
      <div class="card-body">
         <h5 class="card-title">${rest.name}</h5>
         <h6 class="card-subtitle mb-2 text-muted">${rest.location.display_address}</h6>
         <h6 class="card-subtitle mb-2 text-muted">${rest.phone}</h6>
         
         <form action="${rest.url}" method="get" target="_blank">
         <button class="card-btn" type="submit">more info</button>
         </form>

         <a href="#map_container" class="card-link">Map</a>

         <div>
      </div>`;
    restaurant_results.appendChild(cardContainer);
  }

  if (locationCoords.lat == 0 && locationCoords.lng == 0) {
    locationCoords.lat = Number(
      restaurant_results.children[0].getAttribute("lat")
    );
    locationCoords.lng = Number(
      restaurant_results.children[0].getAttribute("lng")
    );
  }
  drawMap(locationCoords);
}

function calculateRadius(miles) {
  let meters = Math.floor(miles * 1609.34);
  if (meters > 40000) {
    meters = 40000;
  }
  return meters;
}
