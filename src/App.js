
import React from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Login from "./routes/Login/Login";
import Join from "./routes/Join/Join";
import FindPw from "./routes/Login/FindPw";
import Home from "./routes/Home/Home";
import History from "./routes/History/History";
import Trash from "./routes/Trash/Trash"
import SideBar from "./components/common/Side-bar";
import Info from "./routes/Info/Info"
import "./App.css";

 


function App() {

  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Login} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/join" exact={true} component={Join} />
      <Route path="/findPw" exact={true} component={FindPw} />
      <SideBar />
        <Route path="/home" component={Home}/>
        <Route path="/history" component={History} />
        <Route path="/info" component={Info} />
        <Route path="/trash" component={Trash} />
        {/* <Route component={PageNotFound} /> */}
    </BrowserRouter>
  );


}

export default App;
