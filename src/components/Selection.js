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
          borderColor: "#3E7C1F",
          borderWidth: "2px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#3E7C1F",
        },
      },
    },
  },
});

function Selection({
  label,
  value,
  marginTop,
  width,
  type,
  json,
  labelSelect,
}) {
  const [item, setItem] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 2,
        marginTop: marginTop,
        "@media (min-width: 600px)": {
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", // Responsive grid with minimum 200px column width
        },
      }}
    >
      <FormControl required>
        <ThemeProvider theme={customTheme}>
          <InputLabel>{label}</InputLabel>
          <Select
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

export default Selection;
