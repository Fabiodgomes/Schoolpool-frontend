import { useDispatch, useSelector } from "react-redux";
import { selectScheduledTripsByUser } from "../../store/plannedTrip/selectors";
import { useEffect } from "react";
import { fetchUsersScheduledTrips } from "../../store/plannedTrip/actions";
import { selectToken } from "../../store/user/selectors";
import { NavLink } from "react-router-dom";
import ScheduledTripBlock from "../../components/ScheduledTripBlock/ScheduledTripBlock";

export const HomePage = () => {
  const dispatch = useDispatch();
  const scheduledTripsbyUser = useSelector(selectScheduledTripsByUser);
  console.log("SCHEDULEDTRIPSBYUSER", scheduledTripsbyUser);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchUsersScheduledTrips(token));
  }, [dispatch]);

  return (
    <>
      {token ? (
        <div className="tableContainer">
          <table>
            <tr>
              <th>Number Of Kids</th>
              <th>Planned Trip Id</th>
              <th>Inscription</th>
            </tr>
            {!scheduledTripsbyUser
              ? "Loading"
              : scheduledTripsbyUser.map((scheduledTrip, i) => (
                  <ScheduledTripBlock
                    key={i}
                    id={scheduledTrip.id}
                    numberOfKids={scheduledTrip.numberOfKids}
                    plannedTripId={scheduledTrip.plannedTripId}
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
