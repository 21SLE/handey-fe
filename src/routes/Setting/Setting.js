import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Setting.css";

function Setting() {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');

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
                <ul>
                    <li>
                        <h2 className="sectionSubtitle">이메일</h2>
                        <h3 className="userInfoContent">{userEmail}</h3>
                    </li>
                    <li>
                        <h2 className="sectionSubtitle">현재 비밀번호</h2>
                        
                    </li>
                    <li>
                        <h2 className="sectionSubtitle">새로운 비밀번호</h2>
                    
                    </li>
                    <li>
                        <h2 className="sectionSubtitle">새로운 비밀번호 확인</h2>
                    
                    </li>
                </ul>

                <h1 className="sectionTitle">Reset Time(리셋 시간)</h1>
                <ul>
                    <li>
                        <h2 className="sectionSubtitle">Reset At</h2>
                        <h3 className="userInfoContent">{userInfoData['resetTime']}</h3>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>;
}


export default Setting;