import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home/Home";
import History from "./routes/History/History";
import SideBar from "./components/common/Side-bar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Login} />
      <Route path="/login" exact={true} component={Login} />
      
      <SideBar />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/history" component={History} />
        {/* <Route component={PageNotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
