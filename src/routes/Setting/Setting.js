import React, { useState } from "react";
import Select from 'react-select';
import {refreshPage} from "../../components/common/CommonFunc";
import axios from "axios";
import "./Setting.css";

function Setting() {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const resetTime = localStorage.getItem('resetTime');

    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
    };
    
    const [curPw, setCurPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [newPwChk, setNewPwChk] = useState("");
    const [newUserName, setNewUserName] = useState(userName);
    const [newResetTime, setNewResetTIme] = useState(resetTime);
    const RESET_OPTIONS = [
        { value: "0", label: "0" }, { value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5" }, { value: "6", label: "6" }
    ];

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

    const handleNewResetTime = (selectedOpt) => {
        console.log(selectedOpt)
        setNewResetTIme(selectedOpt.value)
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
                if(newPw === newPwChk) {
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

    const changeUserName = async () => {
        await axios
        .put("/user/" + userId + "/username", 
        {
            username: newUserName
        }, config)
        .then((response) => {
            console.log(response.data);
            localStorage.setItem('userName', newUserName);
            alert("이름이 변경되었습니다!");
            refreshPage();
        })
        .catch((error) => {console.error(error);});
    }

    const changeResetTime = async () => {
        await axios
        .put("/user/" + userId + "/info", 
        {
            resetTime: newResetTime
        }, config)
        .then((response) => {
            console.log(response.data);
            localStorage.setItem('resetTime', newResetTime);
            alert("리셋 시간이 변경되었습니다!");
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
                            <button className="userName__button" onClick={changeUserName}>변경</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <h1 className="sectionTitle">Reset Time(리셋 시간)</h1>
                <div className="resetTime-section">
                        <h2 className="sectionSubtitle">Reset At</h2>
                        {/* <SelectBox options={RESET_OPTIONS} defaultValue={resetT} /> */}
                        <Select options={RESET_OPTIONS} defaultValue={RESET_OPTIONS[Number(resetTime)]} 
                            onChange={handleNewResetTime}
                            styles={{
                                control: (provided, state) => ({
                                  ...provided,
                                //   boxShadow: "none",
                                  border: state.isFocused && "none",
                                  boxShadow: "2px 2px 3px 1px #979797",
                                  borderRadius: "5px",
                                  width: "200px"
                                }),
                                menu: (provided, state) => ({
                                  ...provided,
                                //   border: "none",
                                //   boxShadow: "none"
                                }),
                                option: (provided, state) => ({
                                   ...provided,
                                   backgroundColor: state.isFocused && "lightgray",
                                   color: state.isFocused && "black"
                                })
                              }}/>
                        <button className="resetTime__button" onClick={changeResetTime}>변경</button>
                        
                    
                </div>
            </div>
            {/* <div className="verticalLine"></div>
            <div className="handeyInfo">
                <h1 className="logo">HANDEY</h1>
                <h6 className="handeyEmail"></h6>
            </div> */}
        </div>
    </div>;
}


export default Setting;