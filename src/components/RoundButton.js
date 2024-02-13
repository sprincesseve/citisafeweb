import { Button } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

function RoundButton({
  title,
  onClick,
  marginTop,
  width,
  height,
  backgroundColor,
  marginRight,
  color,
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr", // Single column by default
        gap: 2,
        marginTop: marginTop,
        marginRight: marginRight,
        "@media (min-width: 600px)": {
          gridTemplateColumns: `repeat(auto-fit, minmax(${width}, 1fr))`, // Responsive grid with fixed width
        },
      }}
    >
      <Button
        onClick={onClick}
        variant="contained"
        style={{
          backgroundColor: backgroundColor,
          width: 150,
          border: "1px solid #3E7C1F",
          height: height,
          borderRadius: 50,
          color: color,
        }}
      >
        {title}
      </Button>
    </Box>
  );
}

export default RoundButton;
