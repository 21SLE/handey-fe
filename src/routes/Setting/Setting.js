import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Setting.css";

function Setting() {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
    };
    
    const [userInfoData, setUserInfoData] = useState([]);
    const [curPw, setCurPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [newPwChk, setNewPwChk] = useState("");
    const [newUserName, setNewUserName] = useState(userName);

    const handleCurPw = (e) => {
        e.preventDefault();
        setCurPw(e.target.value)
    }

    const handleNewPw = (e) => {
        e.preventDefault();
        setNewPw(e.target.value)
    }

    const handleNewPwChk = (e) => {
        e.preventDefault();
        setNewPwChk(e.target.value)
    }

    const handleNewUserName = (e) => {
        e.preventDefault();
        setNewUserName(e.target.value)
    }

    useEffect(() => {
        getUserInfoData();
    }, []);

    async function getUserInfoData() {
        await axios
            .get("/user/" + userId + "/info", config)
            .then(response => {
                console.log(response.data['data']);
                setUserInfoData(response.data['data']);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    }

    const checkCurPw = async () => {
    // 현재 비밀번호가 틀렸다면 팝업
        await axios
        .post("/login", {
            email: userEmail,
            password: curPw
        })
        .then((response) => {
            if(response.data['success']) {
                if(newPw == newPwChk) {
                    changePw()
                    alert("비밀번호가 변경되었습니다!");
                }
                else
                    alert("새로운 비밀번호를 다시 확인해주시기 바랍니다.");
            } else
                alert("현재 비밀번호를 다시 확인해주시기 바랍니다.");
        })
        .catch(() => {
            alert("현재 비밀번호를 다시 확인해주시기 바랍니다.");
        })
    }

    const changePw = async () => {
        
        await axios
        .put("/user/" + userId + "/password", 
        {
            password: newPw
        }, config)
        .then((response) => {
            console.log(response.data);
            setCurPw("");
            setNewPw("");
            setNewPwChk("");
        })
        .catch((error) => {console.error(error);});
        
    }

    return <div className = "setting-layout">
        <div className="setting-layout__wrap">
            <div className="userInfo">
                
            <h1 className="sectionTitle">회원정보</h1>
                <div className="userInfo-section">
                    
                    <div className="titles">
                        <h2 className="sectionSubtitle">이메일</h2>
                        <h2 className="sectionSubtitle">현재 비밀번호</h2>
                        <h2 className="sectionSubtitle">새로운 비밀번호</h2>
                        <h2 className="sectionSubtitle">새로운 비밀번호 확인</h2>
                        <h2 className="sectionSubtitle">이름</h2>
                    </div>
                    <div className="inputs">
                        <div className="boxShadow width200 mb10 userEmail">{userEmail}</div>
                        <div className="pw-section">
                            <div className="pwBox">
                                <input className="boxShadow width200 mb10"
                                    value={curPw} onChange={handleCurPw} placeholder="현재 비밀번호를 입력하세요."/>
                                <input className="boxShadow width200 mb10"
                                    value={newPw} onChange={handleNewPw} placeholder="새로운 비밀번호를 입력하세요."/>
                                <input className="boxShadow width200 mb10"
                                    value={newPwChk} onChange={handleNewPwChk} placeholder="새로운 비밀번호 확인"/>
                            </div>        
                            <button className="pw__button" onClick={checkCurPw}>변경</button>
                        </div>
                        <div className="userName-section">
                            <input className="boxShadow width200 userName"
                                    value={newUserName} onChange={handleNewUserName}/>
                            <button className="userName__button">변경</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <h1 className="sectionTitle">Reset Time(리셋 시간)</h1>
                <div className="resetTime-section">
                        <h2 className="sectionSubtitle">Reset At</h2>
                        <h3 className="userInfoContent boxShadow width200">{userInfoData['resetTime']}</h3>
                    
                </div>
            </div>
        </div>
    </div>;
}


export default Setting;