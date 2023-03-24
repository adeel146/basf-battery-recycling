import React from "react";
import "./components.scss";
import { useHistory } from "react-router-dom";
const Header = () => {
  const history = useHistory();
  return (
    <div>
      <header>
        <img className="logo" src="assets/icons/logo.svg" alt="logo" />

        <div className="icon-link-container d-flex align-items-center">
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (
                localStorage.getItem("token") &&
                localStorage.getItem("role") === "DealerAdmin"
              ) {
                history.push("/orders");
              } else if (localStorage.getItem("token")) {
                history.push("/assignments");
              } else {
                history.push("/login");
              }
            }}
            className="header-link mb-0"
          >
            {localStorage.getItem("companyMail")
              ? localStorage.getItem("companyMail")
              : "ANMELDEN"}
          </p>
          <img
            className="profile-logo"
            src="assets/icons/profile.png"
            alt="profile-logo"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
