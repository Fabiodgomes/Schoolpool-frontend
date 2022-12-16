import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  selectAllPlannedTrips,
  selectPlannedTripsByUser,
} from "../../store/plannedTrip/selectors";
import { selectSchools } from "../../store/school/selectors";
import { selectScheduledTripsByUser } from "../../store/scheduledTrip/selectors";
import { useEffect } from "react";

import { selectToken } from "../../store/user/selectors";
import { NavLink } from "react-router-dom";
import ScheduledTripBlock from "../../components/ScheduledTripBlock/ScheduledTripBlock";
import {
  fetchPlannedTrips,
  fetchUsersPlannedTrips,
} from "../../store/plannedTrip/actions";
import { fetchAllSchools } from "../../store/school/thunks";
import { fetchUsersScheduledTrips } from "../../store/scheduledTrip/thunks";
import PlannedTripBlock from "../../components/PlannedTripBlock/PlannedTripBlock";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const HomePage = () => {
  const dispatch = useDispatch();
  const scheduledTripsByUser = useSelector(selectScheduledTripsByUser);
  const plannedTripsByUser = useSelector(selectPlannedTripsByUser);
  const plannedTrips = useSelector(selectAllPlannedTrips);
  const schools = useSelector(selectSchools);
  const token = useSelector(selectToken);
  const [selectedDate, setSelectedDate] = useState(1);

  useEffect(() => {
    dispatch(fetchUsersScheduledTrips(token));
    dispatch(fetchPlannedTrips(token));
    dispatch(fetchAllSchools(token));
    // dispatch(fetchPlannedTripsByUser);
  }, [dispatch]);

  console.log("PLANNED TRIPS", plannedTrips);
  console.log("SCHOOLS", schools);
  console.log("SCHEDULED TRIPS BY USER", scheduledTripsByUser);
  console.log("PLANNED TRIPS BY USER", plannedTripsByUser);

  const convertDatePlannedTrip =
    plannedTripsByUser &&
    plannedTripsByUser.map((plannedTrip) => {
      return { ...plannedTrip, date: new Date(plannedTrip.date) };
    });

  const sortedPlannedTripsByUser =
    plannedTripsByUser &&
    convertDatePlannedTrip &&
    [...convertDatePlannedTrip].sort((a, b) => {
      return Number(a.date) - Number(b.date);
    });

  return (
    <>
      <div className="homePage">
        {token ? (
          <div>
            <h2>My kid's trips</h2>
            <Table className="table-hover table-dark table-striped" size="sm">
              <caption>My kids are registered in the trips above</caption>
              <thead>
                <tr>
                  <th>Number Of Kids</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Pick-up Adress</th>
                  <th>School</th>
                  <th>Inscription</th>
                </tr>
              </thead>
              <tbody>
                {!scheduledTripsByUser ||
                !plannedTrips ||
                !schools ||
                !plannedTripsByUser
                  ? "Loading"
                  : scheduledTripsByUser.map((scheduledTrip, i) => (
                      <ScheduledTripBlock
                        key={i}
                        id={scheduledTrip.id}
                        plannedTripId={scheduledTrip.plannedTripId}
                        numberOfKids={scheduledTrip.numberOfKids}
                        date={
                          plannedTrips.find(
                            (plannedTrip) =>
                              plannedTrip.id === scheduledTrip.plannedTripId
                          ).date
                        }
                        time={
                          plannedTrips?.find(
                            (plannedTrip) =>
                              plannedTrip.id === scheduledTrip.plannedTripId
                          ).time
                        }
                        school={
                          schools.find(
                            (school) =>
                              school.id ===
                              plannedTrips.find(
                                (plannedTrip) =>
                                  plannedTrip.id === scheduledTrip.plannedTripId
                              ).schoolId
                          ).name
                        }
                        address={scheduledTrip.address}
                      />
                    ))}
              </tbody>
            </Table>
            <h2>My trips</h2>
            <Table className="table-hover table-dark table-striped" size="sm">
              <caption>I am the accompanying person on the trips above</caption>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Capacity</th>
                  <th>Starting adress</th>
                  <th>School</th>
                  <th>Inscription</th>
                </tr>
              </thead>
              <tbody>
                {!plannedTripsByUser || !plannedTrips || !schools
                  ? "Loading"
                  : sortedPlannedTripsByUser.map((plannedTrip, i) => (
                      <PlannedTripBlock
                        key={i}
                        id={plannedTrip.id}
                        date={plannedTrip.date}
                        time={plannedTrip.time}
                        capacity={plannedTrip.capacity}
                        address={plannedTrip.address}
                        school={
                          schools.find(
                            (school) =>
                              school.id ===
                              plannedTrips.find(
                                (plannedTrip2) =>
                                  plannedTrip2.id === plannedTrip.id
                              ).schoolId
                          ).name
                        }
                      />
                    ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <NavLink to="/login">
            Please login to display your scheduled trips
          </NavLink>
        )}{" "}
      </div>
    </>
  );
};
