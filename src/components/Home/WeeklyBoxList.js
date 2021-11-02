import React, { useState } from "react";
import axios from "axios";
import "./WeeklyBoxList.css";

const baseUrl = "http://localhost:8080";

export const WeeklyContext = React.createContext();

function WeeklyBoxList() {
    const [weeklyBoxListData, setWeeklyBoxListData] = useState([]);

    async function getWeeklyList() {
        await axios.get(baseUrl + "/weeklyBoxList")
            .then((response) => {
                console.log(response.data);
                setWeeklyBoxListData(response.data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });
    };

    return <WeeklyContext.Provider value = {weeklyBoxListData}>
        <div className="weeklyList">
            {            
                weeklyBoxListData.map(weeklyBox => {
                    return <WeeklyBox 
                        key = {weeklyBox.id}
                        id = {weeklyBox.id}
                        title = {weeklyBox.title}
                        fixed = {weeklyBox.fixed}
                        weeklyElmList = {weeklyBox.weeklyElmList}
                        deleteWeeklyBoxOnScreen = {deleteWeeklyBoxOnScreen}
                    />;
                })
            }
        </div>
    </WeeklyContext.Provider>;
}

export default WeeklyBoxList;