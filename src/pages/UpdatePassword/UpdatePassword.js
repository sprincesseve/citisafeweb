import React, { useState } from "react";
import "./styles.css";
import Navbar from "../../Navbar";
import { IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PasswordField from "../../components/PasswordField";
import ConstButton from "./../../components/ConstButton";
import update from "./../../assets/udpate.jpg";
import axios from "../../plugins/axios";
import { useSelector } from "react-redux";

function UpdatePassword({ label, type }) {
  const Token = useSelector((state) => state.auth.token);

  const [newPassword, setNewPassword] = useState({
    new_password: "",
    re_new_password: "",
    current_password: "",
  });

  const handleChangePassword = () => {
    axios
      .post("accounts/users/set_password/", newPassword, {
        headers: {
          Authorization: `token ${Token}`,
        },
      })
      .then((response) => {
        alert("Changed Password Successfully");
        setNewPassword({
          new_password: "",
          re_new_password: "",
          current_password: "",
        });
      })
      .catch((error) => {
        console.log(newPassword);
        alert("Error Changed Password");
      });
  };

  return (
    <div className="updateContainer">
      <Navbar></Navbar>

      <div className="inner-update">
        <div className="inner-container-update">
          <img className="update-img" src={update}></img>
          <p style={{ textAlign: "center" }}>
            Password must contain one lowercase letter, one number, and be at
            least 6 characters long
          </p>
          <div className="input-up">
            <PasswordField
              type={"password"}
              label={"Current Password"}
              value={newPassword.current_password}
              onChange={(text) => {
                setNewPassword({
                  ...newPassword,
                  current_password: text.target.value,
                });
              }}
            ></PasswordField>
            <PasswordField
              type={"password"}
              label={"New Password"}
              value={newPassword.new_password}
              onChange={(text) => {
                setNewPassword({
                  ...newPassword,
                  new_password: text.target.value,
                });
              }}
            ></PasswordField>
            <PasswordField
              type={"password"}
              label={"Confirm Password"}
              value={newPassword.re_new_password}
              onChange={(text) => {
                setNewPassword({
                  ...newPassword,
                  re_new_password: text.target.value,
                });
              }}
            ></PasswordField>
          </div>
          <div>
            <ConstButton
              title={"UPDATE PASSWORD"}
              marginTop={"10%"}
              onClick={handleChangePassword}
            ></ConstButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
