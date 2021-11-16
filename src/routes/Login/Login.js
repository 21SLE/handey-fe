import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import "./Login.css";

    const baseUrl = "http://localhost:8080"

        function Login() {
            
            const history = useHistory();

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

                await axios
                .post(baseUrl+"/login",User)
                
                .then(function(response){
                    localStorage.jwtAuthToken = response.headers['ACCESS_TOKEN'];
                    console.log(response.data);
                     
                    if(response.data.success === true){
                        console.log("success");
                        history.push("/home");
                     }
                     else{
                        console.log("fail");
                         alert("아이디나 비밀번호가 틀렸습니다");
                         this.setState({
                             email: "",
                             password: ""
                         })
                     }

                })
                .catch(function(error){
                    console.log("error");
                })   
            } 

                const KeyPress = (e) => { 
                    if(e.key === 'Enter') {
                       onsubmit();
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
            onKeyPress={KeyPress}
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
