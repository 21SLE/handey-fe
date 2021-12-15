import React,  { useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

function Join(props){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pwChk, setPwChk] = useState("");
    const [emailChk, setEmailChk] = useState(false);

    const handleName = (e) => {
        e.preventDefault();
        setUsername(e.target.value)
    }
    
    const handleEmail =(e) => {
        e.preventDefault();
        if(email !== e.target.value && emailChk)
            setEmailChk(false);
        setEmail(e.target.value)
    }

    const handlePW = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }

    const handlePwChk = (e) => {
        e.preventDefault();
        setPwChk(e.target.value)
    }

    const checkEmailDuplication = async () => {
        await axios
        .get("/register/duplication?email=" + email)
        .then((response) => {
            console.log(response.data);
            if(response.data['data']) {
                alert("이미 존재하는 이메일입니다.")
                setEmail("");
            } else {
                alert("사용 가능한 이메일입니다.")
                setEmailChk(true);
            }
        })
        .catch((error) => {
            console.log("error");
        }); 
    }

    const onsubmit = async() => {
        if(!emailChk){
            alert("이메일 중복확인을 해주시기 바랍니다.")
        } else {
            if(password !== pwChk){
                alert("비밀번호가 일치하지 않습니다.")
            } else {
                const User= {
                    username: username,
                    email: email,
                    password: password
                };
        
                await axios
                .post("/register", User)
                .then(function(response){
                    if(response.data['success'] === true){
                        console.log("success");
                        //TODO 회원가입을 축하드립니다 팝업띄우고 로그인하러가기 누르면 로그인창으로 이동
        
                        window.location.href = "/welcome";
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
        }

         
}

// const KeyPress = (e) => { 
//     if(e.key === 'Enter') {
//        onsubmit();
//     }
// }

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
                {emailChk
                ? <span>확인 완료</span>
                : <button type="submit" onClick = {checkEmailDuplication}>중복확인</button>}
                
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
                value={pwChk}
                onChange={handlePwChk}
                required={true}
                placeholder = "repassword"/>
            </div>
                <button type="submit" onClick = {onsubmit}>Join</button>
        </div>
    )
  }

export default Join;

