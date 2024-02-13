import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckList({label}) {
  return (
    <FormGroup style={{ flexDirection: 'row' }}>
      <FormControlLabel
        control={
          <Checkbox
            style={{
              color: 'white',          
                
            }}
          />
        }
        label={label}
        labelPlacement="end"        
        style={{color:"white"}}
      />
    </FormGroup>
  );
}
