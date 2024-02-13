import React from "react";
import "./styles.css";
function InputRound({ width, height, onChange, title, type, value }) {
  return (
    <>
      <p className="title-form">{title}</p>
      <input
        className="styles-input"
        style={{
          width: width,
          height: height,
        }}
        type={type}
        onChange={onChange}
        value={value}
      ></input>
    </>
  );
}

export default InputRound;
