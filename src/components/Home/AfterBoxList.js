import React, { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./WeeklyBox";
import "./AfterBoxList.css";

const baseUrl = "http://localhost:8080";

export const AfterContext = React.createContext();

function AfterBoxList({accessToken, userId}) {
    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
      };

    const [afterBoxListData, setAfterBoxListData] = useState([]);

    const deleteAfterObj = (weeklyBoxId) => {
        setAfterBoxListData(afterBoxListData.filter((weeklyBox)=> weeklyBox.id !== weeklyBoxId));
    }


    return <AfterContext.Provider value = {afterBoxListData}>
        <FontAwesomeIcon className="fa faMinus deleteAfter" icon={faMinus} onClick={()=>{deleteAfterObj();}}/>
        <div className="afterList">
            {            
                afterBoxListData.map(weeklyBox => {
                    return <weeklyBox 
                        key = {weeklyBox.id}
                        id = {weeklyBox.id}
                        title = {weeklyBox.title}
                        clear = {weeklyBox.clear}
                        weeklyElmList = {weeklyBox.weeklyElmList}
                    />;
                })
            }
        </div>
    </AfterContext.Provider>;
}

export default AfterBoxList;