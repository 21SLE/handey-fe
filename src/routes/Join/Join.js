import React,  { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "./Join.css"

function Join(){
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
                        window.location.href = "/welcome";
                     }
                     else{
                        alert("fail");
                     }
                })
                .catch(function(error){
                    console.log("error");
                });
            } 
        }   
    }


    return (
        <div className = "join-layout">
            <div className="leftUpperCircle"/>
            <div className="leftLowerCircle"/>
            <div className="rightUpperCircle"/>
            <div className="rightSmallUpperCircle"/>
            <div className="rightMiddleCircle"/>
            <div className="rightLowerCircle"/>

            <div className="join-layout__circle">
                <div className="join-layout__wrap">
                    <div className="join__title">
                        <h1 className = "handeyTxt">HANDEY</h1>
                        <h1 className = "joinTxt">JOIN</h1>
                    </div>
                
                <div className="join-form">
                    <div className="join-form__label">
                        <h6>이름</h6>
                        <h6>이메일</h6>
                        <h6>비밀번호</h6>
                        <h6>비밀번호 확인</h6>
                    </div>
                    <div className="join-form__input">
                        <input type="name" value={username} onChange={handleName} required={true} placeholder = "이름을 입력해주세요." />
                        <div className="email__section">
                            <input type="email" value={email} onChange={handleEmail} required={true} placeholder = "이메일을 입력해주세요." />
                            {emailChk
                                ? <button className="emailChkBtn chkCompleted"><FontAwesomeIcon className="faCheck" icon={faCheck}/></button>
                                : <button className="emailChkBtn chkUnCompleted" type="submit" onClick = {checkEmailDuplication}>중복확인</button>}            
                        </div>
                        <input type="password" value={password} onChange={handlePW} required={true} placeholder = "비밀번호를 입력해주세요." />
                        <input type="password"  value={pwChk} onChange={handlePwChk} required={true} placeholder = "비밀번호 확인"/>
                    </div>
                </div>
            
                <button className="joinButton" type="submit" onClick = {onsubmit}>회원가입하기</button>
                </div>
            </div>
            
        </div>
    )
}

export default Join;

