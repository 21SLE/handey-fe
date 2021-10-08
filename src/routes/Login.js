import { useState, useEffect } from "react";
import {Redirect} from "react-router-dom";
import "./Login.css";

function Login({ authenticated, login, location }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        try{
            login({email, password});
        } catch(e){
            alert("Failed");
            setEmail("");
            setPassword("");
        }
    };

    const {from} = location.state || {from : {pathname: "/"}};
    if (authenticated) {
        return <Redirect to = {from} />;
    }

    return(
        <div className = "InputBox">
            <h1 className = "title">Sign in</h1>
            <input className = "email"
            value={email}
            onChange={({target: {value}}) => setEmail(value)}
            type = "text"
            placeholder = "id"
            />
            <input className = "password"
            value={password}
            onChange={({target: {value}}) => setPassword(value)}
            type = "text"
            placeholder = "password"
            />
            <button onClick = {handleClick}>Login</button>
        </div>
    )
}


export default Login;
