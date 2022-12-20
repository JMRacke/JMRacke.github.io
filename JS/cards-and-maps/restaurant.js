import { handleError } from "../error-handling/error.js";
import { drawMap } from "./drawMap.js";
import { getData } from "../api-helper/get-data.js";
const locationCoords = {
  lat: 0,
  lng: 0,
};
export function getRestaurants({ coords: { latitude: lat, longitude: lon } }) {
  locationCoords.lat = Number(lat);
  locationCoords.lng = Number(lon);

  const apiUrl = `https://sde-final-backend.herokuapp.com/api?term=${restaurant_name.value}&latitude=${lat}&longitude=${lon}&radius=40000&open_now=true&sort_by=best_match&limit=20`;
  getData(apiUrl)
  .then(({businesses}) => {
    showRes({businesses});
  })
}

export function noTrackGetRestaurants(searchlocation, searchTerm) {
  const apiUrl = `https://sde-final-backend.herokuapp.com/api?location=${searchlocation}&term=${searchTerm}&open_now=true&sort_by=best_match&limit=10`;
getData(apiUrl)
.then(({businesses}) => {
  showRes({businesses});
})
 
}

function showRes({ businesses }) {
  restaurant_results.innerHTML = "";
  map_container.innerHTML = "";

  for (const rest of businesses) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "card";
    cardContainer.setAttribute(
      "style",
      "width: 18rem; border: 5px solid blue;"
    );
    cardContainer.setAttribute("lat", `${rest.coordinates.latitude}`);
    cardContainer.setAttribute("lng", `${rest.coordinates.longitude}`);
    cardContainer.innerHTML = `
      <img src="${rest.image_url}" class="card-img-top" alt="A poster of the movie by the name of ${rest.name}">
      <div class="card-body">
          <h5 class="card-title">${rest.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${rest.location.display_address}</h6>
        <h6 class="card-subtitle mb-2 text-muted">${rest.phone}</h6>
        
          <a href="${rest.url}" target="_blank" class="card-link">Card link</a>
          <a href="#map_container" class="card-link">Map</a>
      </div>`;
    restaurant_results.appendChild(cardContainer);
  }
  debugger;
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
