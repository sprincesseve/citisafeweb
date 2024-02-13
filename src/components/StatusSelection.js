import React, { useState } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem, Select, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";

const customTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderWidth: "1px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black",
          fontSize: 12,
        },
      },
    },
  },
});

function StatusSelection({
  label,
  value,
  marginTop,
  width,
  type,
  json,
  labelSelect,
  onStatusChange,
}) {
  const [item, setItem] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onStatusChange(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 2,
        marginTop: marginTop,
        "@media (min-width: 50px)": {
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        },
      }}
    >
      <FormControl required sx={{ width: width }}>
        <ThemeProvider theme={customTheme}>
          <InputLabel sx={{ width: width }}>{label}</InputLabel>
          <Select
            style={{
              color: "black",
              fontSize: 12,
              width: width,
            }}
            labelId={`${label.toLowerCase()}-label`}
            id={label.toLowerCase()}
            value={selectedValue}
            onChange={handleChange}
            label={labelSelect}
          >
            {json.map((jsonItem) => (
              <MenuItem key={jsonItem.value} value={jsonItem.value}>
                {jsonItem.text}
                {jsonItem.label}
              </MenuItem>
            ))}
          </Select>
        </ThemeProvider>
      </FormControl>
    </Box>
  );
}

export default StatusSelection;
