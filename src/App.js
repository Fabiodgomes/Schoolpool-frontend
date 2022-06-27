import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import { Homepage, Login, SignUp } from "./pages"


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);
  
  return (
    <div>
      <Navigation/>
      <MessageBox/>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;