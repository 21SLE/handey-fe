import React from "react"

function WelcomeJoin() {

    const moveToLoginPage = () => {
        window.location.href = "/login";
    }

    return <div className="welcomejoin-layout">
        회원가입을 축하드립니다!
        <button type="button" onClick = {moveToLoginPage}>로그인하러가기</button>
    </div>

}

export default WelcomeJoin;