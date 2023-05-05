import React from "react";
import { isLogin } from "../utile/index";
import { Route, Switch, Redirect } from "react-router-dom";
import "../assets/sass/pages/register.scss";
import logo from "../assets/images/logo.png";
import Translate from "../component/register/translate/Translate";
import Connexion from "../component/register/connexion/Connexion";
import Identification from "../component/register/identification/Identification";
import Welcome from "../component/register/welcome/Welcome";
import PassWord from "../component/register/password/Password";

export default function User() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>
      {isLogin() ? (
        <Redirect from="/" to="/admin/dashboard" />
      ) : (
        <>
          <div className="container-fluid no-gutters p-0 h-100">
            <div className="row no-gutters p-0 row-right-side">
              <div className="col-lg-7 no-gutters right-side">
                <div className="custom-main-image">
                  <img className="custom-logo" src={logo} alt="Logo" />
                </div>
              </div>

              <div className="col-lg-5 no-gutters left-side">
                <div className="container-fluid p-0 container-right-side">
                  <div className="row no-gutters p-0 row-right-side">
                    <div className="col-lg-10 offset-lg-1 h-100 left-col-side">
                      <div className="conten">
                        <Switch>
                          <Route exact path="/" component={Connexion} />
                          <Route path="/register" component={Identification} />
                          <Route path="/login" component={Connexion} />
                          <Route path="/welcome" component={Welcome} />
                          <Route path="/password/:id" component={PassWord} />
                        </Switch>
                      </div>
                    </div>
                    <div className="col-lg-10 offset-lg-1 mr-0 translate">
                      <Translate />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
