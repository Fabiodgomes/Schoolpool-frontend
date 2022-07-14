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

  const convertDate =
    allPlannedTrips &&
    allPlannedTrips.map((plannedTrip) => {
      return { ...plannedTrip, date: new Date(plannedTrip.date) };
    });
  console.log("CONVERTED DATE", convertDate);

  const sortedTrips =
    allPlannedTrips &&
    convertDate &&
    [...convertDate].sort((a, b) => {
      return Number(a.date) - Number(b.date);
    });

  console.log("SORTED TRIPS", sortedTrips);

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
              <th>Address</th>
              <th>School</th>
              <th>Inscription</th>
            </tr>
            {!allPlannedTrips || !sortedTrips || !schools
              ? "Loading"
              : sortedTrips
                  .filter(
                    (plannedTripCapacity) => plannedTripCapacity.capacity !== 0
                  )
                  .map((sortedTrip, i) => (
                    <PlannedTripBlock
                      key={i}
                      id={sortedTrip.id}
                      date={sortedTrip.date}
                      time={sortedTrip.time}
                      adress={sortedTrip.address}
                      capacity={sortedTrip.capacity}
                      school={
                        schools.find(
                          (school) =>
                            school.id ===
                            sortedTrips.find(
                              (sortedTrip2) => sortedTrip2.id === sortedTrip.id
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
