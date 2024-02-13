import React, { useState } from "react";
import "./styles.css";
import {
  SortByAlpha,
  TextRotateUp,
  TextRotateVertical,
} from "@mui/icons-material";
import { Button } from "@mui/material";

function AtoZ({ onClicks }) {
  const [ascending, setAscending] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleFilter = () => {
    setAscending(!ascending);

    if (onClicks && onClicks.length > 0) {
      onClicks.forEach((onClick) => {
        onClick();
      });
    }
  };

  return (
    <div className="filterAZ">
      <Button onClick={handleFilter}>
        {ascending ? (
          <TextRotateUp
            style={{
              color: "green",
            }}
          ></TextRotateUp>
        ) : (
          <TextRotateVertical
            style={{
              color: "blue",
            }}
          ></TextRotateVertical>
        )}
      </Button>
    </div>
  );
}

export default AtoZ;
