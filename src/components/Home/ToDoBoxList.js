import React, { useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        await axios
            .get(baseUrl + "/user/33/toDoBoxList")
            .then(response => {
                console.log(response.data);
                setToDoBoxListData(response.data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    };

    const createToDoBoxObj = async () => {
        await axios
        .post(baseUrl + "/user/33/toDoBox", {})
        .then((response) => {
            // response.data로 새로 생성된 todo element의 id가 옴
            console.log("todo box " + response.data + "가 생성되었습니다.");
            const box = {
                id: response.data,
                title: "",
                fixed: false,
                toDoElmList: []
            };

            setToDoBoxListData([...toDoBoxListData, box]);
        })
        .catch((error) => {console.error(error);});
    }
    
    const deleteToDoBoxOnScreen = (toDoBoxId) => {
        setToDoBoxListData(toDoBoxListData.filter((toDoBox)=> toDoBox.id !== toDoBoxId));
    }

    return <ToDoContext.Provider value = {toDoBoxListData}>
        <FontAwesomeIcon className="fa faPlus createToDoBoxBtn" icon={faPlus} onClick={()=>{createToDoBoxObj();}}/>
        <div className="toDoBoxList">  
            {toDoBoxListData.map((toDoBox) => {
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
