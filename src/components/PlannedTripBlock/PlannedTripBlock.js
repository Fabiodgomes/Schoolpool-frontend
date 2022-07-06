import "./styles.css";
import { NavLink } from "react-router-dom";

export default function PlannedTripBlock(props) {
  return (
    <tr>
      <td>{props.date}</td>
      <td>{props.time}</td>
      <td>{props.capacity}</td>
      <td>{props.latitude}</td>
      <td>{props.longitude}</td>
      <td>{<NavLink to={`/inscription/${props.id}`}>book a place</NavLink>}</td>
    </tr>
  );
}
