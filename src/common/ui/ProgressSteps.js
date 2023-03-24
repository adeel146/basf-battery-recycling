import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import CheckBox from "./CheckBox";
import { orderCompletion } from "../services/OrderServices";
import PropTypes from "prop-types";
const ProgressSteps = (props) => {
  
  const { active, orderId, setCheckChangesTrue } = props;
  const [Check, setCheck] = useState(false);
  const handleChange = async () => {
    await orderCompletion(orderId);
    setCheck(!Check);
    setCheckChangesTrue();
  };
  let list = [
    {
      id: 1,
      name: "Erstellt",
    },
    {
      id: 2,
      name: "Freigegeben",
    },
    {
      id: 3,
      name: "Bereit zur Abholung",
    },
    {
      id: 4,
      name: "Abgeholt",
    },
    {
      id: 5,
      name: "Beim Recycler abgegeben",
    },
  ];
  return (
    <div
      className={`progress-steps d-flex align-items-center + ${
        props.userType === "management" && "mb-0"
      }`}
    >
      <div className="left-bar" />
      {list.map((item) => (
        <div
          className="d-flex align-items-center position-relative"
          key={item?.id}
        >
          <div
            className={`d-flex step-name position-relative ${
              !active === item?.id || item?.id > active ? "disabled-name" : ""
            }`}
          >
            <p className="m-0">{item?.name}</p>

            {(active === item?.id || item?.id < active) && (
              <FontAwesomeIcon icon={faCheck} className="position-absolute" />
            )}
          </div>
          <div
            className={`bar ${
              !active === item?.id || item?.id > active ? "disabled-bar" : ""
            }`}
          />
        </div>
      ))}
      <CheckBox
        onChange={handleChange}
        checked={active === 5}
        isDisabled={active < 4 || active === 5}
        marginLeft={"15px"}
      />
    </div>
  );
};
ProgressSteps.propTypes = {
  active:PropTypes.any,
  orderId:PropTypes.any,
  setCheckChangesTrue:PropTypes.any,
  userType:PropTypes.any,
};
export default ProgressSteps;
