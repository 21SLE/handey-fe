import React,  { useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

function Join(props){

    const baseUrl = "http://localhost:8080"; 

    const history = useHistory();
 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setrePassword] = useState("");

    const handleName = (e) => {
        e.preventDefault();
        setUsername(e.target.value)
    }
    
    const handleEmail =(e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }

    const handlePW = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }

    const handleRepw = (e) => {
        e.preventDefault();
        setrePassword(e.target.value)
    }

    const onsubmit = async() => {

        if(password !== rePassword){
            alert("비밀번호와 비밀번호 확인은 같아야합니다.")
        }

        const User= {

            username:username,
            userid: email,
            password: password,
            userrepw: rePassword
        };

        await axios
        .post(baseUrl+"/register", User)
        
        .then(function(response){
            localStorage.jwtAuthToken = response.headers['ACCESS_TOKEN'];
            console.log(response.data);

            if(response.data.success === true){
                console.log("success");
                history.push("/login");
             }
             else{
                console.log("fail");
                 alert("fail");
             }
        })
        .catch(function(error){
            console.log("error");
        });  
}
const KeyPress = (e) => { 
    if(e.key === 'Enter') {
       onsubmit();
    }
}

    return (
        <div className = "InputBox">
            <h1 className = "title">Join</h1>
            <div>
                <label>Name: </label>
                <input type="name" 
                value={username} 
                onChange={handleName}
                required={true}
                placeholder = "username" />
            </div>
            <div>
                <label>Id: </label>
                <input type="email"
                value={email}
                onChange={handleEmail}
                required={true}
                placeholder = "abc@email.com" />
                <button type="submit" onClick = {onclick}>인증</button>
            </div>
            <div>
                <label>Password: </label>
                <input type="password"
                value={password}
                onChange={handlePW}
                required={true}
                placeholder = "password" />
            </div>
            <div>
                <label>Confirm Password: </label>
                <input type="password" 
                value={rePassword}
                onChange={handleRepw}
                required={true}
                placeholder = "repassword"
                onKeyPress={KeyPress}/>
            </div>
                <button type="submit" onClick = {onsubmit}>Join</button>
        </div>
    )
  }

export default Join;

