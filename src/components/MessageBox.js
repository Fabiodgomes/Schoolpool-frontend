import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { selectMessage } from "../store/appState/selectors";

export const MessageBox = () => {

  const dispatch = useDispatch();

  const message = useSelector(selectMessage);

  const displayMessage = message !== null;

  if (!displayMessage) return null;

  return (
    <MessageContainer>
      <p style={{color: "#6D8B74", fontWeight: "bold", marginTop: 0, padding: 15}}>{message.text}</p>
    </MessageContainer>
  )
}

const MessageContainer = styled.div`
  background-color: #C2DED1;
  height: 50px;
  border-bottom: 1px solid #6D8B74
`