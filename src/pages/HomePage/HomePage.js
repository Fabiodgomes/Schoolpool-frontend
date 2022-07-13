import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
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

export const HomePage = () => {
  const dispatch = useDispatch();
  const scheduledTripsbyUser = useSelector(selectScheduledTripsByUser);
  const plannedTripsByUser = useSelector(selectPlannedTripsByUser);
  const plannedTrips = useSelector(selectAllPlannedTrips);
  const schools = useSelector(selectSchools);
  console.log("SCHEDULEDTRIPSBYUSER", scheduledTripsbyUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchUsersScheduledTrips(token));
    dispatch(fetchPlannedTrips(token));
    dispatch(fetchAllSchools(token));
  }, [dispatch]);

  console.log("PLANNED TRIPS", plannedTrips);
  console.log("SCHOOLS", schools);
  console.log("SCHEDULED TRIPS BY USER", scheduledTripsbyUser);
  console.log("PLANNED TRIPS BY USER", plannedTripsByUser);

  const sortedTripsByDate =
    plannedTrips &&
    [...plannedTrips].sort((a, b) => {
      return b.date - a.date;
    });

  return (
    <>
      {token ? (
        <div className="tableContainer">
          <h1>My kids are registered in the following trips</h1>
          <table className="table">
            <tr className="table-head-row">
              <th>Number Of Kids</th>
              <th>Date</th>
              <th>Time</th>
              <th>Adress</th>
              <th>School</th>
              <th>Inscription</th>
            </tr>
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
                  />
                ))}
          </table>
          <h1>I am the accompanying person in the following trips</h1>
          <table>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Capacity</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>School</th>
              <th>Inscription</th>
            </tr>

            {!plannedTripsByUser || !plannedTrips || !schools
              ? "Loading"
              : plannedTripsByUser.map((plannedTrip, i) => (
                  <PlannedTripBlock
                    key={i}
                    id={plannedTrip.id}
                    date={plannedTrip.date}
                    time={plannedTrip.time}
                    capacity={plannedTrip.capacity}
                    latitude={plannedTrip.latitude}
                    longitude={plannedTrip.longitude}
                    school={
                      schools.find(
                        (school) =>
                          school.id ===
                          plannedTrips.find(
                            (plannedTrip2) => plannedTrip2.id === plannedTrip.id
                          ).schoolId
                      ).name
                    }
                  />
                ))}
          </table>
        </div>
      ) : (
        <NavLink to="/login">
          Please login to display your scheduled trips
        </NavLink>
      )}{" "}
    </>
  );
};
