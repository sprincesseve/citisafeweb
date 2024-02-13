import React, { useState } from "react";
import axios from "../../plugins/axios";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import { TextField } from "@mui/material";
import lock from "./../../assets/lock.png";
import ConstButton from "./../../components/ConstButton";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "accounts/users/reset_password_confirm/",
        {
          uid: uid,
          token: token,
          new_password: newPassword,
        }
      );

      console.log(response);
      setSuccess(true);
      alert("Password reset successful");
      navigate("/"); // Redirect to login page after successful password reset
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.log(error);
    }
  };

  return (
    <div className="forgotpass-container">
      <div className="forgotpass-subcon">
        <div className="image-forgotpass">
          <img style={{ width: "15%" }} src={lock}></img>
        </div>
        <h1
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          Reset Password
        </h1>

        <form className="form-forgotpass" onSubmit={handleSubmit}>
          <TextField
            style={{ width: "70%" }}
            label="New Password"
            type="password"
            id="newPassword"
            value={newPassword}
            helperText="New Password"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            style={{ width: "70%", marginTop: 20 }}
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            helperText="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {success ? <p>Password reset successful!</p> : <p>{error}</p>}
          <ConstButton
            onClick={handleSubmit}
            type="submit"
            title={"Reset Password"}
          ></ConstButton>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
