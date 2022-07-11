import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { PlannedTripInscription } from "../../components/PlannedTripInscription/PlannedTripInscription";
import {
  fetchPlannedTripDetail,
  fetchAllScheduledTrips,
  makeInscription,
  fetchAllSchools,
  fetchSchoolDetails,
} from "../../store/plannedTrip/actions";
import {
  selectPlannedTripDetails,
  selectSchoolDetails,
  selectSchools,
} from "../../store/plannedTrip/selectors";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";
import { showMessageWithTimeout } from "../../store/appState/thunks";
import { Leaflet } from "../../components/Leaflet/Leaflet";

export const InscriptionPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const schools = useSelector(selectSchools);
  const plannedTripDetails = useSelector(selectPlannedTripDetails);
  const schoolDetails = useSelector(selectSchoolDetails);
  const { id } = useParams();
  const [numberOfKids, setNumberOfKids] = useState(0);
  useEffect(() => {
    dispatch(fetchPlannedTripDetail(id, token));
    dispatch(fetchAllScheduledTrips(token));
    dispatch(fetchAllSchools(token));
    dispatch(fetchSchoolDetails(token));
  }, [dispatch]);
  console.log("SCHOOOOLS", schools);
  console.log("PLANNED TRIPS", plannedTripDetails);
  console.log("SCHOOL DETAILS", schoolDetails);

  return (
    <>
      <div>
        {plannedTripDetails && schools && schoolDetails ? (
          <div>
            <div>
              <PlannedTripInscription
                departure={plannedTripDetails.longitude}
                school={
                  schools.find(
                    (school) => school.id === plannedTripDetails.schoolId
                  ).name
                }
                date={plannedTripDetails.date}
                time={plannedTripDetails.time}
                capacity={plannedTripDetails.capacity}
                schoolImage={
                  schools?.find(
                    (school) => school.id === plannedTripDetails.schoolId
                  ).imageUrl
                }
              />
            </div>
            <input
              type="number"
              value={parseInt(numberOfKids)}
              onChange={(event) => {
                setNumberOfKids(event.target.value);
              }}
            />
            <button
              type="submit"
              onClick={() => {
                dispatch(makeInscription(id, token, numberOfKids));
                dispatch(
                  showMessageWithTimeout(
                    "success",
                    true,
                    `${numberOfKids} kid(s) registered on the trip`,
                    2000
                  )
                );
              }}
            >
              Book
            </button>
            <Leaflet />
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </>
  );
};
