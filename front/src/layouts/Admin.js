import React, { useState } from "react";
import { Switch, Redirect } from "react-router-dom";
import AdminNavbar from "../component/navbars/AdminNavbar";
import Footer from "../component/footer/Footer";
import Sidebar from "../component/sidebar/Sidebar";
import routes from "../route/Layout-dashbord";
import PrivateRoute from "../route/Private-routes";
import { isLogin } from "../utile/index";
function Admin() {
  const [show, setshow] = useState(true);

  const mainPanel = React.useRef(null);
  const showslide = (val) => {
    setshow(val);
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <PrivateRoute
            path={prop.layout + prop.path}
            exact
            component={prop.component}
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
        <div className="bagroundadmin">
          <AdminNavbar showslide={showslide} />
          <div className="d-flex  align-items-center">
            <Sidebar show={show} />

            <div className="taillegloble">
              <div
                className={
                  show ? "d-none" : "d-block d-sm-none general-backdrop"
                }
                onClick={() => setshow(true)}
              ></div>
              <div className="main-panel" ref={mainPanel}>
                <Switch>{getRoutes(routes)}</Switch>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        <Redirect from="admin" to="/" />
      )}
    </>
  );
}

export default Admin;
