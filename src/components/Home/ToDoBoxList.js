import React, { useEffect } from "react";
import axios from "axios";
import ToDoBox from "./ToDoBox";


function ToDoBoxList() {
    const baseUrl = "http://localhost:8080";
    let toDoBoxListData=[];

    useEffect(() => {
        getToDoBoxList();
    }, []);

    async function getToDoBoxList() {
        toDoBoxListData = await axios.get(baseUrl + "/toDoBoxList")
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });


    
        
    };

    console.log(toDoBoxListData);

    return <div className="toDoBoxList">
        {            
            toDoBoxListData.map(toDoBox => {
                return <ToDoBox 
                    key = {toDoBox.id}
                    id = {toDoBox.id}
                    title = {toDoBox.title}
                    fixed = {toDoBox.fixed}
                />;
            })
        }

    </div>;
}

export default ToDoBoxList;