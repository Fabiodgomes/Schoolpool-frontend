import "./styles.css";
import { NavLink } from "react-router-dom";

export default function ScheduledTripBlock(props) {
  return (
    <tr>
      <td>{props.numberOfKids}</td>
      <td>{props.date}</td>
      <td>{props.time}</td>
      <td>adress To do</td>
      <td>{props.school}</td>
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
