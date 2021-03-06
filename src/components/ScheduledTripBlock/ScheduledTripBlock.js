import "./styles.css";
import { NavLink } from "react-router-dom";
import moment from "moment";

export default function ScheduledTripBlock(props) {
  const date = moment(props.date).format("ddd DD MMMM YYYY");

  return (
    <tr>
      <td>{props.numberOfKids}</td>
      <td>{date}</td>
      <td>{props.time}</td>
      <td>{props.address}</td>
      <td>{props.school}</td>
      <td>
        {
          <NavLink to={`/inscription/${props.plannedTripId}`}>
            Check Availibility
          </NavLink>
        }
      </td>
    </tr>
  );
}
