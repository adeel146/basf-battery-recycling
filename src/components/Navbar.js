import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "./components.scss";

import { logoutUser } from "../common/services/UserServices";
import { getThemeContent } from "../common/utils/Utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {  Navbar } from "react-bootstrap";
import {HOME_BUTTON_URL} from "../common/constants/ApiURLs";
const NavHome = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = async () => {
    setButtonLoading(true);
    let result = await logoutUser({
      userId: localStorage.getItem("userId"),
      refreshToken: localStorage.getItem("refreshToken"),
    });
    if (result?.success) {
      localStorage.clear();
      toast.success(result?.message);
      setTimeout(() => {
        setButtonLoading(false);
        window.location = "/";
      }, 2500);
    } else {
      setButtonLoading(false);
    }
  };

  return (
    <>
      <div className="sticky Navhome">
        <Navbar bg="light" expand="sm" style={{ padding: "0", width: "80%" }}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="navbar">
              <div className="left">
                <div className="home">
                  <a href={HOME_BUTTON_URL}>
                    <FontAwesomeIcon
                      style={{ width: "30px", height: "30px" }}
                      icon={faHouse}
                    />
                  </a>
                </div>
                <div className="list">
                  {JSON.parse(localStorage.getItem("menuStructure"))?.map(
                    (item, index) => {
                      return (
                        <Link
                          key={index}
                          to={item.value}
                          className={`${
                            history.location.pathname.includes(item.value) &&
                            "active"
                          } links`}
                        >
                          {item.name}
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="right">
                <a href="mailto:batteryrecycling-cs@basf.com">
                  <FontAwesomeIcon
                    style={{ width: "30px", height: "30px" }}
                    icon={faEnvelope}
                  />
                </a>
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <div
          className="logo"
          style={{ backgroundColor: getThemeContent().color }}
        >
          <img
            src={`/assets/icons/${getThemeContent().brandIcon}`}
            width="auto"
            height={60}
            alt="brand"
          />
        </div>
      </div>
      <div className="right2 nav-left2">
        <p
          className="client-name mt-1 nav-btn"
          style={{ borderRight: "2px solid white", paddingRight: "5px" }}
        >
          {localStorage.getItem("companyName") ? (
            localStorage.getItem("companyName")
          ) : location.pathname === "/" ? (
            <Link to="/create-account">
              <button className="nav-btn ">Registrieren</button>
            </Link>
          ) : (
            ""
          )}
        </p>
        <div className=" d-flex flex-column m-1" style={{ zIndex: 999 }}>
          {!localStorage.getItem("companyName") ? (
            <Link to="/login">
              <button className="nav-btn">Log in</button>
            </Link>
          ) : buttonLoading && localStorage.getItem("companyName") ? (
            <button disabled className="disable-btn nav-btn">
              Log out
            </button>
          ) : (
            <button className="nav-btn" onClick={handleSubmit}>
              Log out
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default NavHome;
