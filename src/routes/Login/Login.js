import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    var accessToken;
    var userId;
    var userName;

    const onClickLogo = () => {
        window.location.href = "/login";
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
        .post("/login", {
            email,
            password
        })
        .then((response) => {
            accessToken = response.data['data']['accessToken'];
            userId = response.data['data']['userId'];
            userName = response.data['data']['userName'];
            localStorage.setItem('accessToken',accessToken);
            localStorage.setItem('userId',userId);
            localStorage.setItem('userName',userName);
            localStorage.setItem('userEmail',email);

            var config = {
                headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
            };

            getUserInfoData(config);

            window.location.href = "/home";
        })
        .catch(() => {
            alert("아이디 혹은 비밀번호를 다시 확인해주시기 바랍니다.");
        })
    }

    async function getUserInfoData(config) {
        await axios
            .get("/user/" + userId + "/info", config)
            .then(response => {
                localStorage.setItem('resetTime', response.data['data']['resetTime']);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    }

    const KeyPress = (e) => { 
        if(e.key === 'Enter') {
            onsubmit();
        }
    }

    return(
        <div className = "login-layout">
            <div className="leftUpperCircle"/>
            <div className="leftLowerCircle"/>
            <div className="rightUpperCircle"/>
            <div className="rightSmallUpperCircle"/>
            <div className="rightMiddleCircle"/>
            <div className="rightLowerCircle"/>
            <div className="login-layout__circle">
                <div className = "login-layout__wrap">
                    <div className="login-layout__upper">
                        <h1 className="logo" onClick={onClickLogo}>HANDEY</h1>
                        <div className = "joinFindPwLinkBtn">
                            <a href = "/join">회원가입</a>
                            <a >비밀번호찾기</a>
                        </div>
                    </div>
                    
                    
                    <div className = "login-form">
                        <div className="login-form__label">
                            <h6>EMAIL</h6>
                            <h6>PASSWORD</h6>
                        </div>
                        <div className = "login-form__input">
                            <input className = "email" value={email} onChange={handleID} required={true} />
                            <input className = "password" type="password" value={password} onChange={handlePW} required={true} onKeyPress={KeyPress} />
                        </div>
                    </div>

                    <button className="loginButton" type = "button" onClick={onsubmit}>Log in</button>
                
                    
                </div>
            </div>
        </div>
    );
}
export default Login;
