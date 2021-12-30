import React, { useState, useEffect, useCallback } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemTypes } from "../common/ItemTypes";
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
        console.log('------------getToDoBoxList------------')
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

    const findToDoBox = (toDoBoxId) => {
        toDoBoxListData.forEach((toDoBox)=>{
            console.log(toDoBox);
            if(toDoBox.id === toDoBoxId)
            return toDoBox;
        })
    }

    const moveToDoBox = (toDoBoxId, toIndex) => {
        console.log('옮겨지는 toDoBoxId: '+ toDoBoxId)
        console.log('어디로 toIndex: '+ toIndex)
        let box;
        toDoBoxListData.forEach((toDoBox)=>{
            console.log(toDoBox);
            if(toDoBox.id === toDoBoxId)
                box = toDoBox;
        })
        console.log(box)
        const index = toDoBoxListData.indexOf(box);
        let newOrder = [...toDoBoxListData];
        newOrder.splice(index, 1);
        console.log(box)
        newOrder.splice(toIndex, 0, box);
        console.log(newOrder)
        setToDoBoxListData(newOrder)
    };
    
    const [, drop] = useDrop(() => ({ accept: ItemTypes.ToDoBox }));

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
                return <div ref={drop} key = {toDoBox.id}>
                    <ToDoBox 
                        accessToken = {accessToken}
                        userId = {userId}
                        id = {toDoBox.id}
                        key = {toDoBox.id}
                        title = {toDoBox.title}
                        index = {toDoBox.index}
                        fixed = {toDoBox.fixed}
                        toDoElmList = {toDoBox.toDoElmList}
                        deleteToDoBoxOnScreen = {deleteToDoBoxOnScreen}
                        moveToDoBox = {moveToDoBox}
                    /></div>;
                })
            }
        </Masonry>
    </ToDoContext.Provider>;
}

export default ToDoBoxList;
