mapboxgl.accessToken = map_token;
const loc =new_data;


const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: loc.geometry.coordinates, // starting position [lng, lat]
  zoom: 4, // starting zoom
});
// Set marker options.
// Set marker options.
map.addControl(new mapboxgl.NavigationControl());
const marker = new mapboxgl.Marker({
  color: "#FF0000",
  draggable: true,
})
  .setLngLat(loc.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h2>${loc.title}</h2>`))
  .addTo(map);
