import React, { useState, useEffect } from "react";
import axios from "axios";
import HstBox from "../../components/History/HstBox";
import "./HstBoxList.css";

const baseUrl = "http://localhost:8080";

//export const HstBoxContext = React.createContext();

function HstBoxList() {

    const [HstBoxListData, setHstBoxListData] = useState([]); 

    useEffect(() => {
        getHstBoxList();
    }, []);

    async function getHstBoxList() {

        await axios.get(baseUrl + "/history/todos")
            .then((response) => {
                console.log(response.data);
                setHstBoxListData(response.data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });
        
        await axios.get(baseUrl + "/afterList")
            .then((response) => {
                console.log(response.data);
                setHstBoxListData(response.data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });


    };
}

// class HstBoxList extends React.Component {
//     render() {
//         return <div className = "HstBoxList-layout">
//             <span>HstBoxList</span>
//         </div>;
//     }
// }

export default HstBoxList;