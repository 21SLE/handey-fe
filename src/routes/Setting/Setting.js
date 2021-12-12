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
                                <input className="boxShadow width200 mb10"/>
                                <input className="boxShadow width200 mb10"/>
                                <input className="boxShadow width200 mb10"/>
                            </div>        
                            <button className="pw__button">변경</button>
                        </div>
                        <div className="userName-section">
                            <div className="boxShadow width200 userName">{userName}</div>
                            <button className="userName__button">변경</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <h1 className="sectionTitle">Reset Time(리셋 시간)</h1>
                <div className="resetTime-section">
                    <div>
                        <h2 className="sectionSubtitle">Reset At</h2>
                        <h3 className="userInfoContent">{userInfoData['resetTime']}</h3>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>;
}


export default Setting;