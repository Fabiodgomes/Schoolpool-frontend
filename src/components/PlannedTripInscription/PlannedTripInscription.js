import "./styles.css";

export const PlannedTripInscription = (props) => {
  return (
    <>
      <div>
        <ul>
          <li>
            <a>Departure :</a> {props.departure}
          </li>
          <li>
            <a>School : </a>
            {props.school}
          </li>
          <li>
            <a>Date and Time : </a>
            {props.date} at {props.time}
          </li>
          <li>
            {props.capacity} <a>spots left</a>
          </li>
        </ul>
      </div>
    </>
  );
};
