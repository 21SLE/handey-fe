import React from "react";

function handleClick(e) {
    window.location.href="/home";
}

function Login() {
    return <div>
        <span>This is Login Page.</span>
        <button onClick={handleClick}>Login</button>
    </div>;
}

export default Login;