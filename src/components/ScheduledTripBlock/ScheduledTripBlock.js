import "./styles.css";
import { NavLink } from "react-router-dom";

export default function PlannedTripBlock(props) {
  return (
    <tr>
      <td>{props.numberOfKids}</td>
      <td>{props.plannedTripId}</td>
      <td>
        {
          <NavLink to={`/inscription/${props.plannedTripId}`}>
            book a place
          </NavLink>
        }
      </td>
    </tr>
  );
}
