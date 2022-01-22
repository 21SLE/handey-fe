import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
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
        await axios
            .get("/user/" + userId + "/toDoBoxList", config)
            .then(response => {
                var data = response.data['data'];
                data.sort(function (a, b) { 
                    return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;  
                });

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

    const moveToDoBox = async (toDoBoxId, toIndex, shouldCallApi) => {
        let box;
        toDoBoxListData.forEach((toDoBox)=>{
            console.log(toDoBox);
            if(toDoBox.id === toDoBoxId)
                box = toDoBox;
        })
        const index = toDoBoxListData.indexOf(box);
        let newOrder = [...toDoBoxListData];
        newOrder.splice(index, 1);
        newOrder.splice(toIndex, 0, box);
        setToDoBoxListData(newOrder)
        if(shouldCallApi) {
            var list = [];
            newOrder.forEach((toDoBox, idx)=> {
                list.push({id: toDoBox.id, index: idx})
            });
            await axios
            .put("/user/"+ userId +"/toDoBox/sequence", {indexList: list}, config)
            .then((response) => {
                console.log(response.data);
                
                console.log("todobox 순서가 수정되었습니다.");
            })
            .catch((error) => {console.error(error);});
        }
    };
    
    const [, drop] = useDrop(() => ({ accept: ItemTypes.ToDoBox }));

    const breakpoints = {
        default: 3,
        1600: 2,
        1340: 1
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
