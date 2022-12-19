import { handleError } from "../error-handling/error.js";

export function getRestaurants({coords:{latitude:lat, longitude:lon}}) {
    const options = {
      method: 'GET',
      headers: {
        'accept' : 'application/json',
        'Authorization': 'Bearer 4sfLxKbsAK5p6bIVD8BX0tqRE4uIHdY1xEODX6SoLqe1EiM-pbBrQaF6EcbKp21875SXDIVINCGwVe2-8LlMCcNZu2q--nqBaznHD349PbHlxaLFX88-LOywtnubY3Yx'
        
      }
    };
    
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${restaurant_name.value}&latitude=${lat}&longitude=${lon}&radius=40000&open_now=true&sort_by=best_match&limit=20`
  
    fetch(apiUrl, options)
    .then(res => res.json())
    .then(json => {
      if (json.error) {
        handleError(json.error);
      } else {
        debugger;
        showRes(json);
      }
    })
    .catch(err => console.error(err));
  
  }
  
  export function noTrackGetRestaurants(searchlocation, searchTerm) {
    debugger;
    const options = {
        method: 'GET',
        headers: {
          'accept' : 'application/json',
          'Authorization': 'Bearer 4sfLxKbsAK5p6bIVD8BX0tqRE4uIHdY1xEODX6SoLqe1EiM-pbBrQaF6EcbKp21875SXDIVINCGwVe2-8LlMCcNZu2q--nqBaznHD349PbHlxaLFX88-LOywtnubY3Yx'
          
        }
      };
    
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${searchlocation}&term=${searchTerm}&open_now=true&sort_by=best_match&limit=20`

    fetch(apiUrl, options)
    .then(res => res.json())
    .then(json => {
      if (json.error) {
        handleError(json.error);
      } else {
        debugger;
        showRes(json);
      }
    })
    .catch(err => console.error(err));

    
  }
  
  function showRes({businesses}) {
    for (const rest of businesses) {
      
        const cardContainer = document.createElement("div");
      cardContainer.className = "card";
      cardContainer.setAttribute("style", "width: 18rem; border: 5px solid blue;" );
      cardContainer.setAttribute("lat", `${rest.coordinates.latitude}`)
      cardContainer.setAttribute("lng", `${rest.coordinates.longitude}`)
      cardContainer.innerHTML = `
      <img src="${rest.image_url}" class="card-img-top" alt="A poster of the movie by the name of ${rest.name}">
      <div class="card-body">
          <h5 class="card-title">${rest.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${rest.location.display_address}</h6>
        <h6 class="card-subtitle mb-2 text-muted">${rest.phone}</h6>
        
          <a href="${rest.url}" class="card-link">Card link</a>
      </div>`
      restaurant_results.appendChild(cardContainer);
      } 
}