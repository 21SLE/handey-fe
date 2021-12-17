import React, { useState, useEffect } from "react";
import { faLaugh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import HistoryBox from "./HistoryBox";
import "./HistoryBoxList.css";

function HistoryBoxList() {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
      };
    
    const [historyBoxListData, setHistoryBoxListData] = useState([]);

    useEffect(() => {
        getHistoryBoxList();
    }, []);

    async function getHistoryBoxList() {
        await axios
            .get("/user/" + userId + "/history", config)
            .then(response => {
                var data = response.data['data'];
                data.sort(function (a, b) { 
                    return a.saveDt > b.saveDt ? -1 : a.saveDt < b.saveDt ? 1 : 0;  
                });

                console.log(data);
                setHistoryBoxListData(data);
                // historyBoxListData.sort((a, b) => b.saveDt - a.saveDt);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    }

    return <div className="historyBoxList">
        {   historyBoxListData == null || historyBoxListData.length === 0
            ? <div className="noHistoryMsg">
                <h1>지난 히스토리가 없습니다</h1>
                <FontAwesomeIcon icon={faLaugh}/>
            </div>
            : historyBoxListData.map((historyBox) => {
                return <HistoryBox
                        key = {historyBox.saveDt}
                        date = {historyBox.saveDt}
                        toDoBoxList = {historyBox.toDoBoxHstList}
                        fwBoxList = {historyBox.fwBoxList}
                        />
            }) 
        }
    </div>
}
export default HistoryBoxList;