// import {
//   MapContainer,
//   TileLayer,
//   useMap,
// } from "https://cdn.esm.sh/react-leaflet";
// import { Marker, Popup } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { PlannedTripInscription } from "../../components/PlannedTripInscription/PlannedTripInscription";
import {
  fetchPlannedTripDetail,
  fetchAllScheduledTrips,
  makeInscription,
} from "../../store/plannedTrip/actions";
import { selectplannedTripDetails } from "../../store/plannedTrip/selectors";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";

export const InscriptionPage = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const plannedTripDetails = useSelector(selectplannedTripDetails);
  const { id } = useParams();
  const [numberOfKids, setNumberOfKids] = useState(0);

  useEffect(() => {
    dispatch(fetchPlannedTripDetail(id, token));
    dispatch(fetchAllScheduledTrips(token));
  }, [dispatch]);
  console.log("IIIIDDDDDDDDD", id);
  return (
    <>
      <div>
        {plannedTripDetails ? (
          <div>
            <div>
              <PlannedTripInscription
                departure={plannedTripDetails.longitude}
                school={plannedTripDetails.schoolId}
                date={plannedTripDetails.date}
                time={plannedTripDetails.time}
                capacity={plannedTripDetails.capacity}
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
              onClick={() => dispatch(makeInscription(id, token, numberOfKids))}
            >
              Book
            </button>
          </div>
        ) : (
          "Loading"
        )}
      </div>
    </>
  );
};

// <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//   <TileLayer
//     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />
//   <Marker position={[51.505, -0.09]}>
//     <Popup>
//       A pretty CSS3 popup. <br /> Easily customizable.
//     </Popup>
//   </Marker>
// </MapContainer>
//   );
