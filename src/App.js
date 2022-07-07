import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import { PlannedTrips, Login, SignUp, HomePage } from "./pages";
import { InscriptionPage } from "./pages/InscriptionPage/InscriptionPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <MessageBox />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plannedtrips" element={<PlannedTrips />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/inscription/:id" element={<InscriptionPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
