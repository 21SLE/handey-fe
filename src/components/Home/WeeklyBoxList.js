import React, { forwardRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faMinus, faList } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PropTypes from "prop-types";
import WeeklyBox from "./WeeklyBox";
import "./WeeklyBoxList.css";

export const WeeklyContext = React.createContext();

function WeeklyBoxList({accessToken, userId}) {
    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
      };

    const [weeklyBoxListData, setWeeklyBoxListData] = useState([]);

    useEffect(() => {
        getWeeklyBoxList();
    }, []);

    async function getWeeklyBoxList() {
        await axios
            .get("/user/" + userId + "/weeklyBoxList", config)
            .then((response) => {
                console.log(response.data);
                //setWeeklyBoxListData(response.data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });
    };

    const createWeeklyBoxObj = async () => {
        await axios
        .post("/user/" + userId + "/weeklyBoxList", config, {})
        .then((response) => {
            // response.data로 새로 생성된 weekly element의 id가 옴
            console.log("weekly box " + response.data + "가 생성되었습니다.");
            const box = {
                id: response.data,
                title: "",
                clear: false,
                weeklyElmList: []
            };

            setWeeklyBoxListData([...weeklyBoxListData, box]);
        })
        .catch((error) => {console.error(error);});
    }
    
    const deleteWeeklyBoxOnScreen = (weeklyBoxId) => {
        setWeeklyBoxListData(weeklyBoxListData.filter((weeklyBox)=> weeklyBox.id !== weeklyBoxId));
    }

    return <WeeklyContext.Provider value = {weeklyBoxListData}>
        <div className="weeklyBoxList">        
            <div className="weekly_part">    
                <span> weekly </span> 
                <hr border="solid" width="294px" color="grey"/>
                <FontAwesomeIcon className="fa faPlus createWeeklyBoxBtn" icon={faPlus} onClick={()=>{createWeeklyBoxObj();}}/>
            </div>
            <div className="w_box_list">  
            {          
                weeklyBoxListData.map(weeklyBox => {
                    return <WeeklyBox 
                        key = {weeklyBox.id}
                        id = {weeklyBox.id}
                        title = {weeklyBox.title}
                        clear = {weeklyBox.clear}
                        weeklyElmList = {weeklyBox.weeklyElmList}
                        deleteWeeklyBoxOnScreen = {deleteWeeklyBoxOnScreen}
                    />; 
                    
                })
            }</div>

        </div>
    </WeeklyContext.Provider>;
}

export default WeeklyBoxList;