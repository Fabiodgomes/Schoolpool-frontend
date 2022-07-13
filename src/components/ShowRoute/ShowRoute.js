import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// props = {
//  points: [[lat, lng], [lat, lng], ...]
// }
export function ShowRoute(props) {
  const [route, setRoute] = useState();
  const map = useMap();
  useEffect(() => {
    if (map) {
      if (route) {
        map.removeControl(route);
      }
      console.log(L.Routing);
      const newRoute = L.Routing.control({
        show: false,
        waypoints: props.points.map((p) => L.latLng(p[0], p[1])),
      });
      newRoute.addTo(map);
      setRoute(newRoute);
    }
  }, [map, props.points]);
  return null;
}
