// Required imports for the html
//<script src="https://maps.googleapis.com/maps/api/js?key={}&v=weekly"></script>
//    <script src="https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js"></script>

export function drawMap() {
  const map = new google.maps.Map(document.getElementById("map_container"), {
    zoom: 3,
    center: { lat: 32.789, lng: -122.123 },
  });
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  const locations = [];
  const labels = [];
  for (const card of card_container.children) {
    let loc = {
      lat: Number(card.getAttribute("lat")),
      lng: Number(card.getAttribute("lng")),
    };
    locations.push(loc);
    labels.push(card.id);
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
}
