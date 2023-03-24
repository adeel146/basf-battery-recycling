import React from "react";
import { ErrorMessage, useField, Field } from "formik";
import PropTypes from "prop-types";

const TextField = ({
  elementType,
  label,
  formik,
  width,
  padding,
  marginTop,
  cardWidth,
  showLabel,
  textAlign,
  onKeyDown,
  ...props
}) => {
  let [field, meta] = useField(props);

  return (
    <>
      <div
        className="text-field"
        style={{
          marginTop: marginTop,
          width: cardWidth,
        }}
      >
        {showLabel === "false" ? null : (
          <label htmlFor={field.name} className="field-label">
            {label}
          </label>
        )}

        <Field
          className={`form-control shadow-none field-input ${
            meta.touched && meta.error && "is-invalid"
          }`}
          autoComplete="off"
          {...field}
          {...props}
          style={
            elementType === undefined
              ? {
                  width: width,
                  padding: padding,
                  textAlign: textAlign,
                }
              : {
                  width: width,
                  padding: padding,
                  background:
                    "url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png) no-repeat right #fff",
                  backgroundPositionX: "95%",
                }
          }
          onKeyDown={onKeyDown}
        />

        <ErrorMessage
          component="p"
          name={field.name}
          style={{
            fontSize: "11px",
            color: "red",
          }}
        />
      </div>
    </>
  );
};
TextField.propTypes = {
  elementType: PropTypes.any,
  label: PropTypes.any,
  width: PropTypes.any,
  padding: PropTypes.any,
  marginTop: PropTypes.any,
  cardWidth: PropTypes.any,
  showLabel: PropTypes.any,
};
export default TextField;
