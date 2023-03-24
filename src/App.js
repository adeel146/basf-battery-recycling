import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthCard from "./common/middlewares/AuthCard";
import DynamicComponent from "./common/middlewares/DynamicComponent";
import SelectService from "./pages/dealer/selectService/SelectService";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import CreateAccount from "./pages/createAccount/CreateAccount";
import Redirection from "./pages/forgotPassword/Redirection";
import LinkExpired from "./pages/forgotPassword/LinkExpired";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import Homepage from "./pages/homepage/Homepage";
import AccountInformationDealer from "./pages/login/AccountInformationDealer";
import AccountInformationLogistics from "./pages/login/AccountInformationLogistics";
import Login from "./pages/login/Login";
import Ags from "./pages/Ags";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";

const App = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/agb" component={Ags} />
        <Route exact path="/impressum" component={Impressum} />
        <Route exact path="/datenschutz" component={Datenschutz} />
        <Route exact path="/login" component={Login} />
        <AuthCard path="/select-service" component={SelectService} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/create-account" component={CreateAccount} />
        <AuthCard
          path="/account-info-dealer"
          component={AccountInformationDealer}
        />
        <AuthCard
          path="/account-info-logistics"
          component={AccountInformationLogistics}
        />
        <Route path="/link-expired" component={LinkExpired} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/key/:id" component={Redirection} />

        {localStorage.getItem("menuStructure") ? (
          JSON.parse(localStorage.getItem("menuStructure"))?.map(
            (item, index) => {
              let component = require("./pages" + item?.componentPath)?.default;
              return (
                <DynamicComponent
                  key={index}
                  path={item?.value}
                  component={component}
                  show={sidebar}
                  handleClick={() => {
                    setSidebar(!sidebar);
                  }}
                  toggle={sidebar}
                />
              );
            }
          )
        ) : (
          <Redirect to="/" />
        )}
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
};

export default App;
