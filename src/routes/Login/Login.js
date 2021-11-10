import React, { useState, useEffect } from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
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

            const [cookies, setCookie, removeCookie ] = useCookies(['Token']); //쿠키 이름을 Token으로 관리
            // 쿠키 값 출력 , 설정 , 삭제

            const onsubmit = (data) => {
                axios
                .post(baseUrl+"/login",data)
                .then(function(response){
                    alert(response.data.message);
                    if(response.data.loginSuccess) {
                        // setuserLogin(response.data.loginSuccess)
                        axios.defaults.headers.common['token'] = response.data.token; //토큰을 axios에 저장시켜 axios로 전송시 token도 같이 보냄
                        setCookie('Token', response.data.token, { path: '/home' }); 
                        // 페이지에서 쿠키에 엑세스할 수 있게 함
                    }
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    });
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
