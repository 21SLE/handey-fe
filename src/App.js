import React, {useReducer , useState, useEffect} from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./routes/Login/Login";
import Join from "./routes/Join/Join";
import FindPw from "./routes/Login/FindPw";
import Home from "./routes/Home/Home";
import History from "./routes/history/History";
import Trash from "./routes/Trash/Trash"
import SideBar from "./components/common/Side-bar";
import customAxios from './customAxios';
import "./App.css";


// const initialState = {
//   authenticated: false,
//   token: null
// }

// function reducer(state, action) {
//   switch(action.type) {
//       case 'SET_TOKEN':
//           return {...state, token: action.token, authenticated: action.result};
//       default:
//           return state;
//   }
// }

function App() {

//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { authenticated } = state;

//   function handleLogin(id, password) {
//     let token = Login.Login(id, password);

//     if (token) {
//       console.log('로그인 성공!');
//       dispatch({
//         type: 'SET_TOKEN',
//         token: token,
//         result: true,
//       });
//     } else {
//       console.log('로그인 실패');
//       dispatch({
//         type: 'SET_TOKEN',
//         token: null,
//         result: false,
//       });
//     }
//   }


  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Login} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/join" exact={true} component={Join} />
      <Route path="/findPw" exact={true} component={FindPw} />
      <SideBar />
        <Route path="/home" component={Home}/>
        <Route path="/history" component={History} />
        <Route path="/trash" component={Trash} />
        {/* <Route component={PageNotFound} /> */}
    </BrowserRouter>
  );


}

export default App;
