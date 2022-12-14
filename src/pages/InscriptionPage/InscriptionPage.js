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
  selectSchoolDetails,
  selectSchools,
} from "../../store/plannedTrip/selectors";
import { selectUser } from "../../store/user/selectors";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";
import { showMessageWithTimeout } from "../../store/appState/thunks";
import { ShowRoute } from "../../components/ShowRoute/ShowRoute";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./styles.css";
import axios from "axios";
import L from "leaflet";

export const InscriptionPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
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
  console.log("PLANNED TRIPS", plannedTripDetails);
  // console.log("SCHOOL DETAILS", schoolDetails);

  const capacity = plannedTripDetails?.capacity;

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

  const resetFields = () => {
    setNumberOfKids("");
    setLatitude("");
    setLongitude("");
  };

  const icon = L.icon({
    iconUrl:
      "https://amberbrantjes.nl/wp-content/uploads/2015/10/map-marker-icon.png",
    iconSize: [40, 40],
  });

  console.log();
  return (
    <>
      <div className="inscription-page">
        {plannedTripDetails && schools && schoolDetails ? (
          <div>
            <div className="inscription">
              <div>
                <PlannedTripInscription
                  departure={plannedTripDetails.address}
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
                  driverName={""}
                />
              </div>
              <div className="numberOfKids">
                <label>Number of Kids </label>
                <input
                  className="form-control form-control-sm"
                  // style={{ witdh: "20px" }}
                  type="number"
                  value={parseInt(numberOfKids)}
                  onChange={(event) => {
                    setNumberOfKids(event.target.value);
                  }}
                />
              </div>
            </div>
            <br />
            <h4>Choose the pick-up point in the map</h4>
            <Button
              className="button"
              variant="secondary"
              type="submit"
              onClick={() => {
                dispatch(
                  makeInscription(
                    id,
                    token,
                    numberOfKids,
                    latitude,
                    longitude,
                    capacity
                  )
                );
                resetFields();
              }}
            >
              Book a trip !
            </Button>
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
              <ShowRoute
                points={
                  latitude && longitude
                    ? [
                        [
                          plannedTripDetails.latitude,
                          plannedTripDetails.longitude,
                        ],
                        [latitude, longitude],
                        [schoolDetails.latitude, schoolDetails.longitude],
                      ]
                    : [
                        [
                          plannedTripDetails.latitude,
                          plannedTripDetails.longitude,
                        ],
                        [schoolDetails.latitude, schoolDetails.longitude],
                      ]
                }
              />
              <LocationOnClick />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                key={schoolDetails.id}
                position={[schoolDetails.latitude, schoolDetails.longitude]}
                icon={icon}
              >
                {" "}
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
