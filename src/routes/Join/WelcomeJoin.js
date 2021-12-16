import React from "react"
import "./WelcomeJoin.css"

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
            회원가입을 축하드립니다!
            <button type="button" onClick = {moveToLoginPage}>로그인하러가기</button>
        </div>
    </div>
</div>

}

export default WelcomeJoin;