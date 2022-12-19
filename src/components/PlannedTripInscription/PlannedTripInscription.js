import "./styles.css";

export const PlannedTripInscription = (props) => {
  return (
    <>
      <div>
        <ul>
          <li>
            <a> </a>
            {props.school}
          </li>
          <li>
            <a> </a>
            {props.date} at {props.time}
          </li>
          <li>
            {props.capacity} <a>spots left</a>
          </li>
          <li>
            driver : <a>{props.driverName}</a>
          </li>
          <img className="school-image" src={props.schoolImage} />
        </ul>
      </div>
    </>
  );
};
