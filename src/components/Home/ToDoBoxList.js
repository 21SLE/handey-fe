import React, { useEffect } from "react";
import axios from "axios";
import ToDoBox from "./ToDoBox";


function ToDoBoxList() {
    const baseUrl = "http://localhost:8080";

    useEffect(() => {
        getToDoBoxList();
    }, []);

    async function getToDoBoxList() {
        await axios.get(baseUrl + "/toDoBoxList")
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });
    
    
    };
}

export default ToDoBoxList;