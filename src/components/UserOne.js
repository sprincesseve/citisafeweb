import React from "react";
import InputS from "./InputS";
import Selection from "./Selection";
import Gender from "./../JSON/Gender.json";
import Position from "./../JSON/Position.json";
import Role from "./../JSON/Role.json";
import { Button } from "@mui/material";
import { ArrowBack, CloseOutlined } from "@mui/icons-material";
import ConstButton from "./ConstButton";

function UserOne({ close, proceed }) {
  return (
    <>
      <div
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          style={{
            position: "absolute",
            right: 0,
            marginRight: 40,
            color: "red",
          }}
          onClick={close}
        >
          <CloseOutlined style={{}}></CloseOutlined>CLOSE
        </Button>
      </div>
      <h1 style={{ marginTop: 50, textAlign: "center" }}>User Information</h1>
      <div style={{ height: "80%", marginTop: 90 }}>
        <div style={{ width: "100%", flexDirection: "row", display: "flex" }}>
          <div style={{ marginRight: 40, marginLeft: 40 }}>
            <InputS required label="First Name"></InputS>
          </div>
          <div style={{ marginRight: 40, marginLeft: 40 }}>
            <InputS required label="Last Name"></InputS>
          </div>
          <div style={{ marginRight: 40, marginLeft: 40 }}>
            <Selection
              labelSelect={"Gender"}
              json={Gender}
              label={"Gender"}
            ></Selection>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            flexDirection: "row",
            display: "flex",
            marginTop: 40,
          }}
        >
          <div style={{ marginRight: 40, marginLeft: 40 }}>
            <Selection
              labelSelect={"Position"}
              json={Position}
              label={"Position"}
            ></Selection>
          </div>
          <div style={{ marginRight: 40, marginLeft: 40 }}>
            <InputS required label="Email"></InputS>
          </div>
          <div style={{ marginRight: 40, marginLeft: 40 }}>
            <Selection
              labelSelect={"Role"}
              json={Role}
              label={"Role"}
            ></Selection>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            flexDirection: "row",
            display: "flex",
            marginTop: 40,
          }}
        >
          <div style={{ marginRight: 40, marginLeft: 40 }}>
            <InputS required label="Contact No."></InputS>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -200,
        }}
      >
        <div style={{ width: "20%" }}>
          <ConstButton
            title={"PROCEED"}
            height={50}
            onClick={proceed}
          ></ConstButton>
        </div>
      </div>
    </>
  );
}

export default UserOne;
