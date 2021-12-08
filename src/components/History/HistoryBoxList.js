import React, { useState, useEffect } from "react";
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
                console.log(response.data['data']);
                setHistoryBoxListData(response.data['data']);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    }

    return <div className="historyBoxList">
        {
            historyBoxListData.map((historyBox) => {
                return <HistoryBox
                        key = {historyBox.saveDt}
                        date = {historyBox.saveDt}
                        toDoBoxList = {historyBox.toDoBoxHstList}
                        afterList = {historyBox.afterHstList}
                        />
            })
        }
    </div>
}

export default HistoryBoxList;