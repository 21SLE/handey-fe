import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AfterBox from "./AfterBox";
import "./AfterBoxList.css";

export const AfterContext = React.createContext();

function AfterBoxList({accessToken, userId}) {
    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
      };

    const [afterBoxListData, setAfterBoxListData] = useState([]);

    useEffect(() => {
        getToDoBoxList();
    }, []);

    async function getToDoBoxList() {
        await axios
            .get("/user/" + userId + "/weeklyBoxList", config)
            .then(response => {
                console.log(response.data['data']);
                
                setAfterBoxListData(response.data['data']);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    };


    return <AfterContext.Provider value = {afterBoxListData}>
        <div className="afterSection">
            <div className="after_title">
                <h1>Finished</h1> 
            </div>
            <hr/>
            <div className="afterBoxList">
            {            
                afterBoxListData.map(afterBox => {
                    return <AfterBox 
                        key = {afterBox.id}
                        id = {afterBox.id}
                        title = {afterBox.title}
                        weeklyElmList = {afterBox.weeklyElmList}
                    />;
                })
            }
            </div>
        </div>
    </AfterContext.Provider>;
}

export default AfterBoxList;