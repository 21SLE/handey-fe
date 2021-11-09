import React, { forwardRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./WeeklyBox";
import "./AfterBoxList.css";

const baseUrl = "http://localhost:8080";

export const AfterContext = React.createContext();

function AfterBoxList() {
    const [afterBoxListData, setAfterBoxListData] = useState([]);

    const deleteAfterObj = async () => {

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
                        fixed = {weeklyBox.fixed}
                        weeklyElmList = {weeklyBox.weeklyElmList}
                    />;
                })
            }
        </div>
    </AfterContext.Provider>;
}

export default AfterBoxList;