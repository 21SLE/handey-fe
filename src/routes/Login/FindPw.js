import React, { useState } from "react";
import axios from "axios";
import "./FindPw.css";

function FindPw(){ 

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleName = (e) =>{
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const onClick = (e) => {
        console.log("click")
        e.preventDefault();
}


return(
    <div className = "InputBox">
        <h1 className = "title">비밀번호 찾기</h1>
        <div>
        <label htmlFor="input_name">이름</label>
        <input className = "username"
        value={username}
        onChange={handleName}
        type = "text"
        placeholder = "name"
        />
        </div>
        <div>
         <label htmlFor="input_email">Email</label>
        <input className = "email"
        value={email}
        onChange={handleEmail}
        type = "text"
        placeholder = "email"
        />
        </div>
        <div>
        <button type = "button" onClick={onClick}>Send</button>
        </div>
    </div>
)
}
export default FindPw;
