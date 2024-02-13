import React, { useState } from "react";
import "./styles.css";
import { IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordField({ label, type, value, className, onChange }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="ComUpdateContainer">
      <div
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <TextField
          style={{ width: "100%" }}
          type={passwordVisible ? "text" : type}
          label={label}
          value={value}
          onChange={onChange}
        />
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <IconButton
          onClick={togglePasswordVisibility}
          style={{
            borderRadius: 0,
          }}
        >
          {passwordVisible ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </div>
    </div>
  );
}

export default PasswordField;
