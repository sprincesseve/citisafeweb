import React from "react";
import { Button } from "@mui/material";
import "./styles.css";
import notif from "./../../assets/notif.gif";
import { useNavigate } from "react-router-dom";

const Notification = ({ showPopup, closeNotif }) => {
  const navigate = useNavigate();

  const handleRecords = () => {
    navigate("/violation");
    window.location.reload();
  };

  return (
    <div className={`alert-notif ${showPopup ? "active" : ""}`}>
      <div className="message-div">
        <div>
          <img className="notif-gif" src={notif} alt="Notification"></img>
        </div>
        <div className="message-cont">
          <h3>ALERT!</h3>
          <p>There has been an update of the RECORDS table!</p>
          <p>Click VIEW to see the update</p>
          <p> </p>
        </div>
      </div>
      <div className="button-alert">
        <Button onClick={closeNotif} style={{ color: "red", width: 100 }}>
          CLOSE
        </Button>
        <Button
          onClick={handleRecords}
          style={{
            backgroundColor: "#00B050",
            color: "white",
            width: 100,
          }}
        >
          VIEW
        </Button>
      </div>
    </div>
  );
};

export default Notification;
