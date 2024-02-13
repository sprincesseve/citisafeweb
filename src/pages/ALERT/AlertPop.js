import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar";
import { Button } from "@mui/material";
import "./styles.css";
import io from "socket.io-client";
import notif from "./../../assets/notif.gif";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const socket = io.connect(
  "wss://etcmf.keannu1.duckdns.org/ws/ticketnotification/"
); // backend server

function AlertPop({ onClickSendMessage, onClickClose, navigateTo }) {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const [showNotification, setShowNotification] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleRecords = () => {
    navigate("/violation");
    window.location.reload();
  };

  const closeNotif = () => {
    setShowNotification(false);
  };

  const sendMessage = () => {
    socket.emit("send_message", {
      message: "THERE HAS BEEN AN UPDATE ON THE RECORDS TABLE!",
    });
  };

  useEffect(() => {
    socket.on("received_message", (data) => {
      setShowNotification(true);
      setIsVisible(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    });
  }, [socket]);

  return (
    <>
      {isVisible && (
        <div style={{ position: "absolute", backgroundColor: "red" }}>
          <Button onClick={onClickSendMessage}></Button>

          <div className={`alert-notif ${showNotification ? "active" : ""}`}>
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
        </div>
      )}
    </>
  );
}

export default AlertPop;
