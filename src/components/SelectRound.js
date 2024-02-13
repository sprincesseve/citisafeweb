import React from "react";
import "./styles.css";
import { FormControl, MenuItem, Select } from "@mui/material";
function SelectRound({ title, height, width, selection, onChange }) {
  const selectOptions =
    selection === "position" ? (
      <FormControl>
        <Select
          style={{
            width: width,
            height: height,
            backgroundColor: "transparent",
          }}
          className="select-css"
          id="myGender"
          name="gender"
          onChange={(e) => onChange(e.target.value)}
        >
          <MenuItem></MenuItem>
          <MenuItem value="Traffic Aid">Traffic Aid</MenuItem>
          <MenuItem value="Office Clerk">Office Clerk</MenuItem>
          <MenuItem value="Traffic Enforcer">Traffic Enforcer</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
      </FormControl>
    ) : (
      <FormControl>
        <Select
          style={{
            borderRadius: 5,
            width: width,
            height: height,
            backgroundColor: "transparent",
          }}
          className="select-css"
          id="myRole"
          name="role"
          onChange={(e) => onChange(e.target.value)}
        >
          <MenuItem></MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="TREASURER">Treasurer</MenuItem>
          <MenuItem value="ENFORCER">Enforcer</MenuItem>
        </Select>
      </FormControl>
    );

  return (
    <div style={{ marginTop: 10 }}>
      <div>{selectOptions}</div>
    </div>
  );
}

export default SelectRound;
