import React from "react";
import { useHistory } from "react-router-dom";
import { roles } from "../../assets/data/roles";
import "./roles.scss";

const Roles = () => {
  const history = useHistory();
  const handleSubmit = (key) => {
    let role = key;
    if (key === "BMW Niederlassung") {
      history.push("/home");
    } else {
      history.push("/login");
    }
    localStorage.setItem("user", role);
  };
  return (
    <div className="roles-page d-flex flex-wrap justify-content-center align-content-center">
      {roles.map((item, index) => (
        <div
          className="role-card"
          key={index}
          onClick={() => {
            handleSubmit(item.user);
          }}
        >
          <img src={item.image} alt="role" />
          <h3 className="text-uppercase">
            <b>{item.name}</b>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Roles;
