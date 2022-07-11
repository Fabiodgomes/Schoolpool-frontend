import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { PlannedTripInscription } from "../../components/PlannedTripInscription/PlannedTripInscription";
import {
  fetchPlannedTripDetail,
  fetchAllScheduledTrips,
  makeInscription,
  fetchAllSchools,
} from "../../store/plannedTrip/actions";
import {
  selectPlannedTripDetails,
  selectSchools,
} from "../../store/plannedTrip/selectors";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";
import { showMessageWithTimeout } from "../../store/appState/thunks";

export const InscriptionPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const schools = useSelector(selectSchools);
  const plannedTripDetails = useSelector(selectPlannedTripDetails);
  const { id } = useParams();
  const [numberOfKids, setNumberOfKids] = useState(0);

  useEffect(() => {
    dispatch(fetchPlannedTripDetail(id, token));
    dispatch(fetchAllScheduledTrips(token));
    dispatch(fetchAllSchools(token));
  }, [dispatch]);
  console.log("SCHOOOOLS", schools);
  console.log("PLANNED TRIPS", plannedTripDetails);

  return (
    <>
      <div>
        {plannedTripDetails && schools ? (
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
            <input
              type="number"
              value={parseInt(numberOfKids)}
              onChange={(event) => {
                setNumberOfKids(event.target.value);
              }}
            />
            <button
              type="submit"
              onClick={() => {
                dispatch(makeInscription(id, token, numberOfKids));
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
              <script
                src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
                integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
                crossorigin=""
              ></script>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                key={"school"}
                position={["52.361483166361666", "4.936166340458636"]}
              >
                <Popup>
                  <img
                    alt={"yeah"}
                    style={{ width: "100px", borderRadius: "0.5em" }}
                    src={
                      "https://www.watjijwilt.amsterdam/wp-content/uploads/2019/11/Multatuli-1.jpg"
                    }
                  />
                  <p>
                    {"TEEST"} {"Trying"}
                  </p>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </>
  );
};
