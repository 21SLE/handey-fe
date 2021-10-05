import React, { useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8080";

function TrashBoxList() {

    useEffect(() => {
        getTrashBoxList();
    })

    async function getTrashBoxList() {
        await axios.get(baseUrl + "/trashBoxList")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            });
    }

    return <div className="trashBoxList"></div>;

}

export default TrashBoxList;