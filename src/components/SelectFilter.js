import * as React from "react";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function SelectFilter({
  label,
  value,
  checked,
  onClick,
  resetChecked,
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheck = () => {
    setIsChecked(!isChecked);

    if (typeof onClick === "function") {
      onClick(value);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "5px",
        borderRadius: 10,
        height: "100%",
      }}
    >
      <Button onClick={handleCheck} value={value} checked={isChecked}>
        {isChecked ? (
          <CheckBoxOutlined
            style={{ fontSize: 30, color: "green" }}
          ></CheckBoxOutlined>
        ) : (
          <CheckBoxOutlineBlank
            style={{
              fontSize: 30,
              color: "green",
            }}
          ></CheckBoxOutlineBlank>
        )}
      </Button>
      <p style={{ margin: "0", marginLeft: "5px" }}>{label}</p>
    </div>
  );
}
