import React from "react";
import InputS from "./InputS";
import { Button } from "@mui/material";
import { ArrowBack, CloseOutlined } from "@mui/icons-material";
import ConstButton from "./ConstButton";

function UserCredentials({ back, create, close, onClickProceed }) {
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
            color: "red",
          }}
          onClick={close}
        >
          <CloseOutlined style={{}}></CloseOutlined>CLOSE
        </Button>
        <Button
          style={{ position: "absolute", left: 0, marginRight: 40 }}
          onClick={back}
        >
          <ArrowBack style={{}}></ArrowBack> BACK
        </Button>
      </div>
      <h1 style={{ marginTop: 50, textAlign: "center" }}>User Information</h1>
      <div
        style={{
          height: "80%",
          marginTop: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <InputS required label="Username"></InputS>
          </div>
          <div style={{ marginTop: 40, display: "flex" }}>
            <InputS required type={"password"} label="Password"></InputS>
          </div>
          <div style={{ marginTop: 40, display: "flex" }}>
            <InputS
              required
              type={"password"}
              label="Confirm Password"
            ></InputS>
          </div>
        </div>
        <dv
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            marginTop: "10%",
          }}
        >
          <div
            style={{
              width: "70%",
            }}
          >
            <ConstButton onClick={onClickProceed} title={"CREATE USER"} height={50}></ConstButton>
          </div>
        </dv>
      </div>
    </>
  );
}

export default UserCredentials;
