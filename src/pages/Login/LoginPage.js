import React, { useState, useEffect } from "react";
import "./login.css";
import enforcer from "./../../assets/enforcer.png";
import { useNavigate } from "react-router-dom";
import InputCss from "../../components/InputCss";
import InputCssPassword from "../../components/InputCssPassword";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "../../plugins/axios";
import { useDispatch } from "react-redux";
import { setLogin, setRole } from "./authSlice";

function LoginPage({ onClick }) {
  const navigation = useNavigate();
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [data, setData] = useState({
    email: "",
  });
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setLogin(token));
      navigation("/dashboard");
    }
  }, [dispatch, navigation]);

  const handleLogin = () => {
    axios
      .post("accounts/token/login/", credentials)
      .then((response) => {
        const id_token = response.data.auth_token;

        axios
          .get("accounts/users/me/", {
            headers: {
              Authorization: `token ${id_token}`,
            },
          })
          .then((response) => {
            const role = response.data.role;

            if (role === "ADMIN" || role === "TREASURER") {
              alert(
                `Welcome ${
                  response.data.last_name.charAt(0).toUpperCase() +
                  response.data.last_name.slice(1)
                }, your role is ${role}`
              );
              dispatch(setLogin(id_token));
              dispatch(setRole(role));
            } else {
              alert(`${role} you don't have access on this site`);
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            alert("Error fetching user data. Please try again later.");
          });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert(`Error fetching user data: ${error.message}`);
      });
  };

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const closeForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };

  const handleSendPasswordReset = () => {
    axios
      .post("accounts/users/reset_password/", data)
      .then((response) => {
        alert("Email sent!", data.email);
        closeForgotPasswordModal();
      })
      .catch((error) => {
        alert("Email not sent!, Try again", data.email);

        closeForgotPasswordModal();
      });
  };

  return (
    <div className="containerLogin">
      <div className="white-container">
        <div className="input-container">
          <div className="input-cont-com">
            <div>
              <InputCss
                title={"username"}
                value={credentials.username}
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    username: e.target.value,
                  });
                }}
              ></InputCss>
            </div>
            <div>
              <InputCssPassword
                type={"password"}
                title={"password"}
                value={credentials.password}
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    password: e.target.value,
                  });
                }}
              ></InputCssPassword>
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                style={{ color: "white" }}
                onClick={openForgotPasswordModal}
              >
                Forgot Password?
              </Button>
              <Button
                onClick={handleLogin}
                style={{
                  backgroundColor: "#3e7c1f",
                  color: "white",
                  width: "40vh",
                  borderRadius: 20,
                  marginTop: 20,
                  width: "100%",
                  border: "0.5px solid white",
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
        <div className="image-container">
          <img className="image-css" src={enforcer}></img>
        </div>
      </div>
      <Dialog
        open={isForgotPasswordModalOpen}
        onClose={closeForgotPasswordModal}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "50%",
            minHeight: "40%",
          },
        }}
      >
        <DialogTitle>Forgot Password?</DialogTitle>
        <DialogContent>
          <p>Enter your email address to reset your password.</p>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={data.email}
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            style={{ marginTop: 20 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForgotPasswordModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendPasswordReset} color="primary">
            Send Reset Link
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginPage;
