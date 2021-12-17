import React from "react"
import "./WelcomeJoin.css"
import CelebrateIcon1 from "../../components/common/img/celebrate_icon1.png"
import CelebrateIcon2 from "../../components/common/img/celebrate_icon2.png"

function WelcomeJoin() {

    const moveToLoginPage = () => {
        window.location.href = "/login";
    }

    return <div className = "welcomejoin-layout">
    <div className="leftUpperCircle"/>
    <div className="leftLowerCircle"/>
    <div className="rightUpperCircle"/>
    <div className="rightSmallUpperCircle"/>
    <div className="rightMiddleCircle"/>
    <div className="rightLowerCircle"/>
    <div className="welcomejoin-layout__circle">
        <div className = "welcomejoin-layout__wrap">
            <h1 className="logo">HANDEY</h1>
            
            <button className="loginButton" type="button" onClick = {moveToLoginPage}>로그인하러가기</button>
        </div>
        <div className="celebration__section">
            <img className="celebrate_icon" alt=" " src={CelebrateIcon1} />
            <h2>회원가입을 축하드립니다!</h2>
            <img className="celebrate_icon" alt=" " src={CelebrateIcon2} />
        </div>
    </div>
    
</div>

}

export default WelcomeJoin;