import React from "react";
import "./../Dashboard/styles.css";
import Navbar from "./../../Navbar";
import ChartA from "../../components/ChartA";
import ChartC from "../../components/ChartC";
import ChartD from "../../components/ChartD";
import sun from "./../../assets/sun.png";
import moon from "./../../assets/moon.png";
import { Button, Modal } from "@mui/material";
import StatusSelection from "../../components/StatusSelection";
import week from "./../../JSON/week.json";
import { useState, useEffect } from "react";
import axios from "../../plugins/axios";

function Dashboard(props) {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [image, setImage] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const [ticketDay, setTicketDay] = useState("");

  useEffect(() => {
    axios
      .get("ticket/ticket-daily/")
      .then((response) => {
        setTicketDay(response.data.total_tickets);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Function to update the time and greeting based on the time of day
    function updateTimeAndGreeting() {
      const now = new Date();
      const hours = now.getHours();
      const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });
      const date = now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      // Update the greeting based on the time of day
      if (hours >= 0 && hours < 12) {
        setGreeting("Good morning");
        setImage(sun);
      } else if (hours >= 12 && hours < 18) {
        setGreeting("Good afternoon");
        setImage(sun);
      } else {
        setGreeting("Good evening");
        setImage(moon);
      }

      // Format the current time
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setCurrentTime(formattedTime);
      setCurrentDate(`${dayOfWeek}, ${date}`);
    }

    // Update time, greeting, and date initially
    updateTimeAndGreeting();

    // Update the time and greeting every minute
    const interval = setInterval(updateTimeAndGreeting, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar></Navbar>

      <div className="chart-container">
        <div className="inner-container">
          <div className="white-container-dash">
            <div className="graph-con A">
              <div className="greet-date">
                <div>
                  <img
                    style={{ height: 100, width: 100, borderRadius: 100 }}
                    src={image}
                    alt="Sun/Moon"
                  ></img>
                </div>
                <div className="greetings">
                  <p className="greeting-p">{greeting}</p>
                </div>
                <p className="current-time-p">{currentTime}</p>
                <div className="date-cont-p">
                  {currentDate && (
                    <>
                      <p className="current-date-p">
                        {new Date(currentDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                        ,
                      </p>
                      <p className="day-of-week-p">
                        {new Date(currentDate).toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="month-cont">
                <div className="graph-cont A">
                  <div>
                    <p className="total-violation-p">
                      Total number of violations
                    </p>
                  </div>
                </div>
                <div className="container-oval A">
                  <div className="title-container">
                    <p className="title-date">Monthly</p>
                  </div>
                </div>
                <div className="chart-cont A">
                  <ChartA></ChartA>
                </div>
              </div>
            </div>
            <div className="graph-con B">
              <div className="total-today-cont">
                <div className="total">
                  <h1 className="ticketDay-h1">{ticketDay}</h1>
                  <h1 className="total-h1">TOTAL</h1>
                  <p className="violation-p">VIOLATIONS</p>
                  <p className="today-p">TODAY</p>
                </div>
              </div>
              <div className="tracker-cont">
                <div className="graph-cont C">
                  <p className="violation-tracker-p">Violation Tracker</p>
                </div>
                <div className="chart-cont C">
                  <ChartC></ChartC>
                </div>
              </div>
              <div className="total-week-cont">
                <div>
                  <p className="title-container-total-title">
                    Total number of violations
                  </p>
                </div>
                <div className="container-oval D">
                  <div className="title-container">
                    <p className="title-date">Weekly</p>
                  </div>
                </div>
                <div className="chart-cont D">
                  <ChartD></ChartD>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
