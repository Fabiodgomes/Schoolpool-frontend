import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectAllPlannedTrips } from "../../store/plannedTrip/selectors";
import { fetchPlannedTrips } from "../../store/plannedTrip/actions";
import PlannedTripBlock from "../../components/PlannedTripBlock/PlannedTripBlock";
import { selectToken } from "../../store/user/selectors";
import { selectSchools } from "../../store/plannedTrip/selectors";
import NewPlannedTrip from "../../components/NewPlannedTrip/NewPlannedTrip";

export const PlannedTrips = () => {
  const dispatch = useDispatch();
  const allPlannedTrips = useSelector(selectAllPlannedTrips);
  const schools = useSelector(selectSchools);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchPlannedTrips(token));
  }, [dispatch]);

  // console.log("allPLannedTrips", allPlannedTrips);
  return (
    <>
      {token ? (
        <div className="tableContainer">
          <table className="table">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Capacity</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>School</th>
              <th>Inscription</th>
            </tr>
            {!allPlannedTrips || !schools
              ? "Loading"
              : allPlannedTrips
                  .filter(
                    (plannedTripCapacity) => plannedTripCapacity.capacity !== 0
                  )
                  .map((plannedTrip, i) => (
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
                            allPlannedTrips.find(
                              (plannedTrip2) =>
                                plannedTrip2.id === plannedTrip.id
                            ).schoolId
                        ).name
                      }
                    />
                  ))}
          </table>
          <NewPlannedTrip />
        </div>
      ) : (
        <NavLink to="/login">Please login to display the planned trips</NavLink>
      )}{" "}
    </>
  );
};
