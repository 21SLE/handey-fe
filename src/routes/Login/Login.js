import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import customAxios from "../../customAxios";
import Home from "../Home/Home";
import { BrowserRouter, Route, Switch} from "react-router-dom";

const baseUrl = "http://localhost:8080"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    var token;
    var userId;
    var userName;

    const history = useHistory();

    const routeChange = () =>{ 
        return (
            <BrowserRouter>
              
                <Route path="/home" component={Home(token, userId, userName)}/>
                
            </BrowserRouter>
          );
      }

    const handleID = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }

    const handlePW = (e) =>{
        e.preventDefault();
        setPassword(e.target.value)
    }
    
    const onsubmit = async() => {
        await axios
        .post(baseUrl+"/login",{
            email,
            password
        })
        .then((response) => {
            token = response.data['data']['accessToken'];
            userId = response.data['data']['userId'];
            userName = response.data['data']['userName'];
            console.log(token);
            console.log(userId);
            console.log(userName);
            localStorage.setItem('token',token);
            localStorage.setItem('userId',userId);
            localStorage.setItem('userName',userName);

            window.location.href = "/home";
            
            // routeChange();
        })
        .catch(() => {

        })
    }

    const KeyPress = (e) => { 
        if(e.key === 'Enter') {
            onsubmit();
        }
    }


    return(
        <div className = "InputBox">
    
            <h1>HANDEY</h1>
           
            
            
            <div className = "login-form">
                <div className = "ID">
                <label htmlFor="input_id">ID</label>
                <input className = "email"
                    value={email}
                    onChange={handleID}
                    required={true}
                />
                </div>

                <div className = "PASSWORD">
                    <label htmlFor="input_pw">PASSWORD</label>
                    <input className = "password"
                        value={password}
                        onChange={handlePW}
                        required={true}
                        onKeyPress={KeyPress}
                        />
                </div>

            </div>

            <button type = "button" onClick={onsubmit}>Log in</button>
        
            <div className = "caption">
                <a href = "/join">회원가입</a>
                <a>/</a>
                <a href = "/findPw">비밀번호찾기</a>
            </div>
        </div>
    );
}
export default Login;
