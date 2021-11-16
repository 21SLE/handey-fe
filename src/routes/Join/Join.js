import React,  { useState } from "react";
import axios from "axios";

function Join(props){

    const baseUrl = "http://localhost:8080/join"; 
 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setrePassword] = useState("");

    const handleName = (e) => {
        setUsername(e.Target.value)
    }
    
    const handleEmail =(e) => {
        setEmail(e.Target.value)
    }

    const handlePW = (e) => {
        setPassword(e.Target.value)
    }

    const handleRepw = (e) => {
        setrePassword(e.Target.value)
    }

    const submitClick = () => {
        console.log("click")

        axios.post(baseUrl, {
            "userid" :email,
            "userpw" :password,
            "username":username,
            "userrepw": rePassword    
    })

        .then(res => {
    })
    .catch(error =>{

    });
}


    return (
        <div className = "InputBox">

                <label>Name</label>
                <input type="name" value={username} onChange={handleName} />

                <label>Email</label>
                <input type="email" value={email} onChange={handleEmail} />

                <label>Password</label>
                <input type="password" value={password} onChange={handlePW} />

                <label>Confirm Password</label>
                <input type="password" value={rePassword} onChange={handleRepw} />

                <button type="submit" onClick = {submitClick}>Join</button>
        </div>
    )
  }



export default Join;

