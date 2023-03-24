import React from "react";
import PropTypes from "prop-types";

const Dropdown = (props) => {
  const { label, width, list, onChange, value, numbers, company } = props;
  return (
    <div className="custom-dropdown d-flex position-relative">
      <div
        className="position-relative"
        style={{
          width: width ? width : "75%",
        }}
      >
        {label && <label>{label}</label>}
        {label && <br />}
        <select style={{marginTop:'3.5%'}} onChange={onChange} value={value}>
          <option disabled defaultValue value="">
            Select
          </option>
          {list?.map((item) =>
            company ? (
              <option key={item.key} value={item.key}>
                {item?.value}
              </option>
            ) : (
              <option key={item.id} value={item.id}>
                {numbers
                  ? item.name + " Stk"
                  : item.name === "Paloxe mit Innenkorb"
                  ? item.name.slice(0, 6)
                  : item.name}
              </option>
            )
          )}
        </select>
        {/* <FontAwesomeIcon icon={faChevronDown} className="position-absolute" /> */}
      </div>
    </div>
  );
};
Dropdown.propTypes = {
  label: PropTypes.any,
  width: PropTypes.any,
  list: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
  numbers: PropTypes.any,
  company: PropTypes.any,
};
export default Dropdown;
