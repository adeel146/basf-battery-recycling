import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import "./components.scss";

import { logoutUser } from "../common/services/UserServices";
import { getThemeContent } from "../common/utils/Utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Navbar, } from "react-bootstrap";
import { getTrackingParams} from "../common/utils/PageDetails";
import {HOME_BUTTON_URL} from "../common/constants/ApiURLs";
const Sidebar = (props) => {
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
        tracking({"value":"/logout"})
      }, 2500);
    } else {
      setButtonLoading(false);
    }
  };
  const tracking =  (item) => {
    let params=getTrackingParams(item)
    window.utag.view(params)
  }
  return (
    <>
      <div className="sticky">
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
                  {location.pathname !== "/select-service" &&
                    JSON.parse(localStorage.getItem("menuStructure"))?.map(
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
        <div className="logo"
        style={{backgroundColor:getThemeContent().color}}
        >
        
          <img
            src={`/assets/icons/${getThemeContent().brandIcon}`}
            width="auto"
            height={60}
            alt="brand"
          />
        </div>
      </div>
      <div className="right2 margintop">
        <p className="client-name mt-1">
          {localStorage.getItem("companyName") ? (
            localStorage.getItem("companyName")
          ) : location.pathname === "/" ? (
            <Link to="/create-account"
                  onClick={() => tracking({"value":"/create-account"})}
            >
              <button style={{ border: "none", background: "white" }}>
                Register
              </button>
            </Link>
          ) : (
            ""
          )}
        </p>
        <div className=" d-flex flex-column m-1">
          {location.pathname === "/" ? (
            <Link to="/login"
                  onClick={() => tracking({"value":"/login"})}
            >
              <button style={{ border: "none", background: "none" }}>
                Log ins
              </button>
            </Link>
          ) : buttonLoading && localStorage.getItem("companyName") ? (
            <button
              style={{ border: "none", fontWeight: "bold", background: "none" }}
              disabled
            >
              Log out
            </button>
          ) : localStorage.getItem("companyName") ? (
            <button
              style={{ border: "none", fontWeight: "bold", background: "none" }}
              onClick={handleSubmit}
            >
              Log out
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Sidebar;
