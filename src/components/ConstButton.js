import { Button } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

function ConstButton({ title, onClick, marginTop, width, height }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr", // Single column by default
        gap: 2,
        marginTop: marginTop,
        "@media (min-width: 600px)": {
          gridTemplateColumns: `repeat(auto-fit, minmax(${width}, 1fr))`, // Responsive grid with fixed width
        },
      }}
    >
      <Button
        onClick={onClick}
        variant="contained"
        style={{ backgroundColor: "#3E7C1F", width: "100%", height: height }}
      >
        {title}
      </Button>
    </Box>
  );
}

export default ConstButton;
