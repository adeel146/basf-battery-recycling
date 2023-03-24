import React, { useEffect } from "react";
import { Circles } from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { verifyLink } from "../../common/services/UserServices";
import PropTypes from "prop-types";

const Redirection = ({ match }) => {
  const history = useHistory();

  useEffect(() => {
    const checkLink = async () => {
      let result = await verifyLink(match?.params?.id);
      if (result?.success) {
        localStorage.setItem("forgetPasswordId", match?.params?.id);
        history.push("/reset-password");
      } else {
        history.push("/link-expired");
      }
    };
    checkLink();
  }, [history, match?.params?.id]);

  return (
    <div className="d-flex justify-content-center align-items-center redirection">
      <Circles heigth="100" width="100" color="white" ariaLabel="loading" />
    </div>
  );
};
Redirection.propTypes = {
  match: PropTypes.any,
};
export default Redirection;
