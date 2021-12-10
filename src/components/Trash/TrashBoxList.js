import React, { useState, useEffect } from "react";
import axios from "axios";
import TrashBox from "./TrashBox";
import "./TrashBoxList.css"

function TrashBoxList() {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
    };

    const [trashBoxListData, setTrashBoxListData] = useState([]);

    useEffect(() => {
        getTrashBoxList();
    }, []);

    async function getTrashBoxList() {
        await axios
            .get("/user/" + userId + "/trashBoxList", config)
            .then(response => {
                console.log(response.data['data']);
                setTrashBoxListData(response.data['data']);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    }

    const deleteTrashBoxOnScreen = (trashBoxId) => {
        setTrashBoxListData(trashBoxListData.filter((trashBox)=> trashBox.id !== trashBoxId));
    }

    return <div className="trashBoxList">
        {
            trashBoxListData.map((trashBox) => {
                return <TrashBox 
                    key = {trashBox.id}
                    id = {trashBox.id}
                    title = {trashBox.title}
                    registerDt = {trashBox.registerDt}
                    trashElmList = {trashBox.trashElmList}
                    deleteTrashBoxOnScreen = {deleteTrashBoxOnScreen}/>
            })
        }
    </div>;

}

export default TrashBoxList;