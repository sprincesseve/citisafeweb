import React, { useState } from "react";
import "./styles.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { Button } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

function SortDate({ onClicks, onDateSelect, onCancel }) {
  const [date, setDate] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const handleDate = () => {
    setDate(!date);
  };

  const Confirm = () => {
    if (onClicks && onClicks.length > 0) {
      onClicks.forEach((onClick) => {
        onClick();
      });
    }
    setDate(!date);
    onDateSelect(selectionRange);
  };

  const Cancel = () => {
    setDate(!date);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="container-datePick">
      <div className="container-date-btn">
        <Button onClick={handleDate} style={{ color: "black" }}>
          <CalendarMonth style={{ color: "green" }}></CalendarMonth>DATE
        </Button>
      </div>
      {date ? (
        <>
          <div className="calender-range-container">
            <div className="custom-date-picker-wrapper">
              <DateRangePicker
                direction="vertical"
                ranges={[selectionRange]}
                onChange={handleSelect}
                className="custom-date-range-picker" // Add a custom class
              />
            </div>
            <div className="confirm-btn-date">
              <Button onClick={Confirm} style={{ color: "green" }}>
                CONFIRM
              </Button>
              <Button onClick={Cancel} style={{ color: "red" }}>
                CLEAR
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default SortDate;
