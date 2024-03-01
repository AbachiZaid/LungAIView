import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "./store/auth-context";
import Login from "./auth/login/Login";
import PageBildAnalyse from "./bildanalyse/pages/PageBildAnalyse";
import Dashboard from "./dashboard/pages/Dashboard";
import Nav from "./navBar/nav/Nav";
import PagePatietenTabelle from "./patientenTabelle/Pages/PagePatientenTabelle";
import Registrieren from "./auth/registrieren/Registrieren";
import FetchingProfile from "./user/profile/FetchingProfile";
import FetchingUpdateProfile from "./user/updateProfile/FetchingUpdateProfile";
import UpdateMyPassword from "./user/updateProfile/UpdateMyPassword";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className="App">
      {isLoggedIn && <Nav />}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? <FetchingProfile /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/update-profile"
          element={
            isLoggedIn ? (
              <FetchingUpdateProfile />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/update-password"
          element={
            isLoggedIn ? <UpdateMyPassword /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/bild-analyse"
          element={
            isLoggedIn ? <PageBildAnalyse /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/patienten"
          element={
            isLoggedIn ? (
              <PagePatietenTabelle />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/registrieren"
          element={
            !isLoggedIn ? (
              <Registrieren />
            ) : (
              <Navigate replace to="/dashboard" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? <Login /> : <Navigate replace to="/dashboard" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
