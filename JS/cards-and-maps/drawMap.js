// Required imports for the html
//<script src="https://maps.googleapis.com/maps/api/js?key={}&v=weekly"></script>
//    <script src="https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js"></script>
import { getData } from "../api-helper/get-data.js";

let map;
export async function drawMap({ lat, lng }) {
  map = new google.maps.Map(document.getElementById("map_container"), {
    zoom: 9,
    center: {
      lat: lat,
      lng: lng,
    },
    mapId: `92d78e74df8df401`,
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  if (restaurant_results.children.length > 0) {
    const locations = [];
    const labels = [];
    let place_id = "";
    let label = "";
    let store_hours;

    for (const card of restaurant_results.children) {
      const loc = {
        lat: Number(card.getAttribute("lat")),
        lng: Number(card.getAttribute("lng")),
      };
      const name = card.children[1].children[0].textContent;
      const url = card.children[1].children[3].getAttribute("href");

      label = `
      <a href="${url}" target="_blank">${name}</a>
      <p>Hours</p>
      `;

      const place_id_url = `https://sde-final-backend.herokuapp.com/places?input=${name}&inputtype=textquery&circle=1000@${loc.lat},${loc.lng}`;
      await getData(place_id_url).then(
        await ((json) => {
          place_id = json.candidates[0].place_id;
        })
      );
      console.log(place_id);

      const hours_api_url = `https://sde-final-backend.herokuapp.com/id?place_id=${place_id}`;
      await getData(hours_api_url).then(
        await (({ result }) => {
          if (result.hasOwnProperty("current_opening_hours")) {
            store_hours = result.current_opening_hours.weekday_text;
          } else {
            store_hours = ["no hours"];
          }
        })
      );
      label = label.concat(getHours(store_hours));
      locations.push(loc);

      labels.push(label);
    }

    const markers = locations.map((position, i) => {
      const label = labels[i % labels.length];
      const marker = new google.maps.Marker({ position });

      marker.addListener("click", () => {
        infoWindow.setContent(label);
        infoWindow.open(map, marker);
      });
      return marker;
    });

    new markerClusterer.MarkerClusterer({ markers, map });
  } else {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
    });
  }
}

export function centerOnMarker({ lat, lng }) {
  map.panTo({ lat: lat, lng: lng });
  map.setZoom(15);
}

function getHours(hours) {
  if (hours[0] == "no hours") {
    return `<p>None Available</p>`;
  }
  let label_hours = "";
  for (let day of hours) {
    label_hours = label_hours.concat(`<p>${day}</p>`);
  }

  return label_hours;
}
