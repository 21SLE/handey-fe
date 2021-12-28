import React, { useState, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Masonry from "react-masonry-css";
import axios from "axios";
import ToDoBox from "./ToDoBox";
import "./ToDoBoxList.css";

export const ToDoContext = React.createContext();

function ToDoBoxList({accessToken, userId}) {
    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
      };

    const [toDoBoxListData, setToDoBoxListData] = useState([]); //todos 빈 객체 배열로 만들어줌

    useEffect(() => {
        getToDoBoxList();
    }, []);

    async function getToDoBoxList() {
        await axios
            .get("/user/" + userId + "/toDoBoxList", config)
            .then(response => {
                console.log(response.data);
                setToDoBoxListData(response.data['data']);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    };

    const createToDoBoxObj = async () => {
        await axios
        .post("/user/" + userId + "/toDoBox", {}, config)
        .then((response) => {
            console.log("todo box " + response.data['data'] + "가 생성되었습니다.");
            const box = {
                id: response.data['data']['id'],
                title: "",
                fixed: false,
                toDoElmList: response.data['data']['toDoElmList']
            };

            setToDoBoxListData([...toDoBoxListData, box]);
        })
        .catch((error) => {console.error(error);});
    }
    
    const deleteToDoBoxOnScreen = (toDoBoxId) => {
        setToDoBoxListData(toDoBoxListData.filter((toDoBox)=> toDoBox.id !== toDoBoxId));
    }

    const breakpoints = {
        default: 2
    }

    return <ToDoContext.Provider value = {toDoBoxListData}>
        <FontAwesomeIcon className="fa faPlus createToDoBoxBtn" icon={faPlus} onClick={()=>{createToDoBoxObj();}}/>
        <Masonry
            breakpointCols={breakpoints}
            className="todo-masonry-grid"
            columnClassName="todo-masonry-grid_column">
            {toDoBoxListData.map((toDoBox) => {
                 return <ToDoBox 
                        key = {toDoBox.id}
                        accessToken = {accessToken}
                        userId = {userId}
                        id = {toDoBox.id}
                        title = {toDoBox.title}
                        fixed = {toDoBox.fixed}
                        toDoElmList = {toDoBox.toDoElmList}
                        deleteToDoBoxOnScreen = {deleteToDoBoxOnScreen}
                    />;
                })
            }
        </Masonry>
    </ToDoContext.Provider>;
}

export default ToDoBoxList;
