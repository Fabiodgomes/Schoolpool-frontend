import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LocationOnClick } from "../LocationOnClick/LocationOnClick";
import { ShowRoute } from "../ShowRoute/ShowRoute";

export function Leaflet(props) {
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
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css"
      />
      <script
        src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
        integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
        crossorigin=""
      ></script>
      <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
      {props.locationOnClick}
      {/* <ShowRoute points={[lat, lng],[lat,lng],..} /> */}

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {props.schoolDetails?.map((schoolD) => (
        <Marker
          key={schoolD.id}
          position={[schoolD.latitude, schoolD.longitude]}
        >
          {" "}
        </Marker>
      ))} */}
    </MapContainer>
  );
}

// {
//  {schoolDetails?.map((schoolD) => (
//                 <Marker
//                   key={schoolD.id}
//                   position={[schoolD.latitude, schoolD.longitude]}
//                 >
// }
{
  /* <Popup>
                    <img
                      alt={schoolD.name}
                      style={{ width: "100px", borderRadius: "0.5em" }}
                      src={schoolD.imageUrl}
                    />
                    <p>{schoolD.name}</p>
                  </Popup> */
}
{
  /* </Marker>
              ))} */
}
