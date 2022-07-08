import { useDispatch, useSelector } from "react-redux";
import {
  selectScheduledTripsByUser,
  selectAllPlannedTrips,
  selectSchools,
} from "../../store/plannedTrip/selectors";
import { useEffect } from "react";
import { fetchUsersScheduledTrips } from "../../store/plannedTrip/actions";
import { selectToken } from "../../store/user/selectors";
import { NavLink } from "react-router-dom";
import ScheduledTripBlock from "../../components/ScheduledTripBlock/ScheduledTripBlock";
import {
  fetchPlannedTrips,
  fetchAllSchools,
} from "../../store/plannedTrip/actions";

export const HomePage = () => {
  const dispatch = useDispatch();
  const scheduledTripsbyUser = useSelector(selectScheduledTripsByUser);
  const plannedTrips = useSelector(selectAllPlannedTrips);
  const schools = useSelector(selectSchools);
  console.log("SCHEDULEDTRIPSBYUSER", scheduledTripsbyUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchUsersScheduledTrips(token));
    dispatch(fetchPlannedTrips(token));
    dispatch(fetchAllSchools(token));
  }, [dispatch]);

  // const schoolName = (plannedTripId) => {
  //   schools?.find(
  //     (school) =>
  //       school.id ===
  //       plannedTrips?.find((plannedTrip) => plannedTrip.id === plannedTripId)
  //         .schoolId
  //   ).name;
  // };
  console.log("PLANNED TRIPS", plannedTrips);
  console.log("SCHOOLS", schools);
  return (
    <>
      {token ? (
        <div className="tableContainer">
          <table>
            <tr>
              <th>Number Of Kids</th>
              <th>Date</th>
              <th>Time</th>
              <th>Adress</th>
              <th>School</th>
              <th>Inscription</th>
            </tr>
            {!scheduledTripsbyUser || !plannedTrips || !schools
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
        </div>
      ) : (
        <NavLink to="/login">
          Please login to display your scheduled trips
        </NavLink>
      )}{" "}
    </>
  );
};
