import React, { useImperativeHandle, useState, useEffect, forwardRef } from "react";
import axios from "axios";
import AfterBox from "./AfterBox";
import "./AfterBoxList.css";

export const AfterContext = React.createContext();

function AfterBoxList({accessToken, userId}, ref) {
    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
      };

    const [afterBoxListData, setAfterBoxListData] = useState([]);

    useEffect(() => {
        getAfterBoxList();
    }, []);

    useImperativeHandle(ref, () => ({
        getAfterBoxList
    }));

    // useImperativeHandle(ref, () => ({
    //     refreshAfterList: () => {
    //         getAfterBoxList();
    //     }
    //   }));

    async function getAfterBoxList() {
        const offset = new Date().getTimezoneOffset() * 60000;
        const todayDate = new Date(Date.now() - offset).toISOString().slice(0, 10);
        await axios
            .get("/user/" + userId + "/fw?dt=" + todayDate, config)
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
                <h1>Finished Today</h1> 
            </div>
            <hr/>
            <div className="afterBoxList">
            {            
                afterBoxListData.map(afterBox => {
                    return <AfterBox 
                        key = {afterBox.id}
                        id = {afterBox.id}
                        title = {afterBox.title}
                        fwElmList = {afterBox.fwElmList}
                    />;
                })
            }
            </div>
        </div>
    </AfterContext.Provider>;
}
export default forwardRef(AfterBoxList);