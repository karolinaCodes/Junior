import {useState, useEffect} from "react";
import axios from "axios";
import {BrowserRouter, Link, Routes, Route} from "react-router-dom";

//import components

//import css
import "./App.scss";

function App() {
  // FOR EXAMPLE LOGIN FUNCTIONALITY
  // const {currentUser, setCurrentUser} = useState();

  //EXAMPLE
  // useEffect(() => {
  //   axios.get("/api/candidates").then(res => {
  //     setCandidates(res.data);
  //   });
  // }, []);

  // EXAMPLE LOGIN FUNCTIONALITY
  // const login = () => {
  //   axios.post("/api/login").then(res => {
  //     setCurrentUser(res.data);
  //   });
  // };

  // TO CHECK FOR COOKIE (IF USER SIGNED IN) ON FIRST LOAD
  // useEffect(() => {
  //   axios.post("/api/authenticate").then(res => {
  //     setCurrentUser(res.data);
  //   });
  // }, []);

  return (
    <div className="App">
      <Link to="/">Home </Link>
      {/* {!currentUser && <button onClick={login}>LOG IN</button>} */}
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
      </Routes>
    </div>
  );
}

export default App;
