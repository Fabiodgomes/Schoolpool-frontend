import "./styles.css";

export const PlannedTripInscription = (props) => {
  return (
    <>
      <div className="planned-trip-inscription-container">
        <h2></h2>
        <div className="trip">
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
          </ul>
        </div>
        <div className="image-container">
          <img className="school-image" src={props.schoolImage} />
        </div>
      </div>
    </>
  );
};
