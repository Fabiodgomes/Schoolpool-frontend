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

export default function NewPlannedTrip() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [transportationTypeId, setTransportationTypeId] = useState("");
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const schools = useSelector(selectSchools);

  useEffect(() => {
    dispatch(fetchAllSchools(token));
  }, [dispatch]);

  console.log("SCHOOLS ON FORM", schools);

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
              console.log("SET DATE", event.target.value);
            }}
            type="date"
            required
          />
          <Form.Label>time</Form.Label>
          <Form.Control
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
              console.log("SET TIME", event.target.value);
            }}
            type="time"
            required
          />
          <Form.Label>Capacity</Form.Label>
          <Form.Control
            value={parseInt(capacity)}
            onChange={(event) => {
              setCapacity(event.target.value);
              console.log("SET CAPACITY", event.target.value);
            }}
            type="number"
            required
          />
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            value={latitude}
            onChange={(event) => {
              setLatitude(event.target.value);
              console.log("SET Latitude", event.target.value);
            }}
            type="string"
            required
          />
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            value={longitude}
            onChange={(event) => {
              setLongitude(event.target.value);
              console.log("SET longitude", event.target.value);
            }}
            type="string"
            required
          />
          <Form.Label>School Id</Form.Label>
          <Form.Select
            value={schoolId}
            onChange={(event) => {
              setSchoolId(event.target.value);
              console.log("SET school Id", event.target.value);
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
              console.log("SET transportation type Id", event.target.value);
            }}
            type="number"
            required
          />
          <Leaflet />
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
