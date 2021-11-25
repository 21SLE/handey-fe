import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./routes/Login/Login";
import Join from "./routes/Join/Join";
import FindPw from "./routes/Login/FindPw";
import Home from "./routes/Home/Home";
import History from "./routes/history/History";
import Trash from "./routes/Trash/Trash"
import SideBar from "./components/common/Side-bar";
import "./App.css";


function App() {
  
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Login} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/join" exact={true} component={Join} />
      <Route path="/findPw" exact={true} component={FindPw} />
      
      <SideBar />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/history" component={History} />
        <Route path="/trash" component={Trash} />
        {/* <Route component={PageNotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
