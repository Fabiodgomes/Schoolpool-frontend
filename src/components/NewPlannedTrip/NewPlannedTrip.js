import "./styles.css";
import { newPlannedTrip } from "../../store/plannedTrip/actions";
import { fetchAllSchools } from "../../store/school/thunks";
import { useEffect } from "react";
import { selectToken } from "../../store/user/selectors";
import { selectSchools } from "../../store/school/selectors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { ShowRoute } from "../ShowRoute/ShowRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import { showMessageWithTimeout } from "../../store/appState/thunks";

export default function NewPlannedTrip() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [schoolId, setSchoolId] = useState(1);
  // const [transportationTypeId, setTransportationTypeId] = useState("");
  const [schoolLatitude, setSchoolLatitude] = useState("");
  const [schoolLongitude, setSchoolLongitude] = useState("");
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const schools = useSelector(selectSchools);

  useEffect(() => {
    dispatch(fetchAllSchools(token));
  }, [dispatch]);

  function submitForm(event) {
    event.preventDefault();

    if (!date || !time || !capacity || !latitude || !longitude || !schoolId) {
      // const message = "Please provide all the required information";
      // alert(message);
      dispatch(
        showMessageWithTimeout(
          "failure",
          true,
          `You have to provide all the informations to plan a new trip`,
          3000
        )
      );
    }
    if (capacity < 1) {
      dispatch(
        showMessageWithTimeout(
          "failure",
          true,
          `Capacity has to be at least 1`,
          3000
        )
      );
    } else {
      dispatch(
        newPlannedTrip(
          token,
          date,
          time,
          capacity,
          latitude,
          longitude,
          schoolId
          // transportationTypeId
        )
      );
      setDate("");
      setTime("");
      setCapacity("");
      setLatitude("");
      setLongitude("");
      setSchoolId(1);
      // setTransportationTypeId("");
    }
  }

  function LocationOnClick() {
    const map = useMapEvents({
      click: (event) => {
        console.log(event.latlng);
        setLatitude(event.latlng.lat);
        setLongitude(event.latlng.lng);
      },
    });
    return null;
  }

  return (
    <Container
      // className="d-flex justify-content-around"
      md={{ span: 10, offset: 1 }}
    >
      <Row>
        <Form as={Col} md={{ span: 4, offset: 1 }} className="mt-5">
          <h3 className="mb-5 mt-1">Plan a Trip</h3>
          <Form.Group className="form-group" controlId="formBasicName">
            <Form.Label>Date</Form.Label>
            <Form.Control
              className="form-control"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
                // console.log("SET DATE", event.target.value);
              }}
              type="date"
              required
            />
            <Form.Label>Time</Form.Label>
            <Form.Control
              className="form-control"
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
              className="form-control-capacity"
              value={parseInt(capacity)}
              onChange={(event) => {
                setCapacity(event.target.value);
                // console.log("SET CAPACITY", event.target.value);
              }}
              type="number"
              required
            />

            <Form.Label>School</Form.Label>
            <Form.Select
              className="form-control"
              value={schoolId}
              onChange={(event) => {
                setSchoolId(event.target.value);
                setSchoolLatitude(
                  schools.find((school) => school.id == schoolId).latitude
                );
                setSchoolLongitude(
                  schools.find((school) => school.id == schoolId).longitude
                );
              }}
              type="number"
              required
            >
              {schools?.map((school) => (
                <option value={school.id}>{school.name}</option>
              ))}
            </Form.Select>
            {/* <Form.Label>Transportation Type Id</Form.Label>
          <Form.Control
            className="form-control"
            value={transportationTypeId}
            onChange={(event) => {
              setTransportationTypeId(event.target.value);
              // console.log("SET transportation type Id", event.target.value);
            }}
            type="number"
            required
          /> */}
          </Form.Group>
        </Form>
        <Col className="mt-5 d-inline" md={{ span: 4, offset: 1 }}>
          <h4 className="mb-5 mt-1">Choose a starting point in the map</h4>
          <MapContainer
            className="mb-4 me-4"
            style={{
              // border: "2px solid",
              borderRadius: "10px",
              height: "50vw",
              width: "60vw",
              maxWidth: "700px",
              maxHeight: "400px",
              // margin: "19.5%",
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
          </MapContainer>
        </Col>
      </Row>
      <Button
        className="mb-4 mt-1"
        variant="secondary"
        type="submit"
        onClick={submitForm}
      >
        New trip !
      </Button>
    </Container>
  );
}
