import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    var accessToken;
    var userId;
    var userName;

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

            window.location.href = "/home";
        })
        .catch(() => {
            alert("아이디 혹은 비밀번호를 다시 확인해주시기 바랍니다.");
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
