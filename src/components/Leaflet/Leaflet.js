import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export function Leaflet() {
  return (
    <MapContainer
      style={{
        border: "2px solid",
        borderRadius: "10px",
        height: "50vw",
        width: "60vw",
        maxWidth: "700px",
        maxHeight: "400px",
        margin: "0px 19.5%",
      }}
      center={[52.36994, 4.906]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
        crossorigin=""
      />
      <script
        src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
        integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
        crossorigin=""
      ></script>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
