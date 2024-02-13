import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./styles.css";
import logo from "./assets/logo.png";
import { Dashboard, Settings, Widgets } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "./pages/Login/authSlice";
import { red } from "@mui/material/colors";

export default function Navbar() {
  const [isNavVisible, setNavVisibility] = useState(false);

  const dispatch = useDispatch();

  const Role = useSelector((state) => state.auth.role);

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <nav className="nav">
      <div className="toggle-button" onClick={toggleNav}>
        <Widgets
          style={{ fontSize: 40, marginLeft: 30, color: "#3e7c1f" }}
        ></Widgets>
      </div>

      <ul className={`nav-list ${isNavVisible ? "show" : ""}`}>
        <div className="image-logo">
          <img style={{ width: 200 }} src={logo}></img>
        </div>
        {Role === "TREASURER" ? (
          <>
            <CustomLink to="/dashboard">Home</CustomLink>
            <CustomLink to="/violation">Records</CustomLink>
            <CustomLink to="/update" className="updatePass">
              Settings
            </CustomLink>
          </>
        ) : (
          <>
            <CustomLink to="/dashboard">Home</CustomLink>
            <CustomLink to="/violation">Records</CustomLink>
            <CustomLink to="/user">Users</CustomLink>
            <CustomLink to="/violationList">Violation</CustomLink>
            <CustomLink to="/update" className="updatePass">
              Settings
            </CustomLink>
          </>
        )}
        <li className={`nav-item logout-item ${isNavVisible ? "show" : ""}`}>
          <CustomLink
            className="logout-link"
            onClick={() => {
              dispatch(setLogout());
            }}
          >
            Logout
          </CustomLink>
        </li>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={`nav-item ${isActive ? "active" : ""}`}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
