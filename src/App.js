
import React from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Login from "./routes/Login/Login";
import Join from "./routes/Join/Join";
import WelcomeJoin from "./routes/Join/WelcomeJoin";
import Home from "./routes/Home/Home";
import History from "./routes/History/History";
import Trash from "./routes/Trash/Trash"
import SideBar from "./components/common/Side-bar";
import Setting from "./routes/Setting/Setting"
import "./App.css";

function App() {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Login} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/join" exact={true} component={Join} />
      <Route path="/welcome" exact={true} component={WelcomeJoin}/>
      {(accessToken != null && accessToken !="")
      ? <div>
      <SideBar />
        <Route path="/home" component={Home}/>
        <Route path="/history" component={History} />
        <Route path="/setting" component={Setting} />
        <Route path="/trash" component={Trash} />
        </div>
        :<Route path="/" exact={true} component={Login} />
      }
    </BrowserRouter>
  );


}

export default App;
