import React from "react";
import AfterBoxList from "../../components/Home/AfterBoxList";
import ToDoBoxList from "../../components/Home/ToDoBoxList";
import Memo from "../../components/Home/Memo";
import WeeklyBoxList from "../../components/Home/WeeklyBoxList";
import "./Home.css";

function Home() {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    return <div className = "home-layout">
            <div className = "home-layout__wrap">
                <div className = "home-layout__wrap__left">
                    <WeeklyBoxList 
                        accessToken = {accessToken}
                        userId = {userId}
                        />
                    <AfterBoxList 
                        accessToken = {accessToken}
                        userId = {userId}
                        />
                </div>
                <div className = "home-layout__wrap__right">
                    <ToDoBoxList 
                        accessToken = {accessToken}
                        userId = {userId}
                        />
                    <Memo 
                        accessToken = {accessToken}
                        userId = {userId}
                        />
                </div>
            </div>
        </div>;
}



export default Home;