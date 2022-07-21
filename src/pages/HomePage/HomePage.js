import "./styles.css";
// import "../../scss/custom.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  selectScheduledTripsByUser,
  selectAllPlannedTrips,
  selectSchools,
  selectPlannedTripsByUser,
} from "../../store/plannedTrip/selectors";
import { useEffect } from "react";
import { fetchUsersScheduledTrips } from "../../store/plannedTrip/actions";
import { selectToken } from "../../store/user/selectors";
import { NavLink } from "react-router-dom";
import ScheduledTripBlock from "../../components/ScheduledTripBlock/ScheduledTripBlock";
import {
  fetchPlannedTrips,
  fetchAllSchools,
  fetchUsersPlannedTrips,
} from "../../store/plannedTrip/actions";
import PlannedTripBlock from "../../components/PlannedTripBlock/PlannedTripBlock";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const HomePage = () => {
  const dispatch = useDispatch();
  const scheduledTripsbyUser = useSelector(selectScheduledTripsByUser);
  const plannedTripsByUser = useSelector(selectPlannedTripsByUser);
  const plannedTrips = useSelector(selectAllPlannedTrips);
  const schools = useSelector(selectSchools);
  const token = useSelector(selectToken);
  const [selectedDate, setSelectedDate] = useState(1);

  useEffect(() => {
    dispatch(fetchUsersScheduledTrips(token));
    dispatch(fetchPlannedTrips(token));
    dispatch(fetchAllSchools(token));
  }, [dispatch]);

  // console.log("PLANNED TRIPS", plannedTrips);
  // console.log("SCHOOLS", schools);
  // console.log("SCHEDULED TRIPS BY USER", scheduledTripsbyUser);
  // console.log("PLANNED TRIPS BY USER", plannedTripsByUser);

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

  // const DateScheduledTrip =
  //   scheduledTripsbyUser &&
  //   plannedTripsByUser &&
  //   scheduledTripsbyUser.map((scheduledTrip) =>
  //     plannedTripsByUser.find((plannedTrip) => {
  //       return (plannedTrip.userId === scheduledTrip.userId);
  //     })
  //   );
  // console.log("PLANNED TRIP DATE BY SCHEDULED USER ID", DateScheduledTrip);

  // const sortedScheduledTripsByUser =
  //   plannedTripsByUser &&
  //   scheduledTripsbyUser &&
  //   DateScheduledTrip &&
  //   [...convertDatePlannedTrip].sort((a, b) => {
  //     return Number(a.date) - Number(b.date);
  //   });

  // const filteredTripsById = () => {
  //   if (plannedTripsByUser) {
  //     if (selectedDate.length === 0) {
  //       return plannedTripsByUser;
  //     } else {
  //       return plannedTripsByUser.filter((plannedTrip) =>
  //         selectedDate.includes(plannedTrip.id)
  //       );
  //     }
  //   } else {
  //     return null;
  //   }
  // };

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
                {!scheduledTripsbyUser ||
                !plannedTrips ||
                !schools ||
                !plannedTripsByUser
                  ? "Loading"
                  : scheduledTripsbyUser.map((scheduledTrip, i) => (
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
