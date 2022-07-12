import { useState } from "react";
import { useMapEvents } from "react-leaflet";

export function LocationOnClick() {
  const [newLocation, SetNewLocation] = useState();
  const map = useMapEvents({
    click: (event) => {
      console.log(event.latlng);
      SetNewLocation(event.latlng);
      console.log(newLocation);
    },
  });
  return null;
}
