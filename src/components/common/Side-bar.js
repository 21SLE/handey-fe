import React from "react";
import { Link } from "react-router-dom";
import SideBarCalendar from "./SideBarCalendar"
import "./Side-bar.css";

const handleLogOut = () => {
    localStorage.setItem('accessToken', "");
    window.location.href = "/login";
}

class SideBar extends React.Component {
    
    
    render() {
        const currentUrl = window.location.pathname;
        const userName = localStorage.getItem('userName');
        var todayDate = new Date().toISOString().slice(0, 10).replace(/-/g, '.');

        return (currentUrl === "/home" || currentUrl === "/history" || currentUrl === "/setting" || currentUrl === "/trash") 
        ? <div className="sideBar">
            {/* <h1 className = "logo">HANDEY</h1> */}
            <Link className = "logo" to="/home">HANDEY</Link>
            <h2 className = "todayDate">{todayDate}</h2>
            <h3 className = "welcomeMessage">{userName}님 환영합니다.</h3>
            <div className = "calendar">
                <SideBarCalendar />
            </div>
            <ul className = "sidebarList">
                <li><Link to="/home">HOME</Link></li>
                <li><Link to="/history">HISTORY</Link></li>
                <li><Link to="/setting">SETTING</Link></li>
                <li><Link to="/trash">TRASH</Link></li>
                <li>HELP</li>
            </ul>
            <div className="logout" onClick={handleLogOut}>Log Out</div>
        </div>
        : null;
    }
}

export default SideBar;