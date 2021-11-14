import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

    const baseUrl = "http://localhost:8080"

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

            
            const onsubmit = async() => {
                
                const User= {
                    email: email,
                    password: password
                };

            const res = 
                await axios
                .post(baseUrl+"/login",User)    
                localStorage.jwtAuthToken = res.headers['ACCESS_TOKEN'];
                console.log(res.data);

                if(localStorage.jwtAuthToken.ACCESS_TOKEN == null){
                    alert("fail");
                    console.log("fail");
                }
                else{
                    console.log("success")
                }
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
            <button type = "button" onClick={onsubmit}>Login</button>
            <div className = "findpw">
                <a href = "/findPw">Forget Password?</a>
                <a href = "/join"> / Join</a>
            </div>
        </div>
    )
}


export default Login;
