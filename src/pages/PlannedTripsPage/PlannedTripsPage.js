import "./styles.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectAllPlannedTrips } from "../../store/plannedTrip/selectors";
import { fetchPlannedTrips } from "../../store/plannedTrip/actions";
import PlannedTripBlock from "../../components/PlannedTripBlock/PlannedTripBlock";
import { selectToken } from "../../store/user/selectors";
import { selectSchools } from "../../store/school/selectors";
import NewPlannedTrip from "../../components/NewPlannedTrip/NewPlannedTrip";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

  const sortedTrips =
    allPlannedTrips &&
    convertDate &&
    [...convertDate].sort((a, b) => {
      return Number(a.date) - Number(b.date);
    });

  return (
    <>
      <div className="plannedTripPage">
        {token ? (
          <div>
            <Table className="table-hover table-dark table-striped" size="sm">
              <caption>All planned trips with avaibility</caption>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Capacity</th>
                  <th>Address</th>
                  <th>School</th>
                  <th>Inscription</th>
                </tr>
              </thead>
              <tbody>
                {!allPlannedTrips || !sortedTrips || !schools
                  ? "Loading"
                  : sortedTrips
                      .filter(
                        (plannedTripCapacity) =>
                          plannedTripCapacity.capacity > 0
                      )
                      .map((sortedTrip, i) => (
                        <PlannedTripBlock
                          key={i}
                          id={sortedTrip.id}
                          date={sortedTrip.date}
                          time={sortedTrip.time}
                          address={sortedTrip.address}
                          capacity={sortedTrip.capacity}
                          school={
                            schools.find(
                              (school) =>
                                school.id ===
                                sortedTrips.find(
                                  (sortedTrip2) =>
                                    sortedTrip2.id === sortedTrip.id
                                ).schoolId
                            ).name
                          }
                        />
                      ))}
              </tbody>
            </Table>
            <NewPlannedTrip />
          </div>
        ) : (
          <NavLink to="/login">
            Please login to display the planned trips
          </NavLink>
        )}{" "}
      </div>
    </>
  );
};
