import React, { useState} from "react";
import { faRedoAlt, faCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import axios from "axios";
import "./TrashBox.css";

function TrashBox({id, title, registerDt, trashElmList, deleteTrashBoxOnScreen}) {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    var config = {
        headers: { 'Content-Type': 'application/json', 'ACCESS_TOKEN': accessToken }
    };
    
    if(title == null) title = "";

    const onRedoTrashBox = async (e) => {
        await axios
            .put("/user/" + userId + "/trashBox/" + id, {}, config)
            .then((response) => {
                console.log(response.data);
                deleteTrashBoxOnScreen(id);
            })
            .catch((error) => {console.error(error);});
        console.log("복구되었습니다.");
    }

    const onDeleteTrashBox = async (e) => {
        await axios
            .delete("/user/trashBox/" + id, config)
            .then((response) => {
                console.log(response.data);
                deleteTrashBoxOnScreen(id);
            })
            .catch((error) => {console.error(error);});

        console.log("TrashBox: " + id + " deleted.");
    }


    return <div className="trashBox">
        <FontAwesomeIcon className="fa faRedoAlt" icon={faRedoAlt}
            onClick={()=> {onRedoTrashBox();}}/>
        <FontAwesomeIcon className="fa faTrash" icon={faTrash}
            onClick={()=> {onDeleteTrashBox();}}/>
        <div className="trashBox__title-section">
            <div className="yellowTag"></div>
            <h6 className="trashBox__title">{title}</h6>
        </div>
        <ul className="trashElmList">
            {
                trashElmList.map((elm) => {
                    if(elm.content == null) elm.content = "";

                    return <li key={elm.id}>
                        <FontAwesomeIcon className={elm.completed ? "faCheck completed" : "faCheck"} icon={faCheck}/>
                        <h6 className={elm.completed ? "trashElmContent completed" : "trashElmContent"}>{elm.content}</h6>
                    </li>
                })
            }
        </ul>
    </div>;
}

TrashBox.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    registerDt: PropTypes.string
};

export default TrashBox;