import "./App.css";
import LoginPage from "./pages/Login/LoginPage";
import React, { useState } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Violation from "./pages/Violation/Violation";
import Profile from "./pages/Profile/Profile";
import UserControl from "./pages/UserControl/UserControl";
import ViolationList from "./pages/ViolationList/ViolationList";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation as useReactRouterLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ResetPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import { useEffect } from "react";
import Notification from "./pages/Notification/Notification";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.setIsLoggedIn);
  const Token = useSelector((state) => state.auth.token);
  const [showPopup, setShowPopup] = useState(false);

  const closeNotif = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const socket = new WebSocket(
      "wss://etcmf.keannu1.duckdns.org/ws/ticketnotification/"
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (
        data.type === "ticket.notification" ||
        data.type === "ticket.status_update"
      ) {
        const datatype = data.type;
        const datamessage = data.message;

        console.log(datatype, datamessage);

        setShowPopup(true);
      }
    };

    return () => {
      socket.close();
    };
  }, [Token]);

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/violation"
            element={isAuthenticated ? <Violation /> : <Navigate to="/" />}
          />
          <Route
            path="/user"
            element={isAuthenticated ? <UserControl /> : <Navigate to="/" />}
          />
          <Route
            path="/violationList"
            element={isAuthenticated ? <ViolationList /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/update"
            element={isAuthenticated ? <UpdatePassword /> : <Navigate to="/" />}
          />
          <Route
            path="/reset_password/:uid/:token"
            element={<ResetPassword />}
          />
        </Routes>
        {showPopup && isAuthenticated && (
          // Use useReactRouterLocation here instead of useLocation
          <div
            style={{ position: "fixed", display: "flex", bottom: 30, right: 0 }}
          >
            <Notification closeNotif={closeNotif} showPopup={showPopup} />
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
