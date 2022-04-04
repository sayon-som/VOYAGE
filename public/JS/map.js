mapboxgl.accessToken =
  map_token;
const map = new mapboxgl.Ma({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
// Create a new marker.
// Set marker options.

const marker = new mapboxgl.Marker()
    .setLngLat([30.5, 50.5])
    .addTo(map);