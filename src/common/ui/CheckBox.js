import React from "react";
import PropTypes from "prop-types";

const CheckBox = (props) => {
  const {
    name,
    label,
    checked,
    onChange,
    isDisabled,
    marginLeft,
    padding,
    fontWeight,
  } = props;
  return (
    <div
      className="my-checkbox d-flex align-items-center"
      style={{
        marginLeft: marginLeft,
      }}
    >
      <input
        disabled={isDisabled}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        style={{
          padding: padding,
          opacity: `${isDisabled && ".5"} `,
        }}
      />
      <label
        style={{
          fontWeight: fontWeight,
        }}
      >
        {label}
      </label>
    </div>
  );
};
CheckBox.propTypes = {
  name: PropTypes.any,
  label: PropTypes.any,
  checked: PropTypes.any,
  onChange: PropTypes.any,
  isDisabled: PropTypes.any,
  marginLeft: PropTypes.any,
  padding: PropTypes.any,
  fontWeight: PropTypes.any,
};
export default CheckBox;
