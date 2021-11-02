import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import WeeklyBox from "./WeeklyBox";
import "./WeeklyBoxList.css";

const baseUrl = "http://localhost:8080";

export const WeeklyContext = React.createContext();

function WeeklyBoxList() {
    const [weeklyBoxListData, setWeeklyBoxListData] = useState([]);
    
    useEffect(() => {
        getWeeklyBoxList();
    }, []);

    async function getWeeklyBoxList() {
        await axios.get(baseUrl + "/weeklyBoxList")
            .then((response) => {
                console.log(response.data);
                setWeeklyBoxListData(response.data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });
    };

    const createWeeklyBoxObj = async () => {
        await axios
        .post(baseUrl + "/weeklyBox", {})
        .then((response) => {
            // response.data로 새로 생성된 weekly element의 id가 옴
            console.log("weekly box " + response.data + " 생성");
            const box = {
                id: response.data,
                title: "",
                fixed: false,
                weeklyElmList: []
            };

            setWeeklyBoxListData([...weeklyBoxListData, box]);
        })
        .catch((error) => {console.error(error);});
    }

    return <WeeklyContext.Provider value = {weeklyBoxListData}>
    <FontAwesomeIcon className="fa faPlus createWeeklyBoxBtn" icon={faPlus} onClick={()=>{createWeeklyBoxObj();}}/>
        <div className="weeklyList">
            {            
                weeklyBoxListData.map(weeklyBox => {
                    return <WeeklyBox 
                        key = {weeklyBox.id}
                        id = {weeklyBox.id}
                        title = {weeklyBox.title}
                        fixed = {weeklyBox.fixed}
                        weeklyElmList = {weeklyBox.weeklyElmList}
                        //위클리는 no box
                    />;
                })
            }
        </div>
    </WeeklyContext.Provider>;
    return <div className="weeklyBoxList">
        Weekly Section
    </div>;
}

export default WeeklyBoxList;