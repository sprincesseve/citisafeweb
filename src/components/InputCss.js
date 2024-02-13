import { Visibility } from "@mui/icons-material";
import React, { useState } from "react";

function InputCss({ title, type, onChange, value }) {
  return (
    <>
      <p className="title-css">{title}</p>
      <div className="visibility-container"></div>

      <input type={type} onChange={onChange} value={value} className="input-css"></input>
    </>
  );
}

export default InputCss;
