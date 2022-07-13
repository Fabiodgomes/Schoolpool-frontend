import {
  fetchAllSchools,
  newPlannedTrip,
} from "../../store/plannedTrip/actions";
import { useEffect } from "react";
import { selectToken } from "../../store/user/selectors";
import { selectSchools } from "../../store/plannedTrip/selectors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Col } from "react-bootstrap";
import { showMessageWithTimeout } from "../../store/appState/thunks";
import { Leaflet } from "../Leaflet/Leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { ShowRoute } from "../ShowRoute/ShowRoute";

export default function NewPlannedTrip() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [schoolId, setSchoolId] = useState(1);
  const [transportationTypeId, setTransportationTypeId] = useState("");
  const [schoolLatitude, setSchoolLatitude] = useState("");
  const [schoolLongitude, setSchoolLongitude] = useState("");
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const schools = useSelector(selectSchools);

  useEffect(() => {
    dispatch(fetchAllSchools(token));
  }, [dispatch]);

  // console.log("SCHOOLS ON FORM", schools);

  function submitForm(event) {
    event.preventDefault();

    if (
      !date ||
      !time ||
      !capacity ||
      !latitude ||
      !longitude ||
      !schoolId ||
      !transportationTypeId
    ) {
      const message = "Please provide all the required information";
      alert(message);
    } else {
      dispatch(
        newPlannedTrip(
          token,
          date,
          time,
          capacity,
          latitude,
          longitude,
          schoolId,
          transportationTypeId
        )
      );
      dispatch(
        showMessageWithTimeout(
          "success",
          true,
          "Your planned trip has been created successfully",
          2000
        )
      );
    }
  }

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
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h3 className="mt-5 mb-5">Plan a Trip</h3>
        <Form.Group controlId="formBasicName">
          <Form.Label>Date</Form.Label>
          <Form.Control
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              // console.log("SET DATE", event.target.value);
            }}
            type="date"
            required
          />
          <Form.Label>time</Form.Label>
          <Form.Control
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
              // console.log("SET TIME", event.target.value);
            }}
            type="time"
            required
          />
          <Form.Label>Capacity</Form.Label>
          <Form.Control
            value={parseInt(capacity)}
            onChange={(event) => {
              setCapacity(event.target.value);
              // console.log("SET CAPACITY", event.target.value);
            }}
            type="number"
            required
          />
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            value={latitude}
            onChange={(event) => {
              setLatitude(event.target.value);
              // console.log("SET Latitude", event.target.value);
            }}
            type="string"
            required
          />
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            value={longitude}
            onChange={(event) => {
              setLongitude(event.target.value);
              // console.log("SET longitude", event.target.value);
            }}
            type="string"
            required
          />
          <Form.Label>School Id</Form.Label>
          <Form.Select
            value={schoolId}
            onChange={(event) => {
              setSchoolId(event.target.value);
              setSchoolLatitude(
                schools.find((school) => school.id == schoolId).latitude
              );
              setSchoolLongitude(
                schools.find((school) => school.id == schoolId).longitude
              );
              console.log(
                "SCHOOL LAT AND LONG",
                schoolLatitude,
                schoolLongitude
              );

              // console.log("SET school Id", event.target.value);
            }}
            type="number"
            required
          >
            {schools?.map((school) => (
              <option value={school.id}>{school.name}</option>
            ))}
          </Form.Select>
          <Form.Label>Transportation Type Id</Form.Label>
          <Form.Control
            value={transportationTypeId}
            onChange={(event) => {
              setTransportationTypeId(event.target.value);
              // console.log("SET transportation type Id", event.target.value);
            }}
            type="number"
            required
          />
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
            <ShowRoute
              points={[
                [latitude, longitude],
                [schoolLatitude, schoolLongitude],
              ]}
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
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            New trip !
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
