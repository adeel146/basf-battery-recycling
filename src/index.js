import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./assets/styles/App.scss";
import "./assets/styles/assignments.scss";
import "./assets/styles/settings.scss";
import "./assets/styles/theme.scss";
import "./common/common.scss";
import "./common/middlewares/Intercepter";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
