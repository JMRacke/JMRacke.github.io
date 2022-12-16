// Required imports for the html
//<script src="https://maps.googleapis.com/maps/api/js?key={}&v=weekly"></script>
//    <script src="https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js"></script>

export function drawMap({ coords: { latitude: lat, longitude: lng } }) {
  const currentloc = { lat: lat, lng: lng };
  const map = new google.maps.Map(document.getElementById("map_container"), {
    zoom: 12,
    center: { lat: lat, lng: lng },
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
      labels.push(card.getElementByClassName("result-title"));
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
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
    });

    new markerClusterer.MarkerClusterer({ markers, map });
  } else {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: map,
    });
  }
}
