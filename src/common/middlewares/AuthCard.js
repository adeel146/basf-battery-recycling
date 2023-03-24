import React from "react";
import { Route } from "react-router-dom";
import NotAuthorized from "../../pages/NotAuthorized";
import PropTypes from "prop-types";

const AuthCard = ({ component: Component, path }) => {
  const getAuth = () => {
    return localStorage.getItem("userId");
  };

  return (
    <>
      {getAuth() ? (
        <Route
          exact
          path={path}
          render={() => {
            return <Component />;
          }}
        />
      ) : (
        <Route component={NotAuthorized} />
      )}
    </>
  );
};
AuthCard.propTypes = {
  component: PropTypes.any,
  path: PropTypes.any,
};
export default AuthCard;
