import React, { forwardRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faMinus, faList } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PropTypes from "prop-types";
import WeeklyBox from "./WeeklyBox";
import "./WeeklyBoxList.css";


const baseUrl = "http://localhost:8080";

export const WeeklyContext = React.createContext();

function WeeklyBoxList() {

    // const [input, setInput] = useState(""); //input 초기값이 ""
    const [weeklyBoxListData, setWeeklyBoxListData] = useState([]); //weekly 빈 객체 배열로 만들어줌

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
            console.log("weekly box " + response.data + "가 생성되었습니다.");
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
    
    const deleteWeeklyBoxOnScreen = (weeklyBoxId) => {
        setWeeklyBoxListData(weeklyBoxListData.filter((weeklyBox)=> weeklyBox.id !== weeklyBoxId));
    }

    return <WeeklyContext.Provider value = {weeklyBoxListData}>
        <FontAwesomeIcon className="fa faPlus createWeeklyBoxBtn" icon={faPlus} onClick={()=>{createWeeklyBoxObj();}}/>
        <div className="weeklyBoxList">
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
            }

        </div>
    </WeeklyContext.Provider>;
}

export default WeeklyBoxList;