import "./app.scss";
import "./styledashbord.css";
import React from "react";
import { BrowserRouter, Route, Switch  } from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import UserLayout from "./layouts/User";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
     
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route path="/" render={(props) => <UserLayout {...props} />} />
        </Switch>
      </BrowserRouter>
    
    </>
  );

}

export default App;
