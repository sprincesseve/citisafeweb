import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SortByAlpha from '@mui/icons-material/SortByAlpha';
import Sort from '@mui/icons-material/Sort';

import CheckList from './CheckList';
import { Checkbox, FormControlLabel } from '@mui/material';

export default function FilterComponent({sortName, sortStatus, setSelectedStatus, selectedStatus }) {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (buttonName) => {
    if (selectedButtons.includes(buttonName)) {
      setSelectedButtons(selectedButtons.filter((name) => name !== buttonName));
    } else {
      setSelectedButtons([...selectedButtons, buttonName]);
    }
  };

  const handleStatusClick = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };
  const isStatusActive = (status) => selectedStatus.includes(status);

  const isButtonActive = (buttonName) => selectedButtons.includes(buttonName);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ flexDirection: 'row', marginRight: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onClick={() => {
            handleButtonClick('name');
            sortName(); // Call the sortName function to trigger name sorting
          }}
          style={{ backgroundColor: isButtonActive('name') ? 'white' : 'transparent', borderRadius: 50 }}
        >
          <p style={{ color: isButtonActive('name') ? '#2743AA' : 'white', marginLeft: 10 }}>Name</p>
          <SortByAlpha style={{ color: isButtonActive('name') ? '#2743AA' : 'white' }} />
        </Button>
      </div>

      <div>
        <FormControlLabel
        style={{color:"white"}}
          control={
            <Checkbox
              style={{color:"white"}}
              checked={isStatusActive('Pending')}
              onChange={() => handleStatusClick('Pending')}
              color="primary"
            />
          }
          label="Pending"
        />
        <FormControlLabel
        style={{color:"white"}}
          control={
            <Checkbox
              style={{color:"white"}}
              checked={isStatusActive('Overdue')}
              onChange={() => handleStatusClick('Overdue')}
              color="primary"
            />
          }
          label="Overdue"
        />
        <FormControlLabel
        style={{color:"white"}}
          control={
            <Checkbox
              style={{color:"white"}}
              checked={isStatusActive('Cleared')}
              onChange={() => handleStatusClick('Cleared')}
              color="primary"
            />
          }
          label="Cleared"
        />
      </div>
    </div>
  );
};