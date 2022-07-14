import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Administrator from "../../pages/Administrator";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/" exact component={Profil} />
        <Route path="/" exact component={Administrator} />
        <Navigate to="/" />
      </Routes>
    </Router>
  );
};

export default index;
