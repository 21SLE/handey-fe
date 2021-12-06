import React from "react";
import { Link } from "react-router-dom";
import "./Side-bar.css";

class SideBar extends React.Component {
    
    render() {
        const currentUrl = window.location.pathname;

        return (currentUrl === "/home" || currentUrl === "/history") 
        ? <div className="sideBar">
            <h1 className = "logo">HANDEY</h1>
            <h2 className = "date">2021-12-06</h2>
            <h3 className = "welcomeMessage">홍길동님 환영합니다.</h3>
            <div className = "calendar"></div>
            <ul className = "sidebarList">
                <li><Link to="/home">HOME</Link></li>
                <li><Link to="/history">HISTORY</Link></li>
                <li>HELP</li>
                <li><Link to="/info">INFO</Link></li>
                <li><Link to="/trash">TRASH</Link></li>
            </ul>
        </div>
        : null;
    }
}

export default SideBar;