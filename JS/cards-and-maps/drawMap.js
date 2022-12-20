// Required imports for the html
//<script src="https://maps.googleapis.com/maps/api/js?key={}&v=weekly"></script>
//    <script src="https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js"></script>
let map;
export function drawMap({ lat, lng }) {
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
    for (const card of restaurant_results.children) {
      let loc = {
        lat: Number(card.getAttribute("lat")),
        lng: Number(card.getAttribute("lng")),
      };
      locations.push(loc);
      labels.push(card.children[1].children[0].textContent);
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
