import React from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home/Home";
import History from "./routes/History";
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





// function App() {   
//   return (
//     <div>
//       <Suspense fallback={<Loading />}>
//           <Switch>
//             <NavRoute exact path="/" component={Landing}  />
//             <Route exact path="/admin/dashboard" component={Dashboard}/>
//             <Route exact path="/" component={Login} />
//             <NavRoute exact path="/path1" component={Page1} />
//             <NavRoute exact path="/path2" component={Page2} />
//             <NavRoute component={Page404} />
//           </Switch>
//       </Suspense>
//     </div>
//   );
// }