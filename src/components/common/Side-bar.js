import React from "react";
import { Link } from "react-router-dom";
import "./Side-bar.css";

class SideBar extends React.Component {
    
    render() {
        const currentUrl = window.location.pathname;

        return (currentUrl === "/home" || currentUrl === "/history") 
        ? <div className="sideBar">
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/trash">휴지통</Link></li>
            </ul>
        </div>
        : null;
    }
}

export default SideBar;