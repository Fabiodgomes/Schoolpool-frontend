import "./styles.css";
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

  const convertDate =
    plannedTripsByUser &&
    plannedTripsByUser.map((plannedTrip) => {
      return { ...plannedTrip, date: new Date(plannedTrip.date) };
    });
  console.log("CONVERTED DATE", convertDate);

  const sortedPlannedTripsByUser =
    plannedTripsByUser &&
    convertDate &&
    [...convertDate].sort((a, b) => {
      return Number(a.date) - Number(b.date);
    });

  console.log("SORTED TRIPS", sortedPlannedTripsByUser);

  const filteredTripsById = () => {
    if (plannedTripsByUser) {
      if (selectedDate.length === 0) {
        return plannedTripsByUser;
      } else {
        return plannedTripsByUser.filter((plannedTrip) =>
          selectedDate.includes(plannedTripsByUser.id)
        );
      }
    } else {
      return null;
    }
  };

  // const fetchReverseGeoCode = async (latitude, longitude) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=e6ff33bae51a4163acddd7ac1183398f`
  //     );
  //     console.log(
  //       "RESPONSE",
  //       response?.data.features[0].properties.address_line2
  //     );
  //     const address = response?.data.features[0].properties.address_line2;

  //     return address;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // console.log("FILTERED TRIPS BY ID", filteredTripsById());
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
              <th>Starting adress</th>
              <th>School</th>
              <th>Inscription</th>
            </tr>

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
