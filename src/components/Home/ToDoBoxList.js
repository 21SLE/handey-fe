import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDoBox from "./ToDoBox";
import "./ToDoBoxList.css";

const baseUrl = "http://localhost:8080";

export const ToDoContext = React.createContext();

function ToDoBoxList() {

    // const [input, setInput] = useState(""); //input 초기값이 ""
    const [toDoBoxListData, setToDoBoxListData] = useState([]); //todos 빈 객체 배열로 만들어줌

    useEffect(() => {
        getToDoBoxList();
    }, []);

    async function getToDoBoxList() {
        await axios.get(baseUrl + "/toDoBoxList")
            .then((response) => {
                console.log(response.data);
                setToDoBoxListData(response.data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });
    };
    
    const deleteToDoBoxOnScreen = (toDoBoxId) => {
        setToDoBoxListData(toDoBoxListData.filter((toDoBox)=> toDoBox.id !== toDoBoxId));
    }

    return <ToDoContext.Provider value = {toDoBoxListData}>
        <div className="toDoBoxList">
            {            
                toDoBoxListData.map(toDoBox => {
                    return <ToDoBox 
                        key = {toDoBox.id}
                        id = {toDoBox.id}
                        title = {toDoBox.title}
                        fixed = {toDoBox.fixed}
                        toDoElmList = {toDoBox.toDoElmList}
                        deleteToDoBoxOnScreen = {deleteToDoBoxOnScreen}
                    />;
                })
            }

        </div>
    </ToDoContext.Provider>;
}

export default ToDoBoxList;
