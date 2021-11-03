import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useHistory } from "react-router";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleID = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }

    const handlePW = (e) =>{
        e.preventDefault();
        setPassword(e.target.value)
    }
    
    const history = useHistory();
    
    useEffect(() => {
        if (localStorage.getItem("user_info")){
            history.push("/home")
        }
    })

    const baseUrl = "http://localhost:8080"

        async function getLogin(){

            console.log("click")
            console.log("Id: ", email)
            console.log("PW: ", password) 

            await axios
             .post(baseUrl+"/login")
             .then(res => {
                localStorage.setItem('token',res.data.token);
            })
            .catch((error)=>{
                console.error(error)
            })
        }

    return(
        <div className = "InputBox">
            <h1 className = "title">Sign in</h1>
            <div>
            <label htmlFor="input_id">Id: </label>
            <input className = "email"
            value={email}
            onChange={handleID}
            type = "text"
            required={true}
            placeholder = "id"
            />
            </div>
            <div>
             <label htmlFor="input_pw">Password: </label>
            <input className = "password"
            value={password}
            onChange={handlePW}
            type = "text"
            required={true}
            placeholder = "password"
            />
            </div>
            <button type = "button" onClick={getLogin}>Login</button>
            <div className = "findpw">
                <a href = "/findPw">Forget Password?</a>
                <a href = "/join"> / Join</a>
            </div>
        </div>
    )
}


export default Login;
