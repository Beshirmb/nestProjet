import "./app.scss";
import "./styledashbord.css";
import React from "react";
import { BrowserRouter, Route, Switch  } from "react-router-dom";
import UserLayout from "./layouts/User";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
     
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route path="/" render={(props) => <UserLayout {...props} />} />
        </Switch>
      </BrowserRouter>
    
    </>
  );

}

export default App;
