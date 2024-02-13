import { Button, createTheme, ThemeProvider, Theme, useTheme } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';

function TextBtn({ title, onClick, marginTop, height }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr', // Single column by default
        gap: 2,
        marginTop: marginTop,
        '@media (min-width: 600px)': {
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // Responsive grid with minimum 350px column width
        },
      }}
    >
      <Button
        onClick={onClick}
        variant="text"
        
      >
        {title}
      </Button>
    </Box>
  );
}

export default TextBtn;
