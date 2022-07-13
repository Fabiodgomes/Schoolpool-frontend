import "./styles.css";
import { NavLink } from "react-router-dom";
import moment from "moment";

export default function PlannedTripBlock(props) {
  const date = moment(props.date).format("ddd DD MMMM YYYY");
  // console.log("DATE", date);
  return (
    <tr>
      <td>{date}</td>
      <td>{props.time}</td>
      <td>{props.capacity}</td>
      <td>{props.latitude}</td>
      <td>{props.longitude}</td>
      <td>{props.school}</td>
      <td>
        {props.capacity > 0 ? (
          <NavLink to={`/inscription/${props.id}`}>book a place</NavLink>
        ) : null}
      </td>
    </tr>
  );
}
