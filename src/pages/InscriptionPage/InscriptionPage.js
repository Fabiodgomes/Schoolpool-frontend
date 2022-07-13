import { useDispatch, useSelector } from "react-redux";
import { PlannedTripInscription } from "../../components/PlannedTripInscription/PlannedTripInscription";
import {
  fetchPlannedTripDetail,
  fetchAllScheduledTrips,
  makeInscription,
  fetchAllSchools,
  fetchSchoolDetails,
} from "../../store/plannedTrip/actions";
import {
  selectPlannedTripDetails,
  selectSchoolDetails,
  selectSchools,
} from "../../store/plannedTrip/selectors";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";
import { showMessageWithTimeout } from "../../store/appState/thunks";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

export const InscriptionPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const schools = useSelector(selectSchools);
  const plannedTripDetails = useSelector(selectPlannedTripDetails);
  const schoolDetails = useSelector(selectSchoolDetails);
  const { id } = useParams();
  const [numberOfKids, setNumberOfKids] = useState(0);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [newLocation, SetNewLocation] = useState();

  console.log("ID", id);
  useEffect(() => {
    dispatch(fetchPlannedTripDetail(id, token));
    dispatch(fetchAllScheduledTrips(token));
    dispatch(fetchAllSchools(token));
  }, [dispatch]);
  // console.log("SCHOOOOLS", schools);
  // console.log("PLANNED TRIPS", plannedTripDetails);
  // console.log("SCHOOL DETAILS", schoolDetails);

  function LocationOnClick() {
    const map = useMapEvents({
      click: (event) => {
        console.log(event.latlng);
        setLatitude(event.latlng.lat);
        setLongitude(event.latlng.lng);
        console.log("latitude & longitude", latitude, "&", longitude);
      },
    });
    return null;
  }

  return (
    <>
      <div>
        {plannedTripDetails && schools && schoolDetails ? (
          <div>
            <div>
              <PlannedTripInscription
                departure={plannedTripDetails.longitude}
                school={
                  schools.find(
                    (school) => school.id === plannedTripDetails.schoolId
                  ).name
                }
                date={plannedTripDetails.date}
                time={plannedTripDetails.time}
                capacity={plannedTripDetails.capacity}
                schoolImage={
                  schools?.find(
                    (school) => school.id === plannedTripDetails.schoolId
                  ).imageUrl
                }
              />
            </div>
            <label>Number of Kids</label>
            <input
              type="number"
              value={parseInt(numberOfKids)}
              onChange={(event) => {
                setNumberOfKids(event.target.value);
              }}
            />
            <label>Latitude</label>
            <input
              type="number"
              value={latitude}
              onChange={(event) => {
                setLatitude(event.target.value);
              }}
            />
            <label>Longitude</label>
            <input
              type="number"
              value={longitude}
              onChange={(event) => {
                setLongitude(event.target.value);
              }}
            />
            <button
              type="submit"
              onClick={() => {
                dispatch(
                  makeInscription(id, token, numberOfKids, latitude, longitude)
                );
                dispatch(
                  showMessageWithTimeout(
                    "success",
                    true,
                    `${numberOfKids} kid(s) registered on the trip`,
                    2000
                  )
                );
              }}
            >
              Book
            </button>
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
              {/* <ShowRoute points={[lat, lng],[lat,lng],..} /> */}
              <LocationOnClick />
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
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </>
  );
};
