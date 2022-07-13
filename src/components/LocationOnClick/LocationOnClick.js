import { LatLng } from "leaflet";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";

export function LocationOnClick() {
  const [newLocation, SetNewLocation] = useState({});
  const map = useMapEvents({
    click: (event) => {
      console.log(event.latlng);
      SetNewLocation({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
      console.log("LOCATION", newLocation);
    },
  });
  return null;
}
