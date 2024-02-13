import React from "react";

function DetailsFormat({ title, item }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: 2,
        height: 30,
        alignItems: "center",
      }}
    >
      <div>
        <p
          style={{
            fontSize: 17,
            paddingLeft: 10,
            backgroundColor: "lightgrey",
            width: 220,
          }}
        >
          {title}
        </p>
      </div>
      <p
        style={{
          fontSize: 17,
          backgroundColor: "white",
          marginLeft: 7,
          width: "100%",
          paddingLeft: 10,
          border: "1px solid lightgrey",
        }}
      >
        {item}
      </p>
    </div>
  );
}

export default DetailsFormat;
