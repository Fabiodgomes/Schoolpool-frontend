import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

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
        createMarker: (i, wp) =>
          L.marker(wp.latLng, {
            icon: L.icon({
              iconUrl:
                "https://amberbrantjes.nl/wp-content/uploads/2015/10/map-marker-icon.png",
              iconSize: [40, 40],
            }),
          }),
      });
      newRoute.addTo(map);
      setRoute(newRoute);
    }
  }, [map, props.points]);
  return null;
}
