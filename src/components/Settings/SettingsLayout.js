import React from "react";
import { NavLink } from "react-router-dom";
import useTitle from "../../utils/useTitle";

const SettingsLayout = ({ children }) => {
  useTitle("Fuchas / Settings");
  return (
    <div className="account-page-section">
      <div className="container ">
        <div className="account-page-wrapper">
          <div className="tabs-section">
            <NavLink
              to="/users/edit/account"
              activeStyle={{ fontWeight: "bold", color: "black" }}
            >
              Account
            </NavLink>
            <NavLink
              to="/users/edit/security"
              activeStyle={{ fontWeight: "bold", color: "black" }}
            >
              Security
            </NavLink>
            <NavLink
              to="/users/edit/billing"
              activeStyle={{ fontWeight: "bold", color: "black" }}
            >
              Billing Information
            </NavLink>
            <NavLink
              to="/users/edit/balance"
              activeStyle={{ fontWeight: "bold", color: "black" }}
            >
              Balance
            </NavLink>
          </div>
          <div className="setting-form">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
